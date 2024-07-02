// Copyright (C) Microsoft Corporation. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import { attr, customElement, FASTElement, observable, volatile } from '@microsoft/fast-element';
import { FluentDesignSystem } from '../fluent-design-system.js';
import { template } from './tree-item.template.js';
import { styles } from './tree-item.style.js';

@customElement({
  name: `${FluentDesignSystem.prefix}-tree-item`,
  template,
  styles,
})
export class TreeItem extends FASTElement {
  /**
   * When true, the control will be immutable by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled | disabled HTML attribute} for more information.
   * @public
   * @remarks
   * HTML Attribute: disabled
   */
  @attr({ mode: 'boolean' })
  disabled = false;

  /**
   * When true, the control will be appear expanded by user interaction.
   * @public
   * HTML Attribute: expanded
   */
  @attr({ mode: 'boolean' })
  expanded = false;
  protected expandedChanged() {
    if (this.$fastController.isConnected) {
      this.$emit('expanded-change', this);
    }
  }

  /**
   * When true, the control will appear selected by user interaction.
   * @public
   * @remarks
   * HTML Attribute: selected
   */
  @attr({ mode: 'boolean' })
  selected = false;
  protected selectedChanged(): void {
    if (this.$fastController.isConnected) {
      this.$emit('selected-change', this);
    }
  }

  /**
   * The size of the tree item element
   */
  @observable
  size: 'medium' | 'small' = 'medium';
  private sizeChanged() {
    this.updateChildTreeItems();
  }

  /**
   * The size of the tree item element
   */
  @observable
  appearance: 'subtle' | 'subtle-alpha' | 'transparent' = 'subtle';
  private appearanceChanged() {
    this.updateChildTreeItems();
  }

  @observable
  childTreeItems: TreeItem[] = [];
  private childTreeItemsChanged() {
    this.updateChildTreeItems();
  }

  /**
   * 1. Update the child items' size based on the tree-view's size
   * 2. Update the child items' appearance based on the tree-view's appearance
   */
  private updateChildTreeItems() {
    if (!this.childTreeItems || !this.childTreeItems.length) {
      return;
    }
    this.childTreeItems.forEach(item => {
      item.size = this.size;
      item.appearance = this.appearance;
    });
  }

  /**
   * Handle focus events
   *
   * @internal
   */
  handleFocus = (e: FocusEvent): void => {
    if (e.target === this) {
      this.setAttribute('tabindex', '0');
    }
  };

  /**
   * Handle blur events
   *
   * @internal
   */
  handleBlur = (e: FocusEvent): void => {
    if (e.target === this) {
      this.setAttribute('tabindex', '-1');
    }
  };

  /**
   * Toggle the expansion state of the tree item
   */
  toggleExpansion() {
    if (!this.disabled && this.childTreeItems.length) {
      this.expanded = !this.expanded;
    }
  }

  /**
   * Toggle the single selection state of the tree item
   */
  toggleSelection() {
    if (!this.disabled) {
      this.selected = !this.selected;
    }
  }

  /**
   * Whether the tree is nested
   * @internal
   */
  get isNestedItem() {
    return this.parentElement instanceof TreeItem;
  }

  /**
   * Whether the tree is an root item
   * @internal
   */
  get isRootItem() {
    return this.parentElement && (this.parentElement as any).isTreeView;
  }

  /**
   * Calculate the class list that should be applied to the positioning-region
   * @internal
   */
  @volatile
  get calculatedClassName() {
    let className = '';
    if (!this.childTreeItems.length) {
      className += 'leaf';
    }
    if (this.isRootItem) {
      className += ' root-item';
    }
    className += ` ${this.size} ${this.appearance}`;
    return className.trim();
  }
}
