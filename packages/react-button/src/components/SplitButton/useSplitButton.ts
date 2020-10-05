import * as React from 'react';
import { resolveShorthandProps, makeMergeProps } from '@fluentui/react-compose/lib/next/index';
import { SplitButtonProps, SplitButtonState } from './SplitButton.types';
import { renderSplitButton } from './renderSplitButton';
import { useMergedRefs } from '@uifabric/react-hooks';
import { useExpanded } from '../MenuButton/useExpanded';

export const splitButtonShorthandProps = ['icon', 'button', 'divider', 'menuButton'];

const mergeProps = makeMergeProps({ deepMerge: splitButtonShorthandProps });

/**
 * Redefine the component factory, reusing button factory.
 */
export const useSplitButton = (
  props: SplitButtonProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: SplitButtonProps,
) => {
  const {
    as = 'span',
    className,
    style,
    primary,
    ghost,
    disabled,
    loading,
    circular,
    fluid,
    menu,
    size,
    ...userProps
  } = resolveShorthandProps(props, splitButtonShorthandProps);

  ref = useMergedRefs(ref, React.useRef<HTMLElement>(null));

  // A split button should be disabled when disabled or loading.
  const disabledOrLoading = disabled || loading;

  const state = mergeProps(
    {
      as: 'span',
      className,
      style,
      fluid,
      size,
      primary,
      'aria-disabled': disabledOrLoading,

      button: {
        as: 'span',
        ref,
        primary,
        ghost,
        circular,
        disabled: disabledOrLoading,
        loading,
        size,
        ...userProps,
      },

      divider: { as: 'span', children: null },
      menuButton: {
        as: 'span',
        primary,
        ghost,
        circular,
        size,
        disabled: disabledOrLoading,
        loading,
        menu: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...(menu as any),
          target: ref,
        },
        children: null,
      },
    },
    defaultProps,
  ) as SplitButtonState;

  useExpanded(state);

  return {
    state,
    render: renderSplitButton,
  };
};
