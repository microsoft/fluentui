import * as React from 'react';
import { mergeProps, resolveShorthandProps } from '@fluentui/react-compose/lib/next/index';

import { renderText } from './renderText';
import { TextProps } from './Text.types';

/**
 * Given user props, returns state and render function for a Text.
 */
export const useText = (props: TextProps, ref: React.Ref<HTMLElement>, defaultProps?: TextProps) => {
  const state = mergeProps(
    {
      ref,
      as: 'span',
    },
    defaultProps,
    resolveShorthandProps(props, []),
  );

  return { state, render: renderText };
};
