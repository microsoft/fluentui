export default class Rectangle {
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
  get width(): number {
    return this.right - this.left;
  }

  /**
   * Calculated automatically by subtracting the bottom from top.
   */
  get height(): number {
    return this.bottom - this.top;
  }
}