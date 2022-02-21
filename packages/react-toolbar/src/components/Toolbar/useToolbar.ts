import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { ToolbarProps, ToolbarState } from './Toolbar.types';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';

/**
 * Create the state required to render Toolbar.
 *
 * The returned state can be modified with hooks such as useToolbarStyles_unstable,
 * before being passed to renderToolbar_unstable.
 *
 * @param props - props from this instance of Toolbar
 * @param ref - reference to root HTMLElement of Toolbar
 */
export const useToolbar_unstable = (props: ToolbarProps, ref: React.Ref<HTMLElement>): ToolbarState => {
  const arrowNavigationProps = useArrowNavigationGroup({
    circular: true,
    axis: 'horizontal',
  });

  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'div',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: getNativeElementProps('div', {
      ref,
      ...arrowNavigationProps,
      ...props,
    }),
    ...props,
  };
};
