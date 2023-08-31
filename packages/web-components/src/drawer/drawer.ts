import { attr, css, FASTElement, observable, Updates } from '@microsoft/fast-element';
import { keyEscape } from '@microsoft/fast-web-utilities';
import { colorNeutralStroke1, colorTransparentStroke } from '../theme/design-tokens.js';
import { DrawerPosition, DrawerSize } from './drawer.options.js';

export interface OpenEvent {
  open: boolean;
  position?: string;
  controlSize?: DrawerSize | number;
}

export class Drawer extends FASTElement {
  public connectedCallback(): void {
    super.connectedCallback();
    this.setOverflowStyles();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  /**
   * The content container.
   * @public
   * @remarks
   * HTML Attribute: content
   */
  @observable
  public content?: HTMLElement;

  /**
   * The root element.
   * @public
   * @remarks
   * HTML Attribute: root
   */
  @observable
  public root?: HTMLElement;

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
  public controlSize?: DrawerSize;

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
   * Opens the drawer.
   * @public
   */
  public openDrawer(): void {
    this.open = true;
  }

  /**
   * Closes the drawer.
   * @public
   */
  public closeDrawer(): void {
    this.open = false;
  }

  /**
   * Toggles the state of the drawer (open/closed).
   * @public
   */
  public toggleDrawer(): void {
    if (this.open) {
      this.closeDrawer();
    } else {
      this.openDrawer();
    }
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
      let controlSize;
      switch (this.controlSize) {
        case 'small':
          controlSize = 320;
          break;
        case 'medium':
          controlSize = 592;
          break;
        case 'large':
          controlSize = 940;
          break;
      }
      if (!controlSize) {
        controlSize = parseFloat(window.getComputedStyle(this).width);
      }
      const eventDetail: OpenEvent = {
        open: this.open,
        position: this.position ? this.position : 'right',
        controlSize: controlSize,
      };
      const event = new CustomEvent<OpenEvent>('openChanged', {
        detail: eventDetail,
      });
      this.dispatchEvent(event);
    }
  }

  /**
   * Sets the overflow styles
   * @private
   */
  private setOverflowStyles(): void {
    Updates.enqueue(() => {
      if (this.content && this.content.scrollHeight > this.content.clientHeight) {
        this.$fastController.addStyles(css`
          :host {
            --overflow-border: ${colorNeutralStroke1};
          }
        `);
      } else {
        this.$fastController.addStyles(css`
          :host {
            --overflow-border: ${colorTransparentStroke};
          }
        `);
      }
    });
  }

  /**
   * Handles the keydown event on the document.
   * @param e - The KeyboardEvent object.
   * @internal
   */
  public handleKeyDown(e: KeyboardEvent): boolean | void {
    if (e.defaultPrevented) {
      return;
    }
    const key = e.key;
    switch (key) {
      case keyEscape:
        e.preventDefault();
        this.blur();
        this.closeDrawer();
      default:
        return true;
    }
  }
}
