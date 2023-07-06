import { attr, FASTElement, observable } from '@microsoft/fast-element';

export class DrawerSettingsSection extends FASTElement {
  // Define an observable property to track the switch state
  @observable
  public switchState: boolean = false;

  @observable
  public switch: boolean[] = [];

  public handleSwitchChange(): void {
    this.switchState = !this.switchState;
  }
}
