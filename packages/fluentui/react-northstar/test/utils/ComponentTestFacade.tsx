import * as React from 'react';
import { Props, PropValue, TestFacade } from '@fluentui/a11y-testing';
import { ReactWrapper } from 'enzyme';
import { mountWithProviderAndGetComponent } from './';

export class ComponentTestFacade implements TestFacade {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private actual: any;
  private renderedComponent: ReactWrapper<any, any>;
  private onClickExecuted: boolean;

  constructor(private Component: React.FC, private props: Props = {}) {
    props.onClick = () => {
      this.onClickExecuted = true;
    };

    // reset body
    document.body.innerHTML = '';
    const container = document.createElement('div');
    document.body.appendChild(container);

    // we need to render it in this way because some component like popup use context from wrapper component
    this.renderedComponent = mountWithProviderAndGetComponent(Component, <Component {...props} />, {
      attachTo: container,
    });

    this.actual = container.firstChild;
  }

  public slotExists(selector: string) {
    return selector === 'root' || !!document.getElementById(selector);
  }

  public attributeExists(selector: string, attributeName: string) {
    if (this.slotExists(selector) && selector === 'root') {
      return this.actual.getAttribute(attributeName) !== undefined && this.actual.getAttribute(attributeName) !== null;
    }

    const element = document.getElementById(selector);
    if (element) {
      return element.getAttribute(attributeName) !== undefined && element.getAttribute(attributeName) !== null;
    }
    return false;
  }

  public attributeHasValue(selector: string, attributeName: string, value: PropValue) {
    if (this.attributeExists(selector, attributeName) && selector === 'root') {
      return this.actual.getAttribute(attributeName) === value;
    }

    const element = document.getElementById(selector);
    if (element) {
      return element.getAttribute(attributeName) === value;
    }

    return false;
  }

  public getAttributeValue = (selector: string, attributeName: string) => {
    if (selector === 'root') {
      return this.actual.getAttribute(attributeName) as PropValue;
    }
    const element = document.getElementById(selector);
    if (element) {
      return element.getAttribute(attributeName) as PropValue;
    }

    return null;
  };

  public verifyOnclickExecution = (selector: string) => {
    const previousValue = this.onClickExecuted;
    this.onClickExecuted = false;
    return previousValue;
  };

  public afterClick(selector: string) {
    if (selector === 'root') {
      this.renderedComponent.simulate('click');
      return;
    }
    this.renderedComponent.find(selector).simulate('click');
  }

  public pressSpaceKey(selector: string) {
    if (selector === 'root') {
      this.renderedComponent.simulate('keydown', { keyCode: 32 });
      return;
    }
    this.renderedComponent.find(selector).simulate('keydown', { keyCode: 32 });
  }

  public pressEnterKey(selector: string) {
    if (selector === 'root') {
      this.renderedComponent.simulate('keydown', { keyCode: 13 });
      return;
    }
    this.renderedComponent.find(selector).simulate('keydown', { keyCode: 13 });
  }

  public forProps = (props: Props): TestFacade => {
    return new ComponentTestFacade(this.Component, { ...this.props, ...props });
  };
}
