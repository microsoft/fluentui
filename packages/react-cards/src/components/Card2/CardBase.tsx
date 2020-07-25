import * as React from 'react';
import { compose, mergeProps } from '@fluentui/react-compose';
import { useMergedRefs } from '@uifabric/react-hooks';
import { CardProps, CardSlots, CardSlotProps } from './Card.types';
import { useCard } from './useCard';

export const CardBase = compose<'div', CardProps, CardProps, {}, {}>(
  (props, ref, options) => {
    const { state } = options;
    const { slots, slotProps } = mergeProps<CardProps, CardProps, CardSlots, CardSlotProps>(state, options);

    const { children } = state;

    return (
      <slots.root ref={useMergedRefs(ref)} {...slotProps.root}>
        {children}
      </slots.root>
    );
  },
  {
    displayName: 'CardBase',
    handledProps: ['cardRef'] as any,
    state: useCard,
  },
);

CardBase.defaultProps = {
  as: 'div',
};
