import * as _ from 'lodash';

export const removeItemAtIndex = (items: string[], itemIndex: number): string[] => {
  return _.concat(_.slice(items, 0, itemIndex), _.slice(items, itemIndex + 1));
};

export const findIndex = (items: string[], value: string): number => {
  return _.findIndex(items, item => item === value);
};
