import { attr, FASTElement, observable, Updates, ViewTemplate } from '@microsoft/fast-element';
import { keyEscape } from '@microsoft/fast-web-utilities';
import { DrawerPosition, DrawerSize } from './drawer.options.js';

export interface OpenEvent {
  open: boolean;
  position?: string;
  controlSize?: DrawerSize | number;
}

export class Drawer extends FASTElement {
  private hasInteracted: boolean = false;

  // The previous active element before opening the drawer.
  private previousActiveElement?: HTMLElement;

  public connectedCallback(): void {
    super.connectedCallback();

    this.updateTrapFocus();
    this.setDrawerWidth();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();

    this.updateTrapFocus(false);
  }

  private _drawer?: HTMLElement;

  /**
   * Determines whether the focus should be trapped within the Drawer when it is open.
   * @public
   * @remarks
   * HTML Attribute: no-trap-focus
   */
  @attr({ attribute: 'trap-focus', mode: 'boolean' })
  public trapFocus: boolean = false;

  /**
   * The drawer element.
   * @public
   * @remarks
   * HTML Attribute: drawer
   */
  @observable
  public drawer?: HTMLElement;

  /**
   * Indicates whether the drawer is open or closed.
   * @public
   * @remarks
   * HTML Attribute: open
   */
  @observable
  @attr({ mode: 'boolean' })
  public open: boolean = false;

  /**
   * Determines whether the drawer should be displayed as modal or non-modal.
   * When in modal mode, an overlay is applied over the rest of the view.
   * @public
   * @remarks
   * HTML Attribute: modal
   */
  @attr({ mode: 'boolean' })
  public modal: boolean = false;

  /**
   * Sets the position of the drawer (left/right).
   * @public
   * @remarks
   * HTML Attribute: position
   * @defaultValue right
   */
  @attr
  public position?: DrawerPosition;

  /**
   * Sets the control size of the drawer (small/medium/large).
   * @public
   * @remarks
   * HTML Attribute: control-size
   * @defaultValue medium
   */
  @attr({ attribute: 'control-size' })
  public controlSize?: DrawerSize | number = DrawerSize.medium;

  /**
   * Sets the aria-labelledby attribute of the drawer.
   * @public
   * @remarks
   * HTML Attribute: aria-labelledby
   */
  @attr({ attribute: 'aria-labelledby' })
  public ariaLabelledby?: string;

  /**
   * Sets the aria-describedby attribute of the drawer.
   * @public
   * @remarks
   * HTML Attribute: aria-describedby
   */
  @attr({ attribute: 'aria-describedby' })
  public ariaDescribedby?: string;

  /**
   * Indicates the presence of the toolbar.
   * @public
   * @remarks
   * HTML Attribute: toolbar
   */
  @attr({ mode: 'boolean' })
  public toolbar: boolean = false;

  /**
   * The element to receive focus when the drawer opens.
   * @public
   * @remarks
   * HTML Attribute: focus-target
   */
  @attr({ attribute: 'focus-target' })
  public focusTarget?: string;

  /**
   * Shows the drawer.
   * @public
   */
  public openDrawer(): void {
    this.previousActiveElement = document.activeElement as HTMLElement;
    this.open = true;
    this.$emit('opened', { open: true, position: this.position, controlSize: this.controlSize });
  }

  /**
   * Hides the drawer.
   * @public
   */
  public closeDrawer(): void {
    this.open = false;
    this.$emit('closed', { open: false, position: this.position, controlSize: this.controlSize });

    if (this.previousActiveElement) {
      Updates.enqueue(() => this.previousActiveElement?.focus());
    }
  }

  /**
   * Toggles the state of the drawer (open/closed).
   * @public
   */
  public toggleDrawer(): void {
    if (!this.open && !this.hasInteracted) {
      // Only update the hasInteracted flag if the drawer is closed and hasn't been interacted with yet
      this.hasInteracted = true;
    }

    if (!this.open) {
      this.previousActiveElement = document.activeElement as HTMLElement;
    } else if (this.previousActiveElement) {
      Updates.enqueue(() => this.previousActiveElement?.focus());
    }
    this.open = !this.open;
  }

  /**
   * Handles changes to the `open` property.
   * @param prev - The previous value of `open`.
   * @param next - The new value of `open`.
   * @remarks
   * This method is invoked when the `open` property changes and is responsible for updating the focus and emitting the `change` event.
   * @internal
   */
  public openChanged(prev: boolean, next: boolean): void {
    if (this.$fastController.isConnected) {
      const eventDetail: OpenEvent = {
        open: this.open,
        position: this.position,
        controlSize: this.controlSize,
      };
      const event = new CustomEvent<OpenEvent>('open', {
        detail: eventDetail,
      });
      this.dispatchEvent(event);
    }
    Updates.enqueue(() => {
      if (next) {
        // Focus on open if the drawer has been interacted with
        if (this.hasInteracted) {
          this.focusTargetElement();
        }
      } else {
        // Return focus to element that opened the drawer
        const trigger = document.activeElement;
        if (trigger && trigger instanceof HTMLElement) {
          trigger.focus();
        }
      }
      this.updateTrapFocus();
    });
  }

