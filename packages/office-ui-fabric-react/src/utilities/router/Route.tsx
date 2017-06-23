import * as React from 'react';

export interface IRouteProps {
  path?: string;
  component?: React.Component<any, any>;
  getComponent?: (cb: any) => void;
}

export class Route extends React.Component<any, any> {
}
