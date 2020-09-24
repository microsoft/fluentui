import { FluentDesignSystemProvider } from '../design-system-provider';
import DividerTemplate from './fixtures/divider.html';
import { FluentDivider } from './';

// Prevent tree-shaking
FluentDivider;
FluentDesignSystemProvider;

export default {
  title: 'Divider',
};

export const Divider = (): string => DividerTemplate;
