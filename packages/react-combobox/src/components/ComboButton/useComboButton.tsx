import * as React from 'react';
import { useContextSelector } from '@fluentui/react-context-selector';
import { ChevronDownRegular as ChevronDownIcon } from '@fluentui/react-icons';
import { getPartitionedNativeProps, resolveShorthand, useMergedRefs } from '@fluentui/react-utilities';
import { ComboboxContext } from '../../contexts/ComboboxContext';
import type { ComboButtonProps, ComboButtonState } from './ComboButton.types';

/**
 * Create the state required to render ComboButton.
 *
 * The returned state can be modified with hooks such as useComboButtonStyles_unstable,
 * before being passed to renderComboButton_unstable.
 *
 * @param props - props from this instance of ComboButton
 * @param ref - reference to root HTMLElement of ComboButton
 */
export const useComboButton_unstable = (
  props: ComboButtonProps,
  ref: React.Ref<HTMLButtonElement>,
): ComboButtonState => {
  const { appearance = 'outline', placeholder, size = 'medium' } = props;

  const activeOption = useContextSelector(ComboboxContext, ctx => ctx.activeOption);
  const open = useContextSelector(ComboboxContext, ctx => ctx.open);
  const value = useContextSelector(ComboboxContext, ctx => ctx.value);
  const contextOnBlur = useContextSelector(ComboboxContext, ctx => ctx.onTriggerBlur);
  const contextOnClick = useContextSelector(ComboboxContext, ctx => ctx.onTriggerClick);
  const contextOnKeyDown = useContextSelector(ComboboxContext, ctx => ctx.onTriggerKeyDown);
  const contextRef = useContextSelector(ComboboxContext, ctx => ctx.triggerRef as React.RefObject<HTMLButtonElement>);

  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'button',
  });

  const state: ComboButtonState = {
    components: {
      root: 'div',
      content: 'button',
      expandIcon: 'span',
    },
    root: resolveShorthand(props.root, {
      required: true,
      defaultProps: nativeProps.root,
    }),
    content: resolveShorthand(props.content, {
      required: true,
      defaultProps: {
        ref: useMergedRefs(ref, contextRef),
        'aria-activedescendant': open ? activeOption?.id : undefined,
        'aria-expanded': open,
        role: 'combobox',
        type: 'button',
        children: value ? value : placeholder,
        ...nativeProps.primary,
      },
    }),
    expandIcon: resolveShorthand(props.expandIcon, {
      required: true,
      defaultProps: {
        children: <ChevronDownIcon />,
      },
    }),
    appearance,
    size,
  };

  state.content.onBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
    contextOnBlur(event);
    props.onBlur?.(event);
  };

  state.content.onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    contextOnClick(event);
    props.onClick?.(event);
  };

  state.content.onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    contextOnKeyDown(event);
    props.onKeyDown?.(event);
  };

  return state;
};
