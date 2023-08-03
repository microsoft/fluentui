import * as React from 'react';

import { Label } from '@fluentui/react-label';
import { mergeCallbacks, resolveShorthand, useEventCallback, useId } from '@fluentui/react-utilities';
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

  const root = resolveShorthand(rootShorthand, {
    required: true,
    defaultProps: {
      className,
      style,
    },
  });

  const label = resolveShorthand(labelShorthand, {
    required: true,
    defaultProps: {
      id: baseId + '__label',
      ref,
      size,
      ...labelProps,
    },
  });

  const infoButton = resolveShorthand(infoButtonShorthand, {
    required: !!info,
    defaultProps: {
      id: baseId + '__infoButton',
      size,
      info,
    },
  });

  const infoButtonPopover = resolveShorthand(infoButton?.popover, { required: true });
  infoButtonPopover.onOpenChange = useEventCallback(
    mergeCallbacks(infoButtonPopover.onOpenChange, (e, data) => {
      setOpen(data.open);
    }),
  );

  if (infoButton) {
    infoButton.popover = infoButtonPopover;
    infoButton.info = resolveShorthand(infoButton?.info, {
      defaultProps: {
        id: baseId + '__info',
      },
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
