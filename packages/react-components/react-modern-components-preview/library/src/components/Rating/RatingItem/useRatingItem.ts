'use client';

import type * as React from 'react';
import { useRatingItem as useRatingItemBase } from '@fluentui/react-headless-components-preview/rating';
import type { RatingItemProps, RatingItemState } from './RatingItem.types';

export const useRatingItem = (props: RatingItemProps, ref: React.Ref<HTMLSpanElement>): RatingItemState =>
  useRatingItemBase(props, ref);
