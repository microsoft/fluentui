import * as React from 'react';
import { getPartitionedNativeProps, resolveShorthand } from '@fluentui/react-utilities';
import { useContextSelector } from '@fluentui/react-context-selector';
import { ComboboxContext } from '../../contexts/ComboboxContext';
// import { ChevronDown20Regular as ChevronDownIcon } from '@fluentui/react-icons';
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
  const { placeholder, value } = props;

  const { activeOption, open } = useContextSelector(ComboboxContext, ctx => ({
    activeOption: ctx.activeOption,
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
        'aria-activedescendant': activeOption?.id,
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
