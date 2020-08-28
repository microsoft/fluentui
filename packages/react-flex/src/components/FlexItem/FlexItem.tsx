import * as React from 'react';
import { compose, createClassResolver, mergeProps } from '@fluentui/react-compose';
import { FlexItemProps, FlexItemSlots, FlexItemSlotProps } from './FlexItem.types';
import * as classes from './FlexItem.scss';
import { useFlexItem } from './useFlexItem';

export const FlexItem = compose<'div', FlexItemProps, FlexItemProps, {}, {}>(
  (props, ref, options) => {
    const { state } = options;
    const { children } = props;
    const { slots, slotProps } = mergeProps<FlexItemProps, FlexItemProps, FlexItemSlots, FlexItemSlotProps>(
      state,
      options,
    );

    return <slots.root {...slotProps.root}>{children}</slots.root>;
  },
  {
    displayName: 'FlexItem',
    classes: createClassResolver(classes),
    handledProps: ['align', 'fluid', 'push', 'tokens'],
    state: useFlexItem,
  },
);

FlexItem.defaultProps = {
  as: 'div',
  align: 'auto',
  fluid: false,
  push: false,
  tokens: {
    grow: '0',
    order: '0',
    shrink: '1',
  },
};
