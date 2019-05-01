import * as React from 'react';

/** A component function which doesn't explicitly declare itself as React.StatelessComponent/SFC/FunctionComponent */
export type ComponentLike = (props?: {}) => React.ReactElement<{}> | null;
// ^^ This is needed so we don't break consumers who may not explicitly declare their
// functional components as one of React's functional component types.

export interface IRouteProps extends React.ClassAttributes<Route> {
  path?: string;

  children?: React.ReactNode;

  /**
   * The component to render for this route's content (or a loading placeholder if `getComponent` is provided).
   */
  component?: React.ComponentType | ComponentLike;

  /**
   * Function that loads the component asynchronously.
   * Notify when loading has finished using `cb`.
   * If `component` is provided, it will be rendered while waiting for the callback.
   */
  getComponent?: (cb: (component: React.ComponentType | ComponentLike) => void) => void;
}

export class Route extends React.PureComponent<IRouteProps> {}
