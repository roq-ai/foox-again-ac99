import { JobInterface } from 'interfaces/job';
import { GetQueryInterface } from 'interfaces';

export interface CountryInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  name: string;
  job?: JobInterface[];

  _count?: {
    job?: number;
  };
}

export interface CountryGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
}
