import { FluentDesignSystemProvider } from '../design-system-provider';
import TreeViewTemplate from './fixtures/tree-view.html';
import { FluentTreeView } from './';

// Prevent tree-shaking
FluentTreeView;
FluentDesignSystemProvider;

export default {
  title: 'Tree View',
};

export const TreeView = (): string => TreeViewTemplate;
