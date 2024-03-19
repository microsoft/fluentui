import * as React from 'react';

import { Label } from '@fluentui/react-label';
import { mergeCallbacks, useEventCallback, useId, slot } from '@fluentui/react-utilities';
import { InfoButton } from '../InfoButton/InfoButton';
import type { InfoLabelProps, InfoLabelState } from './InfoLabel.types';

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
  const {
    root: rootShorthand,
    label: labelShorthand,
    infoButton: infoButtonShorthand,
    info,
    size,
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
      size,
      ...labelProps,
    },
    elementType: Label,
  });

  const infoButton = slot.optional(infoButtonShorthand, {
    renderByDefault: !!info,
    defaultProps: {
      id: baseId + '__infoButton',
      size,
      info,
    },
    elementType: InfoButton,
  });

  const infoButtonPopover = slot.always(infoButton?.popover, {
    elementType: 'div',
  });
  infoButtonPopover.onOpenChange = useEventCallback(
    mergeCallbacks(infoButtonPopover.onOpenChange, (e, data) => {
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
    size,
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
