import * as React from 'react';
import { useContextSelector } from '@fluentui/react-context-selector';
import { ChevronDownRegular as ChevronDownIcon } from '@fluentui/react-icons';
import { useInput_unstable } from '@fluentui/react-input';
import { resolveShorthand, useMergedRefs } from '@fluentui/react-utilities';
import { ComboboxContext } from '../../contexts/ComboboxContext';
import type { ComboboxInputProps, ComboboxInputState } from './ComboboxInput.types';

/**
 * Create the state required to render ComboboxInput.
 *
 * The returned state can be modified with hooks such as useComboboxInputStyles_unstable,
 * before being passed to renderComboboxInput_unstable.
 *
 * @param props - props from this instance of ComboboxInput
 * @param ref - reference to root HTMLElement of ComboboxInput
 */
export const useComboboxInput_unstable = (
  props: ComboboxInputProps,
  ref: React.Ref<HTMLInputElement>,
): ComboboxInputState => {
  // pull initial state from Input hook
  const inputState = useInput_unstable(props, ref);

  // combobox context values
  const activeOption = useContextSelector(ComboboxContext, ctx => ctx.activeOption);
  const open = useContextSelector(ComboboxContext, ctx => ctx.open);
  const value = useContextSelector(ComboboxContext, ctx => ctx.value);
  const contextOnBlur = useContextSelector(ComboboxContext, ctx => ctx.onTriggerBlur);
  const contextOnClick = useContextSelector(ComboboxContext, ctx => ctx.onTriggerClick);
  const contextOnKeyDown = useContextSelector(ComboboxContext, ctx => ctx.onTriggerKeyDown);
  const contextRef = useContextSelector(ComboboxContext, ctx => ctx.triggerRef as React.RefObject<HTMLInputElement>);

  const state: ComboboxInputState = {
    ...inputState,
    components: {
      root: inputState.components.root,
      input: inputState.components.input,
      expandIcon: 'span',
    },
    expandIcon: resolveShorthand(props.expandIcon, {
      required: true,
      defaultProps: {
        children: <ChevronDownIcon />,
      },
    }),
    input: {
      ...inputState.input,
      ref: useMergedRefs(contextRef, inputState.input.ref || ref),
      'aria-activedescendant': open ? activeOption?.id : undefined,
      'aria-expanded': open,
      role: inputState.input.role || 'combobox',
      value: inputState.input.value || value,
    },
  };

  state.input.onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    contextOnBlur(event);
    inputState.input.onBlur?.(event);
  };

  state.input.onClick = (event: React.MouseEvent<HTMLInputElement>) => {
    contextOnClick(event);
    inputState.input.onClick?.(event);
  };

  state.input.onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    contextOnKeyDown(event);
    inputState.input.onKeyDown?.(event);
  };

  return state;
};
