import { FASTDesignSystemProvider } from '../design-system-provider';
import Examples from './fixtures/slider.html';
import { FASTSlider } from './';

// Prevent tree-shaking
FASTSlider;
FASTDesignSystemProvider;

export default {
  title: 'Slider',
};

export const Slider = (): string => Examples;
