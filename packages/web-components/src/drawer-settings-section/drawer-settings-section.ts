import { attr, FASTElement, observable } from '@microsoft/fast-element';
import { Switch } from '../switch/switch.js';

export class DrawerSettingsSection extends FASTElement {
  public connectedCallback(): void {
    super.connectedCallback();
    this.setInitialSwitchState();
    this.setTarget();
  }

  /**
   *
   * @public
   * @remarks
   * HTML Attribute: default-checked
   */

  @attr({ attribute: 'default-checked', mode: 'boolean' })
  public defaultChecked: boolean = false;

  // Define an observable property to track the switch state
  @observable
  public switchState: boolean = true;

  @observable
  public switch: boolean[] = [];

  @attr
  public switchTarget: string | null = null;

  @attr
  public target: string | null = null;

  private initialized: boolean = false;

  private setTarget(): void {
    const switchElement = this.shadowRoot?.querySelector('[role="switch"]') as HTMLElement | null;
    if (switchElement) {
      switchElement.setAttribute('aria-controls', this.getSwitchTarget() || '');
    }
  }

  private setInitialSwitchState(): void {
    if (this.initialized) {
      this.switchState = this.defaultChecked;
      this.initialized = true;
    }
  }

  public handleSwitchChange(): void {
    this.switchState = !this.switchState;
    this.$emit('toggle-drawer-visibility', { switchTarget: this.getSwitchTarget(), switchState: this.switchState });
  }

  public targetChanged(): void {
    this.setTarget();
  }

  private getSwitchTarget(): string | null {
    return this.target ?? this.switchTarget;
  }
}
