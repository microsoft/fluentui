import * as React from 'react';
import { getNativeElementProps, useControllableState } from '@fluentui/react-utilities';
import type { DrawerInlineProps, DrawerInlineState } from './DrawerInline.types';
import { getDefaultDrawerProps } from '../../util/getDefaultDrawerProps';

/**
 * Create the state required to render DrawerInline.
 *
 * The returned state can be modified with hooks such as useDrawerInlineStyles_unstable,
 * before being passed to renderDrawerInline_unstable.
 *
 * @param props - props from this instance of DrawerInline
 * @param ref - reference to root HTMLElement of DrawerInline
 */
export const useDrawerInline_unstable = (props: DrawerInlineProps, ref: React.Ref<HTMLElement>): DrawerInlineState => {
  const { open: initialOpen, defaultOpen, size, position } = getDefaultDrawerProps(props);
  const { separator = false } = props;

  const [open] = useControllableState({
    state: initialOpen,
    defaultState: defaultOpen,
    initialState: false,
  });

  return {
    components: {
      root: 'div',
    },

    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),

    size,
    position,
    open,
    separator,
  };
};
