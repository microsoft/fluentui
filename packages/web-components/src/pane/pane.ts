import { attr, FASTElement, observable, Updates } from '@microsoft/fast-element';
import { isHTMLElement, keyEscape, keyTab } from '@microsoft/fast-web-utilities';
import { PanePosition, PaneSize } from './pane.options.js';

export interface OpenEvent {
  open: boolean;
  position?: string;
  controlSize?: PaneSize | number;
}

// The Pane class extends the FASTElement which provides a foundation for creating
// custom elements using FAST. It extends the HTMLElement interface of the browser.
export class Pane extends FASTElement {
  private panes: Pane[] = [];

  public connectedCallback(): void {
    super.connectedCallback();
    // Register event listener
    this.addEventListener('keydown', this.handleKeyDown);
    this.setItems();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    // Unregister event listener
    this.removeEventListener('keydown', this.handleKeyDown);
  }

  // private hasInteracted: boolean = false;

  // The previous active element before opening the pane.
  private previousActiveElement?: HTMLElement;

  /**
   * The pane element.
   * @public
   * @remarks
   * HTML Attribute: pane
   */
  @observable
  public _pane?: HTMLElement;

  /**
   * Determines whether the pane should be displayed as modal or non-modal.
   * When in modal mode, an overlay is applied over the rest of the view.
   * @public
   * @remarks
   * HTML Attribute: modal
   */
  @attr({ mode: 'boolean' })
  public modal: boolean = false;

  /**
   * Determines whether the pane renders with compact styling.
   * @public
   * @remarks
   * HTML Attribute: modal
   */
  @attr({ mode: 'boolean' })
  public compact: boolean = false;

  /**
   * Sets the position of the pane (left/right).
   * @public
   * @remarks
   * HTML Attribute: position
   * @defaultValue right
   */
  @attr
  public position?: PanePosition;

  /**
   * The maximum number of options to display.
   *
   * @remarks
   * HTML Attribute: `size`.
   *
   * @public
   */
  @attr({ attribute: 'control-size' })
  public controlSize?: PaneSize | number | undefined;

  /**
   * Indicates whether the pane is open or closed.
   * @public
   * @remarks
   * HTML Attribute: open
   */
  @observable
  @attr({ mode: 'boolean' })
  public open: boolean = false;

  /**
   * Indicates the presence of the toolbar.
   * @public
   * @remarks
   * HTML Attribute: toolbar
   */
  @attr({ mode: 'boolean' })
  public toolbar?: boolean = false;

  /**
   * The element to receive focus when the pane opens.
   * @public
   * @remarks
   * HTML Attribute: focus-target
   */
  @attr({ attribute: 'focus-target' })
  public focusTarget?: string;

  /**
   * Determines whether the focus should be trapped within the Pane when it is open.
   * @public
   * @remarks
   * HTML Attribute: no-trap-focus
   */
  @attr({ attribute: 'trap-focus', mode: 'boolean' })
  public trapFocus: boolean = false;

  /**
   * Sets the aria-labelledby attribute of the pane.
   * @public
   * @remarks
   * HTML Attribute: aria-labelledby
   */
  @attr({ attribute: 'aria-labelledby' })
  public ariaLabelledby?: string;

  /**
   * Sets the aria-describedby attribute of the pane.
   * @public
   * @remarks
   * HTML Attribute: aria-describedby
   */
  @attr({ attribute: 'aria-describedby' })
  public ariaDescribedby?: string;

  /**
   * Toggles the state of the pane (open/closed).
   * @public
   */
  public togglePane(): void {
    // if (!this.open && !this.hasInteracted) {
    //   // Only update the hasInteracted flag if the pane is closed and hasn't been interacted with yet
    //   this.hasInteracted = true;
    // }

    if (!this.open) {
      this.previousActiveElement = document.activeElement as HTMLElement;
    } else if (this.previousActiveElement) {
      Updates.enqueue(() => this.previousActiveElement?.focus());
    }
    this.open = !this.open;

    this.$emit('toggled', { open: this.open, position: this.position, controlSize: this.controlSize });
    if (this.open) this.handleFocus();
  }

  /**
   * Shows the pane.
   * @public
   */
  public openPane(): void {
    this.previousActiveElement = document.activeElement as HTMLElement;
    // this.hasInteracted = true;
    this.open = true;
    this.$emit('opened', { open: true, position: this.position, controlSize: this.controlSize });
    if (this.open) this.handleFocus();
  }
  /**
   * Hides the pane.
   * @public
   */
  public closePane(): void {
    this.open = false;
    this.$emit('closed', { open: false, position: this.position, controlSize: this.controlSize });

    if (this.previousActiveElement) {
      Updates.enqueue(() => this.previousActiveElement?.focus());
    }
  }

  /**
   * check if the item is a pane
   */
  private dialogRoles = ['dialog', 'complementary'];
  private isPaneElement = (el: HTMLElement | Pane): boolean => {
    return el instanceof Pane || (isHTMLElement(el) && this.dialogRoles.includes(el.getAttribute('role') as string));
  };

  protected setItems(): void {
    const slottedPanes = this.querySelectorAll<Pane>('fluent-pane');
    this.panes = Array.from(slottedPanes);

    /**
     * Set the context of the Pane
     * When the pane is a child component of the PaneSwitcher
     * we want to signal this through an attribute to update styles.
     */
    const filteredPaneItems = this.panes?.filter(this.isPaneElement);

    filteredPaneItems?.forEach((item: HTMLElement, index: number) => {
      if (item instanceof Pane) {
        item.setAttribute('data-context', `pane-switcher`);
      }
    });
  }

  /**
   * Handles keydown events for the pane.
   * @param event - The keyboard event.
   * @public
   */
  public handleKeyDown = (event: KeyboardEvent): void => {
    if (this.trapFocus && this.open && event.key === keyTab) {
      const focusableElements: HTMLElement[] = Array.from(
        this.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),
      );

      // No focusable elements, no need to trap focus
      if (focusableElements.length === 0) return;

      const firstFocusableElement: HTMLElement = focusableElements[0];
      const lastFocusableElement: HTMLElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstFocusableElement) {
        event.preventDefault();
        lastFocusableElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusableElement) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    }
    // Close pane and return focus to the toggle button when the escape key is pressed
    if (event.key === keyEscape) {
      event.preventDefault();
      this.closePane();
    }
  };

  public handleFocus(): void {
    setTimeout(() => {
      let focusableElements: NodeListOf<Element> | null = null;

      // Search in the shadowRoot if it exists
      if (this.shadowRoot) {
        focusableElements = this.shadowRoot.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
      }

      // If no focusable elements in the shadowRoot, search in the regular DOM
      if (!focusableElements || focusableElements.length === 0) {
        focusableElements = this.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
      }

      if (focusableElements && focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      } else {
        // If no focusable elements, set focus on the pane itself
        this.focus();
      }
    }, 0);
  }
}
