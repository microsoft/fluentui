import * as React from 'react';
import { AvatarProps, AvatarOptions, AvatarSlots, AvatarSlotProps } from './Avatar.types';
import { compose, ComposeStandardStatics } from '../utils/compose';
import { useAvatar } from './useAvatar';

export const AvatarBase = compose<AvatarProps, AvatarSlots, AvatarSlotProps, ComposeStandardStatics>(
  (props: AvatarProps & AvatarOptions, ref: React.RefObject<HTMLElement>, options: AvatarOptions) => {
    const { slots, slotProps } = useAvatar(props, options);

    return (
      <slots.root ref={ref} {...slotProps.root}>
        <slots.label {...slotProps.label} />
        {props.image && <slots.image {...slotProps.image} />}
        {props.status && <slots.status {...slotProps.status} />}
      </slots.root>
    );
  },
  {
    defaultProps: {
      as: 'span',
    },
    slots: {
      label: 'span',
      image: null,
      status: null,
    },
    statics: {
      displayName: 'AvatarBase',
    },
  },
);
