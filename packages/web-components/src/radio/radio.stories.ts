import { FASTDesignSystemProvider } from '../design-system-provider';
import Examples from './fixtures/radio.html';
import { FASTRadio } from './';

// Prevent tree-shaking
FASTRadio;
FASTDesignSystemProvider;

export default {
  title: 'Radio',
};

export const Radio = (): string => Examples;
