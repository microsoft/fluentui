import { concatStyleSets } from './concatStyleSets';
import { IStyle } from './IStyle';
import { styleToRegistration, applyRegistration } from './styleToClassName';

/**
 * Allows you to pass in 1 or more sets of areas which will return a merged
 * set of classes.
 *
 * @public
 */
export function mergeStyleSets<T>(
  ...cssSets: ({[P in keyof T]?: IStyle } | null | undefined)[]
): T {
  // tslint:disable-next-line:no-any
  const classNameSet: any = {};
  let cssSet = cssSets[0];

  if (cssSet) {
    if (cssSets.length > 1) {
      cssSet = concatStyleSets(...cssSets);
    }

    const registrations = [];

    for (const prop in cssSet) {
      if (cssSet.hasOwnProperty(prop)) {
        const registration = styleToRegistration({ displayName: prop }, cssSet[prop]);
        registrations.push(registration);
        if (registration) {
          classNameSet[prop] = registration.className;
        }
      }
    }

    for (const registration of registrations) {
      if (registration) {
        applyRegistration(registration, classNameSet);
      }
    }
  }

  return classNameSet as T;
}
