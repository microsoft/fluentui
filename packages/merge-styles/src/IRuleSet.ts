// tslint:disable-next-line:no-any
export type IDictionary = { [key: string]: any };

export interface IRuleSet {
  __order: string[];
  [key: string]: IDictionary;
}