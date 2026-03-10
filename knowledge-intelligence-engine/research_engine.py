def research_query(G, query):

    query_words = query.lower().split()

    student_scores = {}
    faculty_scores = {}

    projects = []
    publications = []

    # ---------------- SKILL MATCH ----------------
    for node, data in G.nodes(data=True):
        if data.get("type") in ["student", "faculty"]:
            score = 0

            for neighbor in G.neighbors(node):
                if G.nodes[neighbor]["type"] == "skill":
                    skill = neighbor

                    for q in query_words:
                        if q in skill:
                            score += 1

            if score > 0:
                if data["type"] == "student":
                    student_scores[node] = student_scores.get(node, 0) + score
                else:
                    faculty_scores[node] = faculty_scores.get(node, 0) + score

    # ---------------- PROJECT MATCH ----------------
    for node, data in G.nodes(data=True):
        if data.get("type") == "project":
            title = data["title"].lower()

            if any(q in title for q in query_words):
                members = list(G.neighbors(node))

                proj_students = []
                proj_faculties = []

                for m in members:
                    t = G.nodes[m]["type"]

                    if t == "student":
                        proj_students.append(m)
                        student_scores[m] = student_scores.get(m, 0) + 1

                    if t == "faculty":
                        proj_faculties.append(m)
                        faculty_scores[m] = faculty_scores.get(m, 0) + 1

                projects.append(
                    {
                        "id": node,
                        "title": data["title"],
                        "students": proj_students,
                        "faculties": proj_faculties,
                    }
                )

    # ---------------- PUBLICATION MATCH ----------------
    for node, data in G.nodes(data=True):
        if data.get("type") == "publication":
            title = data["title"].lower()

            if any(q in title for q in query_words):
                members = list(G.neighbors(node))

                pub_students = []
                pub_faculties = []

                for m in members:
                    t = G.nodes[m]["type"]

                    if t == "student":
                        pub_students.append(m)
                        student_scores[m] = student_scores.get(m, 0) + 1

                    if t == "faculty":
                        pub_faculties.append(m)
                        faculty_scores[m] = faculty_scores.get(m, 0) + 1

                publications.append(
                    {
                        "id": node,
                        "title": data["title"],
                        "students": pub_students,
                        "faculties": pub_faculties,
                    }
                )

    # ---------------- SORT RESULTS ----------------

    students = []

    for sid, score in student_scores.items():
        skills = [n for n in G.neighbors(sid) if G.nodes[n]["type"] == "skill"]

        students.append(
            {"id": sid, "name": G.nodes[sid]["name"], "skills": skills, "score": score}
        )

    faculties = []

    for fid, score in faculty_scores.items():
        skills = [n for n in G.neighbors(fid) if G.nodes[n]["type"] == "skill"]

        faculties.append(
            {"id": fid, "name": G.nodes[fid]["name"], "skills": skills, "score": score}
        )

    students.sort(key=lambda x: x["score"], reverse=True)
    faculties.sort(key=lambda x: x["score"], reverse=True)

    return {
        "students": students,
        "faculties": faculties,
        "projects": projects,
        "publications": publications,
    }
