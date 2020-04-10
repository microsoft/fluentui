import * as React from 'react';
import { AvatarProps, AvatarOptions, AvatarSlots, AvatarSlotProps } from './Avatar.types';
import { compose, ComposeStandardStatics } from '../temp/compose';
import { useAvatar } from './useAvatar';

export const AvatarBase = compose<AvatarProps, AvatarSlots, AvatarSlotProps, ComposeStandardStatics>(
  // render function
  (props: AvatarProps & AvatarOptions, ref: React.RefObject<HTMLElement>, options: AvatarOptions) => {
    // A base component refers to a state hook to derive slots and slot props. This keeps the
    // function component focused on the DOM shape.
    const { state, slots, slotProps } = useAvatar(props, options);

    // The slot props are used to define the final DOM structure. User input and
    // state can be used to conditionally render parts of the markup.
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
