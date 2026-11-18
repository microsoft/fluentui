'use client';

import * as React from 'react';
import type { ExtractSlotProps, Slot } from '@fluentui/react-utilities';
import {
  elementContains,
  getIntrinsicElementProps,
  slot,
  useEventCallback,
  useId,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { useFieldContext_unstable } from '@fluentui/react-field';
import { ChevronDownRegular } from '@fluentui/react-icons';

import type {
  TagPickerControlBaseProps,
  TagPickerControlBaseState,
  TagPickerControlProps,
  TagPickerControlState,
} from './TagPickerControl.types';
import { tagPickerControlAsideWidthToken } from './useTagPickerControlStyles.styles';
import { useTagPickerContext_unstable } from '../../contexts/TagPickerContext';
import { useExpandLabel } from '../../utils/useExpandLabel';
import { useResizeObserverRef } from '../../utils/useResizeObserverRef';

/**
 * Create the base state required to render TagPickerControl, without design-only state.
 *
 * @param props - props from this instance of TagPickerControl
 * @param ref - reference to root HTMLDivElement of TagPickerControl
 */
export const useTagPickerControlBase_unstable = (
  props: TagPickerControlBaseProps,
  ref: React.Ref<HTMLDivElement>,
): TagPickerControlBaseState => {
  const { toggleOn = 'mousedown' } = props;
  const pendingOpen = React.useRef<boolean | undefined>(undefined);
  const targetRef = useTagPickerContext_unstable(ctx => ctx.targetRef);
  const triggerRef = useTagPickerContext_unstable(ctx => ctx.triggerRef);
  const tagPickerGroupRef = useTagPickerContext_unstable(ctx => ctx.tagPickerGroupRef);
  const open = useTagPickerContext_unstable(ctx => ctx.open);
  const popoverId = useTagPickerContext_unstable(ctx => ctx.popoverId);
  const setOpen = useTagPickerContext_unstable(ctx => ctx.setOpen);
  const secondaryInnerActionRef = useTagPickerContext_unstable(ctx => ctx.secondaryActionRef);
  const disabled = useTagPickerContext_unstable(ctx => ctx.disabled);
  const invalid = useFieldContext_unstable()?.validationState === 'error';
  const noPopover = useTagPickerContext_unstable(ctx => ctx.noPopover ?? false);

  const { targetDocument } = useFluent_unstable();
  const tagPickerId = useId('tagPicker-');
  const rafIdRef = React.useRef<number | null>(null);

  const innerRef = React.useRef<HTMLDivElement>(null);
  const expandIconRef = React.useRef<HTMLSpanElement>(null);
  const asideRef = React.useRef<HTMLSpanElement>(null);

  const secondaryAction = slot.optional(props.secondaryAction, {
    elementType: 'span',
  });
  const secondaryActionRef = useMergedRefs(secondaryInnerActionRef, secondaryAction?.ref);
  if (secondaryAction) {
    secondaryAction.ref = secondaryActionRef;
  }

  const expandIcon = slot.optional(props.expandIcon, {
    defaultProps: {
      'aria-expanded': open,
      'aria-disabled': disabled ? 'true' : undefined,
      role: 'button',
    },
    elementType: 'span',
  });

  const expandIconMergeRef = useMergedRefs(expandIcon?.ref, expandIconRef);
  if (expandIcon) {
    expandIcon.ref = expandIconMergeRef;
  }

  const observerRef = useResizeObserverRef<HTMLSpanElement>(([entry]) => {
    const targetWindow = targetDocument?.defaultView;

    if (targetWindow) {
      rafIdRef.current = targetWindow.requestAnimationFrame(() => {
        innerRef.current?.style.setProperty(tagPickerControlAsideWidthToken, `${entry.contentRect.width}px`);
      });
    }
  });
  const aside = slot.optional<ExtractSlotProps<Slot<'span'>>>(undefined, {
    elementType: 'span',
    renderByDefault: Boolean(secondaryAction || expandIcon),
    defaultProps: {
      ref: observerRef,
    },
  });
  const mergedAsideRefs = useMergedRefs(asideRef, aside?.ref);
  if (aside) {
    aside.ref = mergedAsideRefs;
  }

  const handleMouseDownCapture = useEventCallback((event: React.MouseEvent<HTMLDivElement>) => {
    pendingOpen.current = undefined;
    props.onMouseDownCapture?.(event);
  });

  const handleMouseDown = useEventCallback((event: React.MouseEvent<HTMLDivElement>) => {
    pendingOpen.current = undefined;
    props.onMouseDown?.(event);
    if (event.isDefaultPrevented() || (toggleOn === 'click' && (disabled || event.button !== 0))) {
      return;
    }
    if (
      elementContains(expandIconRef.current, event.target as Node) ||
      event.target === innerRef.current ||
      event.target === tagPickerGroupRef.current ||
      event.target === asideRef.current
    ) {
      event.preventDefault();
      if (toggleOn === 'click') {
        // Light dismiss can close the popover before click; retain the intent from gesture start.
        pendingOpen.current = !open;
      } else {
        setOpen(event, !open);
      }
      triggerRef.current?.focus();
    }
  });

  const handleClick = useEventCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const nextOpen = pendingOpen.current;
    pendingOpen.current = undefined;
    props.onClick?.(event);
    if (!disabled && nextOpen !== undefined && !event.isDefaultPrevented()) {
      setOpen(event, nextOpen);
    }
  });

  const handleBlur = useEventCallback((event: React.FocusEvent<HTMLDivElement>) => {
    props.onBlur?.(event);
    if (!elementContains(event.currentTarget, event.relatedTarget)) {
      pendingOpen.current = undefined;
    }
  });

  const handleMouseLeave = useEventCallback((event: React.MouseEvent<HTMLDivElement>) => {
    pendingOpen.current = undefined;
    props.onMouseLeave?.(event);
  });

  const handlePointerCancel = useEventCallback((event: React.PointerEvent<HTMLDivElement>) => {
    pendingOpen.current = undefined;
    props.onPointerCancel?.(event);
  });

  const state: TagPickerControlBaseState = {
    components: {
      root: 'div',
      expandIcon: 'span',
      secondaryAction: 'span',
      aside: 'span',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref: useMergedRefs(ref, targetRef, innerRef),
        'aria-owns': open && !noPopover ? popoverId : undefined,
        ...props,
        onMouseDown: handleMouseDown,
        ...(toggleOn === 'click' && {
          onMouseDownCapture: handleMouseDownCapture,
          onClick: handleClick,
          onBlur: handleBlur,
          onMouseLeave: handleMouseLeave,
          onPointerCancel: handlePointerCancel,
        }),
      }),
      { elementType: 'div' },
    ),
    aside,
    expandIcon,
    secondaryAction,
    disabled,
    invalid,
  };

  const expandIconLabelRef = useExpandLabel({
    tagPickerId,
    state: state as Pick<TagPickerControlBaseState, 'expandIcon'>,
  });

  const expandIconLabelMergeRef = useMergedRefs(expandIcon?.ref, expandIconLabelRef);
  if (state.expandIcon) {
    state.expandIcon.ref = expandIconLabelMergeRef;
  }

  React.useEffect(() => {
    const targetWindow = targetDocument?.defaultView;

    return () => {
      if (rafIdRef.current && targetWindow) {
        targetWindow.cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [targetDocument]);

  return state;
};

/**
 * Create the state required to render PickerControl.
 *
 * The returned state can be modified with hooks such as usePickerControlStyles_unstable,
 * before being passed to renderPickerControl_unstable.
 *
 * @param props - props from this instance of PickerControl
 * @param ref - reference to root HTMLDivElement of PickerControl
 */
export const useTagPickerControl_unstable = (
  props: TagPickerControlProps,
  ref: React.Ref<HTMLDivElement>,
): TagPickerControlState => {
  const noPopover = useTagPickerContext_unstable(ctx => ctx.noPopover ?? false);
  const baseProps =
    !noPopover && props.expandIcon === undefined
      ? {
          ...props,
          expandIcon: <ChevronDownRegular />,
        }
      : props;
  const baseState = useTagPickerControlBase_unstable(baseProps, ref);
  const size = useTagPickerContext_unstable(ctx => ctx.size);
  const appearance = useTagPickerContext_unstable(ctx => ctx.appearance);

  return {
    ...baseState,
    size,
    appearance,
  };
};
