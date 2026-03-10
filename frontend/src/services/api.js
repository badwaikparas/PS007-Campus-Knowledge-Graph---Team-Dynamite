import axios from 'axios';
import endpoints from '../data/endpoints.json';
import { mockGraphData, mockSearchResults, mockRecommendations, mockTrends } from '../data/mockData';

const BASE_URL = 'http://localhost:8000';

const api = axios.create({
    baseURL: BASE_URL,
});

export const searchResearch = async (query) => {
    try {
        const response = await api.get(`${endpoints.search}?q=${query}`);
        return response.data;
    } catch (error) {
        console.warn("API Error, using mock data", error);
        return mockSearchResults.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase())
        );
    }
};

export const getGraph = async () => {
    try {
        const response = await api.get(endpoints.graph);
        return response.data;
    } catch (error) {
        console.warn("API Error, using mock data", error);
        return mockGraphData;
    }
};

export const getRecommendations = async (skill) => {
    try {
        const response = await api.get(`${endpoints.recommend}?skill=${skill}`);
        return response.data;
    } catch (error) {
        console.warn("API Error, using mock data", error);
        return mockRecommendations.filter(rec =>
            rec.skills.some(s => s.toLowerCase().includes(skill.toLowerCase())) ||
            rec.expertise.toLowerCase().includes(skill.toLowerCase())
        );
    }
};

export const getTrends = async () => {
    try {
        const response = await api.get(endpoints.trends);
        return response.data;
    } catch (error) {
        console.warn("API Error, using mock data", error);
        return mockTrends;
    }
};

export default api;
