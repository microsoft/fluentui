import * as React from 'react';
import { useMergedRefs } from '../../../../react-utilities/src/index';
import { useTagPickerContext_unstable } from '../contexts/TagPickerContext';
import { TagPickerControlState } from '../TagPickerControl';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

export function useExpandLabel(options: { tagPickerId: string; state: Pick<TagPickerControlState, 'expandIcon'> }) {
  const { tagPickerId, state } = options;
  const { targetDocument } = useFluent();
  const triggerRef = useTagPickerContext_unstable(ctx => ctx.triggerRef);
  const expandIconRef = React.useRef<HTMLSpanElement>(null);

  const expandIcon = React.useMemo(() => {
    return { ...state.expandIcon };
  }, [state.expandIcon]);

  const expandIconMergeRef = useMergedRefs(expandIcon?.ref, expandIconRef);
  if (expandIcon) {
    expandIcon.ref = expandIconMergeRef;
  }

  // If aria-label or aria-labelledby changes, recalculate aria-label and aria-labelledby for the expandIcon
  // The expandIcon's label is calculated based on the input's label
  // TODO: investigate ways to enforce client to provide a label rather than need to calculate it
  const getExpandLabel = React.useCallback(
    (ariaLabel?: string | null, ariaLabelledBy?: string | null) => {
      let expandAriaLabel = undefined;
      let expandAriaLabelledBy = undefined;

      if (expandIcon) {
        const hasExpandLabel = expandIcon['aria-label'] || expandIcon['aria-labelledby'];
        // If there is no explicit aria-label, calculate default accName attribute for expandIcon button,
        // using the following steps:
        // 1. If there is an aria-label, it is "Open [aria-label]"
        // 2. If there is an aria-labelledby, it is "Open [aria-labelledby target]" (using aria-labelledby + ids)
        // 3. If there is no aria-label/ledby attr, it falls back to "Open"
        // We can't fall back to a label/htmlFor name because of https://github.com/w3c/accname/issues/179
        const defaultOpenString = 'Open'; // this is english-only since it is the fallback
        if (!hasExpandLabel) {
          if (ariaLabelledBy) {
            const chevronId = expandIcon.id ?? `${tagPickerId}-chevron`;
            const chevronLabelledBy = `${chevronId} ${ariaLabelledBy}`;

            expandAriaLabel = defaultOpenString;
            expandIcon.id = chevronId;
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
    [expandIcon, tagPickerId],
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
    if (!targetDocument?.defaultView || !triggerRef.current || !expandIcon) {
      return;
    }

    const win = targetDocument.defaultView;

    // On first render, calculate the default aria-label and aria-labelledby for the expandIcon
    setExpandLabel();

    const hasExpandLabel = expandIcon['aria-label'] || expandIcon['aria-labelledby'];
    if (!hasExpandLabel) {
      const observer = new win.MutationObserver(setExpandLabel);
      observer.observe(triggerRef.current, {
        attributes: true,
        attributeFilter: ['aria-label', 'aria-labelledby'],
      });

      return () => observer.disconnect();
    }
  }, [getExpandLabel, setExpandLabel, expandIcon, tagPickerId, triggerRef, targetDocument]);

  return expandIcon;
}
