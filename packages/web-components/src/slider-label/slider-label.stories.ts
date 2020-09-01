import { FluentDesignSystemProvider } from '../design-system-provider';
import Examples from './fixtures/slider-label.html';
import { FluentSliderLabel } from './';

// Prevent tree-shaking
FluentSliderLabel;
FluentDesignSystemProvider;

export default {
  title: 'Slider label',
};

export const SliderLabel = (): string => Examples;
