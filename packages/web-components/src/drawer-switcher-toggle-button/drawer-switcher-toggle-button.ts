import { FASTElement, Updates, attr, observable } from '@microsoft/fast-element';
import { keyTab } from '@microsoft/fast-web-utilities';

/**
 * A DrawerSwitcherToggleButton Component to be used with DrawerSwitcher.
 *
 * @slot - The default slot for the drawer-toggle content
 *
 * @public
 */
export class DrawerSwitcherToggleButton extends FASTElement {
  public connectedCallback(): void {
    super.connectedCallback();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  @attr({ mode: 'boolean' })
  disabled: boolean = false;

  public hideToggle(): void {
    this.hidden = true;
    this.disabled = true;
    this.tabIndex = -1;
  }

  public showToggle(): void {
    this.hidden = false;
    this.disabled = false;
    this.tabIndex = 0;
  }

  public keypressHandler = (event: KeyboardEvent): void => {
    switch (event.key) {
      case keyTab:
        event.preventDefault();
    }
  };
}
