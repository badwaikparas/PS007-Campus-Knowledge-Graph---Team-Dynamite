import networkx as nx


def recommend_collaborators(G, skill):
    recommended = []

    skill = skill.lower()
    for node, data in G.nodes(data=True):
        if data.get("type") in ["student", "faculty"]:
            if G.has_edge(node, skill):
                # Return standardized user object for frontend
                recommended.append({
                    "id": node,
                    "name": data.get("name", node),
                    "expertise": data.get("type", "Researcher").capitalize(),
                    "skills": data.get("skills", []),
                    "metrics": {
                        "accuracy": 95,  # Mock metric
                        "projects": len(data.get("projects", [])),
                        "publications": len(data.get("publications", []))
                    }
                })

    return recommended


def recommend_collaborators1(G, skills):

    # Convert single skill to list
    if isinstance(skills, str):
        skills = [skills]

    recommended = []

    for node, data in G.nodes(data=True):
        if data.get("type") == "student" or data.get("type") == "faculty":
            score = 0
            for skill in skills:
                if G.has_edge(node, skill):
                    score += 1

            if score > 0:  # only recommend if at least one skill matches
                recommended.append((data["name"], score))

    return recommended
