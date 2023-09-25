import { observable } from '@microsoft/fast-element';
import { FoundationElement } from '@microsoft/fast-foundation';

export class Gradient extends FoundationElement {
  @observable
  colors: string[];

  @observable
  markedColor: string;
}
