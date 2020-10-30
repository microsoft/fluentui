import * as React from 'react';
import { FlexProps, FlexSlots, FlexSlotProps } from './Flex.types';
import { compose, createClassResolver, mergeProps } from '@fluentui/react-compose';
import * as classes from './Flex.scss';
import { FlexContext } from './FlexContext';
import { useFlex } from './useFlex';

export const Flex = compose<'div', FlexProps, FlexProps, {}, {}>(
  (props, ref, options) => {
    const { children, disableShrink } = props;
    const { state } = options;
    const { slots, slotProps } = mergeProps<FlexProps, FlexProps, FlexSlots, FlexSlotProps>(state, options);
    const gap: string = props.tokens && props.tokens.gap ? props.tokens.gap : '0';

    return (
      <slots.root {...slotProps.root}>
        <FlexContext.Provider value={{ disableShrink: !!disableShrink, gap: gap }}>{children}</FlexContext.Provider>
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
    ],
    state: useFlex,
  },
);

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
