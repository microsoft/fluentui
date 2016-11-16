import * as React from 'react';
import { ConnectedHost } from './ConnectedHost';
import { IStoreKey } from './storeKey';

export function connect<ORIGINAL_PROPS, NEW_PROPS>(
  component: React.ComponentClass<ORIGINAL_PROPS> | React.StatelessComponent<ORIGINAL_PROPS>,
  storesToSubscribe: IStoreKey<any>[],
  getProps: (props: ORIGINAL_PROPS, ...stores) => NEW_PROPS
): React.StatelessComponent<NEW_PROPS> {

  return (props: NEW_PROPS) => (
    <ConnectedHost
      component={component}
      componentProps={props}
      getProps={getProps}
      storesToSubscribe={storesToSubscribe}
      />
  );
}
