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
import { Backspace, Enter, Space } from '@fluentui/keyboard-keys';
import { useInputTriggerSlot } from '@fluentui/react-combobox';
import { useFieldControlProps_unstable } from '@fluentui/react-field';
import { tagPickerInputCSSRules } from '../../utils/tokens';

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
  props: TagPickerInputProps,
  ref: React.Ref<HTMLInputElement>,
): TagPickerInputState => {
  props = useFieldControlProps_unstable(props, { supportsLabelFor: true, supportsRequired: true, supportsSize: true });
  const { controller: activeDescendantController } = useActiveDescendantContext();
  const size = useTagPickerContext_unstable(ctx => ctx.size);
  const freeform = useTagPickerContext_unstable(ctx => ctx.freeform);
  const contextDisabled = useTagPickerContext_unstable(ctx => ctx.disabled);
  const {
    triggerRef,
    clearSelection,
    getOptionById,
    open,
    selectOption,
    selectedOptions,
    setHasFocus,
    setOpen,
    setValue,
    multiselect,
    popoverId,
    value: contextValue,
  } = useTagPickerContexts();

  useIsomorphicLayoutEffect(() => {
    if (!triggerRef.current) {
      return;
    }
    setTagPickerInputStretchStyle(triggerRef.current);
  }, [selectedOptions, triggerRef]);

  useIsomorphicLayoutEffect(() => {
    if (triggerRef.current) {
      const input = triggerRef.current;
      const cb = () => {
        setTagPickerInputStretchStyle(input);
      };
      input.addEventListener('input', cb);
      return () => {
        input.removeEventListener('input', cb);
      };
    }
  }, [triggerRef]);

  const { value = contextValue, disabled = contextDisabled } = props;

  const root = useInputTriggerSlot(
    {
      type: 'text',
      value: value ?? '',
      'aria-controls': open ? popoverId : undefined,
      disabled,
      ...getIntrinsicElementProps('input', props),
      onKeyDown: useEventCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        props.onKeyDown?.(event);
        if (event.key === Space && open) {
          setOpen(event, false);
          return;
        }
        if (event.key === Enter) {
          if (open) {
            ReactDOM.unstable_batchedUpdates(() => {
              setValue(undefined);
              setOpen(event, false);
            });
          } else {
            setOpen(event, true);
          }
        }

        if (event.key === Backspace && value?.length === 0 && selectedOptions.length) {
          const toDismiss = selectedOptions[selectedOptions.length - 1];
          selectOption(event, {
            value: toDismiss,
            // These values no longer exist because the option has unregistered itself
            // for the purposes of selection - these values aren't actually used
            id: 'ERROR_DO_NOT_USE',
            text: 'ERROR_DO_NOT_USE',
          });
        }
      }),
    },
    useMergedRefs(triggerRef, ref),
    {
      activeDescendantController,
      freeform,
      state: {
        clearSelection,
        getOptionById,
        open,
        selectedOptions,
        selectOption,
        setHasFocus,
        setOpen,
        setValue,
        multiselect,
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

function useTagPickerContexts() {
  return {
    triggerRef: useTagPickerContext_unstable(ctx => ctx.triggerRef) as React.RefObject<HTMLInputElement>,
    clearSelection: useTagPickerContext_unstable(ctx => ctx.clearSelection),
    getOptionById: useTagPickerContext_unstable(ctx => ctx.getOptionById),
    open: useTagPickerContext_unstable(ctx => ctx.open),
    selectOption: useTagPickerContext_unstable(ctx => ctx.selectOption),
    selectedOptions: useTagPickerContext_unstable(ctx => ctx.selectedOptions),
    setHasFocus: useTagPickerContext_unstable(ctx => ctx.setHasFocus),
    setOpen: useTagPickerContext_unstable(ctx => ctx.setOpen),
    setValue: useTagPickerContext_unstable(ctx => ctx.setValue),
    multiselect: useTagPickerContext_unstable(ctx => ctx.multiselect),
    value: useTagPickerContext_unstable(ctx => ctx.value),
    popoverId: useTagPickerContext_unstable(ctx => ctx.popoverId),
  };
}

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
