import { UserInterface } from 'interfaces/user';
import { JobInterface } from 'interfaces/job';
import { GetQueryInterface } from 'interfaces';

export interface ApplicationInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  application_status?: string;
  application_date?: any;
  freelancer_id: string;
  job_id: string;

  user?: UserInterface;
  job?: JobInterface;
  _count?: {};
}

export interface ApplicationGetQueryInterface extends GetQueryInterface {
  id?: string;
  application_status?: string;
  freelancer_id?: string;
  job_id?: string;
}
