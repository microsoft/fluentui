import * as React from 'react';
import { initializeComponentRef, on } from '../../Utilities';
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

export class Router extends React.PureComponent<IRouterProps> {
  private _disposables: Function[];

  constructor(props: IRouterProps) {
    super(props);
    this._disposables = [];
    initializeComponentRef(this);
  }

  public componentDidMount(): void {
    this._disposables.push(on(window, 'hashchange', () => this.forceUpdate()));
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

    if (hashIndex > 0) {
      path = path.substr(0, hashIndex);
    }

    return path;
  }

  private _resolveRoute(children?: React.ReactNode): React.ReactElement<any> | null {
    const path = this._getPath().toLowerCase();
    children = children || this.props.children;

    // The children are supposed to be Route elements, but we verify this below.
    const routes = React.Children.toArray(children) as React.ReactElement<IRouteProps>[];

    for (const route of routes) {
      if (!route.props) {
        continue; // probably some other child type, not a route
      }
      // Use this route if it has no path, or if the path matches the current path (from the hash)
      const routePath = route.props.path;
      if (!routePath || routePath.toLowerCase() === path) {
        let { component } = route.props;

        // The loaded component is stored as a prop on the loader function...because obviously
        const getComponent: Required<IRouteProps>['getComponent'] & { component?: React.ComponentType } = route.props.getComponent!;
        if (getComponent) {
          let asynchronouslyResolved = false;

          if (getComponent.component) {
            component = getComponent.component;
          } else {
            getComponent((resolved: React.ComponentType) => {
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
