import * as React from 'react';
import { initializeComponentRef, on } from '@fluentui/react/lib/Utilities';
import { IRouteProps } from './Route';
import { getNormalizedPath, normalizePath } from '../getNormalizedPath';

export interface IRouterProps {
  /**
   * Gets the component ref.
   */
  componentRef?: () => void;
  /** @deprecated unused */
  replaceState?: boolean;
  children?: React.ReactNode;
  /** @deprecated unused */
  onNewRouteLoaded?: () => void;
}

export interface IRouterState {
  path: string;
}

export class Router extends React.Component<IRouterProps, IRouterState> {
  private _disposables: Function[];

  constructor(props: IRouterProps) {
    super(props);
    this._disposables = [];
    initializeComponentRef(this);
    this.state = {
      path: getNormalizedPath(),
    };
  }

  public componentDidMount(): void {
    this._disposables.push(
      on(window, 'hashchange', () => {
        // Don't update unless the route itself (not an anchor link) actually changed
        const path = getNormalizedPath();
        if (path !== this.state.path) {
          this.setState({ path });
        }
      }),
    );
  }

  public componentWillUnmount(): void {
    this._disposables.forEach(dispose => dispose());
  }

  public render() {
    return this._resolveRoute();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _resolveRoute(children?: React.ReactNode): React.ReactElement<any> | null {
    const { path } = this.state;
    children = children || this.props.children;

    // The children are supposed to be Route elements, but we verify this below.
    const routes = React.Children.toArray(children) as React.ReactElement<IRouteProps>[];

    for (const route of routes) {
      // If route.props is undefined, it's probably some other child type, not a route.
      // If neither component nor getComponent is defined, it's an invalid route.
      if (!route.props || !(route.props.component || route.props.getComponent)) {
        continue;
      }
      // Use this route if it has no path, or if the path matches the current path (from the hash)
      const routePath = normalizePath(route.props.path);
      if (!routePath || routePath === path) {
        let { component } = route.props;

        // The loaded component is stored as a prop on the loader function...because obviously
        const getComponent: (Required<IRouteProps>['getComponent'] & { component?: React.ComponentType }) | undefined =
          route.props.getComponent;
        if (getComponent) {
          let asynchronouslyResolved = false;

          if (getComponent.component) {
            component = getComponent.component;
          } else {
            getComponent((resolved: React.ComponentType) => {
              if (!resolved) {
                throw new Error(
                  `Router: Calling getComponent for the route with path ${route.props.path} ` +
                    `returned ${resolved}, not a component. Check your getComponent implementation ` +
                    `(including the name of the module member you're attempting to return).`,
                );
              }
              component = getComponent.component = resolved;

              if (asynchronouslyResolved) {
                this.forceUpdate();
              }
            });
          }
          // Note: in webpack 2, this ends up always async.
          asynchronouslyResolved = true;
        }

        if (component) {
          const componentChildren = this._resolveRoute(route.props.children || []);
          return React.createElement(component, { key: route.key! }, componentChildren);
        } else if (getComponent) {
          // We are asynchronously fetching this component.
          return null;
        }
      }
    }

    return null;
  }
}
