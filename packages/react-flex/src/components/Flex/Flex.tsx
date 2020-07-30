import * as React from 'react';
import { FlexProps, FlexSlots, FlexSlotProps } from './Flex.types';
import { compose, createClassResolver, mergeProps } from '@fluentui/react-compose';
import * as classes from './Flex.scss';
import { FlexItem } from '../FlexItem';
import { FlexContext } from './FlexContext';

export const Flex = compose<'div', FlexProps, FlexProps, {}, {}>(
  (props, ref, options) => {
    const { children, disableShrink } = props;

    const { state } = options;
    const { slots, slotProps } = mergeProps<FlexProps, FlexProps, FlexSlots, FlexSlotProps>(state, options);

    const { flexChildren, generalChildren } = separateFlexChildren(children);

    return (
      <slots.root {...slotProps.root}>
        <FlexContext.Provider value={!!disableShrink}>{flexChildren}</FlexContext.Provider>
        {generalChildren}
      </slots.root>
    );
  },
  {
    classes: createClassResolver(classes),
    displayName: 'Flex',
    handledProps: [
      'inline',
      'column',
      'wrap',
      'horizontalAlign',
      'verticalAlign',
      'reversed',
      'disableShrink',
      'fluid',
      'tokens',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as any,
    overrideStyles: true,
  },
);

const separateFlexChildren = (children: React.ReactNode) => {
  const flexChildren: React.ReactNode[] = [];
  const generalChildren: React.ReactNode[] = [];

  React.Children.forEach(children, child => {
    if (isFlexItemElement(child)) {
      flexChildren.push(child);
    } else {
      generalChildren.push(child);
    }
  });

  return { flexChildren, generalChildren };
};

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
