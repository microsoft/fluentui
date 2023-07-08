import { Switch } from '@fluentui/web-components';
import { attr, FASTElement, observable, Updates } from '@microsoft/fast-element';

/**
 * A component to manage and render the drawer settings section.
 *
 * @public
 */
export class DrawerSettingsSection extends FASTElement {
  /**
   * A lifecycle method that is called when the component is first connected to the document's DOM.
   * @public
   */
  public connectedCallback(): void {
    super.connectedCallback();
    this.setInitialSwitchState();
  }

  /**
   * A lifecycle method that is called when the component is removed from the document's DOM.
   * @public
   */
  public disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  /**
   * A method to emit the initial state of the switch
   * @public
   */
  public setInitialSwitchState(): void {
    Updates.enqueue(() => this.emitSwitchState());
  }

  /**
   * An attribute to set which toggle button the switch is associated with
   * @public
   */
  @attr
  public controls!: string;

  /**
   * An observable switch object.
   * @public
   */
  @observable
  public switch!: Switch;

  /**
   * A method to handle the change of state of the switch and emit an event with the new state.
   * @public
   */
  public handleSwitchChange(): void {
    Updates.enqueue(() => this.emitSwitchState());
  }

  public emitSwitchState(): void {
    this.$emit('toggle-drawer-visibility', {
      controls: this.controls,
      currentChecked: this.switch.currentChecked,
    });
  }
}
