import * as React from 'react';
import { BaseComponent } from '../../Utilities';

export interface IRouterProps {
  /**
   * Gets the component ref.
   */
  componentRef?: () => void;

  replaceState?: boolean;
  children?: any;
  onNewRouteLoaded?: () => void;
}

export class Router extends BaseComponent<IRouterProps, {}> {
  public componentDidMount(): void {
    this._events.on(window, 'hashchange', () => this.forceUpdate());
  }

  public render(): JSX.Element | null {
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

  private _resolveRoute(path?: string, children?: React.ReactNode): React.DOMElement<any, Element> | null {
    path = path || this._getPath();
    children = children || this.props.children;

    const routes = React.Children.toArray(children);

    for (let i = 0; i < routes.length; i++) {
      const route: any = routes[i];

      if (_match(path, route)) {
        const { getComponent } = route.props;
        let { component } = route.props;

        if (getComponent) {
          let asynchronouslyResolved = false;

          if (getComponent.component) {
            component = getComponent.component;
          } else {
            getComponent((resolved: any) => {
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
          const componentChildren = this._resolveRoute(path, route.props.children || []);

          if (componentChildren) {
            return React.createElement(component, { key: route.key }, componentChildren) as React.DOMElement<any, any>;
          } else {
            return React.createElement(component, { key: route.key }) as React.DOMElement<any, any>;
          }
        } else if (getComponent) {
          // We are asynchronously fetching this component.
          return null;
        }
      }
    }

    return null;
  }
}

function _match(currentPath: string, child: any): boolean {
  if (child.props) {
    let { path } = child.props;

    path = path || '';
    currentPath = currentPath || '';

    return !path || path.toLowerCase() === currentPath.toLowerCase();
  }

  return false;
}
