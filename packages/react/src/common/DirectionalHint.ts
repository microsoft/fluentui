export const DirectionalHint = {
  /**
   * Appear above the target element, with the left edges of the callout and target aligning.
   */
  topLeftEdge: 0 as 0,

  /**
   * Appear above the target element, with the centers of the callout and target aligning.
   */
  topCenter: 1 as 1,

  /**
   * Appear above the target element, with the right edges of the callout and target aligning.
   */
  topRightEdge: 2 as 2,

  /**
   * Appear above the target element, aligning with the target element such that the callout tends toward
   * the center of the screen.
   */
  topAutoEdge: 3 as 3,

  /**
   * Appear below the target element, with the left edges of the callout and target aligning.
   */
  bottomLeftEdge: 4 as 4,

  /**
   * Appear below the target element, with the centers of the callout and target aligning.
   */
  bottomCenter: 5 as 5,

  /**
   * Appear below the target element, with the right edges of the callout and target aligning.
   */
  bottomRightEdge: 6 as 6,

  /**
   * Appear below the target element, aligning with the target element such that the callout tends toward
   * the center of the screen.
   */
  bottomAutoEdge: 7 as 7,

  /**
   * Appear to the left of the target element, with the top edges of the callout and target aligning.
   */
  leftTopEdge: 8 as 8,

  /**
   * Appear to the left of the target element, with the centers of the callout and target aligning.
   */
  leftCenter: 9 as 9,

  /**
   * Appear to the left of the target element, with the bottom edges of the callout and target aligning.
   */
  leftBottomEdge: 10 as 10,

  /**
   * Appear to the right of the target element, with the top edges of the callout and target aligning.
   */
  rightTopEdge: 11 as 11,

  /**
   * Appear to the right of the target element, with the centers of the callout and target aligning.
   */
  rightCenter: 12 as 12,

  /**
   * Appear to the right of the target element, with the bottom edges of the callout and target aligning.
   */
  rightBottomEdge: 13 as 13,
};

export type DirectionalHint = (typeof DirectionalHint)[keyof typeof DirectionalHint];
