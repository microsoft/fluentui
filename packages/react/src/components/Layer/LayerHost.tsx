import * as React from 'react';
import { useUnmount } from '@fluentui/react-hooks';
import { css, getId } from '../../Utilities';
import { notifyHostChanged, registerLayerHost, unregisterLayerHost } from './Layer.notification';
import type { ILayerHost, ILayerHostProps } from './LayerHost.types';

export const LayerHost: React.FunctionComponent<ILayerHostProps> = props => {
  const { className } = props;

  const [layerHostId] = React.useState(() => getId());

  const { id: hostId = layerHostId } = props;

  const layerHostRef = React.useRef<ILayerHost>({
    hostId,
    rootRef: React.useRef<HTMLDivElement | null>(null),
    notifyLayersChanged: () => {
      // Nothing, since the default implementation of Layer Host does not need to react to layer changes.
    },
  });

  React.useImperativeHandle(props.componentRef, () => layerHostRef.current);

  React.useEffect(() => {
    registerLayerHost(hostId, layerHostRef.current);
    notifyHostChanged(hostId);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- should only run on first render
  }, []);

  useUnmount(() => {
    unregisterLayerHost(hostId, layerHostRef.current);
    notifyHostChanged(hostId);
  });

  return <div {...props} className={css('ms-LayerHost', className)} ref={layerHostRef.current.rootRef} />;
};
