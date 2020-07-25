import * as React from 'react';
import { compose, mergeProps } from '@fluentui/react-compose';
import { CardSectionProps, CardSectionSlots, CardSectionSlotProps } from './CardSection.types';

export const CardSection = compose<'div', CardSectionProps, CardSectionProps, {}, {}>(
  (props, ref, options) => {
    const { state } = options;
    const { slots, slotProps } = mergeProps<CardSectionProps, CardSectionProps, CardSectionSlots, CardSectionSlotProps>(
      state,
      options,
    );

    const { children } = state;

    return (
      <slots.root ref={ref} {...slotProps.root}>
        {children}
      </slots.root>
    );
  },
  {
    displayName: 'CardSection',
    handledProps: ['fitted'],
  },
);

CardSection.defaultProps = {
  as: 'div',
};
