import * as React from 'react';
import { FlexProps, FlexSlots, FlexSlotProps } from './Flex.types';
import { compose, createClassResolver, mergeProps } from '@fluentui/react-compose';
import * as classes from './Flex.scss';
import { FlexItem } from '../FlexItem';

export const Flex = compose<'div', FlexProps, FlexProps, {}, {}>(
  (props, ref, options) => {
    const { children, column } = props;

    const { state } = options;
    const { slots, slotProps } = mergeProps<FlexProps, FlexProps, FlexSlots, FlexSlotProps>(state, options);

    const flexChildren = React.Children.map(children, child =>
      isFlexItemElement(child)
        ? React.cloneElement((child as unknown) as React.ReactElement, {
            flexDirection: column,
          })
        : child,
    );

    return <slots.root {...slotProps.root}>{flexChildren}</slots.root>;
  },
  {
    displayName: 'Flex',
    classes: createClassResolver(classes),
    handledProps: [
      'inline',
      'column',
      'wrap',
      'horizontalAlign',
      'verticalAlign',
      'padding',
      'reversed',
      'gap',
      'disableShrink',
      'fluid',
      'space',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as any,
  },
);

const isFlexItemElement = (item: React.ReactNode): item is typeof FlexItem => {
  return (
    !!item &&
    typeof item === 'object' &&
    !!(item as React.ReactElement).type &&
    ((item as React.ReactElement).type as React.ComponentType).displayName === FlexItem.displayName
  );
};

Flex.defaultProps = {
  as: 'div',
};
