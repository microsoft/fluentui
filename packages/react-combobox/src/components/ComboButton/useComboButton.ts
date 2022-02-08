import * as React from 'react';
import { getPartitionedNativeProps, resolveShorthand } from '@fluentui/react-utilities';
import { useContextSelector } from '@fluentui/react-context-selector';
import { ComboboxContext } from '../../contexts/ComboboxContext';
// import { ChevronDown20Regular as ChevronDownIcon } from '@fluentui/react-icons';
import type { ComboButtonProps, ComboButtonSlots, ComboButtonState } from './ComboButton.types';

/**
 * Array of all shorthand properties listed in ComboButtonSlots
 */
export const comboButtonShorthandProps: (keyof ComboButtonSlots)[] = ['root', 'content', 'dropdownIcon'];

/**
 * Create the state required to render ComboButton.
 *
 * The returned state can be modified with hooks such as useComboButtonStyles_unstable,
 * before being passed to renderComboButton_unstable.
 *
 * @param props - props from this instance of ComboButton
 * @param ref - reference to root HTMLElement of ComboButton
 */
export const useComboButton = (props: ComboButtonProps, ref: React.Ref<HTMLButtonElement>): ComboButtonState => {
  const { placeholder, value } = props;

  const { activeId, open } = useContextSelector(ComboboxContext, ctx => ({
    activeId: ctx.activeId,
    open: ctx.open,
  }));

  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'button',
  });

  return {
    components: {
      root: 'div',
      content: 'button',
      dropdownIcon: 'span',
    },
    root: resolveShorthand(props.root, {
      required: true,
      defaultProps: nativeProps.root,
    }),
    content: resolveShorthand(props.content, {
      required: true,
      defaultProps: {
        ref,
        role: 'combobox',
        type: 'button',
        'aria-activedescendant': activeId,
        'aria-expanded': open,
        children: value ? value : placeholder,
        ...nativeProps.primary,
      },
    }),
    dropdownIcon: resolveShorthand(props.dropdownIcon, {
      required: true,
      defaultProps: {
        children: '>',
      },
    }),
    open: false,
  };
};
