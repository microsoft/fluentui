export type Vector2D<T> = [T, T];

export enum Axis {
  X = 0,
  Y = 1
}

export enum ScrollDirection {
  none,
  backward,
  forward
}

export interface IViewportState {
  /**
   * Whether the user is currently scrolling.
   */
  isScrolling: boolean;

  /**
   * Vector representing the distance scrolled from the top left corner, i.e. the point [0, 0], in the form
   * [x, y] where x denotes the horizontal and y denotes the vertical scroll distance.
   */
  scrollDistance: Vector2D<number>;

  /**
   * Vector representing the current scroll direction in the form [x, y] where x denotes the horizontal and y
   * denotes the vertical scroll direction.
   */
  scrollDirection: Vector2D<ScrollDirection>;
}

export interface IViewportProps {
  /**
   * The height of the scroll container (in pixels).
   */
  height: number;

  /**
   * The width of the scroll container (in pixels).
   */
  width: number;

  /**
   * The child component is a function component which receives the scroll container's current scroll state as its only argument.
   */
  children: (viewportState: IViewportState) => JSX.Element[] | JSX.Element;
}
