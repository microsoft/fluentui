import * as React from 'react';
import { makeMergePropsCompat, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { SelectProps, SelectState } from './Select.types';
import { useDropdownContext } from '../../contexts/dropdownContext';

/**
 * Const listing which props are shorthand props.
 */
export const selectShorthandProps = ['content'] as const;

// eslint-disable-next-line deprecation/deprecation
const mergeProps = makeMergePropsCompat<SelectState>({ deepMerge: selectShorthandProps });

/**
 * Returns the props and state required to render the component
 */
export const useSelect = (props: SelectProps, ref: React.Ref<HTMLElement>, defaultProps?: SelectProps): SelectState => {
  // const activeId = useDropdownContext(context => context.activeId);
  const activeId = 'test';
  const open = useDropdownContext(context => context.open);

  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      content: { as: 'div', children: props.children },
      role: 'combobox',
      tabIndex: 0,
      id: props.id,
      'aria-activedescendant': activeId,
      'aria-autocomplete': 'none',
      'aria-disabled': props.disabled,
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
