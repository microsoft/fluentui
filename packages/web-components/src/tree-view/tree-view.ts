// Copyright (C) Microsoft Corporation. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * The <tree-view> element is mainly responsible for these things:
 * 1. To act as a tree role, e.i. role='tree'
 * 2. To handle the keyboard events and mouse events that are bubbling from the <tree-item>s,
 *    like click, selected-change, keydown, focusin, focusout
 * 3. Control the size and appearance variants
 * 4. Focus management
 * 5. Selection management
 */

import { attr, customElement, FASTElement, observable } from '@microsoft/fast-element';
import {
  getDisplayedNodes,
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
import { FluentDesignSystem } from '../fluent-design-system.js';
import { TreeItem } from '../tree-item/index.js';
import { template } from './tree-view.template.js';
import { styles } from './tree-view.style.js';

@customElement({
  name: `${FluentDesignSystem.prefix}-tree-view`,
  template,
  styles,
})
export class TreeView extends FASTElement {
  /**
   * The currently selected tree item
   * @public
   */
  @observable
  currentSelected: HTMLElement | null = null;

  /**
   * The tree item that is designated to be in the tab queue.
   *
   * @internal
   */
  currentFocused: HTMLElement | null = null;

  /**
   * The size of the tree item element
   * @public
   * HTML Attribute: size
   */
  @attr()
  size: 'medium' | 'small' = 'medium';
  private sizeChanged() {
    this.updateSizeAndAppearance();
  }

  /**
   * The appearance variants of the tree item element
   * @public
   * HTML Attribute: appearance
   */
  @attr()
  appearance: 'subtle' | 'subtle-alpha' | 'transparent' = 'subtle';
  private appearanceChanged() {
    this.updateSizeAndAppearance();
  }

  @observable
  childTreeItems: TreeItem[] = [];
  private childTreeItemsChanged() {
    this.updateSizeAndAppearance();
    this.updateCurrentSelected();
  }

  /**
   * 1. Update the child items' size based on the tree-view's size
   * 2. Update the child items' appearance based on the tree-view's appearance
   */
  private updateSizeAndAppearance() {
    if (!this.childTreeItems || !this.childTreeItems.length) {
      return;
    }
    this.childTreeItems.forEach(item => {
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
  handleKeyDown = (e: KeyboardEvent): boolean | void => {
    if (e.defaultPrevented) {
      return;
    }

    const item = e.target;
    if (!(item instanceof TreeItem) || this.childTreeItems.length < 1) {
      return true;
    }

    const elements = this.getVisibleNodes();

    switch (e.key) {
      case keyHome:
        if (elements.length) {
          elements[0].focus();
        }
        return;
      case keyEnd:
        if (elements.length) {
          elements[elements.length - 1].focus();
        }
        return;
      case keyArrowLeft:
        if (item.childTreeItems.length && item.expanded) {
          item.expanded = false;
        } else if (item.parentElement instanceof TreeItem) {
          item.parentElement.focus();
        }
        return;
      case keyArrowRight:
        if (item.childTreeItems.length) {
          if (!item.expanded) {
            item.expanded = true;
          } else {
            this.focusNextNode(1, item);
          }
        }
        return;
      case keyArrowDown:
        if (e.target instanceof TreeItem) {
          this.focusNextNode(1, e.target);
        }
        return;
      case keyArrowUp:
        if (e.target instanceof TreeItem) {
          this.focusNextNode(-1, e.target);
        }
        return;
      case keyEnter:
        // In single-select trees where selection does not follow focus (see note below),
        // the default action is typically to select the focused node.
        this.handleClick(e as Event);
        return;
      case keySpace:
        if (e.target instanceof TreeItem) {
          e.target.toggleSelection();
        }
        return;
    }

    // don't prevent default if we took no action
    return true;
  };

  /**
   * Handle focus events
   *
   * @internal
   */
  handleFocus = (e: FocusEvent): void => {
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
  handleBlur = (e: FocusEvent): void => {
    if (e.target instanceof HTMLElement && (e.relatedTarget === null || !this.contains(e.relatedTarget as Node))) {
      this.setAttribute('tabindex', '0');
    }
  };

  /**
   * Handles click events bubbling up
   *
   *  @internal
   */
  handleClick(e: Event) {
    if (e.defaultPrevented) {
      // handled, do nothing
      return;
    }

    if (!(e.target instanceof TreeItem)) {
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
  handleSelectedChange = (e: Event): boolean | void => {
    if (e.defaultPrevented) {
      return;
    }

    if (!(e.target instanceof TreeItem)) {
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

  /**
   * Indicates that this is a tree-view element
   */
  private isTreeView = true;

  private getVisibleNodes(): HTMLElement[] {
    return getDisplayedNodes(this, "[role='treeitem']") || [];
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
