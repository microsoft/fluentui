import { FluentDesignSystemProvider } from '../design-system-provider';
import FlipperTemplate from './fixtures/flipper.html';
import { FluentFlipper } from './';

// Prevent tree-shaking
FluentFlipper;
FluentDesignSystemProvider;

export default {
  title: 'Flipper',
};

export const Flipper = (): string => FlipperTemplate;
