import * as React from 'react';

import { Label } from '@fluentui/react-label';
import { slot, useId } from '@fluentui/react-utilities';
import { InfoButton } from '../InfoButton/InfoButton';
import type { InfoLabelProps, InfoLabelState } from './InfoLabel.types';
import { PopoverSurface } from '@fluentui/react-popover';

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

  const root = slot(rootShorthand, {
    required: true,
    defaultProps: {
      className,
      style,
    },
    elementType: 'span',
  });

  const label = slot(labelShorthand, {
    required: true,
    defaultProps: {
      id: baseId + '__label',
      ref,
      size,
      ...labelProps,
    },
    elementType: Label,
  });

  const infoButton = slot(infoButtonShorthand, {
    required: !!info,
    defaultProps: {
      id: baseId + '__infoButton',
      size,
      info,
    },
    elementType: InfoButton,
  });

  if (infoButton) {
    infoButton.info = slot(infoButton?.info, {
      defaultProps: {
        id: baseId + '__info',
      },
      elementType: PopoverSurface,
    });

    infoButton['aria-labelledby'] ??= `${label.id} ${infoButton.id}`;
    root['aria-owns'] ??= infoButton.info?.id;
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
