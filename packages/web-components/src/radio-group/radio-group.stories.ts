import { FASTDesignSystemProvider } from '../design-system-provider';
import Examples from './fixtures/radio-group.html';
import { FASTRadioGroup } from './';

// Prevent tree-shaking
FASTRadioGroup;
FASTDesignSystemProvider;

export default {
  title: 'RadioGroup',
};

export const RadioGroup = (): string => Examples;
