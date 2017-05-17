/**
 * CSS style object resulting from the mergeStyles function when given a raw style object.
 */
export interface IProcessedStyle {
  /**
   * Gets the class name for the processed style.
   */
  toString: () => string;
}
