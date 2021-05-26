import * as React from 'react';
import {
  makeMergePropsCompat,
  resolveShorthandProps,
  useMergedRefs,
  useEventCallback,
  shouldPreventDefaultOnKeyDown,
} from '@fluentui/react-utilities';
import { DropdownOptionProps, DropdownOptionState } from './DropdownOption.types';
// import { useCharacterSearch } from './useCharacterSearch';

/**
 * Consts listing which props are shorthand props.
 */
export const dropdownOptionShorthandProps = ['content'] as const;

// eslint-disable-next-line deprecation/deprecation
const mergeProps = makeMergePropsCompat<DropdownOptionState>({ deepMerge: dropdownOptionShorthandProps });

/**
 * Returns the props and state required to render the component
 */
export const useDropdownOption = (
  props: DropdownOptionProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: DropdownOptionProps,
): DropdownOptionState => {
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      content: { as: 'div', children: props.children },
      role: 'option',
      tabIndex: 0,
      'aria-disabled': props.disabled,
    },
    defaultProps && resolveShorthandProps(defaultProps, dropdownOptionShorthandProps),
    resolveShorthandProps(props, dropdownOptionShorthandProps),
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
