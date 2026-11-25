import type * as React from 'react';
import { useId, slot } from '@fluentui/react-utilities';

import { Label } from '../Label';
import { InfoButton } from './InfoButton/InfoButton';
import type { InfoLabelProps, InfoLabelState } from './InfoLabel.types';

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
