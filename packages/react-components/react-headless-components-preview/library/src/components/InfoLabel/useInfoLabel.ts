'use client';

import * as React from 'react';
import { useId, slot, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';

import { Label } from '../Label';
import { InfoButton } from './InfoButton/InfoButton';
import type { InfoLabelProps, InfoLabelState } from './InfoLabel.types';
import { infoLabelOwnershipReporter } from './infoLabelContext';
import type { InfoButtonOwnership, InfoLabelOwnershipReporter, InternalInfoLabelState } from './infoLabelContext';

/**
 * Create the state required to render InfoLabel.
 *
 * The returned state can be modified with hooks such as useInfoLabel,
 * before being passed to renderInfoLabel.
 *
 * @param props - props from this instance of InfoLabel
 * @param ref - reference to label element of InfoLabel
 */
export const useInfoLabel = (props: InfoLabelProps, ref: React.Ref<HTMLLabelElement>): InfoLabelState => {
  const {
    root: rootShorthand,
    label: labelShorthand,
    infoButton: infoButtonShorthand,
    info,
    className,
    style,
    ...labelProps
  } = props;
  const baseId = useId('infolabel-');

  const root = slot.always(rootShorthand, {
    defaultProps: {
      className,
      style,
    },
    elementType: 'span',
  });

  const label = slot.always(labelShorthand, {
    defaultProps: {
      id: baseId + '__label',
      ref,
      ...labelProps,
    },
    elementType: Label,
  });

  const infoButton = slot.optional(infoButtonShorthand, {
    renderByDefault: !!info,
    defaultProps: {
      id: baseId + '__infoButton',
      info,
    },
    elementType: InfoButton,
  });

  const infoButtonPopover = slot.always(infoButton?.popover, {
    elementType: 'div',
  });

  const rootKey = root.key === undefined ? undefined : String(root.key);
  const buttonKey = infoButton?.key === undefined ? undefined : String(infoButton.key);
  const [reportedOwnership, setOwnership] = React.useState<
    (InfoButtonOwnership & { lifetime: object; rootKey: string | undefined; buttonKey: string | undefined }) | null
  >();
  const ownership =
    reportedOwnership && (reportedOwnership.rootKey !== rootKey || reportedOwnership.buttonKey !== buttonKey)
      ? undefined
      : reportedOwnership;
  const reportOwnership: InfoLabelOwnershipReporter = React.useCallback(
    (lifetime, next) => {
      setOwnership(current => {
        if (!next) {
          return current?.lifetime === lifetime ? null : current;
        }
        if (
          current?.lifetime === lifetime &&
          current.open === next.open &&
          current.surfaceId === next.surfaceId &&
          current.rootKey === rootKey &&
          current.buttonKey === buttonKey
        ) {
          return current;
        }
        return { lifetime, rootKey, buttonKey, ...next };
      });
    },
    [rootKey, buttonKey],
  );
  useIsomorphicLayoutEffect(() => {
    // A custom renderer can omit the button entirely, so it never sends a report.
    setOwnership(current => (current === undefined ? null : current));
  }, []);

  if (infoButton) {
    const infoPopupId = baseId + '__info'; // used as a self-referencing aria-labelledby to name the popup
    infoButtonPopover.id ??= infoPopupId;
    infoButton.popover = infoButtonPopover;
    infoButton.info = slot.optional(infoButton?.info, {
      defaultProps: {
        'aria-labelledby': infoButtonPopover.id,
      },
      elementType: 'dialog',
    });

    infoButton['aria-labelledby'] ??= `${label.id} ${infoButton.id}`;

    // Before the first layout report (including SSR), project the initial slot props.
    const open =
      ownership === undefined ? infoButtonPopover.open ?? infoButtonPopover.defaultOpen ?? false : ownership?.open;
    if (open) {
      root['aria-owns'] ??= ownership === undefined ? infoButtonPopover.id : ownership?.surfaceId;
    }
  }

  const state: InternalInfoLabelState = {
    components: {
      root: 'span',
      label: Label,
      infoButton: InfoButton,
    },
    root,
    label,
    infoButton,
    [infoLabelOwnershipReporter]: reportOwnership,
  };
  return state;
};
