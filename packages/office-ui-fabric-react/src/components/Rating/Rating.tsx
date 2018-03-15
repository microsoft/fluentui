import {
  styled
} from '../../Utilities';
// tslint:disable-next-line:no-unused-variable
import { IRatingProps } from './Rating.types';
import { getStyles } from './Rating.styles';
import { RatingBase } from './Rating.base';

export const Rating = styled(
  RatingBase,
  getStyles
);
