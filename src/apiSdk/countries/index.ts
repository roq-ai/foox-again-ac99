import axios from 'axios';
import queryString from 'query-string';
import { CountryInterface, CountryGetQueryInterface } from 'interfaces/country';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getCountries = async (query?: CountryGetQueryInterface): Promise<PaginatedInterface<CountryInterface>> => {
  const response = await axios.get('/api/countries', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createCountry = async (country: CountryInterface) => {
  const response = await axios.post('/api/countries', country);
  return response.data;
};

export const updateCountryById = async (id: string, country: CountryInterface) => {
  const response = await axios.put(`/api/countries/${id}`, country);
  return response.data;
};

export const getCountryById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/countries/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCountryById = async (id: string) => {
  const response = await axios.delete(`/api/countries/${id}`);
  return response.data;
};
