import { FluentDesignSystemProvider } from '../design-system-provider';
import Examples from './fixtures/radio-group.html';
import { FluentRadioGroup } from './';

// Prevent tree-shaking
FluentRadioGroup;
FluentDesignSystemProvider;

export default {
  title: 'RadioGroup',
};

export const RadioGroup = (): string => Examples;
