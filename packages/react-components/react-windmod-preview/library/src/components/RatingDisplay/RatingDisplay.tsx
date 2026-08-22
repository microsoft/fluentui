'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderRatingDisplay,
  useRatingDisplay,
  useRatingDisplayContextValues,
} from '@fluentui/react-headless-components-preview/rating-display';
import { StarFilled } from '@fluentui/react-icons/headless/svg/star';

import type { RatingDisplayProps, RatingDisplayState } from './RatingDisplay.types';
import { RatingItem } from './RatingItem';
import { RatingItemContextProvider } from './RatingItemContext';
import { useRatingDisplayStyles } from './useRatingDisplayStyles';

/**
 * A RatingDisplay shows a read-only star rating. Windmod RatingDisplay: the headless rating
 * display decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const RatingDisplay: ForwardRefComponent<RatingDisplayProps> = React.forwardRef((props, ref) => {
  // The headless surface defaults `icon` to a bare span so it needs no icon dependency; windmod
  // restores the Fluent default alongside the look props the headless hook never accepts.
  const { color = 'neutral', compact = false, icon = StarFilled, max = 5, size = 'medium', ...rest } = props;

  // The headless hook defaults these children to its own unstyled RatingItem, so windmod
  // supplies the styled ones ahead of it; a consumer's own children still win.
  const children = React.useMemo(
    () =>
      compact ? (
        <RatingItem key={1} value={1} aria-hidden={true} />
      ) : (
        Array.from(Array(max), (_, index) => <RatingItem key={index + 1} value={index + 1} aria-hidden={true} />)
      ),
    [compact, max],
  );

  const state: RatingDisplayState = {
    ...useRatingDisplay({ children, compact, icon, max, ...rest }, ref as React.Ref<HTMLDivElement>),
    color,
    size,
  };

  const styled = useRatingDisplayStyles(state);
  const contextValues = useRatingDisplayContextValues(styled);
  const itemContext = React.useMemo(() => ({ color, size }), [color, size]);

  return (
    <RatingItemContextProvider value={itemContext}>
      {renderRatingDisplay(styled, contextValues)}
    </RatingItemContextProvider>
  );
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<RatingDisplayProps>;

RatingDisplay.displayName = 'RatingDisplay';
