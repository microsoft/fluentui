import { Switch } from '@fluentui/web-components';
import { attr, FASTElement, html, observable, ref, Updates } from '@microsoft/fast-element';

export class DrawerSettingsSection extends FASTElement {
  /**
   * @internal
   */
  public connectedCallback(): void {
    super.connectedCallback();
    this.setInitialSwitchState();
  }

  public setInitialSwitchState(): void {
    Updates.enqueue(() =>
      this.$emit('toggle-drawer-visibility', {
        controls: this.controls,
        currentChecked: this.switch.currentChecked,
      }),
    );
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  @attr
  public controls!: string;

  @observable
  public switch!: Switch;

  public handleSwitchChange(): void {
    this.$emit('toggle-drawer-visibility', {
      controls: this.controls,
      currentChecked: this.switch.currentChecked,
    });
  }
}
