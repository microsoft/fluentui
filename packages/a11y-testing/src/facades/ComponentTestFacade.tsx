import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Props, PropValue, TestFacade } from '@fluentui/a11y-testing';
import { mountWithProviderAndGetComponent } from './withProvider';

export class ComponentTestFacade implements TestFacade {
  private actual: any;
  private renderedComponent: any;
  private onClickExecuted: boolean;

  constructor(private Component: React.FC, private props: Props = {}) {
    props.onClick = () => {
      this.onClickExecuted = true;
    };

    // reset body
    document.body.innerHTML = '';
    const container = document.createElement('div');
    document.body.appendChild(container);

    ReactDOM.render(<Component {...props} />, container);
    this.actual = container.lastChild;

    // we need to render it in this way because using simulate function to fire mouse/keyboard event
    this.renderedComponent = mountWithProviderAndGetComponent(Component, <Component {...props} />);
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

  public verifyOnclickExecution = (selector: string) => {
    const previousValue = this.onClickExecuted;
    this.onClickExecuted = false;
    return previousValue;
  };

  public afterClick(selector: string): void {
    if (selector === 'root') {
      return this.renderedComponent.simulate('click');
    }
    this.renderedComponent.find(selector).simulate('click');
  }

  public pressSpaceKey(selector: string): void {
    if (selector === 'root') {
      return this.renderedComponent.simulate('keydown', { keyCode: 32 });
    }
    this.renderedComponent.find(selector).simulate('keydown', { keyCode: 32 });
  }

  public pressEnterKey(selector: string): void {
    if (selector === 'root') {
      return this.renderedComponent.simulate('keydown', { keyCode: 13 });
    }
    this.renderedComponent.find(selector).simulate('keydown', { keyCode: 13 });
  }

  public forProps = (props: Props): TestFacade => {
    return new ComponentTestFacade(this.Component, { ...this.props, ...props });
  };
}
