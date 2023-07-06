import { attr, FASTElement } from '@microsoft/fast-element';
import { isHTMLElement, keyEscape } from '@microsoft/fast-web-utilities';
import { DrawerPosition, DrawerSize } from './drawer.options.js';

export interface OpenEvent {
  expanded: boolean;
  position?: string;
  controlSize?: DrawerSize | number;
}

export class Drawer extends FASTElement {
  private drawers: Drawer[] = [];

  public connectedCallback(): void {
    super.connectedCallback();
    // Register event listener
    this.addEventListener('keydown', this.handleKeyDown);
    this.addEventListener('close-drawer', this.close);
    this.setItems();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    // Unregister event listener
    this.removeEventListener('keydown', this.handleKeyDown);
    this.removeEventListener('close-drawer', this.close);
  }

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
   * Determines the expanded state of the drawer
   * @public
   * @remarks
   * HTML Attribute: modal
   */
  @attr({ mode: 'boolean' })
  public expanded: boolean = false;

  /**
   * Determines whether the drawer renders with compact styling.
   * @public
   * @remarks
   * HTML Attribute: modal
   */
  @attr({ mode: 'boolean' })
  public compact: boolean = false;

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
   * The maximum number of options to display.
   *
   * @remarks
   * HTML Attribute: `size`.
   *
   * @public
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

  public open() {
    this.expanded = true;
  }

  public close() {
    console.log('close');
    this.expanded = false;
  }

  /**
   * check if the item is a drawer
   */
  private dialogRoles = ['dialog', 'complementary'];
  private isDrawerElement = (el: HTMLElement | Drawer): boolean => {
    return el instanceof Drawer || (isHTMLElement(el) && this.dialogRoles.includes(el.getAttribute('role') as string));
  };

  protected setItems(): void {
    const slottedDrawers = this.querySelectorAll<Drawer>('fluent-drawer');
    this.drawers = Array.from(slottedDrawers);

    /**
     * Set the context of the Drawer
     * When the drawer is a child component of the DrawerSwitcher
     * we want to signal this through an attribute to update styles.
     */
    const filteredDrawerItems = this.drawers?.filter(this.isDrawerElement);

    filteredDrawerItems?.forEach((item: HTMLElement, index: number) => {
      if (item instanceof Drawer) {
        item.setAttribute('data-context', `drawer-switcher`);
      }
    });
  }

  /**
   * Handles keydown events for the drawer.
   * @param event - The keyboard event.
   * @public
   */
  public handleKeyDown = (event: KeyboardEvent): void => {
    switch (event.key) {
      case keyEscape:
        // Close drawer and return focus to the toggle button when the escape key is pressed
        event.preventDefault();
        this.close();
        break;
      default:
        break;
    }
  };
}
