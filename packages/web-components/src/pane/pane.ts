import { attr, FASTElement, observable, Updates } from '@microsoft/fast-element';
import { PanePosition, PaneSize } from './pane.options.js';

export interface OpenEvent {
  open: boolean;
  position?: string;
  controlSize?: PaneSize | number;
}

// The Pane class extends the FASTElement which provides a foundation for creating
// custom elements using FAST. It extends the HTMLElement interface of the browser.
export class Pane extends FASTElement {
  public connectedCallback(): void {
    super.connectedCallback();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  private hasInteracted: boolean = false;

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
   * Determines whether the drawer should be displayed as modal or non-modal.
   * When in modal mode, an overlay is applied over the rest of the view.
   * @public
   * @remarks
   * HTML Attribute: modal
   */
  @attr({ mode: 'boolean' })
  public modal: boolean = false;

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
   * Indicates whether the drawer is open or closed.
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
   * Determines whether the focus should be trapped within the Drawer when it is open.
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
    if (!this.open && !this.hasInteracted) {
      // Only update the hasInteracted flag if the pane is closed and hasn't been interacted with yet
      this.hasInteracted = true;
    }

    if (!this.open) {
      this.previousActiveElement = document.activeElement as HTMLElement;
    } else if (this.previousActiveElement) {
      Updates.enqueue(() => this.previousActiveElement?.focus());
    }
    this.open = !this.open;

    if (this.open) {
      this.focus();
    }
    this.$emit('toggled', { open: this.open, position: this.position, controlSize: this.controlSize });
  }

  /**
   * Shows the pane.
   * @public
   */
  public openPane(): void {
    this.previousActiveElement = document.activeElement as HTMLElement;
    this.open = true;
    this.$emit('opened', { open: true, position: this.position, controlSize: this.controlSize });
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
}
