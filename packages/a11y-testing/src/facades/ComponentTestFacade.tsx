import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Props, PropValue, TestFacade } from '../types';

export class ComponentTestFacade implements TestFacade {
  private root: HTMLElement;
  private onClickExecuted: boolean;

  constructor(private Component: React.FC, private props: Props = {}) {
    props.onClick = () => {
      this.onClickExecuted = true;
    };

    const { container } = render(<Component {...props} />);
    this.root = container.firstElementChild as HTMLElement;
  }

  public slotExists(selector: string) {
    return selector === 'root' || !!this._getElementBySlotId(selector);
  }

  public attributeExists(selector: string, attributeName: string) {
    const attr = this.getAttributeValue(selector, attributeName);
    return attr !== undefined && attr !== null;
  }

  public attributeHasValue(selector: string, attributeName: string, value: PropValue) {
    return this.getAttributeValue(selector, attributeName) === value;
  }

  public getAttributeValue = (selector: string, attributeName: string) => {
    const element = selector === 'root' ? this.root : this._getElementBySlotId(selector);
    return element ? (element.getAttribute(attributeName) as PropValue) : null;
  };

  public verifyOnclickExecution = (selector: string) => {
    const previousValue = this.onClickExecuted;
    this.onClickExecuted = false;
    return previousValue;
  };

  public afterClick(selector: string) {
    userEvent.click(this._getElementBySelector(selector));
  }

  public pressSpaceKey(selector: string) {
    userEvent.type(this._getElementBySelector(selector), ' ');
  }

  public pressEnterKey(selector: string) {
    userEvent.type(this._getElementBySelector(selector), '{enter}');
  }

  public forProps = (props: Props): TestFacade => {
    return new ComponentTestFacade(this.Component, { ...this.props, ...props });
  };

  private _getElementBySlotId(selector: string) {
    return document.querySelector(`[data-slotid="${selector}"]`);
  }

  private _getElementBySelector(selector: string) {
    if (selector === 'root') {
      return this.root;
    }

    const element = this.root.querySelector(selector);
    if (!element) {
      throw new Error(`Could not find element matching selector: "${selector}"`);
    }
    return element;
  }
}
