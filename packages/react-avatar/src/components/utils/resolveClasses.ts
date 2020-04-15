import cx from 'classnames';
import { ClassDictionary } from './compose';

// tslint:disable-next-line:no-any
export const resolveClasses = (state: any, classes: any, result: ClassDictionary = {}): ClassDictionary => {
  if (classes) {
    if (Array.isArray(classes)) {
      for (const item of classes) {
        resolveClasses(state, item, result);
      }
    } else if (typeof classes === 'function') {
      resolveClasses(state, classes(state), result);
    } else {
      for (const className in classes) {
        if (classes.hasOwnProperty(className)) {
          result[className] = cx(result[className], classes[className]);
        }
      }
    }

    return result;
  }
};
