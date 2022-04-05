import * as React from 'react';
import { styled } from '../../Utilities';
import { getStyles } from './Rating.styles';
import { RatingBase } from './Rating.base';
import type { IRatingProps, IRatingStyleProps, IRatingStyles } from './Rating.types';

export const Rating: React.FunctionComponent<IRatingProps> = styled<IRatingProps, IRatingStyleProps, IRatingStyles>(
  RatingBase,
  getStyles,
  undefined,
  { scope: 'Rating' },
);
