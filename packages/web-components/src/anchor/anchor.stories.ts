import { FluentDesignSystemProvider } from '../design-system-provider';
import AnchorTemplate from './fixtures/anchor.html';
import { FluentAnchor } from './';

// Prevent tree-shaking
FluentAnchor;
FluentDesignSystemProvider;

export default {
  title: 'Anchor',
};

export const Anchor = (): string => AnchorTemplate;
