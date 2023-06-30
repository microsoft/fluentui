import { attr, FASTElement, observable } from '@microsoft/fast-element';

export class PaneSettingsItem extends FASTElement {
  @observable toggleButtons!: NodeListOf<HTMLElement>;

  // Define an observable property to track the state of the switch
  @observable
  @attr({ attribute: 'bind-id' })
  public bindID: string = '';

  // Define an observable property to track the switch state
  @observable
  public switchState: boolean = false;

  // Define an observable property to track the switch state
  @observable
  public toggle: boolean = false;

  public handleSwitchChange(): void {
    this.switchState = !this.switchState;
    console.log('handleSwitchChange', this.bindID, this.switchState);
    this.$emit('toggle-panes', { bindID: this.bindID, switchState: this.switchState });
  }
}
