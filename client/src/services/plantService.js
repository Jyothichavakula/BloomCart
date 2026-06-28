import API from './api';

export const getPlants = async () => {
    const response = await API.get('/plants');
    return response.data;
};