import { attr, FASTElement, observable } from '@microsoft/fast-element';

export class PaneSettingsItem extends FASTElement {
  @observable toggleButtons!: NodeListOf<HTMLElement>;

  // Define an observable property to track the state of the switch
  @observable
  @attr({ attribute: 'toggle-target' })
  public toggleTarget: string = '';

  // Define an observable property to track the switch state
  @observable
  public switchState: boolean = false;

  // Define an observable property to track the switch state
  @observable
  public toggle: boolean = false;

  public handleSwitchChange(): void {
    this.switchState = !this.switchState;
    this.$emit('toggle-panes', { toggleTarget: this.toggleTarget, switchState: this.switchState });
  }
}
