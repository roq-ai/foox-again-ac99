import { ApplicationInterface } from 'interfaces/application';
import { HiringInterface } from 'interfaces/hiring';
import { CompanyInterface } from 'interfaces/company';
import { CountryInterface } from 'interfaces/country';
import { GetQueryInterface } from 'interfaces';

export interface JobInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  company_id: string;
  job_duration?: number;
  job_requirements?: string;
  job_location?: string;
  country_id?: string;
  application?: ApplicationInterface[];
  hiring?: HiringInterface[];
  company?: CompanyInterface;
  country?: CountryInterface;
  _count?: {
    application?: number;
    hiring?: number;
  };
}

export interface JobGetQueryInterface extends GetQueryInterface {
  id?: string;
  company_id?: string;
  job_requirements?: string;
  job_location?: string;
  country_id?: string;
}
