import { FASTMenu } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

/**
 * The base class used for constructing a fluent-menu custom element
 * @public
 */
export class Menu extends FASTMenu {
  /**
   * sets menuitem styles to align content when checkmarks are present
   *
   * @public
   * @remarks
   * HTML Attribute: checkmarks
   */
  @attr({ mode: 'boolean' })
  public checkmarks: boolean = false;
  protected checkmarksChanged(): void {
    if (!this.$fastController.isConnected) {
      return;
    }
    this.menuItems?.filter(this.isMenuItemElement).forEach((item: HTMLElement, index: number) => {
      if (this.checkmarks) {
        item.setAttribute('checkmark', '');
      } else {
        item.removeAttribute('checkmark');
      }
    });
  }

  /**
   * sets menuitem styles to align content when when icons are present
   *
   * @public
   * @remarks
   * HTML Attribute: icons
   */
  @attr({ mode: 'boolean' })
  public icons: boolean = false;
  protected iconsChanged(): void {
    if (!this.$fastController.isConnected) {
      return;
    }

    this.menuItems?.filter(this.isMenuItemElement).forEach((item: HTMLElement, index: number) => {
      if (this.icons) {
        item.setAttribute('icon', '');
      } else {
        item.removeAttribute('icon');
      }
    });
  }

  protected setItems(): void {
    super.setItems();

    if (this.icons) {
      this.iconsChanged();
    }
    if (this.checkmarks) {
      this.checkmarksChanged();
    }
  }
}
