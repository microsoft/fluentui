import * as React from 'react';
import {
  makeMergePropsCompat,
  resolveShorthandProps,
  shouldPreventDefaultOnKeyDown,
  useEventCallback,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { DropdownTriggerProps, DropdownTriggerState } from './DropdownTrigger.types';
import { useDropdownContext } from '../../contexts/dropdownContext';
// import { useCharacterSearch } from './useCharacterSearch';

/**
 * Const listing which props are shorthand props.
 */
export const dropdownTriggerShorthandProps = ['content'] as const;

// eslint-disable-next-line deprecation/deprecation
const mergeProps = makeMergePropsCompat<DropdownTriggerState>({ deepMerge: dropdownTriggerShorthandProps });

/**
 * Returns the props and state required to render the component
 */
export const useDropdownTrigger = (
  props: DropdownTriggerProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: DropdownTriggerProps,
): DropdownTriggerState => {
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
    defaultProps && resolveShorthandProps(defaultProps, dropdownTriggerShorthandProps),
    resolveShorthandProps(props, dropdownTriggerShorthandProps),
  );

  const { onClick: onClickOriginal, onKeyDown: onKeyDownOriginal } = state;
  state.onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (shouldPreventDefaultOnKeyDown(e)) {
      e.preventDefault();

      if (state.disabled) {
        return;
      }

      (e.target as HTMLElement)?.click();
    }

    onKeyDownOriginal?.(e);
  };

  state.onClick = (e: React.MouseEvent<HTMLElement>) => {
    if (state.disabled) {
      return;
    }

    onClickOriginal?.(e);
  };

  const { onMouseEnter: onMouseEnterOriginal } = state;
  state.onMouseEnter = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    state.ref.current?.focus();

    onMouseEnterOriginal?.(e);
  });

  // useCharacterSearch(state);
  return state;
};
