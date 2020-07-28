import * as React from 'react';
import { compose, createClassResolver, mergeProps } from '@fluentui/react-compose';
import { FlexItemProps, FlexItemSlots, FlexItemSlotProps } from './FlexItem.types';
import * as classes from './FlexItem.scss';

export const FlexItem = compose<'span', FlexItemProps, FlexItemProps, {}, {}>(
  (props, ref, options) => {
    const { children } = props;

    const { state } = options;
    const { slots, slotProps } = mergeProps<FlexItemProps, FlexItemProps, FlexItemSlots, FlexItemSlotProps>(
      state,
      options,
    );

    return <slots.root {...slotProps.root}>{children}</slots.root>;
  },
  {
    displayName: 'FlexItem',
    classes: createClassResolver(classes),
    handledProps: [
      'grow',
      'shrink',
      'align',
      'order',
      'fluid',
      'push',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as any,
  },
);

FlexItem.defaultProps = {
  as: 'span',
};
