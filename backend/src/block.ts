import * as mongodb from 'mongodb';

export interface Block {
  _id: mongodb.ObjectId;
  name: string;
  laboratories: Laboratory[];
}

export interface Laboratory {
  _id: mongodb.ObjectId;
  name: string;
  block: string;
  computerAmount: number;
  softwares: Software[];
}

export interface Software {
  _id: mongodb.ObjectId;
  software: string;
  version: string;
  language: string;
  os: string;
  size: string;
  license: string;
  requester: string;
  lab: string;
  block: string;
  data: Date;
}
