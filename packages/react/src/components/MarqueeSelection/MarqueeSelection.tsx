import * as React from 'react';
import { styled } from '../../Utilities';
import { MarqueeSelectionBase } from './MarqueeSelection.base';
import { getStyles } from './MarqueeSelection.styles';
import type {
  IMarqueeSelectionProps,
  IMarqueeSelectionStyleProps,
  IMarqueeSelectionStyles,
} from './MarqueeSelection.types';

export const MarqueeSelection: React.FunctionComponent<IMarqueeSelectionProps> =
  // TODO: MarqueeSelectionBase defaultProps are not lining up with IMarqueeSelectionProps, so we have to be explicit
  // with styled here. defaultProps.rootTagName doesn't appear to be used anywhere and defaultProps.rootProps is not
  // in IMarqueeSelectionProps.
  styled<IMarqueeSelectionProps, IMarqueeSelectionStyleProps, IMarqueeSelectionStyles>(
    MarqueeSelectionBase,
    getStyles,
    undefined,
    {
      scope: 'MarqueeSelection',
    },
  );