  /**
   * Focuses the target element within the drawer.
   * @internal
   */
  private focusTargetElement(): void {
    if (this.focusTarget && this._drawer) {
      let targetElement = this.findFocusTargetInShadowDom(this._drawer, this.focusTarget);
      if (!targetElement) {
        targetElement = document.getElementById(this.focusTarget);
      }
      if (targetElement instanceof HTMLElement) {
        targetElement.focus();
        return;
      }
    }
    this.focusFirstElement();
  }

  /**
   * Sets the width of the drawer based on the control size.
   * @private
   */
  private setDrawerWidth(): void {
    const sizeValue: DrawerSize | number | undefined = this.controlSize;
    let width: number | undefined;

    if (typeof sizeValue === 'string' && Object.values(DrawerSize).includes(sizeValue as DrawerSize)) {
      // Size value is one of the predefined options from DrawerSize
      // Assign the corresponding width value based on the option
      switch (sizeValue as DrawerSize) {
        case DrawerSize.small:
          width = 320;
          break;
        case DrawerSize.medium:
          width = 592;
          break;
        case DrawerSize.large:
          width = 940;
          break;
        default:
          break;
      }
    } else {
      // Size value is a number
      // Convert it to a valid width value
      width = parseInt(sizeValue as string, 10);
    }

    if (width !== undefined && !isNaN(width)) {
      // Set the CSS custom property to adjust the drawer width
      this.style.setProperty('--drawer-width', `${width}px`);
    }
  }

  /**
   * Finds the focus target element within the Shadow DOM.
   * @param element - The root element to search.
   * @param targetId - The ID of the focus target element.
   * @returns The focus target element if found, otherwise null.
   * @internal
   */
  private findFocusTargetInShadowDom(element: HTMLElement, targetId: string): HTMLElement | null {
    const shadowRoot = element.shadowRoot;
    if (shadowRoot) {
      const targetElement = shadowRoot.getElementById(targetId);
      if (targetElement instanceof HTMLElement) {
        return targetElement;
      }

      const childElements = shadowRoot.querySelectorAll('*');
      for (let i = 0; i < childElements.length; i++) {
        const foundElement = this.findFocusTargetInShadowDom(childElements[i] as HTMLElement, targetId);
        if (foundElement) {
          return foundElement;
        }
      }
    }

    return null;
  }

  /**
   * Handles the keydown event on the document.
   * @param e - The KeyboardEvent object.
   * @internal
   */
  public handleKeydown(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      // Handle the Escape key press
      this.closeDrawer();
      e.preventDefault();
    }
  }

  /**
   * Handles the focus event on the document.
   * @param e - The Event object.
   * @internal
   */
  private handleDocumentFocus = (e: Event): void => {
    if (!e.defaultPrevented && this.shouldForceFocus(e.target as HTMLElement)) {
      this.focusFirstElement();
      e.preventDefault();
    }
  };

  /**
   * Focuses the first element within the drawer.
   * @internal
   */
  private focusFirstElement(): void {
    const focusableElement = this.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (focusableElement) {
      focusableElement.focus();
    }
  }

  /**
   * Determines whether the current focused element should force focus within the drawer.
   * @param currentFocusElement - The current focused element.
   * @returns True if the focus should be forced within the drawer, false otherwise.
   * @internal
   */
  private shouldForceFocus(currentFocusElement: Element | null): boolean {
    return !this.contains(currentFocusElement);
  }

  /**
   * Determines whether the focus should be trapped within the drawer.
   * @returns True if the focus should be trapped within the drawer, false otherwise.
   * @internal
   */
  private shouldTrapFocus(): boolean {
    return this.trapFocus && this.open;
  }

  /**
   * Updates the trapping focus behavior based on the current state.
   * @param shouldTrapFocusOverride - Optional parameter to override the default trapping focus behavior.
   * @internal
   */
  private updateTrapFocus(shouldTrapFocusOverride?: boolean): void {
    const shouldTrapFocus = shouldTrapFocusOverride === undefined ? this.shouldTrapFocus() : shouldTrapFocusOverride;

    if (shouldTrapFocus) {
      document.addEventListener('focusin', this.handleDocumentFocus);
      Updates.enqueue(() => {
        if (this.shouldForceFocus(document.activeElement)) {
          this.focusFirstElement();
        }
      });
    } else {
      document.removeEventListener('focusin', this.handleDocumentFocus);
    }
  }
}
