import { Props, PropValue, Rule, AccessibilityBehavior, TestFacade } from './types';

export interface Slot {
  name: string;
  props: Props[];
  expectAttribute: boolean;
  expectedAttribute: string;
  expectedValue: PropValue;
  description: string;
  hidden: boolean;
}

export class SlotRule implements Rule {
  private data: Slot;

  constructor(name: string) {
    this.data = { name } as Slot;
  }

  public forProps = (props: Props | Props[]) => {
    this.data.props = Array.isArray(props) ? props : [props];
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

  public description = description => {
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

export class BehaviorTestFacade implements TestFacade {
  private actual: any;

  constructor(private behavior: AccessibilityBehavior, private props: Props) {
    this.actual = behavior(props);
  }

  public slotExists(slotName: string) {
    return !!(this.actual && this.actual.attributes[slotName]);
  }

  public attributeExists(slotName: string, attributeName: string) {
    return this.slotExists(slotName) && this.actual.attributes[slotName][attributeName] !== undefined;
  }

  public attributeHasValue(slotName: string, attributeName: string, value: PropValue) {
    return this.attributeExists(slotName, attributeName) && this.actual.attributes[slotName][attributeName] === value;
  }

  public getAttributeValue = (slotName: string, attribute: string) => {
    return this.actual.attributes[slotName][attribute] as PropValue;
  };

  public forProps = (props: Props) => {
    return new BehaviorTestFacade(this.behavior, { ...this.props, ...props });
  };
}

export class HookTestFacade implements TestFacade {
  private state: any;
  private hook: Function;

  constructor(hook: Function, props: Props) {
    this.state = props;
    this.hook = hook;
    hook(this.state);
  }

  public slotExists(slotName: string) {
    return !!(this.state && (slotName === 'root' || this.state[slotName]));
  }

  public attributeExists(slotName: string, attributeName: string) {
    return this.slotExists(slotName) && slotName === 'root'
      ? this.state[attributeName] !== undefined
      : this.state[slotName][attributeName] !== undefined;
  }

  public attributeHasValue(slotName: string, attributeName: string, value: PropValue) {
    return this.attributeExists(slotName, attributeName) && slotName === 'root'
      ? this.state[attributeName] === value
      : this.state[slotName][attributeName] === value;
  }

  public getAttributeValue = (slotName: string, attribute: string) => {
    return slotName === 'root' ? (this.state[attribute] as PropValue) : (this.state[slotName][attribute] as PropValue);
  };

  public forProps = (props: Props) => {
    return new HookTestFacade(this.hook, { ...this.state, ...props });
  };
}
