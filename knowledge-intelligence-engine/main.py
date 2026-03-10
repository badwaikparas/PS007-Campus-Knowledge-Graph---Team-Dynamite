from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import shutil
from typing import List, Annotated
from pathlib import Path

from graph_engine import build_graph
from search_engine import semantic_search
from recommend import recommend_collaborators
from research_engine import research_query
from publication_store import publications
from project_store import projects
from pdf_utils import extract_text_from_pdf
from graph_state import G
from graph_engine import build_graph
from models import UserCreate
from user_store import students, faculties


app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For demo purposes, otherwise use ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = Path("publications")
UPLOAD_DIR.mkdir(exist_ok=True)

build_graph()


@app.get("/search")
def search(q: str):
    results = semantic_search(q)
    # Flatten and map to frontend expectations
    flattened = []
    
    for p in results.get("projects", []):
        flattened.append({
            "id": f"proj_{p['title']}",
            "type": "project",
            "title": p["title"],
            "description": f"Research project uploaded by {p['uploaded_by']}. Relevance score: {p['score']:.2f}",
            "relatedResearchers": [p["uploaded_by"]]
        })
        
    for pub in results.get("publications", []):
        flattened.append({
            "id": f"pub_{pub['title']}",
            "type": "publication",
            "title": pub["title"],
            "description": f"Academic publication uploaded by {pub['uploaded_by']}. Relevance score: {pub['score']:.2f}",
            "relatedResearchers": [pub["uploaded_by"]]
        })
        
    return flattened


@app.get("/graph")
def get_graph_data():
    nodes = []
    links = []
    
    for node, attrs in G.nodes(data=True):
        nodes.append({
            "id": node,
            "name": attrs.get("title", attrs.get("first_name", node)),
            "type": attrs.get("type", "unknown")
        })
        
    for source, target in G.edges():
        links.append({
            "source": source,
            "target": target
        })
        
    return {"nodes": nodes, "links": links}


@app.get("/trends")
def get_trends():
    # Simple skill counting for trends
    from collections import Counter
    all_skills = []
    for s in students:
        all_skills.extend(s.get("skills", []))
    for f in faculties:
        all_skills.extend(f.get("skills", []))
        
    skill_counts = Counter(all_skills)
    
    # Format for recharts
    skill_data = [{"name": skill, "value": count} for skill, count in skill_counts.most_common(5)]
    
    # Mock activity data for now
    activity_data = [
        {"name": "Jan", "value": 400},
        {"name": "Feb", "value": 300},
        {"name": "Mar", "value": 600},
        {"name": "Apr", "value": 800},
    ]
    
    return {
        "skills": skill_data,
        "activity": activity_data
    }


@app.get("/recommend")
def recommend(skill: str):
    return recommend_collaborators(G, skill)


@app.get("/research")
def research(q: str):
    return research_query(G, q)


@app.post("/users")
def add_user(user: UserCreate):

    if user.type == "student":
        students.append(user.dict())

    elif user.type == "faculty":
        faculties.append(user.dict())

    else:
        raise HTTPException(status_code=400, detail="Type must be student or faculty")

    build_graph()  # refresh graph

    return {"msg": "user added"}


@app.post("/upload/multiple/publications")
async def upload_multiple_files(
    uploader_id: str, files: Annotated[List[UploadFile], File(...)]
):

    uploaded_files = []

    for file in files:
        file_path = UPLOAD_DIR / file.filename

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        text = extract_text_from_pdf(file_path)

        publications.append(
            {"title": file.filename, "uploaded_by": uploader_id, "text": text}
        )

        uploaded_files.append(
            {
                "filename": file.filename,
                "location": str(file_path),
                "uploaded_by": uploader_id,
            }
        )

    build_graph()
    print(publications)

    return {"uploaded_files": uploaded_files}


@app.post("/upload/multiple/projects")
async def upload_multiple_files2(
    uploader_id: str, files: Annotated[List[UploadFile], File(...)]
):

    uploaded_files = []

    for file in files:
        file_path = UPLOAD_DIR / file.filename

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        text = extract_text_from_pdf(file_path)

        projects.append({"title": file.filename, "uploaded_by": uploader_id, "text": text})

        uploaded_files.append(
            {
                "filename": file.filename,
                "location": str(file_path),
                "uploaded_by": uploader_id,
            }
        )

    build_graph()
    print(projects)

    return {"uploaded_files": uploaded_files}


@app.get("/download/{filename}")
async def download_pdf(filename: str):

    file_path = UPLOAD_DIR / filename

    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")

    return FileResponse(path=file_path, media_type="application/pdf", filename=filename)
