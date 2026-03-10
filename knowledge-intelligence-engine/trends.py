from collections import Counter


def skill_trends(data):

    skills = []

    for s in data["students"]:
        skills.extend(s["skills"])

    return Counter(skills)
