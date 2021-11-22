import { Menu as FoundationMenu, menuTemplate as template } from '@microsoft/fast-foundation';
import { fillColor, neutralLayerFloating } from '../design-tokens';
import { menuStyles as styles } from './menu.styles';

/**
 * The Fluent menu class
 * @public
 */
export class Menu extends FoundationMenu {
  /**
   * @internal
   */
  public connectedCallback(): void {
    super.connectedCallback();

    fillColor.setValueFor(this, neutralLayerFloating);
  }
}

/**
 * The Fluent Menu Element. Implements {@link @microsoft/fast-foundation#Menu},
 * {@link @microsoft/fast-foundation#menuTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-menu\>
 */
export const fluentMenu = Menu.compose({
  baseName: 'menu',
  baseClass: FoundationMenu,
  template,
  styles,
});

/**
 * Styles for Menu
 * @public
 */
export const menuStyles = styles;
