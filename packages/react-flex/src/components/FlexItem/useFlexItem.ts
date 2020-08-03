import * as React from 'react';
import { FlexItemState, FlexItemProps, FlexItemTokens } from './FlexItem.types';
import { ComposePreparedOptions } from '@fluentui/react-compose';
import { getStyleFromPropsAndOptions } from '@fluentui/react-theme-provider';
import { FlexContext } from '../Flex';

export const useFlexItem = (
  props: FlexItemProps,
  ref: React.Ref<HTMLElement>,
  options: ComposePreparedOptions,
): FlexItemState => {
  // change props -- useFlexItem()
  const { disableShrink, gap } = React.useContext(FlexContext);

  const tokens: FlexItemTokens = {
    grow: props.tokens?.grow && '0',
    order: props.tokens?.order && '0',
    shrink: disableShrink ? '0' : props.tokens?.shrink,
    margin: gap && '0',
  };

  props.tokens = tokens;

  return {
    ...props,
    style: getStyleFromPropsAndOptions(props, options, '--flexitem'),
  };
};
