import { Software } from './software';

export interface Laboratory {
  name?: string;
  block?: string;
  computerAmount?: number;
  softwares?: Software[];
  _id?: string;
}
