import * as React from 'react';
import { elementContains, useEventCallback, useId, useMergedRefs } from '@fluentui/react-utilities';
import type {
  TagPickerOnOpenChangeData,
  TagPickerOnOptionSelectData,
  TagPickerProps,
  TagPickerState,
} from './TagPicker.types';
import { optionClassNames } from '@fluentui/react-combobox';
import { PositioningShorthandValue, resolvePositioningShorthand, usePositioning } from '@fluentui/react-positioning';
import { useActiveDescendant } from '@fluentui/react-aria';
import { useComboboxBaseState } from '@fluentui/react-combobox';

// Set a default set of fallback positions to try if the dropdown does not fit on screen
const fallbackPositions: PositioningShorthandValue[] = ['above', 'after', 'after-top', 'before', 'before-top'];

/**
 * Create the state required to render Picker.
 *
 * The returned state can be modified with hooks such as usePickerStyles_unstable,
 * before being passed to renderPicker_unstable.
 *
 * @param props - props from this instance of Picker
 */
export const useTagPicker_unstable = (props: TagPickerProps): TagPickerState => {
  const popoverId = useId('picker-listbox');
  const triggerInnerRef = React.useRef<HTMLInputElement | HTMLButtonElement>(null);
  const secondaryActionRef = React.useRef<HTMLSpanElement>(null);
  const tagPickerGroupRef = React.useRef<HTMLDivElement>(null);
  const { positioning, size = 'medium', inline = false, noPopover = false } = props;

  const { targetRef, containerRef } = usePositioning({
    position: 'below' as const,
    align: 'start' as const,
    offset: { crossAxis: 0, mainAxis: 2 },
    fallbackPositions,
    matchTargetSize: 'width' as const,
    ...resolvePositioningShorthand(positioning),
  });

  const {
    controller: activeDescendantController,
    activeParentRef,
    listboxRef,
  } = useActiveDescendant<HTMLInputElement, HTMLDivElement>({
    matchOption: el => el.classList.contains(optionClassNames.root),
  });

  const comboboxState = useComboboxBaseState({
    ...props,
    onOptionSelect: useEventCallback((event, data) =>
      props.onOptionSelect?.(event, {
        selectedOptions: data.selectedOptions,
        value: data.optionValue,
        type: event.type,
        event,
      } as TagPickerOnOptionSelectData),
    ),
    onOpenChange: useEventCallback((event, data) =>
      props.onOpenChange?.(event, {
        ...data,
        type: event.type,
        event,
      } as TagPickerOnOpenChangeData),
    ),
    activeDescendantController,
    editable: true,
    multiselect: true,
    size: 'medium',
  });

  const { trigger, popover } = childrenToTriggerAndPopover(props.children, noPopover);
  return {
    activeDescendantController,
    components: {},
    trigger,
    popover: comboboxState.open || comboboxState.hasFocus ? popover : undefined,
    popoverId,
    noPopover,
    disabled: comboboxState.disabled,
    triggerRef: useMergedRefs(triggerInnerRef, activeParentRef),
    popoverRef: useMergedRefs(listboxRef, containerRef),
    secondaryActionRef,
    tagPickerGroupRef,
    targetRef,
    size,
    inline,
    open: comboboxState.open,
    mountNode: comboboxState.mountNode,
    onOptionClick: useEventCallback(event => {
      comboboxState.onOptionClick(event);
      comboboxState.setOpen(event, false);
    }),
    appearance: comboboxState.appearance,
    clearSelection: comboboxState.clearSelection,
    getOptionById: comboboxState.getOptionById,
    getOptionsMatchingValue: comboboxState.getOptionsMatchingValue,
    registerOption: comboboxState.registerOption,
    selectedOptions: comboboxState.selectedOptions,
    selectOption: useEventCallback((event, data) => {
      // if the option is already selected, invoke onOptionSelect callback with current selected values
      // the combobox state would unselect the option, which is not the behavior expected
      if (
        comboboxState.selectedOptions.includes(data.value) &&
        !elementContains(tagPickerGroupRef.current, event.target as Node)
      ) {
        props.onOptionSelect?.(event, {
          selectedOptions: comboboxState.selectedOptions,
          value: data.value,
          type: event.type,
          event,
        } as TagPickerOnOptionSelectData);
        return;
      }
      comboboxState.selectOption(event, data);
    }),
    setHasFocus: comboboxState.setHasFocus,
    setOpen: comboboxState.setOpen,
    setValue: comboboxState.setValue,
    value: comboboxState.value,
  };
};

const childrenToTriggerAndPopover = (children: React.ReactNode, noPopover: boolean) => {
  const childrenArray = React.Children.toArray(children) as React.ReactElement[];

  if (process.env.NODE_ENV !== 'production') {
    if (childrenArray.length === 0) {
      // eslint-disable-next-line no-console
      console.warn('TagPicker must contain at least one child');
    }

    if (childrenArray.length > 2) {
      // eslint-disable-next-line no-console
      console.warn('TagPicker must contain at most two children');
    }
  }

  if (noPopover) {
    return { trigger: childrenArray[0] };
  }

  let trigger: React.ReactElement | undefined = undefined;
  let popover: React.ReactElement | undefined = undefined;

  if (childrenArray.length === 2) {
    trigger = childrenArray[0];
    popover = childrenArray[1];
  } else if (childrenArray.length === 1) {
    popover = childrenArray[0];
  }

  return { trigger, popover };
};
