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
    if (this.slotExists(selector) && selector === 'root') {
      return this.actual.getAttribute(attributeName) !== undefined && this.actual.getAttribute(attributeName) !== null;
    }

    const element = document.getElementById(selector);
    if (element)
      return element.getAttribute(attributeName) !== undefined && element.getAttribute(attributeName) !== null;

    return false;
  }

  public attributeHasValue(selector: string, attributeName: string, value: PropValue) {
    if (this.attributeExists(selector, attributeName) && selector === 'root') {
      return this.actual.getAttribute(attributeName) === value;
    }

    const element = document.getElementById(selector);
    if (element) return element.getAttribute(attributeName) === value;

    return false;
  }

  public getAttributeValue = (selector: string, attributeName: string) => {
    if (selector === 'root') {
      return this.actual.getAttribute(attributeName) as PropValue;
    }
    const element = document.getElementById(selector);
    if (element) return element.getAttribute(attributeName) as PropValue;

    return null;
  };

  public afterEvent(selector: string, eventName: string, event: Event) {
    this.actual.dispatchEvent(event);
  }

  public forProps = (props: Props) => {
    return new ComponentTestFacade(this.Component, { ...this.props, ...props });
  };
}
