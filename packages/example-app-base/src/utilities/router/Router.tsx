import * as React from 'react';
import { initializeComponentRef, on } from 'office-ui-fabric-react/lib/Utilities';
import { IRouteProps } from './Route';

export interface IRouterProps {
  /**
   * Gets the component ref.
   */
  componentRef?: () => void;

  replaceState?: boolean;
  children?: React.ReactNode;
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
      path: this._getPath()
    };
  }

  public componentDidMount(): void {
    this._disposables.push(
      on(window, 'hashchange', () => {
        // Don't update unless the route itself (not an anchor link) actually changed
        const path = this._getPath();
        if (path !== this.state.path) {
          this.setState({ path });
        }
      })
    );
  }

  public componentWillUnmount(): void {
    this._disposables.forEach(dispose => dispose());
  }

  public render() {
    return this._resolveRoute();
  }

  private _getPath(): string {
    let path = location.hash;
    const hashIndex = path.lastIndexOf('#'),
      questionMarkIndex = path.indexOf('?');

    // Look for the start of a query in the currentPath, then strip out the query to find the correct page to render
    if (questionMarkIndex > -1) {
      path = path.substr(0, questionMarkIndex);
    }

    // If the hash has a second # (for an anchor), strip that out since it's not used for routing
    if (hashIndex > 0) {
      path = path.substr(0, hashIndex);
    }

    return _normalizePath(path);
  }

  // tslint:disable-next-line:no-any
  private _resolveRoute(children?: React.ReactNode): React.ReactElement<any> | null {
    const { path } = this.state;
    children = children || this.props.children;

    // The children are supposed to be Route elements, but we verify this below.
    const routes = React.Children.toArray(children) as React.ReactElement<IRouteProps>[];

    for (const route of routes) {
      if (!route.props) {
        continue; // probably some other child type, not a route
      }
      // Use this route if it has no path, or if the path matches the current path (from the hash)
      const routePath = _normalizePath(route.props.path);
      if (!routePath || routePath === path) {
        let { component } = route.props;

        // The loaded component is stored as a prop on the loader function...because obviously
        const getComponent: Required<IRouteProps>['getComponent'] & { component?: React.ComponentType } = route.props.getComponent!;
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
                    `(including the name of the module member you're attempting to return).`
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

/** Normalize path for comparison: strip any trailing slash and convert to lowercase */
function _normalizePath(path?: string): string {
  if (path && path.slice(-1) === '/') {
    path = path.slice(0, -1);
  }
  return (path || '').toLowerCase();
}
