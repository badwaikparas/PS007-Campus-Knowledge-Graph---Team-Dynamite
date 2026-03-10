import axios from 'axios';
import endpoints from '../data/endpoints.json';
import { mockGraphData, mockSearchResults, mockRecommendations, mockTrends } from '../data/mockData';

const BASE_URL = 'http://localhost:8080';

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

export const addUser = async (userData) => {
    try {
        const response = await api.post('/users', userData);
        return response.data;
    } catch (error) {
        console.error("Failed to add user to backend", error);
        throw error;
    }
};

export const uploadFiles = async (uploaderId, files, type = 'publications') => {
    const formData = new FormData();
    files.forEach(file => {
        formData.append('files', file);
    });

    const endpoint = type === 'projects' ? '/upload/multiple/projects' : '/upload/multiple/publications';

    try {
        const response = await api.post(`${endpoint}?uploader_id=${uploaderId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Failed to upload ${type}`, error);
        throw error;
    }
};

export default api;
