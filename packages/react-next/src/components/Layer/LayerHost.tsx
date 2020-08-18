import * as React from 'react';
import { css } from '../../Utilities';
import { ILayerHostProps } from './LayerHost.types';
import { notifyHostChanged } from './Layer.notification';

const useUnmount = (unmountFunction: () => void) => {
  const unmountRef = React.useRef(unmountFunction);
  unmountRef.current = unmountFunction;
  React.useEffect(
    () => () => {
      if (unmountRef.current) {
        unmountRef.current();
      }
    },
    [unmountFunction],
  );
};

export const LayerHost = React.memo((props: ILayerHostProps) => {
  const { id, className } = props;

  React.useEffect(() => {
    notifyHostChanged(id!);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- componentDidMount
  }, []);

  useUnmount(() => {
    notifyHostChanged(id!);
  });

  return <div {...props} className={css('ms-LayerHost', className)} />;
});
