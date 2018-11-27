import { merge } from '../Utilities';

export type IProcessedVariables<T> = { [P in keyof T]-?: IProcessedVariables<T[P]> };

export function processVariables<T>(partialVariables: T, customVariables?: T): IProcessedVariables<T> {
  // tslint:disable-next-line:no-any
  const result = customVariables ? merge({}, partialVariables, customVariables) : partialVariables;

  return result as IProcessedVariables<T>;
}
