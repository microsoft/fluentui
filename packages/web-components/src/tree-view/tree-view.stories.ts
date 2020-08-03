import { FASTDesignSystemProvider } from '../design-system-provider';
import TreeViewTemplate from './fixtures/tree-view.html';
import { FASTTreeView } from './';

// Prevent tree-shaking
FASTTreeView;
FASTDesignSystemProvider;

export default {
  title: 'Tree View',
};

export const TreeView = (): string => TreeViewTemplate;
