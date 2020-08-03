import { FASTDesignSystemProvider } from '../design-system-provider';
import FlipperTemplate from './fixtures/flipper.html';
import { FASTFlipper } from './';

// Prevent tree-shaking
FASTFlipper;
FASTDesignSystemProvider;

export default {
  title: 'Flipper',
};

export const Flipper = (): string => FlipperTemplate;
