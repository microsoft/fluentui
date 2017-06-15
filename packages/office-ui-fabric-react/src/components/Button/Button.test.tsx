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

  it('Providing onClick and menuProps renders a SplitButton', () => {
    const button = ReactTestUtils.renderIntoDocument<any>(
      <DefaultButton
        data-automation-id='test'
        text='Create account'
        onClick={ () => alert('Clicked') }
        menuProps={ {
          items: [
            {
              key: 'emailMessage',
              name: 'Email message',
              icon: 'Mail'
            },
            {
              key: 'calendarEvent',
              name: 'Calendar event',
              icon: 'Calendar'
            }
          ]
        } }
      />
    );
    const renderedDOM = ReactDOM.findDOMNode(button as React.ReactInstance);
    expect(renderedDOM.tagName).equal('DIV', 'A Button with a menuProps and an onClick renders as a SplitButton');
  });

});
