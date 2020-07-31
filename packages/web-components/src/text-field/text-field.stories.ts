import { FASTDesignSystemProvider } from '../design-system-provider';
import Examples from './fixtures/text-field.html';
import { FASTTextField } from './';

// Prevent tree-shaking
FASTTextField;
FASTDesignSystemProvider;

export default {
  title: 'Text field',
};

export const TextField = (): string => Examples;
