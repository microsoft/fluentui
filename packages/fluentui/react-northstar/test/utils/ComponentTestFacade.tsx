import * as React from 'react';
import { Props, PropValue, TestFacade } from '@fluentui/a11y-testing';
import { ReactWrapper, mount } from 'enzyme';
// import * as ReactDOM from 'react-dom';
// import { mountWithProviderAndGetComponent } from './';

export class ComponentTestFacade implements TestFacade {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _actual: any;
  _renderedComponent: ReactWrapper<any, any>;
  _onClickExecuted: boolean;

  // using eslint disable, otherwise typescript doesn't create property itself
  // eslint-disable-next-line @fluentui/no-visibility-modifiers
  constructor(private Component: React.FC, private props: Props = {}) {
    props.onClick = () => {
      this._onClickExecuted = true;
    };

    // reset body
    document.body.innerHTML = '';
    const container = document.createElement('div');
    document.body.appendChild(container);

    // >>> mountWithProvider approach
    //   this._renderedComponent = mountWithProviderAndGetComponent(Component, <Component {...props} />, {
    //     attachTo: container,
    // });

    // >>> older approach, without ReactDOMrender and not attach into container
    // ReactDOM.render(<Component {...props} />, container);
    // this._actual = container.lastChild;
    // this._renderedComponent = mount(<Component {...props} />).find(Component);

    this._renderedComponent = mount(<Component {...props} />, {
      attachTo: container,
    });
    this._actual = container.firstChild;
  }

  slotExists(selector: string) {
    return selector === 'root' || !!document.getElementById(selector);
  }

  attributeExists(selector: string, attributeName: string) {
    if (this.slotExists(selector) && selector === 'root') {
      return (
        this._actual.getAttribute(attributeName) !== undefined && this._actual.getAttribute(attributeName) !== null
      );
    }

    const element = document.getElementById(selector);
    if (element) {
      return element.getAttribute(attributeName) !== undefined && element.getAttribute(attributeName) !== null;
    }
    return false;
  }

  attributeHasValue(selector: string, attributeName: string, value: PropValue) {
    if (this.attributeExists(selector, attributeName) && selector === 'root') {
      return this._actual.getAttribute(attributeName) === value;
    }

    const element = document.getElementById(selector);
    if (element) {
      return element.getAttribute(attributeName) === value;
    }

    return false;
  }

  getAttributeValue = (selector: string, attributeName: string) => {
    if (selector === 'root') {
      return this._actual.getAttribute(attributeName) as PropValue;
    }
    const element = document.getElementById(selector);
    if (element) {
      return element.getAttribute(attributeName) as PropValue;
    }

    return null;
  };

  verifyOnclickExecution = (selector: string) => {
    const previousValue = this._onClickExecuted;
    this._onClickExecuted = false;
    return previousValue;
  };

  afterClick(selector: string) {
    if (selector === 'root') {
      this._renderedComponent.simulate('click');
      return;
    }
    this._renderedComponent.find(selector).simulate('click');
  }

  pressSpaceKey(selector: string) {
    if (selector === 'root') {
      this._renderedComponent.simulate('keydown', { keyCode: 32 });
      return;
    }
    this._renderedComponent.find(selector).simulate('keydown', { keyCode: 32 });
  }

  pressEnterKey(selector: string) {
    if (selector === 'root') {
      this._renderedComponent.simulate('keydown', { keyCode: 13 });
      return;
    }
    this._renderedComponent.find(selector).simulate('keydown', { keyCode: 13 });
  }

  forProps = (props: Props): TestFacade => {
    return new ComponentTestFacade(this.Component, { ...this.props, ...props });
  };
}
