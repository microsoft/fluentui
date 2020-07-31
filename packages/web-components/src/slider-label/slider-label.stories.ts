import { FASTDesignSystemProvider } from '../design-system-provider';
import Examples from './fixtures/slider-label.html';
import { FASTSliderLabel } from './';

// Prevent tree-shaking
FASTSliderLabel;
FASTDesignSystemProvider;

export default {
  title: 'Slider label',
};

export const SliderLabel = (): string => Examples;
