import cx from 'classnames';
import { ClassDictionary } from './types';

export const mergeClasses = (...classesList: (ClassDictionary | undefined)[]): ClassDictionary => {
  const temp: { [key: string]: (string | undefined)[] } = {};

  for (const classes of classesList) {
    if (classes) {
      Object.keys(classes).forEach((key: string) => {
        temp[key] = temp[key] || [];
        temp[key].push(classes[key]);
      });
    }
  }

  const result: ClassDictionary = {};
  Object.keys(temp!).forEach((key: string) => {
    result[key] = cx(...(temp[key] as string[]));
  });

  return result;
};
