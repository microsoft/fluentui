import { attr, FASTElement, observable, Updates } from '@microsoft/fast-element';
import { isTabbable } from 'tabbable';
import { keyEscape, keyTab } from '@microsoft/fast-web-utilities';
import { Button as FluentButton } from '../button/button.js';
import { DialogModalType } from './dialog.options.js';

/**
 * Dialog component that extends the FASTElement class.
 *
 * @public
 * @extends FASTElement
 */
export class Dialog extends FASTElement {
  /**
   * @private
   * Indicates whether focus is being trapped within the dialog
   */
  private isTrappingFocus: boolean = false;

  /**
   * @public
   * Lifecycle method called when the element is connected to the DOM
   */
  public connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('keydown', this.handleDocumentKeydown);
    Updates.enqueue(() => {
      this.updateTrapFocus();
      this.setComponent();
    });
  }

  /**
   * @public
   * Lifecycle method called when the element is disconnected from the DOM
   */
  public disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this.handleDocumentKeydown);
    this.updateTrapFocus(false);
  }

  /**
   * @public
   * The dialog element
   */
  @observable
  public dialog!: HTMLDialogElement;

  /**
   * @public
   * The title action elements
   */
  @observable
  public titleAction: HTMLElement[] = [];

  /**
   * @public
   * The default title action button
   */
  @observable
  public defaultTitleAction?: FluentButton;

  /**
   * @public
   * The ID of the element that describes the dialog
   */
  @attr({ attribute: 'aria-describedby' })
  public ariaDescribedby?: string;

  /**
   * @public
   * The ID of the element that labels the dialog
   */
  @attr({ attribute: 'aria-labelledby' })
  public ariaLabelledby?: string;

  /**
   * @public
   * The type of the dialog modal
   */
  @attr({ attribute: 'modal-type' })
  public modalType: DialogModalType = DialogModalType.modal;

  /**
   * @public
   * Indicates whether the dialog is open
   */
  @attr({ mode: 'boolean' })
  public open: boolean = false;

  /**
   * @public
   * Indicates whether the dialog has a title action
   */
  @attr({ mode: 'boolean', attribute: 'no-title-action' })
  public noTitleAction: boolean = false;

  /**
   * @private
   * Indicates whether focus should be trapped within the dialog
   */
  private trapFocus: boolean = false;

  /**
   * @public
   * Method called when the 'open' attribute changes
   */
  public openChanged(oldValue: boolean, newValue: boolean): void {
    if (newValue !== oldValue) {
      if (newValue && !oldValue) {
        this.show();
      } else if (!newValue && oldValue) {
        this.hide();
      }
    }
  }

  /**
   * @public
   * Method called when the 'modalType' attribute changes
   */
  public modalTypeChanged(oldValue: DialogModalType, newValue: DialogModalType): void {
    if (newValue !== oldValue) {
      if (newValue == DialogModalType.alert || newValue == DialogModalType.modal) {
        this.trapFocus = true;
      } else {
        this.trapFocus = false;
      }
    }
  }

  /**
   * @public
   * Method to set the component's state based on its attributes
   */
  public setComponent(): void {
    if (this.modalType == DialogModalType.modal || this.modalType == DialogModalType.alert) {
      this.trapFocus = true;
    } else {
      this.trapFocus = false;
    }
  }

  /**
   * @public
   * Method to emit an event when the dialog's open state changes
   * @param dismissed - Indicates whether the dialog was dismissed
   */
  public onOpenChangeEvent = (dismissed: boolean = false): void => {
    this.$emit('onOpenChange', { open: this.dialog.open, dismissed: dismissed });
  };

  /**
   * @public
   * Method to show the dialog
   */
  public show(): void {
    Updates.enqueue(() => {
      if (this.modalType === DialogModalType.alert || this.modalType === DialogModalType.modal) {
        this.dialog.showModal();
        this.open = true;
        this.updateTrapFocus(true);
      } else if (this.modalType === DialogModalType.nonModal) {
        this.dialog.show();
        this.open = true;
      }
      this.onOpenChangeEvent();
    });
  }

  /**
   * @public
   * Method to hide the dialog
   * @param dismissed - Indicates whether the dialog was dismissed
   */
  public hide(dismissed: boolean = false): void {
    this.dialog.close();
    this.open = false;
    this.onOpenChangeEvent(dismissed);
  }

  /**
   * @public
   * Method to dismiss the dialog
   */
  public dismiss(): void {
    if (this.modalType === DialogModalType.alert) {
      return;
    }
    this.hide(true);
  }

  /**
   * @public
   * Handles click events on the dialog
   * @param event - The click event
   * @returns boolean
   */
  public handleClick(event: Event): boolean {
    event.preventDefault();
    if (this.dialog.open && this.modalType !== DialogModalType.alert && event.target === this.dialog) {
      this.dismiss();
    }
    return true;
  }

  /**
   * @public
   * Handles keydown events on the dialog
   * @param e - The keydown event
   * @returns boolean | void
   */
  public handleKeydown = (e: KeyboardEvent): boolean | void => {
    if (e.defaultPrevented) {
      return;
    }
    switch (e.key) {
      case keyEscape:
        if (this.modalType !== DialogModalType.alert) {
          this.hide(true);
          this.$emit('dismiss');
        }
        break;
      default:
        return true;
    }
  };

  /**
   * @private
   * Handles keydown events on the document
   * @param e - The keydown event
   */
  private handleDocumentKeydown = (e: KeyboardEvent): void => {
    if (!e.defaultPrevented && this.dialog.open) {
      switch (e.key) {
        case keyTab:
          this.handleTabKeyDown(e);
          break;
      }
    }
  };

  /**
   * @private
   * Handles tab keydown events
   * @param e - The keydown event
   */
  private handleTabKeyDown = (e: KeyboardEvent): void => {
    if (!this.trapFocus || !this.dialog.open) {
      return;
    }

    const bounds: (HTMLElement | SVGElement)[] = this.getTabQueueBounds();

    if (bounds.length === 1) {
      bounds[0].focus();
      e.preventDefault();
      return;
    }

    if (e.shiftKey && e.target === bounds[0]) {
      bounds[bounds.length - 1].focus();
      e.preventDefault();
    } else if (!e.shiftKey && e.target === bounds[bounds.length - 1]) {
      bounds[0].focus();
      e.preventDefault();
    }

    return;
  };

  /**
   * @private
   * Gets the bounds of the tab queue
   * @returns (HTMLElement | SVGElement)[]
   */
  private getTabQueueBounds = (): (HTMLElement | SVGElement)[] => {
    const bounds: HTMLElement[] = [];

    return Dialog.reduceTabbableItems(bounds, this);
  };

  /**
   * @private
   * Focuses the first element in the tab queue
   */
  private focusFirstElement = (): void => {
    const bounds: (HTMLElement | SVGElement)[] = this.getTabQueueBounds();

    if (bounds.length > 0) {
      bounds[0].focus();
    } else {
      if (this.dialog instanceof HTMLElement) {
        this.dialog.focus();
      }
    }
  };

  /**
   * @private
   * Determines if focus should be forced
   * @param currentFocusElement - The currently focused element
   * @returns boolean
   */
  private shouldForceFocus = (currentFocusElement: Element | null): boolean => {
    return this.isTrappingFocus && !this.contains(currentFocusElement);
  };

  /**
   * @private
   * Determines if focus should be trapped
   * @returns boolean
   */
  private shouldTrapFocus = (): boolean => {
    return this.trapFocus && this.dialog.open;
  };

  /**
   * @private
   * Handles focus events on the document
   * @param e - The focus event
   */
  private handleDocumentFocus = (e: Event): void => {
    if (!e.defaultPrevented && this.shouldForceFocus(e.target as HTMLElement)) {
      this.focusFirstElement();
      e.preventDefault();
    }
  };

  /**
   * @private
   * Updates the state of focus trapping
   * @param shouldTrapFocusOverride - Optional override for whether focus should be trapped
   */
  private updateTrapFocus = (shouldTrapFocusOverride?: boolean): void => {
    const shouldTrapFocus = shouldTrapFocusOverride === undefined ? this.shouldTrapFocus() : shouldTrapFocusOverride;

    if (shouldTrapFocus && !this.isTrappingFocus) {
      this.isTrappingFocus = true;
      // Add an event listener for focusin events if we are trapping focus
      document.addEventListener('focusin', this.handleDocumentFocus);
      Updates.enqueue(() => {
        if (this.shouldForceFocus(document.activeElement)) {
          this.focusFirstElement();
        }
      });
    } else if (!shouldTrapFocus && this.isTrappingFocus) {
      this.isTrappingFocus = false;
      // remove event listener if we are not trapping focus
      document.removeEventListener('focusin', this.handleDocumentFocus);
    }
  };

  /**
   * @private
   * Reduces the list of tabbable items
   * @param elements - The current list of elements
   * @param element - The element to consider adding to the list
   * @returns HTMLElement[]
   */
  private static reduceTabbableItems(elements: HTMLElement[], element: FASTElement): HTMLElement[] {
    if (element.getAttribute('tabindex') === '-1') {
      return elements;
    }

    if (isTabbable(element) || (Dialog.isFocusableFastElement(element) && Dialog.hasTabbableShadow(element))) {
      elements.push(element);
      return elements;
    }

    return Array.from(element.children).reduce<HTMLElement[]>(
      (elements, currentElement) => Dialog.reduceTabbableItems(elements, currentElement as FASTElement),
      elements,
    );
  }

  /**
   * @private
   * Determines if an element is a focusable FASTElement
   * @param element - The element to check
   * @returns boolean
   */
  private static isFocusableFastElement(element: FASTElement): boolean {
    return !!element.$fastController?.definition.shadowOptions?.delegatesFocus;
  }

  /**
   * @private
   * Determines if an element has a tabbable shadow
   * @param element - The element to check
   * @returns boolean
   */
  private static hasTabbableShadow(element: FASTElement) {
    return Array.from(element.shadowRoot?.querySelectorAll('*') ?? []).some(x => {
      return isTabbable(x);
    });
  }
}
