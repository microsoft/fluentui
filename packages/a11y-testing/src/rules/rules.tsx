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

  public afterClick = () => {
    this.data.checkClick = true;
    return this;
  };

  public pressSpaceKey = () => {
    this.data.checkSpaceKeyPressed = true;
    return this;
  };

  public pressEnterKey = () => {
    this.data.checkEnterKeyPressed = true;
    return this;
  };

  public verifyOnclickExecution = () => {
    this.data.checkOnClickWasExecuted = true;
    return this;
  };

  public hasAttribute = (expectedAttribute: string, expectedValue?: PropValue, overrideId?: boolean) => {
    this.data.expectedAttribute = expectedAttribute;
    if (overrideId) {
      this.data.overrideId = overrideId;
    }
    if (expectedValue) {
      this.data.expectedValue = expectedValue;
    }
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
      this.data.expectAttribute !== undefined
        ? this.data.expectAttribute
          ? 'Adds'
          : 'Does not add attribute'
        : undefined,
      this.data.expectAttribute !== undefined &&
        this._expectedAttributeAndValueFormat(
          this.data.expectAttribute,
          this.data.expectedAttribute,
          this.data.expectedValue,
        ),
      this.data.checkSpaceKeyPressed && `Triggers 'performClick' action with 'Space'`,
      this.data.checkEnterKeyPressed && `Triggers 'performClick' action with 'Enter'`,
      this.data.name && this.data.name !== 'root' && `to slot ${this.data.name}`,
      this.data.description ? this.data.description : this.data.props && `if ${this._stringifyProps()}.`,
    ]
      .filter(Boolean)
      .join(' ');
  };

  private _stringifyProps = () => {
    if (!this.data.props) {
      return '';
    }

    return this.data.props
      .map(prop => {
        const propNames = Object.keys(prop);
        return propNames
          .map(propName => {
            const propValue = prop[propName];
            return `prop '${propName}' is '${propValue}'`;
          })
          .join(' and ');
      })
      .join(' or ');
  };

  private _expectedAttributeAndValueFormat = (
    expectAttribute: boolean,
    expectedAttribute: string,
    expectedValue: PropValue,
  ) => {
    if (expectAttribute && this.data.overrideId) {
      return `'ID reference' for '${expectedAttribute}' attribute`;
    } else if (expectAttribute) {
      return expectedValue ? `'${expectedAttribute}=${expectedValue}'` : `'${expectedAttribute}'`;
    } else {
      return `'${this.data.expectedAttribute}'`;
    }
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
