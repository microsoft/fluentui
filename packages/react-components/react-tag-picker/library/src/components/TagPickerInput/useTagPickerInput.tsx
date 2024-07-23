import * as React from 'react';
import * as ReactDOM from 'react-dom';
import type { TagPickerInputProps, TagPickerInputState } from './TagPickerInput.types';
import { useActiveDescendantContext } from '@fluentui/react-aria';
import { useTagPickerContext_unstable } from '../../contexts/TagPickerContext';
import {
  useMergedRefs,
  getIntrinsicElementProps,
  useEventCallback,
  useIsomorphicLayoutEffect,
} from '@fluentui/react-utilities';
import { ArrowLeft, Backspace, Enter, Space } from '@fluentui/keyboard-keys';
import { useInputTriggerSlot } from '@fluentui/react-combobox';
import { useFieldControlProps_unstable } from '@fluentui/react-field';
import { tagPickerInputCSSRules } from '../../utils/tokens';
import { useFocusFinders } from '@fluentui/react-tabster';

/**
 * Create the state required to render TagPickerInput.
 *
 * The returned state can be modified with hooks such as useTagPickerInputStyles_unstable,
 * before being passed to renderTagPickerInput_unstable.
 *
 * @param props - props from this instance of TagPickerInput
 * @param ref - reference to root HTMLDivElement of TagPickerInput
 */
export const useTagPickerInput_unstable = (
  propsArg: TagPickerInputProps,
  ref: React.Ref<HTMLInputElement>,
): TagPickerInputState => {
  const props = useFieldControlProps_unstable(propsArg, {
    supportsLabelFor: true,
    supportsRequired: true,
    supportsSize: true,
  });
  const { controller: activeDescendantController } = useActiveDescendantContext();
  const size = useTagPickerContext_unstable(ctx => ctx.size);
  const contextDisabled = useTagPickerContext_unstable(ctx => ctx.disabled);
  const tagPickerGroupRef = useTagPickerContext_unstable(ctx => ctx.tagPickerGroupRef);

  const triggerRef = useTagPickerContext_unstable(ctx => ctx.triggerRef as React.RefObject<HTMLInputElement>);
  const selectedOptions = useTagPickerContext_unstable(ctx => ctx.selectedOptions);
  const setValue = useTagPickerContext_unstable(ctx => ctx.setValue);
  const setOpen = useTagPickerContext_unstable(ctx => ctx.setOpen);
  const setHasFocus = useTagPickerContext_unstable(ctx => ctx.setHasFocus);
  const clearSelection = useTagPickerContext_unstable(ctx => ctx.clearSelection);
  const open = useTagPickerContext_unstable(ctx => ctx.open);
  const popoverId = useTagPickerContext_unstable(ctx => ctx.popoverId);
  const selectOption = useTagPickerContext_unstable(ctx => ctx.selectOption);
  const getOptionById = useTagPickerContext_unstable(ctx => ctx.getOptionById);
  const contextValue = useTagPickerContext_unstable(ctx => ctx.value);

  useIsomorphicLayoutEffect(() => {
    if (!triggerRef.current) {
      return;
    }
    setTagPickerInputStretchStyle(triggerRef.current);
  }, [selectedOptions, triggerRef]);

  useIsomorphicLayoutEffect(() => {
    if (triggerRef.current) {
      const input = triggerRef.current;
      const cb = () => setTagPickerInputStretchStyle(input);
      input.addEventListener('input', cb);
      return () => {
        input.removeEventListener('input', cb);
      };
    }
  }, [triggerRef]);

  const { value = contextValue, disabled = contextDisabled } = props;
  const { findLastFocusable } = useFocusFinders();

  const isTypingRef = React.useRef(false);

  const root = useInputTriggerSlot(
    {
      type: 'text',
      value: value ?? '',
      'aria-controls': open ? popoverId : undefined,
      disabled,
      ...getIntrinsicElementProps('input', props),
      onKeyDown: useEventCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        props.onKeyDown?.(event);
        if (
          (event.key === ArrowLeft || event.key === Backspace) &&
          event.currentTarget.selectionStart === 0 &&
          tagPickerGroupRef.current
        ) {
          findLastFocusable(tagPickerGroupRef.current)?.focus();
        } else if (event.key === Space) {
          if (open && !isTypingRef.current) {
            setOpen(event, false);
          }
        } else if (event.key === Enter) {
          if (open) {
            ReactDOM.unstable_batchedUpdates(() => {
              setValue(undefined);
              setOpen(event, false);
            });
          } else {
            setOpen(event, true);
          }
        }
        isTypingRef.current =
          event.key.length === 1 && event.code !== Space && !event.altKey && !event.ctrlKey && !event.metaKey;
      }),
    },
    useMergedRefs(triggerRef, ref),
    {
      activeDescendantController,
      freeform: false,
      state: {
        clearSelection,
        getOptionById,
        open,
        selectedOptions,
        selectOption,
        setHasFocus,
        setOpen,
        setValue,
        multiselect: true,
        value: props.value,
      },
    },
  );

  const state: TagPickerInputState = {
    components: {
      root: 'input',
    },
    root,
    disabled,
    size,
  };

  return state;
};

/**
 * while typing the user might need a bit more of space to see the text,
 * which means the input should stretch to 100% width
 * occupying a whole new line.
 *
 * This function will set the CSS variable `--width` to `100%` if the scrollWidth is greater than the offsetWidth,
 * meaning the text is overflowing the input.
 *
 * @param input - input element to apply the style
 * @returns void
 */
const setTagPickerInputStretchStyle = (input: HTMLInputElement) => {
  // first we need to remove the CSS variable
  // to properly calculate the difference between scrollWidth and offsetWidth
  input.style.removeProperty(tagPickerInputCSSRules.width);
  if (input.scrollWidth > input.offsetWidth + 1) {
    input.style.setProperty(tagPickerInputCSSRules.width, '100%');
  } else {
    input.style.removeProperty(tagPickerInputCSSRules.width);
  }
};
