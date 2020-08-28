import * as React from 'react';
import { TestFacade, Props, PropValue } from '../types';
import { render, act } from '@testing-library/react';

function setup(useSomething: Function, state: any) {
  function TestComponent() {
    useSomething(state); // hooks are mutating so we don't need to return any result
    return null;
  }
  render(<TestComponent />);
}

export class HookTestFacade implements TestFacade {
  private state: any;
  private hook: Function;

  constructor(hook: Function, props: Props) {
    this.state = props;
    setup(hook, this.state);
    this.hook = hook;
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
    // toString() is added just so it would match the component test facade
    // on components aria-attr values are strings, for example: aria-hidden="true"
    return this.attributeExists(slotName, attributeName) && slotName === 'root'
      ? this.state[attributeName].toString() === value.toString()
      : this.state[slotName][attributeName].toString() === value.toString();
  }

  public getAttributeValue = (slotName: string, attribute: string) => {
    return slotName === 'root' ? (this.state[attribute] as PropValue) : (this.state[slotName][attribute] as PropValue);
  };

  public forProps = (props: Props) => {
    return new HookTestFacade(this.hook, { ...this.state, ...props });
  };

  public afterEvent = (slotName: string, eventName: string, event: Event) => {
    const keyHandler = slotName === 'root' ? this.state[eventName] : this.state[slotName][eventName];
    if (keyHandler && typeof keyHandler === 'function') {
      act(() => keyHandler(event));
    }
  };

  public afterClick(selector: string): void {
    this.afterEvent(
      selector,
      'onClick',
      new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      }),
    );
  }
}
