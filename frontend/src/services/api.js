import axios from "axios"

const API = "http://localhost:8000"

export const searchResearch = async(q)=>{

const res = await axios.get(`${API}/search?q=${q}`)

return res.data

}

export const getGraph = async()=>{

const res = await axios.get(`${API}/graph`)

return res.data

}

export const getTrends = async()=>{

const res = await axios.get(`${API}/trends`)

return res.data

}