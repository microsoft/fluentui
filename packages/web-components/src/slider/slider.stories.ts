import { FluentDesignSystemProvider } from '../design-system-provider';
import Examples from './fixtures/slider.html';
import { FluentSlider } from './';

// Prevent tree-shaking
FluentSlider;
FluentDesignSystemProvider;

export default {
  title: 'Slider',
};

export const Slider = (): string => Examples;
