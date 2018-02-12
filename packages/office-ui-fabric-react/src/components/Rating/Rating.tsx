import {
  styled
} from '../../Utilities';
import { IRatingProps } from './Rating.types';
import { getStyles } from './Rating.styles';
import { RatingBase } from './Rating.base';

export const Rating = styled(
  RatingBase,
  getStyles
);
