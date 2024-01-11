import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useRatingDisplay_unstable } from './useRatingDisplay';
import { renderRatingDisplay_unstable } from './renderRatingDisplay';
import { useRatingDisplayStyles_unstable } from './useRatingDisplayStyles.styles';
import type { RatingDisplayProps } from './RatingDisplay.types';

/**
 * RatingDisplay component - TODO: add more docs
 */
export const RatingDisplay: ForwardRefComponent<RatingDisplayProps> = React.forwardRef((props, ref) => {
  const state = useRatingDisplay_unstable(props, ref);

  useRatingDisplayStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  useCustomStyleHook_unstable('useRatingDisplayStyles_unstable')(state);
  return renderRatingDisplay_unstable(state);
});

RatingDisplay.displayName = 'RatingDisplay';
