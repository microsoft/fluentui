import { FluentDesignSystemProvider } from '../design-system-provider';
import TreeItemTemplate from './fixtures/tree-item.html';
import { FluentTreeItem } from './';

// Prevent tree-shaking
FluentTreeItem;
FluentDesignSystemProvider;

export default {
  title: 'Tree item',
};

export const TreeItem = (): string => TreeItemTemplate;
