/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */

import * as ReactTestUtils from 'react-addons-test-utils';
import { DefaultButton } from './DefaultButton/DefaultButton';

let { expect } = chai;

describe('DefaultButton', () => {

  it('can render without an onClick.', () => {
    const button = ReactTestUtils.renderIntoDocument<any>(
      <DefaultButton>Hello</DefaultButton>
    );
    const renderedDOM = ReactDOM.findDOMNode(button as React.ReactInstance);
    console.log(renderedDOM.tagName);
    expect(renderedDOM.tagName).equals('BUTTON', 'A Button with no onClick renders as a span');
  });

  it('can render with an onClick.', () => {
    let onClick = () => null;

    const button = ReactTestUtils.renderIntoDocument<any>(
      <DefaultButton onClick={ onClick }>Hello</DefaultButton>
    );
    const renderedDOM = ReactDOM.findDOMNode(button as React.ReactInstance);
    console.log(renderedDOM.tagName);
    expect(renderedDOM.tagName).equals('BUTTON', 'A Button with onClick renders as a button');
  });

  it('can render with an href', () => {
    const button = ReactTestUtils.renderIntoDocument<any>(
      <DefaultButton href='http://www.microsoft.com' target='_blank'>Hello</DefaultButton>
    );
    const renderedDOM = ReactDOM.findDOMNode(button as React.ReactInstance);
    console.log(renderedDOM.tagName);
    expect(renderedDOM.tagName).equals('A', 'A Button with an href renders as an anchor');
  });

  describe('with menuProps', () => {
    let button;

    before(() => {
      const wrapper = ReactTestUtils.renderIntoDocument<any>(
        <DefaultButton menuProps={ { items: [{ key: 'item', name: 'Item' }] } }>Hello</DefaultButton>
      ) as DefaultButton;
      button = ReactTestUtils.findRenderedDOMComponentWithTag(wrapper, 'button');
    });

    it('contains aria-haspopup=true', () => {
      expect(button.getAttribute('aria-haspopup')).to.equal('true');
    });
  });

  describe('without menuProps', () => {
    let button;

    before(() => {
      const wrapper = ReactTestUtils.renderIntoDocument<any>(
        <DefaultButton>Hello</DefaultButton>
      ) as DefaultButton;
      button = ReactTestUtils.findRenderedDOMComponentWithTag(wrapper, 'button');
    });

    it('does not contain aria-haspopup', () => {
      expect(button.getAttribute('aria-haspopup')).to.equal(null);
    });
  });

  describe('with menuIconProps', () => {
    let button;

    before(() => {
      const wrapper = ReactTestUtils.renderIntoDocument<any>(
        <DefaultButton menuIconProps={ { iconName: 'fontColor' } }>Hello</DefaultButton>
      ) as DefaultButton;
      button = ReactTestUtils.findRenderedDOMComponentWithTag(wrapper, 'button');
    });

    it('Contains the expected icon via menuIconProps', () => {
      expect(button.querySelectorAll('[data-icon-name="fontColor"]').length).to.equal(1);
    });
  });
});
