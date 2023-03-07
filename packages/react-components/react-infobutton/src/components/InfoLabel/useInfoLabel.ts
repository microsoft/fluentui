import * as React from 'react';

import { resolveShorthand, useId } from '@fluentui/react-utilities';
import type { InfoLabelProps, InfoLabelState } from './InfoLabel.types';
import { Label } from '@fluentui/react-label';
import { InfoButton } from '../InfoButton/InfoButton';

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
  const { root: rootSlot, label: labelSlot, infoButton: infoButtonSlot, className, style, ...labelProps } = props;

  const root = resolveShorthand(rootSlot, {
    required: true,
    defaultProps: {
      className,
      style,
    },
  });

  const label = resolveShorthand(labelSlot, {
    required: true,
    defaultProps: {
      id: useId('infolabel-'),
      ref,
      ...labelProps,
    },
  });

  const infoButton = resolveShorthand(infoButtonSlot, {
    defaultProps: {
      id: useId('infobutton-'),
    },
  });

  if (infoButton && !infoButton['aria-labelledby']) {
    infoButton['aria-labelledby'] = `${label.id} ${infoButton.id}`;
  }

  return {
    size: props.size,
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
