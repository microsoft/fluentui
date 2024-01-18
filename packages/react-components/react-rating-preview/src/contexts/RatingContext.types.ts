import { RatingState } from '../components/Rating/Rating.types';
import { RatingDisplayState } from '../components/RatingDisplay/RatingDisplay.types';

export type RatingContextValue = Pick<
  RatingState,
  'color' | 'iconFilled' | 'iconOutline' | 'name' | 'step' | 'size' | 'hoveredValue' | 'value'
> &
  Pick<RatingDisplayState, 'compact'> & {
    interactive?: boolean;
  };

export type RatingContextValues = {
  rating: RatingContextValue;
};
