import * as React from 'react';
import { makeMergePropsCompat, resolveShorthandProps } from '@fluentui/react-utilities';
import { MenuButtonProps, MenuButtonState } from './MenuButton.types';
import { useMenuButtonState } from './useMenuButtonState';

/**
 * Consts listing which props are shorthand props.
 */
export const menuButtonShorthandProps = ['children', 'icon', 'menu', 'menuIcon'] as const;

// eslint-disable-next-line deprecation/deprecation
const mergeProps = makeMergePropsCompat({ deepMerge: menuButtonShorthandProps });

/**
 * Redefine the component factory, reusing button factory.
 */
export const useMenuButton = (props: MenuButtonProps, ref: React.Ref<HTMLElement>, defaultProps?: MenuButtonProps) => {
  // Ensure that the `ref` prop can be used by other things (like useFocusRects) to refer to the root.
  // NOTE: We are assuming refs should not mutate to undefined. Either they are passed or not.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const resolvedRef = ref || React.useRef<HTMLElement>(null);

  // Note: because menu button's template and slots are different, we can't reuse
  // those, but the useMenuButtonState hook can reuse useButtonState.
  const state = mergeProps(
    {
      ref: resolvedRef,
      as: 'button',
      icon: { as: 'span' },
      menuIcon: { as: 'span' },
      menu: { as: 'span' },
    },
    defaultProps,
    resolveShorthandProps(props, menuButtonShorthandProps),
  ) as MenuButtonState;

  useMenuButtonState(state);

  return state;
};
