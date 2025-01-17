import { IconNames, IconNamesInput } from './IconNames';

// eslint-disable-next-line @typescript-eslint/no-deprecated
declare const allIconNamesValues: IconNames;

function validateIconNamesValues(allowedIconNamesValues: IconNamesInput): void {
  // The purpose of this function is to verify that the below call compiles,
  // which may only occur if every enum value matches its key.
}

validateIconNamesValues(allIconNamesValues);
