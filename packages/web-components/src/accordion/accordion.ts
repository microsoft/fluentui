import { Observable } from '@microsoft/fast-element';
import { attr, FASTElement, observable } from '@microsoft/fast-element';
import { BaseAccordionItem } from '../accordion-item/accordion-item.base.js';
import { AccordionExpandMode } from './accordion.options.js';

/**
 * An Accordion Custom HTML Element
 * Implements {@link https://www.w3.org/TR/wai-aria-practices-1.1/#accordion | ARIA Accordion}.
 *
 * @tag fluent-accordion
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
  protected accordionItems!: Element[];

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

  private activeItemIndex: number = 0;

  /**
   * Find the first expanded item in the accordion
   * @returns {void}
   */
  private findExpandedItem(): BaseAccordionItem | Element | null {
    if (this.accordionItems.length === 0) {
      return null;
    }

    return (
      this.accordionItems.find(
        (item: Element | BaseAccordionItem) => item instanceof BaseAccordionItem && item.expanded,
      ) ?? this.accordionItems[0]
    );
  }

  /**
   * Resets event listeners and sets the `accordionItems` property
   * then rebinds event listeners to each non-disabled item
   * @returns {void}
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
    this.accordionItems = children.filter(child => !child.hasAttribute('disabled'));
    this.accordionItems.forEach((item: Element, index: number) => {
      item.addEventListener('click', this.expandedChangedHandler);
      // Subscribe to the expanded attribute of the item
      Observable.getNotifier(item).subscribe(this, 'expanded');
    });

    if (this.isSingleExpandMode()) {
      const expandedItem = this.findExpandedItem() as BaseAccordionItem;
      this.setSingleExpandMode(expandedItem);
    }
  };

  /**
   * Checks if the accordion is in single expand mode
   * @returns {boolean}
   */
  private isSingleExpandMode(): boolean {
    return this.expandmode === AccordionExpandMode.single;
  }

  /**
   * Controls the behavior of the accordion in single expand mode
   * @param expandedItem The item to expand in single expand mode
   * @returns {void}
   */
  private setSingleExpandMode(expandedItem: Element): void {
    if (this.accordionItems.length === 0) {
      return;
    }
    const currentItems = Array.from(this.accordionItems);
    this.activeItemIndex = currentItems.indexOf(expandedItem);

    currentItems.forEach((item: Element, index: number) => {
      if (item instanceof BaseAccordionItem) {
        if (this.activeItemIndex === index) {
          item.expanded = true;
          item.expandbutton.setAttribute('aria-disabled', 'true');
        } else {
          item.expanded = false;

          if (!item.hasAttribute('disabled')) {
            item.expandbutton.removeAttribute('aria-disabled');
          }
        }
      }
    });
  }

  /**
   * Removes event listeners from the previous accordion items
   * @param oldValue An array of the previous accordion items
   */
  private removeItemListeners = (oldValue: any): void => {
    oldValue.forEach((item: HTMLElement, index: number) => {
      Observable.getNotifier(item).unsubscribe(this, 'disabled');
      Observable.getNotifier(item).unsubscribe(this, 'expanded');
      item.removeEventListener('click', this.expandedChangedHandler);
    });
  };

  /**
   * Changes the expanded state of the accordion item
   * @param evt Click event
   * @returns
   */
  private expandedChangedHandler: EventListener = (evt: Event): void => {
    const item = evt.target as HTMLElement;

    if (item instanceof BaseAccordionItem) {
      if (!this.isSingleExpandMode()) {
        item.expanded = !item.expanded;
        // setSingleExpandMode sets activeItemIndex on its own
        this.activeItemIndex = this.accordionItems.indexOf(item);
      } else {
        this.setSingleExpandMode(item);
      }

      this.$emit('change');
    }
  };
}
