import { FluentDesignSystemProvider } from '../design-system-provider';
import ButtonTemplate from './fixtures/button.html';
import { FluentButton } from './';

// Prevent tree-shaking
FluentButton;
FluentDesignSystemProvider;

export default {
  title: 'Button',
};

export const Button = (): string => ButtonTemplate;
