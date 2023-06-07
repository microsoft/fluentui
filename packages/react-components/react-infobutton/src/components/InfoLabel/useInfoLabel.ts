import * as React from 'react';

import { Label } from '@fluentui/react-label';
import { resolveShorthand, useId } from '@fluentui/react-utilities';
import { InfoButton } from '../InfoButton/InfoButton';
import { InfoTip } from '../InfoTip/InfoTip';
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
    infoTip: infoTipShorthand,
    interactive,
    info,
    size,
    className,
    style,
    ...labelProps
  } = props;
  const infoRef = React.useRef<HTMLDivElement>(null);
  const baseId = useId('infolabel-');

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

  const infoButton = interactive
    ? resolveShorthand(infoButtonShorthand, {
        required: !!info,
        defaultProps: {
          id: baseId + '__infoButton',
          size,
          info,
        },
      })
    : undefined;

  const infoTip = !interactive
    ? resolveShorthand(infoTipShorthand, {
        required: !!info,
        defaultProps: {
          id: baseId + '__infoTip',
          size,
          info,
        },
      })
    : undefined;

  if (infoButton) {
    infoButton.info = resolveShorthand(infoButton?.info, {
      defaultProps: {
        id: baseId + '__info',
        ref: infoRef,
      },
    });

    infoButton['aria-labelledby'] ??= `${label.id} ${infoButton.id}`;
    root['aria-owns'] ??= infoButton.info?.id;
  }

  if (infoTip) {
    infoTip.info = resolveShorthand(infoTip?.info, {
      defaultProps: {
        id: baseId + '__info',
        ref: infoRef,
      },
    });

    infoTip['aria-labelledby'] ??= `${label.id} ${infoTip.info?.id}`;
    root['aria-owns'] ??= infoTip.info?.id;
  }

  return {
    size,
    interactive,

    components: {
      root: 'span',
      label: Label,
      infoButton: InfoButton,
      infoTip: InfoTip,
    },

    root,
    label,
    infoButton,
    infoTip,
  };
};
