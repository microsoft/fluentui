import { IRawStyle } from './IRawStyle';

/**
 * IStyleObject extends a raw style objects, but allows selectors to be defined
 * under the selectors node.
 * @public
 */
export interface IExtendedRawStyle extends IRawStyle {
  displayName?: string;
  selectors?: {
    [key: string]: IStyle;
  };
}

export type IStyleBase = IExtendedRawStyle | string | false | null | undefined;

/**
 * IStyleObject extends a raw style objects, but allows selectors to be defined
 * under the selectors node.
 * @public
 */
export type IStyle = IStyleBase | IStyleBase[] | IStyleBase[][] | IStyleBase[][][];
