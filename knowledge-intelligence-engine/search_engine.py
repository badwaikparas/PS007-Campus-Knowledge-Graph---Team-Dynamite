from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from project_store import projects
from publication_store import publications

model = SentenceTransformer("all-MiniLM-L6-v2")


def semantic_search(query):

    query_embedding = model.encode([query])

    project_results = []
    publication_results = []

    # Search projects
    if projects:
        texts = [doc["text"] for doc in projects]
        doc_embeddings = model.encode(texts)

        scores = cosine_similarity(query_embedding, doc_embeddings)[0]

        project_results = sorted(
            [
                {
                    "title": doc["title"],
                    "uploaded_by": doc["uploader"],
                    "score": float(score),
                }
                for doc, score in zip(projects, scores)
            ],
            key=lambda x: x["score"],
            reverse=True,
        )[:3]

    # Search publications
    if publications:
        texts = [doc["text"] for doc in publications]
        doc_embeddings = model.encode(texts)

        scores = cosine_similarity(query_embedding, doc_embeddings)[0]

        publication_results = sorted(
            [
                {
                    "title": doc["title"],
                    "uploaded_by": doc["uploader"],
                    "score": float(score),
                }
                for doc, score in zip(publications, scores)
            ],
            key=lambda x: x["score"],
            reverse=True,
        )[:3]

    return {"projects": project_results, "publications": publication_results}
