import type { Direction } from '@microsoft/fast-web-utilities';
import { Orientation } from '@microsoft/fast-web-utilities';
import type { StaticallyComposableHTML, ValuesOf } from '../utils/index.js';
import type { Slider } from './slider.js';

/**
 * SliderSize Constants
 * @public
 */
export const SliderSize = {
  small: 'small',
  medium: 'medium',
} as const;

/**
 * Applies bar height to the slider rail and diameter to the slider thumbs
 * @public
 */
export type SliderSize = ValuesOf<typeof SliderSize>;

/**
 * @public
 */
export const SliderOrientation = Orientation;

/**
 * The types for the orientation of the slider
 * @public
 */
export type SliderOrientation = ValuesOf<typeof SliderOrientation>;

/**
 * @public
 */
export const SliderMode = {
  singleValue: 'single-value',
} as const;

/**
 * The types for the selection mode of the slider
 * @public
 */
export type SliderMode = ValuesOf<typeof SliderMode>;

/**
 * @public
 */
export interface SliderConfiguration {
  max: number;
  min: number;
  orientation?: SliderOrientation;
  direction?: Direction;
  disabled?: boolean;
}

/**
 * Slider configuration options
 * @public
 */
export type SliderOptions = {
  thumb?: StaticallyComposableHTML<Slider>;
};
