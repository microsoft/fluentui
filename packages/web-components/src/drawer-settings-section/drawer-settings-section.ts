import { Switch } from '@fluentui/web-components';
import { attr, FASTElement, html, observable, ref } from '@microsoft/fast-element';

export class DrawerSettingsSection extends FASTElement {
  /**
   * @internal
   */
  public connectedCallback(): void {
    super.connectedCallback();
    this.setTarget();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  @attr
  public switchTarget: string | null = null;

  @attr
  public controls: string | null = null;

  public switch!: Switch;

  private setTarget(): void {
    const switchElement = this.switch;
    if (switchElement) {
      switchElement.setAttribute('aria-controls', this.getSwitchTarget() || '');
    }
  }

  public handleSwitchChange(): void {
    const switchElement = this.switch;
    console.log(switchElement.currentChecked);
    this.$emit('toggle-drawer-visibility', {
      switchTarget: this.getSwitchTarget(),
      currentChecked: switchElement.currentChecked,
    });
  }

  public targetChanged(): void {
    this.setTarget();
  }

  private getSwitchTarget(): string | null {
    return this.controls ?? this.switchTarget;
  }
}
