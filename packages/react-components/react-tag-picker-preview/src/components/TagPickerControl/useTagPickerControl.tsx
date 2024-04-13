import * as React from 'react';
import {
  ExtractSlotProps,
  Slot,
  getIntrinsicElementProps,
  isResolvedShorthand,
  slot,
  useEventCallback,
  useMergedRefs,
} from '@fluentui/react-utilities';
import type { TagPickerControlProps, TagPickerControlState } from './TagPickerControl.types';
import { useTagPickerContext } from '../../contexts/TagPickerContext';
import { ChevronDownRegular } from '@fluentui/react-icons';
import { useResizeObserverRef } from '../../utils/useResizeObserverRef';
import { tagPickerControlAsideWidthToken } from './useTagPickerControlStyles.styles';
import { useFieldContext } from '@fluentui/react-field';

/**
 * Create the state required to render PickerControl.
 *
 * The returned state can be modified with hooks such as usePickerControlStyles,
 * before being passed to renderPickerControl.
 *
 * @param props - props from this instance of PickerControl
 * @param ref - reference to root HTMLDivElement of PickerControl
 */
export const useTagPickerControl = (
  props: TagPickerControlProps,
  ref: React.Ref<HTMLDivElement>,
): TagPickerControlState => {
  const targetRef = useTagPickerContext(ctx => ctx.targetRef);
  const triggerRef = useTagPickerContext(ctx => ctx.triggerRef);
  const open = useTagPickerContext(ctx => ctx.open);
  const setOpen = useTagPickerContext(ctx => ctx.setOpen);
  const secondaryInnerActionRef = useTagPickerContext(ctx => ctx.secondaryActionRef);
  const size = useTagPickerContext(ctx => ctx.size);
  const appearance = useTagPickerContext(ctx => ctx.appearance);
  const disabled = useTagPickerContext(ctx => ctx.disabled);
  const invalid = useFieldContext()?.validationState === 'error';

  const innerRef = React.useRef<HTMLDivElement>(null);

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

  // mousedown instead of click as by preventing default of mousedown we're
  // avoiding losing focus on trigger
  const handleExpandIconMouseDown: React.MouseEventHandler<HTMLSpanElement> = useEventCallback(event => {
    if (isResolvedShorthand(props.expandIcon)) {
      props.expandIcon.onMouseDown?.(event);
    }
    if (event.isDefaultPrevented()) {
      return;
    }
    event.preventDefault();
    setOpen(event, !open);
    triggerRef.current?.focus();
  });
  if (expandIcon) {
    expandIcon.onMouseDown = handleExpandIconMouseDown;
  }

  const observerRef = useResizeObserverRef<HTMLSpanElement>(([entry]) => {
    innerRef.current?.style.setProperty(tagPickerControlAsideWidthToken, `${entry.contentRect.width}px`);
  });
  const aside = slot.optional<ExtractSlotProps<Slot<'span'>>>(undefined, {
    elementType: 'span',
    renderByDefault: Boolean(secondaryAction || expandIcon),
    defaultProps: { ref: observerRef },
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
        ...props,
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
