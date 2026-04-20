import { attr } from '@microsoft/fast-element';
import { FocusGroup } from '@microsoft/focusgroup-polyfill/focusgroup.js';
import { type FocusGroupItemCollection, FocusGroupMutateEvent } from '@microsoft/focusgroup-polyfill/shadowless';
import type { TreeItem } from '../tree-item/tree-item.js';
import { isTreeItem, TreeItemAppearance, TreeItemSize } from '../tree-item/tree-item.options.js';
import { ItemCollection } from '../utils/focusgroup.js';
import { waitForConnectedDescendants } from '../utils/request-idle-callback.js';
import { BaseTree } from './tree.base.js';

/**
 * The Fluent Tree Element. Implements {@link @microsoft/fast-foundation#BaseTree}.
 *
 * @tag fluent-tree
 *
 */
export class Tree extends BaseTree {
  /**
   * The size of the tree item element
   * The size of the tree item element
   *
   * HTML Attribute: size
   *
   * @public
   */
  @attr
  public size: TreeItemSize = TreeItemSize.small;
  protected sizeChanged() {
    this.updateSizeAndAppearance();
  }

  /**
   * The appearance variants of the tree item element
   * The appearance variants of the tree item element
   *
   * HTML Attribute: appearance
   *
   * @public
   */
  @attr
  public appearance: TreeItemAppearance = TreeItemAppearance.subtle;
  protected appearanceChanged() {
    this.updateSizeAndAppearance();
  }

  /**
   * child tree items supered change event
   * @internal
   */
  public childTreeItemsChanged() {
    super.childTreeItemsChanged();

    this.updateSizeAndAppearance();

    if (!this.fgItems) {
      this.fgItems = new ItemCollection({
        owner: this,
        filter(node) {
          return isTreeItem(node) && !(isTreeItem(node.parentElement) && node.parentElement.expanded === false)
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
        },
      });
    }
  }

  /** @private */
  fg!: FocusGroup;

  /** @private */
  fgItems!: FocusGroupItemCollection;

  connectedCallback() {
    super.connectedCallback();

    waitForConnectedDescendants(this, () => {
      this.fg = new FocusGroup(this, this.fgItems);
    });
  }

  disconnectedCallback() {
    this.fg?.disconnect();
    super.disconnectedCallback();
  }

  /**
   * 1. Update the child items' size based on the tree's size
   * 2. Update the child items' appearance based on the tree's appearance
   */
  public updateSizeAndAppearance() {
    if (!this.childTreeItems?.length) {
      return;
    }

    this.childTreeItems.forEach(item => {
      (item as TreeItem).size = this.size;
      (item as TreeItem).appearance = this.appearance;
    });
  }

  /** @internal */
  public itemToggleHandler() {
    this.fgItems?.dispatchEvent(new FocusGroupMutateEvent());
  }
}
