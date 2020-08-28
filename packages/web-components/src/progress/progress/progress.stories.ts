import { FluentDesignSystemProvider } from '../../design-system-provider';
import Examples from './fixtures/linear.html';
import { FluentProgress } from './';

// Prevent tree-shaking
FluentProgress;
FluentDesignSystemProvider;

export default {
  title: 'Progress',
};

export const Progress = (): string => Examples;
