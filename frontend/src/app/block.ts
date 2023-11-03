import { Laboratory } from './laboratory';

export interface Block {
  name?: string;
  laboratories?: Laboratory[];
  _id?: string;
}
