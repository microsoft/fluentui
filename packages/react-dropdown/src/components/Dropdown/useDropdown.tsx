import * as React from 'react';
import { usePopper } from '@fluentui/react-positioning';
import {
  makeMergePropsCompat,
  resolveShorthandProps,
  useMergedRefs,
  useControllableValue,
  useId,
  useOnClickOutside,
  useEventCallback,
} from '@fluentui/react-utilities';
import { useFluent } from '@fluentui/react-provider';
import { DropdownProps, DropdownState } from './Dropdown.types';
import { useDropdownPopup } from './useDropdownPopup';
import { useFocusFinders } from '@fluentui/react-tabster';

export const dropdownShorthandProps: (keyof DropdownProps)[] = ['dropdownPopup'];

// eslint-disable-next-line deprecation/deprecation
const mergeProps = makeMergePropsCompat<DropdownState>({ deepMerge: dropdownShorthandProps });

/**
 * Create the state required to render Dropdown.
 *
 * The returned state can be modified with hooks such as useDropdownStyles,
 * before being passed to renderDropdown.
 *
 * @param props - props from this instance of Dropdown
 * @param ref - reference to root HTMLElement of Dropdown
 * @param defaultProps - (optional) default prop values provided by the implementing type
 *
 * {@docCategory Dropdown }
 */
export const useDropdown = (
  props: DropdownProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: DropdownProps,
): DropdownState => {
  const { targetDocument } = useFluent();
  const triggerId = useId('dropdown');

  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      dropdownPopup: { as: 'div' },
      position: 'below',
      align: 'start',
      triggerId,
    },
    defaultProps,
    resolveShorthandProps(props, dropdownShorthandProps),
  );

  // TODO Better way to narrow types ?
  const children = React.Children.toArray(state.children) as React.ReactElement[];

  // TODO throw warnings in development safely
  if (children.length !== 2) {
    // eslint-disable-next-line no-console
    console.warn('Dropdown can only take one DropdownTrigger and one DropdownList as children');
  }

  const { targetRef: triggerRef, containerRef: dropdownPopupRef } = usePopper({
    align: state.align,
    position: state.position,
    coverTarget: state.coverTarget,
  });
  state.dropdownPopupRef = dropdownPopupRef;
  state.triggerRef = triggerRef;
  children.forEach(child => {
    state.dropdownList = child;
  });

  useDropdownOpenState(state);
  useDropdownPopup(state);
  useOnClickOutside({
    disabled: state.open,
    element: targetDocument,
    refs: [state.dropdownPopupRef, triggerRef],
    callback: e => state.setOpen(e, { open: false, keyboard: false }),
  });

  return state;
};

const useDropdownOpenState = (state: DropdownState) => {
  const shouldHandleKeyboadRef = React.useRef(false);
  const onOpenChange: DropdownState['onOpenChange'] = useEventCallback((e, data) => state.onOpenChange?.(e, data));

  const [open, setOpen] = useControllableValue(state.open, state.defaultOpen);
  state.open = open !== undefined ? open : state.open;

  state.setOpen = React.useCallback(
    (e, data) => {
      setOpen(prevOpen => {
        // More than one event (mouse, focus, keyboard) can request the popup to close
        // We assume the first event is the correct one
        if (prevOpen !== data.open) {
          onOpenChange?.(e, { ...data });
        }

        if (data.keyboard) {
          shouldHandleKeyboadRef.current = true;
        }

        return data.open;
      });
    },
    [setOpen, onOpenChange],
  );

  // Manage focus for open state
  const { findFirstFocusable } = useFocusFinders();
  const focusFirstOption = React.useCallback(() => {
    const firstFocusable = findFirstFocusable(state.dropdownPopupRef.current);
    firstFocusable?.focus();
  }, [findFirstFocusable, state.dropdownPopupRef]);
  React.useEffect(() => {
    if (!shouldHandleKeyboadRef.current) {
      return;
    }

    if (open) {
      focusFirstOption();
    } else {
      state.triggerRef.current?.focus();
    }

    shouldHandleKeyboadRef.current = false;
  }, [state.triggerRef, shouldHandleKeyboadRef, focusFirstOption, open]);

  // Above effect handles only keyboard
  // When a root dropdown is opened always focus the first option
  React.useEffect(() => {
    if (open) {
      focusFirstOption();
    }
  }, [open, focusFirstOption]);
};
