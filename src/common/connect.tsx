import * as React from 'react';
import { ConnectedHost } from './ConnectedHost';

export function connect<T>(
  component: React.ReactType,
  getProps: (props: T, stores: any) => T,
  storesToSubscribe: string[]) {

  return props => (
    <ConnectedHost
      component={component}
      componentProps={props}
      getProps={getProps}
      storesToSubscribe={storesToSubscribe}
      />
  );
}
