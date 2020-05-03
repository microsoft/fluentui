import * as React from 'react';
import { StatusProps } from './Status.types';
import { compose } from '@fluentui/react-compose';
import { useStatus } from './useStatus';

export const StatusBase = compose<'span', StatusProps, StatusProps, {}, {}>(
  // render function
  (props, ref, composeOptions) => {
    const { slots, slotProps } = useStatus(props, composeOptions);

    return (
      <slots.root ref={ref} {...slotProps.root}>
        {props.icon && <slots.icon {...slotProps.icon} />}
      </slots.root>
    );
  },
  {
    slots: {
      icon: 'span',
    },
    displayName: 'StatusBase',
  },
);

StatusBase.defaultProps = {
  as: 'span',
};

// @ts-ignore
StatusBase.shorthandConfig = {
  mappedProp: 'state',
};
