import { FlatTreeItemProps } from './FlatTreeItem.types';
import { ForwardRefComponent } from '@fluentui/react-utilities';
import { TreeItem } from '../TreeItem/TreeItem';

/**
 * The `TreeItem` component represents a single item in a tree.
 * It expects a certain order of children to work properly: the first child should be the node itself,
 * and the second child should be a nested subtree in the form of another Tree component or a standalone TreeItem.
 * This order follows the same order as document traversal for the TreeWalker API in JavaScript:
 * https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker.
 * The content and layout of a TreeItem can be defined using the TreeItemLayout or TreeItemPersonaLayout component,
 * which should be used as a direct child of TreeItem.
 *
 * When a TreeItem has nested child subtree, an expand/collapse control is displayed,
 * allowing the user to show or hide the children.
 */
export const FlatTreeItem: ForwardRefComponent<FlatTreeItemProps> = TreeItem as ForwardRefComponent<FlatTreeItemProps>;
