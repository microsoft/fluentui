import { attr, FASTElement, Observable, observable } from '@microsoft/fast-element';
import { isAccordionItem } from '../accordion-item/accordion-item.definition.js';
import type { BaseAccordionItem } from '../accordion-item/accordion-item.js';
import { AccordionExpandMode } from './accordion.options.js';

/**
 * An Accordion Custom HTML Element
 * Implements {@link https://www.w3.org/TR/wai-aria-practices-1.1/#accordion | ARIA Accordion}.
 *
 * @slot - The default slot for the accordion items
 * @fires change - Fires a custom 'change' event when the active item changes
 *
 * @public
 */
export class Accordion extends FASTElement {
  /**
   * Controls the expand mode of the Accordion, either allowing
   * single or multiple item expansion.
   * @public
   *
   * @remarks
   * HTML attribute: expand-mode
   */
  @attr({ attribute: 'expand-mode' })
  public expandmode: AccordionExpandMode = AccordionExpandMode.multi;
  public expandmodeChanged(prev: AccordionExpandMode, next: AccordionExpandMode) {
    if (!this.$fastController.isConnected) {
      return;
    }

    const expandedItem = this.findExpandedItem();

    if (!expandedItem) {
      return;
    }

    if (next === AccordionExpandMode.single) {
      this.setSingleExpandMode(expandedItem);
      return;
    }

    // Clean up single expand mode behavior
    (expandedItem as BaseAccordionItem)?.expandbutton.removeAttribute('aria-disabled');
  }

  /**
   * @internal
   */
  @observable
  public slottedAccordionItems!: HTMLElement[];

  /**
   * @internal
   */
  protected accordionItems!: BaseAccordionItem[];

  /**
   * @internal
   */
  public slottedAccordionItemsChanged(oldValue: HTMLElement[], newValue: HTMLElement[]): void {
    if (this.$fastController.isConnected) {
      this.setItems();
    }
  }

  /**
   * Watch for changes to the slotted accordion items `disabled` and `expanded` attributes
   * @internal
   */
  public handleChange(source: any, propertyName: string) {
    if (propertyName === 'disabled') {
      this.setItems();
    } else if (propertyName === 'expanded') {
      // we only need to manage single expanded instances
      // such as scenarios where a child is programatically expanded
      if (source.expanded && this.isSingleExpandMode()) {
        this.setSingleExpandMode(source);
      }
    }
  }

  /**
   * Find the first expanded item in the accordion.
   *
   * @internal
   */
  private findExpandedItem(): BaseAccordionItem | null {
    return this.accordionItems.find(item => item.expanded) ?? this.accordionItems[0];
  }

  /**
   * Resets event listeners and sets the `accordionItems` property, then rebinds event listeners to each enabled item.
   *
   * @internal
   */
  private setItems = (): void => {
    if (this.slottedAccordionItems.length === 0) {
      return;
    }

    // Get all existing children and remove event listeners
    const children: Element[] = Array.from(this.children);
    this.removeItemListeners(children);

    // Resubscribe to the `disabled` attribute of all children
    children.forEach((child: Element) => Observable.getNotifier(child).subscribe(this, 'disabled'));

    // Add event listeners to each non-disabled AccordionItem
    this.accordionItems = children.filter(isAccordionItem);

    this.accordionItems.forEach(item => {
      if (item.disabled) {
        return;
      }

      item.addEventListener('click', this.expandedChangedHandler);
      Observable.getNotifier(item).subscribe(this, 'expanded');
    });

    if (this.isSingleExpandMode()) {
      const expandedItem = this.findExpandedItem() as BaseAccordionItem;
      this.setSingleExpandMode(expandedItem);
    }
  };

  /**
   * Checks if the accordion is in single expand mode.
   *
   * @internal
   */
  private isSingleExpandMode(): boolean {
    return this.expandmode === AccordionExpandMode.single;
  }

  /**
   * Controls the behavior of the accordion in single expand mode.
   *
   * @param expandedItem - The item to expand in single expand mode
   *
   * @internal
   */
  private setSingleExpandMode(expandedItem: BaseAccordionItem): void {
    if (!this.accordionItems.length) {
      return;
    }

    this.accordionItems.filter(isAccordionItem).forEach(item => {
      if (item === expandedItem) {
        item.expanded = true;
        item.expandbutton.setAttribute('aria-disabled', 'true');
        return;
      }

      item.expanded = false;
      if (!item.hasAttribute('disabled')) {
        item.expandbutton.removeAttribute('aria-disabled');
      }
    });
  }

  /**
   * Removes event listeners from the previous accordion items.
   *
   * @param oldValue - An array of the previous accordion items
   * @internal
   */
  private removeItemListeners = (oldValue: any): void => {
    oldValue.forEach((item: HTMLElement, index: number) => {
      Observable.getNotifier(item).unsubscribe(this, 'disabled');
      Observable.getNotifier(item).unsubscribe(this, 'expanded');
      item.removeEventListener('click', this.expandedChangedHandler);
    });
  };

  /**
   * Changes the expanded state of the accordion item.
   *
   * @param evt - The click event
   * @internal
   */
  private expandedChangedHandler: EventListener = (evt: Event): void => {
    const item = evt.target as HTMLElement;

    if (!isAccordionItem(item)) {
      return;
    }

    if (this.isSingleExpandMode()) {
      this.setSingleExpandMode(item);
    } else {
      item.expanded = !item.expanded;
    }

    this.$emit('change');
  };
}
