import * as React from 'react';
import { FlexProps, FlexSlots, FlexSlotProps } from './Flex.types';
import { compose, createClassResolver, mergeProps } from '@fluentui/react-compose';
import * as classes from './Flex.scss';
import { FlexItem } from '../FlexItem';
import { FlexContext } from './FlexContext';
import { useFlex } from './useFlex';

export const Flex = compose<'div', FlexProps, FlexProps, {}, {}>(
  (props, ref, options) => {
    const { children, disableShrink, tokens } = props;

    const { state } = options;
    const { slots, slotProps } = mergeProps<FlexProps, FlexProps, FlexSlots, FlexSlotProps>(state, options);

    const { flexChildren, generalChildren } = separateFlexChildren(children);

    return (
      <slots.root {...slotProps.root}>
        <FlexContext.Provider value={{ disableShrink: !!disableShrink, gap: tokens?.gap! && '0' }}>
          {flexChildren}
        </FlexContext.Provider>
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
      'reverse',
      'disableShrink',
      'fluid',
      'tokens',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as any,
    state: useFlex,
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
  inline: false,
  wrap: false,
  horizontalAlign: 'start',
  verticalAlign: 'stretch',
  disableShrink: false,
  fluid: false,
  tokens: {
    padding: '0',
    gap: '0',
  },
};
