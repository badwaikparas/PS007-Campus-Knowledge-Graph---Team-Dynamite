import networkx as nx


def recommend_collaborators(G, skill):

    recommended = []

    # out of all the students add those students to the list who have the skill;
    for node in G.nodes(data=True):
        if node[1].get("type") == "student":
            if G.has_edge(node[0], skill):
                recommended.append(node[1]["name"])

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
