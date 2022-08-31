import { observable } from '@microsoft/fast-element';
import { FoundationElement } from '@microsoft/fast-foundation';

export class ControlPane extends FoundationElement {
  @observable
  componentType: string;

  @observable
  accentColor: string;

  @observable
  neutralColor: string;

  @observable
  showOnlyLayerBackgrounds: boolean = true;

  updateFormValue(field: string, value: any) {
    this.$emit('formvaluechange', { field: field, value: value });
  }
}
