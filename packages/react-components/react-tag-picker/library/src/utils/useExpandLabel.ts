import * as React from 'react';
import { useTagPickerContext_unstable } from '../contexts/TagPickerContext';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { TagPickerControlState } from '../TagPickerControl';

export function useExpandLabel(options: {
  tagPickerId: string;
  state: Pick<TagPickerControlState, 'expandIcon'>;
}): React.RefObject<HTMLSpanElement | null> {
  const { tagPickerId, state } = options;
  const { targetDocument } = useFluent();
  const triggerRef = useTagPickerContext_unstable(ctx => ctx.triggerRef);
  const expandIconRef = React.useRef<HTMLSpanElement | null>(null);

  const hasExpandIcon = !!state.expandIcon;
  const {
    'aria-label': expandIconAriaLabel,
    'aria-labelledby': expandIconAriaLabelledby,
    id: expandIconId,
  } = state.expandIcon || {};

  // If aria-label or aria-labelledby changes, recalculate aria-label and aria-labelledby for the expandIcon
  // The expandIcon's label is calculated based on the input's label
  // TODO: investigate ways to enforce client to provide a label rather than need to calculate it
  const getExpandLabel = React.useCallback(
    (ariaLabel?: string | null, ariaLabelledBy?: string | null) => {
      let expandAriaLabel = undefined;
      let expandAriaLabelledBy = undefined;
      let expandId = undefined;

      if (hasExpandIcon) {
        const hasExpandLabel = expandIconAriaLabel || expandIconAriaLabelledby;
        // If there is no explicit aria-label, calculate default accName attribute for expandIcon button,
        // using the following steps:
        // 1. If there is an aria-label, it is "Open [aria-label]"
        // 2. If there is an aria-labelledby, it is "Open [aria-labelledby target]" (using aria-labelledby + ids)
        // 3. If there is no aria-label/ledby attr, it falls back to "Open"
        // We can't fall back to a label/htmlFor name because of https://github.com/w3c/accname/issues/179
        const defaultOpenString = 'Open'; // this is english-only since it is the fallback
        if (!hasExpandLabel) {
          if (ariaLabelledBy) {
            expandAriaLabel = defaultOpenString;
            expandId = expandIconId ?? `${tagPickerId}-chevron`;
            expandAriaLabelledBy = `${expandId} ${ariaLabelledBy}`;
          } else if (ariaLabel) {
            expandAriaLabel = `${defaultOpenString} ${ariaLabel}`;
          } else {
            expandAriaLabel = defaultOpenString;
          }
        }
      }

      return { expandAriaLabel, expandAriaLabelledBy, expandId };
    },
    [expandIconAriaLabel, expandIconAriaLabelledby, expandIconId, hasExpandIcon, tagPickerId],
  );

  const setExpandLabel = React.useCallback(() => {
    const inputAriaLabel = triggerRef.current?.getAttribute('aria-label');
    const inputAriaLabelledBy = triggerRef.current?.getAttribute('aria-labelledby');

    const { expandAriaLabel, expandAriaLabelledBy, expandId } = getExpandLabel(inputAriaLabel, inputAriaLabelledBy);

    if (expandAriaLabelledBy) {
      expandIconRef.current?.setAttribute('aria-labelledby', expandAriaLabelledBy);
    }
    if (expandAriaLabel) {
      expandIconRef.current?.setAttribute('aria-label', expandAriaLabel);
    }
    if (expandId) {
      expandIconRef.current?.setAttribute('id', expandId);
    }
  }, [getExpandLabel, triggerRef]);

  React.useEffect(() => {
    const hasExpandLabel = expandIconAriaLabel || expandIconAriaLabelledby;
    if (!targetDocument?.defaultView || !triggerRef.current || !hasExpandIcon || hasExpandLabel) {
      return;
    }

    const win = targetDocument.defaultView;

    // On first render, calculate the default aria-label and aria-labelledby for the expandIcon
    setExpandLabel();

    const observer = new win.MutationObserver(setExpandLabel);
    observer.observe(triggerRef.current, {
      attributes: true,
      attributeFilter: ['aria-label', 'aria-labelledby'],
    });

    return () => observer.disconnect();
  }, [
    getExpandLabel,
    setExpandLabel,
    expandIconAriaLabel,
    expandIconAriaLabelledby,
    hasExpandIcon,
    tagPickerId,
    triggerRef,
    targetDocument,
  ]);

  return expandIconRef;
}
