import axios from 'axios';
import queryString from 'query-string';
import { JobInterface, JobGetQueryInterface } from 'interfaces/job';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getJobs = async (query?: JobGetQueryInterface): Promise<PaginatedInterface<JobInterface>> => {
  const response = await axios.get('/api/jobs', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createJob = async (job: JobInterface) => {
  const response = await axios.post('/api/jobs', job);
  return response.data;
};

export const updateJobById = async (id: string, job: JobInterface) => {
  const response = await axios.put(`/api/jobs/${id}`, job);
  return response.data;
};

export const getJobById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/jobs/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteJobById = async (id: string) => {
  const response = await axios.delete(`/api/jobs/${id}`);
  return response.data;
};
