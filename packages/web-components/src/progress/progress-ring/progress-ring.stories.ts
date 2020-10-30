import { FluentDesignSystemProvider } from '../../design-system-provider';
import Examples from './fixtures/circular.html';
import { FluentProgressRing } from './';

// Prevent tree-shaking
FluentProgressRing;
FluentDesignSystemProvider;

export default {
  title: 'Progress Ring',
};

export const ProgressRing = (): string => Examples;
