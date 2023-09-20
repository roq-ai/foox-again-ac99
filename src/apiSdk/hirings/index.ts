import axios from 'axios';
import queryString from 'query-string';
import { HiringInterface, HiringGetQueryInterface } from 'interfaces/hiring';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getHirings = async (query?: HiringGetQueryInterface): Promise<PaginatedInterface<HiringInterface>> => {
  const response = await axios.get('/api/hirings', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createHiring = async (hiring: HiringInterface) => {
  const response = await axios.post('/api/hirings', hiring);
  return response.data;
};

export const updateHiringById = async (id: string, hiring: HiringInterface) => {
  const response = await axios.put(`/api/hirings/${id}`, hiring);
  return response.data;
};

export const getHiringById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/hirings/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteHiringById = async (id: string) => {
  const response = await axios.delete(`/api/hirings/${id}`);
  return response.data;
};
