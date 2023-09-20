import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface FreelanceProfileInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  skills?: string;
  portfolio_link?: string;
  experience_years?: number;
  freelancer_id?: string;

  user?: UserInterface;
  _count?: {};
}

export interface FreelanceProfileGetQueryInterface extends GetQueryInterface {
  id?: string;
  skills?: string;
  portfolio_link?: string;
  freelancer_id?: string;
}
