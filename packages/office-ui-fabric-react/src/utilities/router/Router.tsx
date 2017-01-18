import * as React from 'react';
import { EventGroup } from '../../Utilities';

export interface IRouterProps {
  replaceState?: boolean;
  children?: React.ReactElement<any>[];
  onNewRouteLoaded?: () => void;
}

export interface IRouterState {
  path: string;
}

export class Router extends React.Component<IRouterProps, IRouterState> {
  private _events: EventGroup;

  constructor() {
    super();

    this.state = {
      path: location.hash
    };
    this._events = new EventGroup(this);
  }

  public componentDidUpdate(prevProps: IRouterProps, prevState: IRouterState) {

    if (this.state.path !== prevState.path) {
      window.scrollTo(0, 0);
    }
  }

  public render() {
    return _getComponent(this.state.path, this.props.children);
  }

  public componentDidMount() {
    this._events.on(window, 'hashchange', () => {
      if (this.state.path !== location.hash) {
        this.setState({ path: location.hash }, () => {
          if (this.props.onNewRouteLoaded) {
            this.props.onNewRouteLoaded();
          }
        });
      }
    });

    if (this.props.onNewRouteLoaded) {
      this.props.onNewRouteLoaded();
    }
  }

  public componentWillUnmount() {
    this._events.dispose();
  }
}

function _getComponent(matchPath, children) {
  let path = matchPath;
  if (children && children.$$typeof) {
    children = [children];
  }

  // Check if an in page anchor link was passed to the Url #/example/route#inPageAnchorLink
  if (_hasAnchorLink(path)) {
    // Extract the base path #/example/route - #inPageAnchorLink
    path = _extractRoute(path);
  }

  for (let i = 0; children && i < children.length; i++) {
    let currentChild = children[i];

    if (_match(path, currentChild)) {
      let component = currentChild.props.component;
      let childComponent = _getComponent(path, currentChild.props.children);

      return React.createElement(component, null, childComponent);
    }
  }
  return null;
}

function _hasAnchorLink(path) {
  return (path.match(/#/g) || []).length > 1;
}

/*
  Extract the route from the URL minus the in page anchor link
  Example URL #/example/route#inPageAnchorLink
  Returns #/example/route
*/
function _extractRoute(path) {
  let index = path.lastIndexOf('#');
  if (index >= 0) {
    path = path.substr(0, index);
  }
  return path;
}

function _match(currentPath, child): boolean {
  if (child.props) {
    let { path } = child.props;

    path = path || '';
    currentPath = currentPath || '';

    return (
      (!path) ||
      (path.toLowerCase() === currentPath.toLowerCase())
    );
  }

  return false;
}
