import * as React from 'react';
import { useEventCallback, useId, useMergedRefs } from '@fluentui/react-utilities';
import type { TagPickerProps, TagPickerState } from './TagPicker.types';
import { optionClassNames } from '@fluentui/react-combobox';
import { PositioningShorthandValue, resolvePositioningShorthand, usePositioning } from '@fluentui/react-positioning';
import { useActiveDescendant } from '@fluentui/react-aria';
import { useComboboxBaseState } from '../../utils/useComboboxBaseState';

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
  const triggerInnerRef = React.useRef<HTMLInputElement>(null);
  const { positioning, size = 'medium', disabled = false } = props;

  // Set a default set of fallback positions to try if the dropdown does not fit on screen
  const fallbackPositions: PositioningShorthandValue[] = ['above', 'after', 'after-top', 'before', 'before-top'];

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

  const state = useComboboxBaseState({
    ...props,
    activeDescendantController,
    editable: true,
    multiselect: true,
    size: 'medium',
  });
  const onOptionClickBase = state.onOptionClick;
  state.onOptionClick = useEventCallback(event => {
    onOptionClickBase(event);
    state.setOpen(event, false);
  });
  const setOpenBase = state.setOpen;
  state.setOpen = useEventCallback((event, newValue) => {
    if (disabled) {
      return;
    }
    setOpenBase(event, newValue);
  });

  const children = React.Children.toArray(props.children) as React.ReactElement[];

  if (process.env.NODE_ENV !== 'production') {
    if (children.length === 0) {
      // eslint-disable-next-line no-console
      console.warn('Picker must contain at least one child');
    }

    if (children.length > 2) {
      // eslint-disable-next-line no-console
      console.warn('Picker must contain at most two children');
    }
  }

  let trigger: React.ReactElement | undefined = undefined;
  let popover: React.ReactElement | undefined = undefined;
  if (children.length === 2) {
    trigger = children[0];
    popover = children[1];
  } else if (children.length === 1) {
    popover = children[0];
  }

  return {
    activeDescendantController,
    components: {},
    trigger,
    popover: state.open || state.hasFocus ? popover : undefined,
    popoverId,
    disabled,
    triggerRef: useMergedRefs(triggerInnerRef, activeParentRef),
    popoverRef: useMergedRefs(listboxRef, containerRef),
    targetRef,
    ...state,
    size,
  };
};
