import { FluentDesignSystemProvider } from '../design-system-provider';
import HorizontalScrollTemplate from './fixtures/horizontal-scroll.html';
import { FluentHorizontalScroll } from './';

// Prevent tree-shaking
FluentHorizontalScroll;
FluentDesignSystemProvider;

export default {
  title: 'Horizontal Scroll',
};

export const HorizontalScroll = (): string => HorizontalScrollTemplate;
