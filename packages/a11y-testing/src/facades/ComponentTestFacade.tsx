import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Props, PropValue, TestFacade } from '../types';

export class ComponentTestFacade implements TestFacade {
  private actual: any;

  constructor(private Component: React.FC, private props: Props) {
    // reset body
    document.body.innerHTML = '';
    const container = document.createElement('div');
    document.body.appendChild(container);

    ReactDOM.render(<Component {...props} />, container);
    this.actual = container.lastChild;
  }

  public slotExists(selector: string) {
    return selector === 'root' || !!document.getElementById(selector);
  }

  public attributeExists(selector: string, attributeName: string) {
    return this.slotExists(selector) && selector === 'root'
      ? this.actual.getAttribute(attributeName) !== undefined && this.actual.getAttribute(attributeName) !== null
      : document.getElementById(selector).getAttribute(attributeName) !== undefined &&
          document.getElementById(selector).getAttribute(attributeName) !== null;
  }

  public attributeHasValue(selector: string, attributeName: string, value: PropValue) {
    return this.attributeExists(selector, attributeName) && selector === 'root'
      ? this.actual.getAttribute(attributeName) === value
      : document.getElementById(selector).getAttribute(attributeName) === value;
  }

  public getAttributeValue = (selector: string, attributeName: string) => {
    return selector === 'root'
      ? (this.actual.getAttribute(attributeName) as PropValue)
      : (document.getElementById(selector).getAttribute(attributeName) as PropValue);
  };

  // TODO: convert args to event
  public afterEvent(selector: string, eventName: string, args: any[]) {
    // const key = 13;
    this.actual.dispatchEvent(
      new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      }),
    );
    // return this.slotExists(selector) && selector === 'root'
    //   ? this.actual.dispatchEvent(eventName === 'onKeyDown' ? new KeyboardEvent('keydown', args[0]) : new MouseEvent('click', {}))
    //   : document.getElementById(selector) !== undefined &&
    //   document.getElementById(selector).dispatchEvent(eventName === 'onKeyDown' ? new KeyboardEvent('keydown', args[0]) : new MouseEvent('click', args[0]));
  }

  public forProps = (props: Props) => {
    return new ComponentTestFacade(this.Component, { ...this.props, ...props });
  };
}
