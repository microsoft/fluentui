import { FASTDesignSystemProvider } from '../design-system-provider';
import Examples from './fixtures/text-area.html';
import { FASTTextArea } from './';

// Prevent tree-shaking
FASTTextArea;
FASTDesignSystemProvider;

export default {
  title: 'Text area',
};

export const TextArea = (): string => Examples;
