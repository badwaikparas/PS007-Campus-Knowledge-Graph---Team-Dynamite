import axios from "axios"
import endpoints from "../data/endpoints.json"

const API_BASE = "http://localhost:8000"

export const searchResearch = async (query) => {
 const res = await axios.get(`${API_BASE}${endpoints.search}?q=${query}`)
 return res.data
}

export const getRecommendations = async (skill) => {
 const res = await axios.get(`${API_BASE}${endpoints.recommend}?skill=${skill}`)
 return res.data
}

export const getGraph = async () => {
 const res = await axios.get(`${API_BASE}${endpoints.graph}`)
 return res.data
}

export const getTrends = async () => {
 const res = await axios.get(`${API_BASE}${endpoints.trends}`)
 return res.data
}