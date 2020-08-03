import { FASTDesignSystemProvider } from '../design-system-provider';
import AnchorTemplate from './fixtures/anchor.html';
import { FASTAnchor } from './';

// Prevent tree-shaking
FASTAnchor;
FASTDesignSystemProvider;

export default {
  title: 'Anchor',
};

export const Anchor = (): string => AnchorTemplate;
