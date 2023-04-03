import * as React from 'react';

import { Label } from '@fluentui/react-label';
import { resolveShorthand, useId } from '@fluentui/react-utilities';
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
    size,
    info,
    className,
    style,
    ...labelProps
  } = props;

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
      id: useId('infolabel-'),
      ref,
      size,
      ...labelProps,
    },
  });

  const infoButton = resolveShorthand(infoButtonShorthand, {
    required: !!info,
    defaultProps: {
      id: useId('infobutton-'),
      info,
      size,
    },
  });

  if (infoButton) {
    infoButton['aria-labelledby'] ??= `${label.id} ${infoButton.id}`;
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
