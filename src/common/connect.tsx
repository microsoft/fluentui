import * as React from 'react';
import { ConnectedHost } from './ConnectedHost';

export function connect<T>(
  component: React.ReactType,
  storesToSubscribe: string[],
  getProps: (props: T, ...stores) => T
  ) {

  return props => (
    <ConnectedHost
      component={component}
      componentProps={props}
      getProps={getProps}
      storesToSubscribe={storesToSubscribe}
      />
  );
}
