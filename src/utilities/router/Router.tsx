import * as React from 'react';
import { EventGroup } from '../eventGroup/EventGroup';

export interface IRouterProps {
  replaceState?: boolean;
  children?: React.ReactElement<any>[];
  routerDidMount?: Function;
}

export interface IRouterState {
  path: string;
}

export interface urlObject {
  anchorLink?: string;
  route: string;
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
        this.setState({ path: location.hash });

        if (this.props.routerDidMount) {
          this.props.routerDidMount();
        }
      }
    });

    if (this.props.routerDidMount) {
      this.props.routerDidMount();
    }
  }

  public componentWillUnmount() {
    this._events.dispose();
  }
}

function _getComponent(matchPath, children) {
  let path = matchPath;
  if (children && children.$$typeof) {
    children = [ children ];
  }

  if (_hasAnchorLink(path)) {
    path = _extractBasePath(path);
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

function _extractBasePath(path) {
  let split = path.split('#');
  split.splice(split.length -1, 1);
  return '#' + split.join('');
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
