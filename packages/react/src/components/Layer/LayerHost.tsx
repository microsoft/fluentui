import * as React from 'react';
import { useUnmount } from '@fluentui/react-hooks';
import { css } from '../../Utilities';
import { notifyHostChanged } from './Layer.notification';
import type { ILayerHostProps } from './LayerHost.types';

export const LayerHost: React.FunctionComponent<ILayerHostProps> = props => {
  const { id, className } = props;

  React.useEffect(() => {
    notifyHostChanged(id!);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- should only run on first render
  }, []);

  useUnmount(() => {
    notifyHostChanged(id!);
  });

  return <div {...props} className={css('ms-LayerHost', className)} />;
};
