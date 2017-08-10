import { IIconSubset } from './IIconSubset';

export interface IIconRecord {
  code: string;
  subset: IIconSubsetRecord;
  className?: string;
}

export interface IIconSubsetRecord extends IIconSubset {
  isRegistered?: boolean;
  className?: string;
}
