import { IRawStyle } from './IRawStyle';

/**
 * IStyleObject extends a raw style objects, but allows selectors to be defined
 * under the selectors node.
 * @public
 */
export interface IExtendedRawStyle extends IRawStyle {
  /**
   * Display name for the style.
   */
  displayName?: string;

  /**
   * Custom selectors for the style.
   */
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
