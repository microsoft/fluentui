import * as React from 'react';
import {
  ExtractSlotProps,
  Slot,
  elementContains,
  getIntrinsicElementProps,
  slot,
  useEventCallback,
  useMergedRefs,
} from '@fluentui/react-utilities';
import type { TagPickerControlProps, TagPickerControlState } from './TagPickerControl.types';
import { useTagPickerContext_unstable } from '../../contexts/TagPickerContext';
import { ChevronDownRegular } from '@fluentui/react-icons';
import { useResizeObserverRef } from '../../utils/useResizeObserverRef';
import { tagPickerControlAsideWidthToken } from './useTagPickerControlStyles.styles';
import { useFieldContext_unstable } from '@fluentui/react-field';

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
  const targetRef = useTagPickerContext_unstable(ctx => ctx.targetRef);
  const triggerRef = useTagPickerContext_unstable(ctx => ctx.triggerRef);
  const tagPickerGroupRef = useTagPickerContext_unstable(ctx => ctx.tagPickerGroupRef);
  const open = useTagPickerContext_unstable(ctx => ctx.open);
  const popoverId = useTagPickerContext_unstable(ctx => ctx.popoverId);
  const setOpen = useTagPickerContext_unstable(ctx => ctx.setOpen);
  const secondaryInnerActionRef = useTagPickerContext_unstable(ctx => ctx.secondaryActionRef);
  const size = useTagPickerContext_unstable(ctx => ctx.size);
  const appearance = useTagPickerContext_unstable(ctx => ctx.appearance);
  const disabled = useTagPickerContext_unstable(ctx => ctx.disabled);
  const invalid = useFieldContext_unstable()?.validationState === 'error';

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
    renderByDefault: true,
    defaultProps: {
      'aria-expanded': open,
      children: <ChevronDownRegular />,
      role: 'button',
    },
    elementType: 'span',
  });

  const expandIconMergeRef = useMergedRefs(expandIcon?.ref, expandIconRef);
  if (expandIcon) {
    expandIcon.ref = expandIconMergeRef;
  }

  const observerRef = useResizeObserverRef<HTMLSpanElement>(([entry]) => {
    innerRef.current?.style.setProperty(tagPickerControlAsideWidthToken, `${entry.contentRect.width}px`);
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

  const handleMouseDown = useEventCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (event.isDefaultPrevented()) {
      return;
    }
    if (
      elementContains(expandIconRef.current, event.target as Node) ||
      event.target === innerRef.current ||
      event.target === tagPickerGroupRef.current ||
      event.target === asideRef.current
    ) {
      event.preventDefault();
      setOpen(event, !open);
      triggerRef.current?.focus();
    }
  });
  return {
    components: {
      root: 'div',
      expandIcon: 'span',
      secondaryAction: 'span',
      aside: 'span',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref: useMergedRefs(ref, targetRef, innerRef),
        'aria-owns': open ? popoverId : undefined,
        ...props,
        onMouseDown: handleMouseDown,
      }),
      { elementType: 'div' },
    ),
    aside,
    expandIcon,
    secondaryAction,
    size,
    appearance,
    disabled,
    invalid,
  };
};
