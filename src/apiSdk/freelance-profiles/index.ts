import axios from 'axios';
import queryString from 'query-string';
import { FreelanceProfileInterface, FreelanceProfileGetQueryInterface } from 'interfaces/freelance-profile';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getFreelanceProfiles = async (
  query?: FreelanceProfileGetQueryInterface,
): Promise<PaginatedInterface<FreelanceProfileInterface>> => {
  const response = await axios.get('/api/freelance-profiles', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createFreelanceProfile = async (freelanceProfile: FreelanceProfileInterface) => {
  const response = await axios.post('/api/freelance-profiles', freelanceProfile);
  return response.data;
};

export const updateFreelanceProfileById = async (id: string, freelanceProfile: FreelanceProfileInterface) => {
  const response = await axios.put(`/api/freelance-profiles/${id}`, freelanceProfile);
  return response.data;
};

export const getFreelanceProfileById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/freelance-profiles/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFreelanceProfileById = async (id: string) => {
  const response = await axios.delete(`/api/freelance-profiles/${id}`);
  return response.data;
};
