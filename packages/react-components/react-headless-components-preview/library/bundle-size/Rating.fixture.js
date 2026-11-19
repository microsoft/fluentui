// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import {
  Rating,
  RatingItem,
  renderRating,
  renderRatingItem,
  useRating,
  useRatingContextValues,
  useRatingItem,
  useRatingItemContextValue,
} from '@fluentui/react-headless-components-preview/rating';

console.log(
  Rating,
  RatingItem,
  renderRating,
  renderRatingItem,
  useRating,
  useRatingContextValues,
  useRatingItem,
  useRatingItemContextValue,
);

export default {
  name: '@fluentui/react-headless-components-preview/rating',
};
