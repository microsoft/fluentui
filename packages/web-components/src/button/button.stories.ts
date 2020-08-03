import { FASTDesignSystemProvider } from '../design-system-provider';
import ButtonTemplate from './fixtures/button.html';
import { FASTButton } from './';

// Prevent tree-shaking
FASTButton;
FASTDesignSystemProvider;

export default {
  title: 'Button',
};

export const Button = (): string => ButtonTemplate;
