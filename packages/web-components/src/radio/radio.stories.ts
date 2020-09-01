import { FluentDesignSystemProvider } from '../design-system-provider';
import Examples from './fixtures/radio.html';
import { FluentRadio } from './';

// Prevent tree-shaking
FluentRadio;
FluentDesignSystemProvider;

export default {
  title: 'Radio',
};

export const Radio = (): string => Examples;
