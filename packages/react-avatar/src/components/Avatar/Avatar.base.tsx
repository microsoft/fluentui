import * as React from 'react';
// TODO: add correct typings
import { AvatarProps } from './Avatar.types';
import { compose } from '@fluentui/react-compose';
import { getInitials as defaultGetInitials } from '@uifabric/utilities';
import { useAvatar } from './useAvatar';

export const AvatarBase = compose<'span', AvatarProps, AvatarProps, {}, {}>(
  (props, ref, composeOptions) => {
    const { slots, slotProps } = useAvatar(props, composeOptions);

    return (
      <slots.root ref={ref} {...slotProps.root}>
        <slots.label {...slotProps.label} />
        {props.image && <slots.image {...slotProps.image} />}
        {props.status && <slots.status {...slotProps.status} />}
      </slots.root>
    );
  },
  {
    slots: {
      root: 'span',
      label: 'span',
      image: 'img',
      status: 'span',
    },
    mapPropsToSlotProps: props => ({
      status: {
        size: props.size,
      },
      label: {
        children: props.getInitials
          ? props.getInitials(props.name || '', false)
          : defaultGetInitials(props.name || '', false),
      },
    }),
    displayName: 'AvatarBase',
  },
);

AvatarBase.defaultProps = {
  as: 'span',
};

// TODO: add typings
// tslint:disable-next-line:no-any
(AvatarBase as any).shorthandConfig = {
  mappedProp: 'name',
};
