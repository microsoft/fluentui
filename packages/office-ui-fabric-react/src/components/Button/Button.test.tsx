/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */

import * as ReactTestUtils from 'react-addons-test-utils';
import { DefaultButton } from './DefaultButton/DefaultButton';
import { KeyCodes } from '../../Utilities';

let { expect } = chai;

describe('DefaultButton', () => {
  function renderIntoDocument(element: React.ReactElement<any>): HTMLElement {
    const component = ReactTestUtils.renderIntoDocument(element);
    const renderedDOM: Element = ReactDOM.findDOMNode(component as React.ReactInstance);
    return renderedDOM as HTMLElement;
  }

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

  it('Tapping menu button of SplitButton expands menu', () => {
    let didClick = false;
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
    const menuButtonDOM: HTMLButtonElement = renderedDOM.getElementsByClassName('ms-Button--icon')[0] as HTMLButtonElement;
    ReactTestUtils.Simulate.click(menuButtonDOM);
    expect(renderedDOM.getAttribute('aria-expanded')).to.equal('true');
  });

  it('Clicking SplitButton button triggers action', () => {
    let didClick = false;
    const renderedDOM: HTMLElement = renderIntoDocument(
      <DefaultButton
        data-automation-id='test'
        text='Create account'
        onClick={ () => { didClick = true; } }
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
    const splitButtonDOM = ReactDOM.findDOMNode(renderedDOM as React.ReactInstance);
    const menuButtonDOM: HTMLButtonElement = renderedDOM.getElementsByClassName('ms-Button--default')[0] as HTMLButtonElement;
    ReactTestUtils.Simulate.click(menuButtonDOM);
    expect(didClick).to.equal(true);
  });

  it('Pressing Enter on SplitButton triggers action', () => {
    let didClick = false;
    const renderedDOM: HTMLElement = renderIntoDocument(
      <DefaultButton
        data-automation-id='test'
        text='Create account'
        onClick={ () => { didClick = true; } }
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
    const splitButtonDOM = ReactDOM.findDOMNode(renderedDOM as React.ReactInstance);
    ReactTestUtils.Simulate.keyDown(splitButtonDOM,
      {
        which: KeyCodes.enter
      });
    expect(didClick).to.equal(true);
  });

  it('Pressing Alt+Down on SplitButton triggers menu', () => {
    let didClick = false;
    const renderedDOM: HTMLElement = renderIntoDocument(
      <DefaultButton
        data-automation-id='test'
        text='Create account'
        onClick={ () => { didClick = true; } }
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
    const splitButtonDOM = ReactDOM.findDOMNode(renderedDOM as React.ReactInstance);
    ReactTestUtils.Simulate.focus(splitButtonDOM);
    ReactTestUtils.Simulate.keyDown(splitButtonDOM,
      {
        altKey: true,
        which: KeyCodes.down
      });
    expect(renderedDOM.getAttribute('aria-expanded')).to.equal('true');
  });

  it('A disabled SplitButton does not respond to key presses', () => {
    let didClick = false;
    const renderedDOM: HTMLElement = renderIntoDocument(
      <DefaultButton
        disabled={ true }
        data-automation-id='test'
        text='Create account'
        onClick={ () => { didClick = true; } }
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
    const splitButtonDOM = ReactDOM.findDOMNode(renderedDOM as React.ReactInstance);
    ReactTestUtils.Simulate.focus(splitButtonDOM);
    ReactTestUtils.Simulate.keyDown(splitButtonDOM,
      {
        altKey: true,
        which: KeyCodes.down
      });
    expect(renderedDOM.getAttribute('aria-expanded')).to.equal('false');
  });

  it('A disabled SplitButton does not respond to clicks', () => {
    let didClick = false;
    const renderedDOM: HTMLElement = renderIntoDocument(
      <DefaultButton
        disabled={ true }
        data-automation-id='test'
        text='Create account'
        onClick={ () => { didClick = true; } }
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
    const splitButtonDOM = ReactDOM.findDOMNode(renderedDOM as React.ReactInstance);
    const menuButtonDOM: HTMLButtonElement = renderedDOM.getElementsByClassName('ms-Button--default')[0] as HTMLButtonElement;
    ReactTestUtils.Simulate.click(menuButtonDOM);
    expect(didClick).to.equal(false);
  });

});
