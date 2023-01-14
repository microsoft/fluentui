import { attr, booleanConverter, FASTElement } from '@microsoft/fast-element';

export class Switch extends FASTElement {
  @attr value?: string;

  @attr({ converter: booleanConverter }) isDisabled: boolean = false;

  @attr({ converter: booleanConverter }) isChecked: boolean = false;

  public keypressHandler = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      this.isChecked = !this.isChecked;
    }
  };

  public clickHandler = (e: MouseEvent) => {
    if (!this.isDisabled) {
      this.isChecked = !this.isChecked;
    }
  };
}
