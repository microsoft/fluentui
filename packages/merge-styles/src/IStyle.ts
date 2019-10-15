import { IRawStyleBase } from './IRawStyleBase';

/**
 * IStyleObject extends a raw style objects, but allows selectors to be defined
 * under the selectors node.
 * @public
 * {@docCategory IRawStyle}
 */
export interface IRawStyle extends IRawStyleBase {
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

/**
 * {@docCategory IStyleBase}
 */
export type IStyleBase = IRawStyle | string | false | null | undefined;

/**
 * {@docCategory IStyleBaseArray}
 */
export interface IStyleBaseArray extends Array<IStyle> {}

/**
 * IStyleObject extends a raw style objects, but allows selectors to be defined
 * under the selectors node.
 * @public
 * {@docCategory IStyle}
 */
export type IStyle = IStyleBase | IStyleBaseArray;
