'use client';

import { useRatingContextValues as useFieldContextValuesBase_unstable } from '@fluentui/react-rating';
import type { RatingContextValues, RatingState } from './Rating.types';

export const useRatingContextValues = useFieldContextValuesBase_unstable as (state: RatingState) => RatingContextValues;
