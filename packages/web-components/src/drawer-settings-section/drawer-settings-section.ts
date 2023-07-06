import { attr, FASTElement, observable } from '@microsoft/fast-element';
import { Switch } from '../switch/switch.js';

export class DrawerSettingsSection extends FASTElement {
  public connectedCallback(): void {
    super.connectedCallback();
    this.setTarget();
  }

  // Define an observable property to track the switch state
  @observable
  public switchState: boolean = false;

  @observable
  public switch: boolean[] = [];

  @attr
  public switchTarget: string | null = null;

  @attr
  public target: string | null = null;

  private setTarget(): void {
    const switchElement = this.shadowRoot?.querySelector('[role="switch"]') as HTMLElement | null;
    if (switchElement) {
      switchElement.setAttribute('aria-controls', this.getSwitchTarget() || '');
    }
  }

  public handleSwitchChange(): void {
    this.switchState = !this.switchState;
    console.log('handleSwitchChange', this.getSwitchTarget(), this.switchState);
    this.$emit('toggle-drawer-visibility', { switchTarget: this.getSwitchTarget(), switchState: this.switchState });
  }

  public targetChanged(): void {
    this.setTarget();
  }

  private getSwitchTarget(): string | null {
    return this.target ?? this.switchTarget;
  }
}
