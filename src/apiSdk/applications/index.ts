import axios from 'axios';
import queryString from 'query-string';
import { ApplicationInterface, ApplicationGetQueryInterface } from 'interfaces/application';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getApplications = async (
  query?: ApplicationGetQueryInterface,
): Promise<PaginatedInterface<ApplicationInterface>> => {
  const response = await axios.get('/api/applications', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createApplication = async (application: ApplicationInterface) => {
  const response = await axios.post('/api/applications', application);
  return response.data;
};

export const updateApplicationById = async (id: string, application: ApplicationInterface) => {
  const response = await axios.put(`/api/applications/${id}`, application);
  return response.data;
};

export const getApplicationById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/applications/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteApplicationById = async (id: string) => {
  const response = await axios.delete(`/api/applications/${id}`);
  return response.data;
};
