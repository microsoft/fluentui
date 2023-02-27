import { FASTMenu } from '@microsoft/fast-foundation';
import { attr, Updates } from '@microsoft/fast-element';

/**
 * The base class used for constructing a fluent-menu custom element
 * @public
 */
export class Menu extends FASTMenu {
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

  public connectedCallback() {
    super.connectedCallback();

    if (this.icons) {
      Updates.enqueue(() => {
        // wait until children have had a chance to
        // connect before setting/checking their props/attributes
        this.iconsChanged();
      });
    }
  }
}
