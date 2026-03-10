import json
from graph_state import G
from user_store import students, faculties
from project_store import projects
from publication_store import publications


def build_graph():
    G.clear()

    # ---------------- STUDENTS ----------------
    for student in students:
        sid = student.get("id") or student.get("email")
        if not sid: continue
        G.add_node(sid, type="student", name=f"{student.get('first_name', '')} {student.get('last_name', '')}".strip() or sid)

        for skill in student.get("skills", []):
            skill = skill.lower()
            G.add_node(skill, type="skill", name=skill)
            G.add_edge(sid, skill)

    # ---------------- FACULTY ----------------
    for faculty in faculties:
        fid = faculty.get("id") or faculty.get("email")
        if not fid: continue
        G.add_node(fid, type="faculty", name=f"{faculty.get('first_name', '')} {faculty.get('last_name', '')}".strip() or fid)

        for skill in faculty.get("skills", []):
            skill = skill.lower()
            G.add_node(skill, type="skill", name=skill)
            G.add_edge(fid, skill)

    # ---------------- PROJECTS ----------------
    for project in projects:
        pid = project.get("id") or f"proj_{project['title']}"
        G.add_node(pid, type="project", title=project["title"], name=project["title"])

        # Link to uploader if exists
        uploader = project.get("uploader") or project.get("uploaded_by")
        if uploader:
            G.add_edge(pid, uploader)

        for sid in project.get("studentID", []):
            G.add_edge(pid, sid)

        for fid in project.get("facultyID", []):
            G.add_edge(pid, fid)

    # ---------------- PUBLICATIONS ----------------
    for pub in publications:
        pid = pub.get("id") or f"pub_{pub['title']}"
        G.add_node(pid, type="publication", title=pub["title"], name=pub["title"])

        # Link to uploader if exists
        uploader = pub.get("uploader") or pub.get("uploaded_by")
        if uploader:
            G.add_edge(pid, uploader)

        for sid in pub.get("studentID", []):
            G.add_edge(pid, sid)

        for fid in pub.get("facultyID", []):
            G.add_edge(pid, fid)

    return G
