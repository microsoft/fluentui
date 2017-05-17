import { IProcessedStyle } from './IProcessedStyle';

/**
 * A style entry which can be represented as a string class name, a raw style object, or a processed style
 * object. This is the type returned from mergeStyles utility.
 */
export type IStyle = string | IProcessedStyle;
