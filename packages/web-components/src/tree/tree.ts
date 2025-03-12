import { attr, FASTElement, observable } from '@microsoft/fast-element';
import {
  isHTMLElement,
  keyArrowDown,
  keyArrowLeft,
  keyArrowRight,
  keyArrowUp,
  keyEnd,
  keyEnter,
  keyHome,
  keySpace,
} from '@microsoft/fast-web-utilities';
import { TreeItem } from '../tree-item/index.js';
import { isTreeItem, TreeItemAppearance, TreeItemSize } from '../tree-item/tree-item.options';

export class Tree extends FASTElement {
  /**
   * The currently selected tree item
   * @public
   */
  @observable
  public currentSelected: HTMLElement | null = null;

  /**
   * The tree item that is designated to be in the tab queue.
   *
   * @internal
   */
  private currentFocused: HTMLElement | null = null;

  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  constructor() {
    super();
    this.elementInternals.role = 'tree';
  }

  /**
   * The size of the tree item element
   * @public
   * HTML Attribute: size
   */
  @attr
  public size: TreeItemSize = TreeItemSize.small;
  private sizeChanged() {
    this.updateSizeAndAppearance();
  }

  /**
   * The appearance variants of the tree item element
   * @public
   * HTML Attribute: appearance
   */
  @attr
  public appearance: TreeItemAppearance = TreeItemAppearance.subtle;
  private appearanceChanged() {
    this.updateSizeAndAppearance();
  }

  @observable
  childTreeItems: TreeItem[] = [];
  protected childTreeItemsChanged() {
    this.updateSizeAndAppearance();
    this.updateCurrentSelected();
  }

  /**
   * 1. Update the child items' size based on the tree's size
   * 2. Update the child items' appearance based on the tree's appearance
   */
  private updateSizeAndAppearance() {
    if (!this.childTreeItems?.length) {
      return;
    }
    this.childTreeItems.forEach(item => {
      if (!isTreeItem(item)) {
        return;
      }
      item.size = this.size;
      item.appearance = this.appearance;
    });
  }

  /**
   * Updates current selected when slottedTreeItems changes
   */
  private updateCurrentSelected() {
    // force single selection
    // defaults to first one found
    const selectedItem = this.querySelector<HTMLElement>(`[aria-selected='true']`);
    this.currentSelected = selectedItem;

    // invalidate the current focused item if it is no longer valid
    if (this.currentFocused === null || !this.contains(this.currentFocused)) {
      this.currentFocused = this.getValidFocusableItem();
    }
  }

  /**
   * KeyDown handler
   *
   *  @internal
   */
  public keydownHandler(e: KeyboardEvent): boolean | void {
    if (e.defaultPrevented) {
      return;
    }

    const item = e.target as HTMLElement;
    if (!isTreeItem(item) || this.childTreeItems.length < 1) {
      return true;
    }

    const elements = this.getVisibleNodes();

    switch (e.key) {
      case keyHome: {
        if (elements.length) {
          elements[0].focus();
        }
        return;
      }
      case keyEnd: {
        if (elements.length) {
          elements[elements.length - 1].focus();
        }
        return;
      }
      case keyArrowLeft: {
        if (item?.childTreeItems?.length && item.expanded) {
          item.expanded = false;
        } else if (isTreeItem(item.parentElement)) {
          item.parentElement.focus();
        }
        return;
      }
      case keyArrowRight: {
        if (item?.childTreeItems?.length) {
          if (!item.expanded) {
            item.expanded = true;
          } else {
            this.focusNextNode(1, item);
          }
        }
        return;
      }
      case keyArrowDown: {
        if (isTreeItem(item)) {
          this.focusNextNode(1, item);
        }
        return;
      }
      case keyArrowUp: {
        if (isTreeItem(item)) {
          this.focusNextNode(-1, item);
        }
        return;
      }
      case keyEnter: {
        // In single-select trees where selection does not follow focus (see note below),
        // the default action is typically to select the focused node.
        this.clickHandler(e as Event);
        return;
      }
      case keySpace: {
        if (isTreeItem(item)) {
          item.toggleSelection();
        }
        return;
      }
    }

    // don't prevent default if we took no action
    return true;
  };

  /**
   * Handle focus events
   *
   * @internal
   */
  public focusHandler(e: FocusEvent): void {
    if (this.childTreeItems.length < 1) {
      // no child items, nothing to do
      return;
    }

    if (e.target === this) {
      if (this.currentFocused === null) {
        this.currentFocused = this.getValidFocusableItem();
      }

      if (this.currentFocused !== null) {
        this.currentFocused.focus();
      }

      return;
    }

    if (this.contains(e.target as Node)) {
      this.setAttribute('tabindex', '-1');
      this.currentFocused = e.target as HTMLElement;
    }
  };

  /**
   * Handle blur events
   *
   * @internal
   */
  public blurHandler(e: FocusEvent): void {
    if (e.target instanceof HTMLElement && (e.relatedTarget === null || !this.contains(e.relatedTarget as Node))) {
      this.setAttribute('tabindex', '0');
    }
  };

  /**
   * Handles click events bubbling up
   *
   *  @internal
   */

  public clickHandler(e: Event): boolean | void {
    if (e.defaultPrevented) {
      // handled, do nothing
      return;
    }

    if (!isTreeItem(e.target as HTMLElement)) {
      // not a tree item, ignore
      // return true, do not prevent default
      return true;
    }

    const item = e.target as TreeItem;
    item.toggleExpansion();
    item.toggleSelection();
  }

  /**
   * Handles the selected-changed events bubbling up
   * from child tree items
   *
   *  @internal
   */
  public changeHandler(e: Event): boolean | void {
    if (e.defaultPrevented) {
      return;
    }

    if (!isTreeItem(e.target as HTMLElement)) {
      return true;
    }

    const item = e.target as TreeItem;

    if (item.selected) {
      // Deselect the prevously selected item
      if (this.currentSelected && this.currentSelected !== item && this.currentSelected instanceof TreeItem) {
        this.currentSelected.selected = false;
      }
      // New selected item
      this.currentSelected = item;
    } else if (!item.selected && this.currentSelected === item) {
      // Selected item deselected
      this.currentSelected = null;
    }
  };

  /**
   * checks if there are any nested tree items
   */
  private getValidFocusableItem() {
    const elements: HTMLElement[] | void = this.getVisibleNodes();
    // default to selected element if there is one
    let focusIndex = elements.findIndex(el => (el as any).selected);
    if (focusIndex === -1) {
      // otherwise first focusable tree item
      focusIndex = elements.findIndex(el => el instanceof TreeItem);
    }
    if (focusIndex !== -1) {
      return elements[focusIndex];
    }
    return null;
  }

  private getVisibleNodes(): HTMLElement[] {
    return Array.from(this.querySelectorAll('*')).filter(
      node => isTreeItem(node) && node.offsetParent !== null,
    ) as HTMLElement[];
  }

  /**
   * Move focus to a tree item based on its offset from the provided item
   */
  private focusNextNode(delta: number, item: TreeItem): void {
    const visibleNodes = this.getVisibleNodes();
    if (!visibleNodes.length) {
      return;
    }

    const focusItem = visibleNodes[visibleNodes.indexOf(item) + delta];
    if (isHTMLElement(focusItem)) {
      focusItem.focus();
    }
  }
}
