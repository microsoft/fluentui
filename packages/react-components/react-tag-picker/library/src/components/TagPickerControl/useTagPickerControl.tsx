import * as React from 'react';
import {
  ExtractSlotProps,
  Slot,
  elementContains,
  getIntrinsicElementProps,
  slot,
  useEventCallback,
  useId,
  useMergedRefs,
} from '@fluentui/react-utilities';
import type { TagPickerControlProps, TagPickerControlState } from './TagPickerControl.types';
import { useTagPickerContext_unstable } from '../../contexts/TagPickerContext';
import { ChevronDownRegular } from '@fluentui/react-icons';
import { useResizeObserverRef } from '../../utils/useResizeObserverRef';
import { tagPickerControlAsideWidthToken } from './useTagPickerControlStyles.styles';
import { useFieldContext_unstable } from '@fluentui/react-field';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

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
  const noPopover = useTagPickerContext_unstable(ctx => ctx.noPopover ?? false);

  const tagPickerId = useId('tagPicker-');

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
    renderByDefault: !noPopover,
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

  const state: TagPickerControlState = {
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

  const { targetDocument } = useFluent();
  const win = targetDocument?.defaultView;

  // If aria-label or aria-labelledby changes, recalculate aria-label and aria-labelledby for the expandIcon
  // The expandIcon's label is calculated based on the input's label
  // TODO: investigate ways to enforce client to provide a label rather than need to calculate it
  const getExpandLabel = React.useCallback(
    (ariaLabel?: string | null, ariaLabelledBy?: string | null) => {
      let expandAriaLabel = undefined;
      let expandAriaLabelledBy = undefined;

      if (state.expandIcon) {
        const hasExpandLabel = state.expandIcon['aria-label'] || state.expandIcon['aria-labelledby'];
        // If there is no explicit aria-label, calculate default accName attribute for expandIcon button,
        // using the following steps:
        // 1. If there is an aria-label, it is "Open [aria-label]"
        // 2. If there is an aria-labelledby, it is "Open [aria-labelledby target]" (using aria-labelledby + ids)
        // 3. If there is no aria-label/ledby attr, it falls back to "Open"
        // We can't fall back to a label/htmlFor name because of https://github.com/w3c/accname/issues/179
        const defaultOpenString = 'Open'; // this is english-only since it is the fallback
        if (!hasExpandLabel) {
          if (ariaLabelledBy) {
            const chevronId = state.expandIcon.id ?? `${tagPickerId}-chevron`;
            const chevronLabelledBy = `${chevronId} ${ariaLabelledBy}`;

            expandAriaLabel = defaultOpenString;
            state.expandIcon.id = chevronId;
            expandAriaLabelledBy = chevronLabelledBy;
          } else if (ariaLabel) {
            expandAriaLabel = `${defaultOpenString} ${ariaLabel}`;
          } else {
            expandAriaLabel = defaultOpenString;
          }
        }
      }

      return { expandAriaLabel, expandAriaLabelledBy };
    },
    [state.expandIcon, tagPickerId],
  );

  const setExpandLabel = React.useCallback(() => {
    const inputAriaLabel = triggerRef.current?.getAttribute('aria-label');
    const inputAriaLabelledBy = triggerRef.current?.getAttribute('aria-labelledby');

    const { expandAriaLabel, expandAriaLabelledBy } = getExpandLabel(inputAriaLabel, inputAriaLabelledBy);

    if (expandAriaLabelledBy) {
      expandIconRef.current?.setAttribute('aria-labelledby', expandAriaLabelledBy);
    } else if (expandAriaLabel) {
      expandIconRef.current?.setAttribute('aria-label', expandAriaLabel);
    }
  }, [getExpandLabel, triggerRef]);

  React.useEffect(() => {
    if (!win || !triggerRef.current || !state.expandIcon) {
      return;
    }

    // On first render, calculate the default aria-label and aria-labelledby for the expandIcon
    setExpandLabel();

    const observer = new win.MutationObserver(setExpandLabel);
    const hasExpandLabel = state.expandIcon['aria-label'] || state.expandIcon['aria-labelledby'];
    if (!hasExpandLabel) {
      observer.observe(triggerRef.current, {
        attributes: true,
        attributeFilter: ['aria-label', 'aria-labelledby'],
      });
    }
    return () => {
      observer.disconnect();
    };
  }, [getExpandLabel, setExpandLabel, state.expandIcon, tagPickerId, triggerRef, win]);

  return state;
};
