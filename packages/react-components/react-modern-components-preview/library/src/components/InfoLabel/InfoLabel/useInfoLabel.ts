'use client';

import type * as React from 'react';
import { useInfoLabel as useInfoLabelBase } from '@fluentui/react-headless-components-preview/info-label';
import { slot } from '@fluentui/react-utilities';
import { InfoButton, type InfoButtonProps } from '../InfoButton';
import { Label, type LabelProps } from '../../Label';
import type { InfoLabelProps, InfoLabelState } from './InfoLabel.types';

/**
 * Create the state required to render InfoLabel.
 */
export const useInfoLabel = (props: InfoLabelProps, ref: React.Ref<HTMLLabelElement>): InfoLabelState => {
  const { size = 'medium', ...rest } = props;
  const baseState = useInfoLabelBase(rest, ref);
  const label = slot.always<LabelProps>(baseState.label, {
    defaultProps: { size },
    elementType: Label,
  });
  const infoButton = slot.optional<InfoButtonProps>(baseState.infoButton, {
    renderByDefault: !!baseState.infoButton,
    defaultProps: { size },
    elementType: InfoButton,
  });

  return {
    ...baseState,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...baseState.components,
      infoButton: InfoButton,
      label: Label,
    },
    infoButton,
    label,
    root: {
      ...baseState.root,
      'data-size': size,
    },
    size,
  };
};
