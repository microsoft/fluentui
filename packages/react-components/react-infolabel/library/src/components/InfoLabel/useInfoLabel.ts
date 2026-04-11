'use client';

import * as React from 'react';

import { Label } from '@fluentui/react-label';
import { mergeCallbacks, useId, slot, useEventCallback } from '@fluentui/react-utilities';
import { InfoButton } from '../InfoButton/InfoButton';
import type { InfoLabelBaseProps, InfoLabelBaseState, InfoLabelProps, InfoLabelState } from './InfoLabel.types';

/**
 * Create the state required to render InfoLabel.
 *
 * The returned state can be modified with hooks such as useInfoLabelStyles_unstable,
 * before being passed to renderInfoLabel_unstable.
 *
 * @param props - props from this instance of InfoLabel
 * @param ref - reference to label element of InfoLabel
 */
export const useInfoLabel_unstable = (props: InfoLabelProps, ref: React.Ref<HTMLLabelElement>): InfoLabelState => {
  const { size, ...baseProps } = props;
  const state = useInfoLabelBase_unstable(baseProps, ref);

  return {
    size,
    ...state,
  };
};

/**
 * Base hook for InfoLabel component, which manages state related to ARIA, slot structure, and focus behavior.
 * This hook excludes design-specific props (size).
 *
 * @param props - User provided props to the InfoLabel component.
 * @param ref - User provided ref to be passed to the InfoLabel component.
 */
export const useInfoLabelBase_unstable = (
  props: InfoLabelBaseProps,
  ref: React.Ref<HTMLLabelElement>,
): InfoLabelBaseState => {
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
  const [open, setOpen] = React.useState(false);

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
  infoButtonPopover.onOpenChange = useEventCallback(
    mergeCallbacks(infoButtonPopover.onOpenChange, (_, data) => {
      setOpen(data.open);
    }),
  );

  if (infoButton) {
    infoButton.popover = infoButtonPopover;
    const infoPopupId = baseId + '__info'; // used as a self-referencing aria-labelledby to name the popup
    infoButton.info = slot.optional(infoButton?.info, {
      defaultProps: {
        id: infoPopupId,
        'aria-labelledby': infoPopupId,
      },
      elementType: 'div',
    });

    infoButton['aria-labelledby'] ??= `${label.id} ${infoButton.id}`;

    if (open) {
      root['aria-owns'] ??= infoButton.info?.id;
    }
  }

  return {
    components: {
      root: 'span',
      label: Label,
      infoButton: InfoButton,
    },
    root,
    label,
    infoButton,
  };
};
