import * as React from 'react';
import { Props, PropValue, TestFacade } from '../../src/validators';
import * as ReactDOM from 'react-dom';

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

  public forProps = (props: Props) => {
    return new ComponentTestFacade(this.Component, { ...this.props, ...props });
  };
}
