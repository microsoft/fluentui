import { RosterItemData } from '../interface/roster.interface';

export const lexCompareData = (a: RosterItemData, b: RosterItemData) => a.displayName.localeCompare(b.displayName);

export const omit = <T>(object: T, keys: (keyof T)[]) => {
  if (!object || typeof object !== 'object' || keys.length === 0) {
    return object;
  }
  const ret = { ...object };
  for (const key of keys) {
    delete ret[key];
  }
  return ret;
};
