import { BaseRatingDisplay } from './rating-display.base.js';
import type { RatingDisplayColor, RatingDisplaySize } from './rating-display.options.js';

/**
 * A Rating Display Custom HTML Element.
 * Based on BaseRatingDisplay and includes style and layout specific attributes
 *
 * @tag fluent-rating-display
 *
 * @presentational {RatingDisplayColor} [color=marigold] - The color of the rating display icons.
 * @presentational {RatingDisplaySize} [size=medium] - The size of the component.
 * @presentational {boolean} compact - Renders a single filled icon with a label next to it.
 *
 * @public
 */
export class RatingDisplay extends BaseRatingDisplay {}
