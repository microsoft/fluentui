import type { FlatTreeItemProps } from './FlatTreeItem.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { TreeItem } from '../TreeItem/TreeItem';

/**
 * The `FlatTreeItem` component represents a single item in a flat tree.
 */
export const FlatTreeItem: ForwardRefComponent<FlatTreeItemProps> = TreeItem as ForwardRefComponent<FlatTreeItemProps>;
