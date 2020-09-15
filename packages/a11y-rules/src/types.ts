// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PropValue = string | number | boolean | any;
export type Props = { [name: string]: PropValue };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  afterEventData: Event;
  checkClick: boolean;
  checkSpaceKeyPressed: boolean;
  checkEnterKeyPressed: boolean;
  checkOnClickWasExecuted: boolean;
}
