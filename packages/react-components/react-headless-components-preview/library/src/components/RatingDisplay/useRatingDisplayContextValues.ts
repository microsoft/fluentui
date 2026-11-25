'use client';

import { useRatingDisplayContextValues as useFieldContextValuesBase_unstable } from '@fluentui/react-rating';
import type { RatingDisplayContextValues, RatingDisplayState } from './RatingDisplay.types';

export const useRatingDisplayContextValues = useFieldContextValuesBase_unstable as (
  state: RatingDisplayState,
) => RatingDisplayContextValues;
