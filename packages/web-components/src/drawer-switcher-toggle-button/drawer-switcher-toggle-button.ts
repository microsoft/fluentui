import { FASTElement, Updates, attr, observable } from '@microsoft/fast-element';

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
    // Updates.enqueue(() => this.setTabindex());
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  // public setTabindex(): void {
  //     if(this.settings) {
  //         this.tabIndex = 0;
  //     } else {
  //         this.tabIndex = this.isTabbable;
  //     }
  // }

  // @attr({ mode: 'boolean' })
  // public settings: boolean = false;

  // @observable
  // public tabbable = false;

  // get isTabbable(): number {
  //     return this.tabbable ? 0 : -1;
  // }
}
