import json
from graph_state import G
from user_store import students, faculties
from project_store import projects
from publication_store import publications


def build_graph():

    G.clear()

    # ---------------- STUDENTS ----------------
    for student in students:
        G.add_node(student["id"], type="student", **student)

        for skill in student["skills"]:
            skill = skill.lower()
            G.add_node(skill, type="skill")
            G.add_edge(student["id"], skill)

    # ---------------- FACULTY ----------------
    for faculty in faculties:
        G.add_node(faculty["id"], type="faculty", **faculty)

        for skill in faculty["skills"]:
            skill = skill.lower()
            G.add_node(skill, type="skill")
            G.add_edge(faculty["id"], skill)

    # ---------------- PROJECTS ----------------
    for project in projects:
        pid = project["id"]
        G.add_node(pid, type="project", title=project["title"])

        for sid in project["studentID"]:
            G.add_edge(pid, sid)

        for fid in project["facultyID"]:
            G.add_edge(pid, fid)

    # ---------------- PUBLICATIONS ----------------
    for pub in publications:
        pid = pub["id"]
        G.add_node(pid, type="publication", title=pub["title"])

        for sid in pub["studentID"]:
            G.add_edge(pid, sid)

        for fid in pub["facultyID"]:
            G.add_edge(pid, fid)

    return G
