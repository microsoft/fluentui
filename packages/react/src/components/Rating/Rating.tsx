import * as React from 'react';
import { styled } from '../../Utilities';
import { IRatingProps, IRatingStyleProps, IRatingStyles } from './Rating.types';
import { getStyles } from './Rating.styles';
import { RatingBase } from './Rating.base';

export const Rating: React.FunctionComponent<IRatingProps> = styled<IRatingProps, IRatingStyleProps, IRatingStyles>(
  RatingBase,
  getStyles,
  undefined,
  { scope: 'Rating' },
);
