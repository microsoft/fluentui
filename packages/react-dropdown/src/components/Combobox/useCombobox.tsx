import * as React from 'react';
import { makeMergePropsCompat, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { ComboboxProps, ComboboxState } from './Combobox.types';
import { useDropdownContext } from '../../contexts/dropdownContext';

/**
 * Const listing which props are shorthand props.
 */
export const selectShorthandProps = ['content'] as const;

// eslint-disable-next-line deprecation/deprecation
const mergeProps = makeMergePropsCompat<ComboboxState>({ deepMerge: selectShorthandProps });

/**
 * Returns the props and state required to render the component
 */
export const useCombobox = (
  props: ComboboxProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: ComboboxProps,
): ComboboxState => {
  // const activeId = useDropdownContext(context => context.activeId);
  const activeId = 'test';
  const open = useDropdownContext(context => context.open);

  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      content: { as: 'input' },
      role: 'combobox',
      type: 'text',
      id: props.id,
      'aria-activedescendant': activeId,
      'aria-autocomplete': 'none',
      disabled: props.disabled,
      'aria-expanded': open,
      'aria-haspopup': 'listbox',
    },
    defaultProps && resolveShorthandProps(defaultProps, selectShorthandProps),
    resolveShorthandProps(props, selectShorthandProps),
  );

  state.onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (state.disabled) {
      return;
    }

    props.onKeyDown?.(e);
  };

  state.onClick = (e: React.MouseEvent<HTMLElement>) => {
    if (state.disabled) {
      return;
    }

    props.onClick?.(e);
  };

  return state;
};
