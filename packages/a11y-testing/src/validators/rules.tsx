import { Props, PropValue, Rule, Slot } from '../types';

export class SlotRule implements Rule {
  private data: Slot;

  constructor(name: string) {
    this.data = { name } as Slot;
  }

  public forProps = (props: Props | Props[]) => {
    this.data.props = Array.isArray(props) ? props : [props];
    return this;
  };

  public afterEvent = (eventName: string, event: Event) => {
    this.data.afterEvent = eventName;
    this.data.afterEventData = event;
    this.data.checkEvent = true;
    return this;
  };

  public afterClick = () => {
    this.data.checkClick = true;
    return this;
  };

  public hasAttribute = (expectedAttribute: string, expectedValue: PropValue) => {
    this.data.expectedAttribute = expectedAttribute;
    this.data.expectedValue = expectedValue;
    this.data.expectAttribute = true;
    return this;
  };

  public doesNotHaveAttribute = (expectedAttribute: string) => {
    this.data.expectedAttribute = expectedAttribute;
    this.data.expectedValue = undefined;
    this.data.expectAttribute = false;
    return this;
  };

  public description = (description: string) => {
    this.data.description = description;
    return this;
  };

  public hide = () => {
    this.data.hidden = true;
    return this;
  };

  public getData = () => this.data;

  public stringify = () => {
    return [
      this.data.expectAttribute ? 'Adds' : 'Does not add',
      this.data.expectedAttribute,
      this.data.expectAttribute && this.data.expectedValue,
      this.data.name && this.data.name !== 'root' && `to slot ${this.data.name}`,
      this.data.description ? this.data.description : this.data.props && `for props ${this.stringifyProps()}`,
    ]
      .filter(Boolean)
      .join(' ');
  };

  private stringifyProps = () => {
    if (!this.data.props) {
      return '';
    }

    return this.data.props.map(prop => JSON.stringify(prop)).join(' or ');
  };
}

export class BehaviorRule {
  public static slot = (name: string) => {
    return new SlotRule(name);
  };
  public static root = () => {
    return new SlotRule('root');
  };
}
