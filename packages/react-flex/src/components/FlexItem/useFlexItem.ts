import * as React from 'react';
import { FlexItemState, FlexItemProps, FlexItemTokens } from './FlexItem.types';
import { ComposePreparedOptions } from '@fluentui/react-compose';
import { getStyleFromPropsAndOptions } from '@fluentui/react-theme-provider';
import { FlexContext } from '../Flex/FlexContext';
import { FlexProps } from '../Flex/Flex.types';

export const useFlexItem = (
  props: FlexItemProps,
  ref: React.Ref<HTMLElement>,
  options: ComposePreparedOptions,
): FlexItemState => {
  const flexContext = React.useContext(FlexContext);
  const { tokens, ...rest } = props;

  const newTokens: FlexItemTokens = {
    grow: tokens?.grow,
    order: tokens?.order,
    shrink: flexContext.disableShrink ? '0' : tokens?.shrink,
    gap: flexContext.gap,
  };

  const newProps: FlexProps = {
    tokens: newTokens,
    ...rest,
  };

  return {
    ...newProps,
    style: getStyleFromPropsAndOptions(newProps, options, '--flexitem'),
  };
};
