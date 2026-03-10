from pydantic import BaseModel, EmailStr
from typing import List


class UserCreate(BaseModel):
    id: str
    first_name: str
    last_name: str
    email: EmailStr
    type: str  # "student" or "faculty"
    links: List[str] = []
    skills: List[str] = []
    publications: List[str] = []
    projects: List[str] = []
