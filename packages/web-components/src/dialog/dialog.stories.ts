import { FASTDesignSystemProvider } from '../design-system-provider';
import DialogTemplate from './fixtures/dialog.html';
import { FASTDialog } from './';

// Prevent tree-shaking
FASTDialog;
FASTDesignSystemProvider;

export default {
  title: 'Dialog',
};

export const Dialog = (): string => DialogTemplate;
