import { FASTDesignSystemProvider } from '../design-system-provider';
import DividerTemplate from './fixtures/divider.html';
import { FASTDivider } from './';

// Prevent tree-shaking
FASTDivider;
FASTDesignSystemProvider;

export default {
  title: 'Divider',
};

export const Divider = (): string => DividerTemplate;
