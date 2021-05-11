/**
 * Rectangle helper class.
 *
 * @public
 * {@docCategory Rectangle}
 */
export class Rectangle {
  public top: number;
  public bottom: number;
  public left: number;
  public right: number;

  constructor(left: number = 0, right: number = 0, top: number = 0, bottom: number = 0) {
    this.top = top;
    this.bottom = bottom;
    this.left = left;
    this.right = right;
  }

  /**
   * Calculated automatically by subtracting the right from left
   */
  public get width(): number {
    return this.right - this.left;
  }

  /**
   * Calculated automatically by subtracting the bottom from top.
   */
  public get height(): number {
    return this.bottom - this.top;
  }

  /**
   * Tests if another rect is approximately equal to this rect (within 4 decimal places.)
   */
  public equals(rect: Rectangle): boolean {
    // Fixing to 4 decimal places because it allows enough precision and will handle cases when something
    // should be rounded, like .999999 should round to 1.
    return (
      parseFloat(this.top.toFixed(4)) === parseFloat(rect.top.toFixed(4)) &&
      parseFloat(this.bottom.toFixed(4)) === parseFloat(rect.bottom.toFixed(4)) &&
      parseFloat(this.left.toFixed(4)) === parseFloat(rect.left.toFixed(4)) &&
      parseFloat(this.right.toFixed(4)) === parseFloat(rect.right.toFixed(4))
    );
  }
}
