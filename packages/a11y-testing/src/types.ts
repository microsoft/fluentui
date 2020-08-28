export type PropValue = string | number | boolean | any;
export type Props = { [name: string]: PropValue };
export type AccessibilityBehavior = (props: Props) => any;

export interface Rule {
  stringify: () => string;
}

export interface Slot {
  name: string;
  props: Props[];
  expectAttribute: boolean;
  expectedAttribute: string;
  expectedValue: PropValue;
  description: string;
  hidden: boolean;
  afterEvent: string;
  afterEventData: Event;
  checkEvent: boolean;
  checkClick: boolean;
}

export interface TestFacade {
  slotExists(slotName: string): boolean;
  attributeExists(slotName: string, attributeName: string): boolean;
  attributeHasValue(slotName: string, attributeName: string, value: PropValue): boolean;
  getAttributeValue(slotName: string, attribute: string): PropValue;
  forProps(props: Props): TestFacade;
  afterEvent(slotName: string, eventName: string, event: Event): void;
  afterClick(slotName: string): void;
}
