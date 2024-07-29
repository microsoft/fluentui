import { FlatTreeItemProps } from './FlatTreeItem.types';
import { ForwardRefComponent } from '@fluentui/react-utilities';
import { TreeItem } from '../TreeItem/TreeItem';

/**
 * The `FlatTreeItem` component represents a single item in a flat tree.
 */
//TODO: migrate to fc to ensure v18 compatibility
// eslint-disable-next-line deprecation/deprecation
export const FlatTreeItem: ForwardRefComponent<FlatTreeItemProps> = TreeItem as ForwardRefComponent<FlatTreeItemProps>;
