from fastapi import FastAPI, File, UploadFile, HTTPException
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

UPLOAD_DIR = Path("publications")
UPLOAD_DIR.mkdir(exist_ok=True)

build_graph()


@app.get("/search")
def search(q: str):
    return semantic_search(q)


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
            {"title": file.filename, "uploader": uploader_id, "text": text}
        )

        uploaded_files.append(
            {
                "filename": file.filename,
                "location": str(file_path),
                "uploader": uploader_id,
            }
        )

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

        projects.append({"title": file.filename, "uploader": uploader_id, "text": text})

        uploaded_files.append(
            {
                "filename": file.filename,
                "location": str(file_path),
                "uploader": uploader_id,
            }
        )

    print(projects)

    return {"uploaded_files": uploaded_files}


@app.get("/download/{filename}")
async def download_pdf(filename: str):

    file_path = UPLOAD_DIR / filename

    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")

    return FileResponse(path=file_path, media_type="application/pdf", filename=filename)
