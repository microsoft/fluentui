import type {
  SliderProps as SliderHeadlessProps,
  SliderState as SliderHeadlessState,
} from '@fluentui/react-headless-components-preview/slider';

export type { SliderSlots } from '@fluentui/react-headless-components-preview/slider';

/** Size of the Slider — changes its thumb, rail and minimum track extent. */
export type SliderSize = 'small' | 'medium';

/**
 * Windmod Slider props: the headless slider plus the look prop the headless surface
 * deliberately omits (it exists purely to select styles).
 */
export type SliderProps = SliderHeadlessProps & {
  /** @default 'medium' */
  size?: SliderSize;
};

/** Windmod Slider state: headless state plus the resolved look prop. */
export type SliderState = SliderHeadlessState & Required<Pick<SliderProps, 'size'>>;
