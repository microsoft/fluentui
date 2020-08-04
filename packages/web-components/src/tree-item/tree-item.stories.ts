import { FASTDesignSystemProvider } from '../design-system-provider';
import TreeItemTemplate from './fixtures/tree-item.html';
import { FASTTreeItem } from './';

// Prevent tree-shaking
FASTTreeItem;
FASTDesignSystemProvider;

export default {
  title: 'Tree item',
};

export const TreeItem = (): string => TreeItemTemplate;
