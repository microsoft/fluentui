import { IProcessedStyle } from './IProcessedStyle';
import { IRawStyle } from './IRawStyle';

/**
 * A style entry which can be represented as a string class name or a processed style
 * object. This is the type returned from mergeStyles utility.
 */
export type IStyle = IRawStyle | IProcessedStyle | (IRawStyle | IProcessedStyle)[];
