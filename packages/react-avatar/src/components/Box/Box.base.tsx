import * as React from 'react';
import { BoxProps, BoxExtendedProps, BoxInternalProps } from './Box.types';
import { compose } from '../temp/compose';
import { useBox } from './useBox';

export const BoxBase = compose<BoxProps, BoxExtendedProps>(
  // render function
  (props: BoxInternalProps, ref: React.RefObject<HTMLElement>) => {
    const { slots, slotProps } = useBox(props);

    return <slots.root ref={ref} {...slotProps.root} />;
  },
  // default props
  {
    slots: {
      root: 'span',
    },
  },

  // statics
  {
    displayName: 'Box',
  },
);
