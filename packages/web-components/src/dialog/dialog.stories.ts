import { FluentDesignSystemProvider } from '../design-system-provider';
import DialogTemplate from './fixtures/dialog.html';
import { FluentDialog } from './';

// Prevent tree-shaking
FluentDialog;
FluentDesignSystemProvider;

export default {
  title: 'Dialog',
};

export const Dialog = (): string => DialogTemplate;
