import { FASTDesignSystemProvider } from '../../design-system-provider';
import Examples from './fixtures/circular.html';
import { FASTProgressRing } from './';

// Prevent tree-shaking
FASTProgressRing;
FASTDesignSystemProvider;

export default {
  title: 'Progress Ring',
};

export const ProgressRing = (): string => Examples;
