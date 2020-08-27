import * as React from 'react';
import { makeMergeProps, getSlots, resolveShorthandProps } from '@fluentui/react-compose/lib/next/index';
import { TextProps } from './Text.types';

const mergeProps = makeMergeProps();

/**
 * Define the render function. Given the state of a text, renders it.
 */
export const renderText = (state: TextProps) => {
  const { slots, slotProps } = getSlots(state, [] /* there is no slots in Text */);

  return <slots.root {...slotProps.root} />;
};

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
