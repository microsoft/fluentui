import * as React from 'react';
import { StatusProps, StatusOptions, StatusSlots, StatusSlotProps } from './Status.types';
import { compose, ComposeStandardStatics } from '../utils/compose';
import { useStatus } from './useStatus';

export const StatusBase = compose<StatusProps, StatusSlots, StatusSlotProps, ComposeStandardStatics>(
  // render function
  (props: StatusProps, ref: React.RefObject<HTMLElement>, options: StatusOptions) => {
    const { slots, slotProps } = useStatus(props, options);

    return (
      <slots.root ref={ref} {...slotProps.root}>
        {props.icon && <slots.icon {...slotProps.icon} />}
      </slots.root>
    );
  },
  {
    defaultProps: {
      as: 'span',
    },
    slots: {
      icon: 'span',
    },
    statics: {
      displayName: 'StatusBase',
      handledProp: 'state',
    },
  },
);
