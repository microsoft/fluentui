// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import {
  RatingDisplay,
  renderRatingDisplay,
  useRatingDisplay,
  useRatingDisplayContextValues,
} from '@fluentui/react-headless-components-preview/rating-display';

console.log(RatingDisplay, renderRatingDisplay, useRatingDisplay, useRatingDisplayContextValues);

export default {
  name: '@fluentui/react-headless-components-preview/rating-display',
};
