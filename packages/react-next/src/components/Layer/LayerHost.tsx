import * as React from 'react';
import { css } from '../../Utilities';
import { ILayerHostProps } from './LayerHost.types';
import { notifyHostChanged } from './Layer.notification';

export const LayerHost: React.FunctionComponent<ILayerHostProps> = props => {
  const { id, className } = props;

  React.useEffect(() => {
    notifyHostChanged(id!);

    return () => {
      notifyHostChanged(id!);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- should only run on first render
  }, []);

  return <div {...props} className={css('ms-LayerHost', className)} />;
};
