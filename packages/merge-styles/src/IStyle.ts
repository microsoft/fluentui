import { IRawStyleBase } from './IRawStyleBase';

/**
 * IStyleObject extends a raw style objects, but allows selectors to be defined
 * under the selectors node.
 * @public
 * {@docCategory IRawStyle}
 */
export interface IRawStyle extends IRawStyleBase {
  /**
   * Allow css variables, strings, objects. While we should have more strict typing
   * here, partners are broken in many unpredictable cases where typescript can't infer
   * the right typing. Loosening the typing to both allow for css variables and other things.
   */
  [key: string]: any;

  /**
   * Display name for the style.
   */
  displayName?: string;

  /**
   * @deprecated - The selectors wrapper is no longer required. You may add selectors as siblings to other
   * style properties, like most css-in-js libraries support.
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
