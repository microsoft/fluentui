/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */

import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';

import { DefaultButton } from './DefaultButton/DefaultButton';
import { IconButton } from './IconButton/IconButton';
import { ActionButton } from './ActionButton/ActionButton';
import { CommandBarButton } from './CommandBarButton/CommandBarButton';
import { CompoundButton } from './CompoundButton/CompoundButton';
import { KeyCodes } from '../../Utilities';
// import { IconButton } from "src";

const alertClicked = (): void => { /*noop*/ };

describe('Button', () => {
  it('renders DefaultButton correctly', () => {
    const component = renderer.create(<DefaultButton text='Button' />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders ActionButton correctly', () => {
    const component = renderer.create(<ActionButton>Button</ActionButton>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a DefaultButton with a keytip correctly', () => {
    const keytipProps = {
      content: 'A',
      keySequences: ['a']
    };
    const component = renderer.create(<DefaultButton text='Button' keytipProps={ keytipProps } />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders CommandBarButton correctly', () => {
    const component = renderer.create(
      <CommandBarButton
        iconProps={ { iconName: 'Add' } }
        text='Create account'
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
      />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders CompoundButton correctly', () => {
    const component = renderer.create(
      <CompoundButton description='You can create a new account here.'>
        Create account
    </CompoundButton>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders IconButton correctly', () => {
    const component = renderer.create(
      <IconButton
        iconProps={ { iconName: 'Emoji2' } }
        title='Emoji'
        ariaLabel='Emoji'
      />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('DefaultButton', () => {
    function renderIntoDocument(element: React.ReactElement<any>): HTMLElement {
      const component = ReactTestUtils.renderIntoDocument(element);
      const renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance);
      return renderedDOM as HTMLElement;
    }

    it('can render without an onClick.', () => {
      const button = ReactTestUtils.renderIntoDocument<any>(
        <DefaultButton>Hello</DefaultButton>
      );
      const renderedDOM = ReactDOM.findDOMNode(button as React.ReactInstance) as Element;
      expect(renderedDOM.tagName).toEqual('BUTTON');
    });

    it('can render with an onClick.', () => {
      const onClick: () => null = () => null;

      const button = ReactTestUtils.renderIntoDocument<any>(
        <DefaultButton onClick={ onClick }>Hello</DefaultButton>
      );
      const renderedDOM = ReactDOM.findDOMNode(button as React.ReactInstance) as Element;
      expect(renderedDOM.tagName).toEqual('BUTTON');
    });

    it('can render with an href', () => {
      const button = ReactTestUtils.renderIntoDocument<any>(
        <DefaultButton href='http://www.microsoft.com' target='_blank'>Hello</DefaultButton>
      );
      const renderedDOM = ReactDOM.findDOMNode(button as React.ReactInstance) as Element;
      expect(renderedDOM.tagName).toEqual('A');
    });

    it('applies the correct aria attributes', () => {
      let button: any;
      let renderedDOM: any;

      button = ReactTestUtils.renderIntoDocument<any>(
        <DefaultButton
          href='http://www.microsoft.com'
          target='_blank'
        >
          Hello
        </DefaultButton>
      );
      renderedDOM = ReactDOM.findDOMNode(button as React.ReactInstance);
      expect(renderedDOM.getAttribute('aria-label') === null);
      expect(renderedDOM.getAttribute('aria-labelledby') === null);
      expect(renderedDOM.getAttribute('aria-describedby') === null);

      button = ReactTestUtils.renderIntoDocument<any>(
        <DefaultButton
          href='http://www.microsoft.com'
          target='_blank'
          aria-label='MyLabel'
        >
          Hello
        </DefaultButton>
      );
      renderedDOM = ReactDOM.findDOMNode(button as React.ReactInstance);
      expect(renderedDOM.getAttribute('aria-label') === 'MyLabel');
      expect(renderedDOM.getAttribute('aria-labelledby') === null);
      expect(renderedDOM.getAttribute('aria-describedby') === null);

      button = ReactTestUtils.renderIntoDocument<any>(
        <DefaultButton
          href='http://www.microsoft.com'
          target='_blank'
          aria-labelledby='someid'
        >
          Hello
        </DefaultButton>
      );
      renderedDOM = ReactDOM.findDOMNode(button as React.ReactInstance);
      expect(renderedDOM.getAttribute('aria-label') === 'MyLabel');
      expect(renderedDOM.getAttribute('aria-labelledby') === 'someid');
      expect(renderedDOM.getAttribute('aria-describedby') === null);

      button = ReactTestUtils.renderIntoDocument<any>(
        <DefaultButton
          href='http://www.microsoft.com'
          target='_blank'
          ariaDescription='This description is not visible'
          styles={ { screenReaderText: 'some-screenreader-class' } }
        >
          Hello
        </DefaultButton>
      );
      renderedDOM = ReactDOM.findDOMNode(button as React.ReactInstance);
      expect(renderedDOM.getAttribute('aria-label') === null);
      expect(renderedDOM.getAttribute('aria-labelledby') === renderedDOM.querySelector(`.ms-Button-label`).id);
      expect(renderedDOM.getAttribute('aria-describedby') === renderedDOM.querySelector('.some-screenreader-class').id);

      button = ReactTestUtils.renderIntoDocument<any>(
        <IconButton
          iconProps={ { iconName: 'Emoji2' } }
          ariaDescription='Description on icon button'
          styles={ { screenReaderText: 'some-screenreader-class' } }
        />
      );
      renderedDOM = ReactDOM.findDOMNode(button as React.ReactInstance);
      expect(renderedDOM.getAttribute('aria-label') === null);
      expect(renderedDOM.getAttribute('aria-labelledby') === null);
      expect(renderedDOM.getAttribute('aria-describedby') === renderedDOM.querySelector('.some-screenreader-class').id);

      button = ReactTestUtils.renderIntoDocument<any>(
        <CompoundButton
          description='Some awesome description'
          ariaDescription='Description on icon button'
        >
          And this is the label
        </CompoundButton>
      );
      renderedDOM = ReactDOM.findDOMNode(button as React.ReactInstance);
      expect(renderedDOM.getAttribute('aria-label') === null);
      expect(renderedDOM.getAttribute('aria-labelledby') === renderedDOM.querySelector('.ms-Button-label').id);
      expect(renderedDOM.getAttribute('aria-describedby') === renderedDOM.querySelector('.ms-Button-description').id);
    });

    describe('with menuProps', () => {
      let button: Element;

      beforeAll(() => {
        const wrapper = ReactTestUtils.renderIntoDocument<any>(
          <DefaultButton menuProps={ { items: [{ key: 'item', name: 'Item' }] } }>Hello</DefaultButton>
        ) as DefaultButton;
        button = ReactTestUtils.findRenderedDOMComponentWithTag(wrapper, 'button');
      });

      it('contains aria-haspopup=true', () => {
        expect(button.getAttribute('aria-haspopup')).toEqual('true');
      });
    });

    describe('without menuProps', () => {
      let button: Element;

      beforeAll(() => {
        const wrapper = ReactTestUtils.renderIntoDocument<any>(
          <DefaultButton>Hello</DefaultButton>
        ) as DefaultButton;
        button = ReactTestUtils.findRenderedDOMComponentWithTag(wrapper, 'button');
      });

      it('does not contain aria-haspopup', () => {
        expect(button.getAttribute('aria-haspopup')).toEqual(null);
      });
    });

    describe('with menuIconProps', () => {
      let button: Element;

      beforeAll(() => {
        const wrapper = ReactTestUtils.renderIntoDocument<any>(
          <DefaultButton menuIconProps={ { iconName: 'fontColor' } }>Hello</DefaultButton>
        ) as DefaultButton;
        button = ReactTestUtils.findRenderedDOMComponentWithTag(wrapper, 'button');
      });

      it('Contains the expected icon via menuIconProps', () => {
        expect(button.querySelectorAll('[data-icon-name="fontColor"]').length).toEqual(1);
      });
    });

    it('Providing onClick and menuProps does not render a SplitButton', () => {
      const button = ReactTestUtils.renderIntoDocument<any>(
        <DefaultButton
          data-automation-id='test'
          text='Create account'
          onClick={ alertClicked }
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
      const renderedDOM = ReactDOM.findDOMNode(button as React.ReactInstance) as Element;
      expect(renderedDOM.tagName).not.toEqual('DIV');
    });

    it('Providing onKeyDown and menuProps still fires provided onKeyDown', () => {
      const keyDownSpy = jest.fn();

      const button = ReactTestUtils.renderIntoDocument<any>(
        <DefaultButton
          data-automation-id='test'
          text='Create account'
          onKeyDown={ keyDownSpy }
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
      const menuButtonDOM = ReactDOM.findDOMNode(button as React.ReactInstance) as Element;

      ReactTestUtils.Simulate.keyDown(menuButtonDOM, { which: KeyCodes.enter });

      expect(keyDownSpy).toHaveBeenCalled();
    });

    it('Providing onKeyDown, menuProps and setting splitButton to true fires provided onKeyDown on both buttons', () => {
      const keyDownSpy = jest.fn();

      const button = ReactTestUtils.renderIntoDocument<any>(
        <DefaultButton
          data-automation-id='test'
          text='Create account'
          onKeyDown={ keyDownSpy }
          split={ true }
          onClick={ alertClicked }
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
      const renderedDOM = ReactDOM.findDOMNode(button as React.ReactInstance) as Element;
      const primaryButtonDOM: HTMLDivElement = renderedDOM.getElementsByTagName('div')[0] as HTMLDivElement;

      ReactTestUtils.Simulate.keyDown(primaryButtonDOM, { which: KeyCodes.enter });

      expect(keyDownSpy).toHaveBeenCalled();
    });

    it('Providing onClick, menuProps and setting splitButton to true renders a SplitButton', () => {
      const button = ReactTestUtils.renderIntoDocument<any>(
        <DefaultButton
          data-automation-id='test'
          text='Create account'
          split={ true }
          onClick={ alertClicked }
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
      const renderedDOM = ReactDOM.findDOMNode(button as React.ReactInstance) as Element;
      expect(renderedDOM.tagName).toEqual('DIV');
    });

    it('Tapping menu button of SplitButton expands menu', () => {
      const button = ReactTestUtils.renderIntoDocument<any>(
        <DefaultButton
          data-automation-id='test'
          text='Create account'
          split={ true }
          onClick={ alertClicked }
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
      const renderedDOM = ReactDOM.findDOMNode(button as React.ReactInstance) as Element;
      const menuButtonDOM: HTMLButtonElement = renderedDOM.getElementsByTagName('button')[1] as HTMLButtonElement;
      ReactTestUtils.Simulate.click(menuButtonDOM);
      expect(renderedDOM.getAttribute('aria-expanded')).toEqual('true');
    });

    it('If menu trigger is disabled, pressing down does not trigger menu', () => {
      const button = ReactTestUtils.renderIntoDocument<any>(
        <DefaultButton
          data-automation-id='test'
          text='Create account'
          menuTriggerKeyCode={ null }
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
      const menuButtonDOM = ReactDOM.findDOMNode(button as React.ReactInstance) as Element;

      ReactTestUtils.Simulate.keyDown(menuButtonDOM,
        {
          which: KeyCodes.down
        });
      expect(menuButtonDOM.getAttribute('aria-expanded')).toEqual('false');
    });

    it('If menu trigger is specefied, default key is overridden', () => {
      const button = ReactTestUtils.renderIntoDocument<any>(
        <DefaultButton
          data-automation-id='test'
          text='Create account'
          menuTriggerKeyCode={ KeyCodes.right }
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
      const menuButtonDOM = ReactDOM.findDOMNode(button as React.ReactInstance) as Element;

      ReactTestUtils.Simulate.keyDown(menuButtonDOM,
        {
          which: KeyCodes.down
        });
      expect(menuButtonDOM.getAttribute('aria-expanded')).toEqual('false');

      ReactTestUtils.Simulate.keyDown(menuButtonDOM,
        {
          which: KeyCodes.right
        });
      expect(menuButtonDOM.getAttribute('aria-expanded')).toEqual('true');
    });

    describe('Response to click event', () => {
      let didClick = false;
      const setTrue = (): void => {
        didClick = true;
      };

      beforeEach(() => {
        didClick = false;
      });

      it('Clicking SplitButton button triggers action', () => {
        const renderedDOM: HTMLElement = renderIntoDocument(
          <DefaultButton
            data-automation-id='test'
            text='Create account'
            split={ true }
            onClick={ setTrue }
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
        const menuButtonDOM: HTMLButtonElement = renderedDOM.querySelectorAll('button')[0];

        ReactTestUtils.Simulate.click(menuButtonDOM);
        expect(didClick).toEqual(true);
      });

      it('Pressing alt + down on SplitButton triggers menu', () => {
        const renderedDOM: HTMLElement = renderIntoDocument(
          <DefaultButton
            data-automation-id='test'
            text='Create account'
            split={ true }
            onClick={ setTrue }
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

        const menuButtonElement = renderedDOM.querySelectorAll('button')[1];

        ReactTestUtils.Simulate.keyDown(menuButtonElement,
          {
            which: KeyCodes.down,
            altKey: true
          });
        expect(renderedDOM.getAttribute('aria-expanded')).toEqual('true');
      });

      it('Click on button opens the menu, a second click closes the menu and calls onAfterMenuDismiss', () => {

        const callbackMock = jest.fn();

        const renderedDOM: HTMLElement = renderIntoDocument(
          <DefaultButton
            data-automation-id='test'
            text='Create account'
            split={ true }
            onClick={ setTrue }
            onAfterMenuDismiss={ callbackMock }
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

        const menuButtonElement = renderedDOM.querySelectorAll('button')[1];

        ReactTestUtils.Simulate.click(menuButtonElement);
        expect(renderedDOM.getAttribute('aria-expanded')).toEqual('true');

        ReactTestUtils.Simulate.click(menuButtonElement);
        expect(renderedDOM.getAttribute('aria-expanded')).toEqual('false');
        expect(callbackMock.mock.calls.length).toBe(1);
      });

      it('A disabled SplitButton does not respond to clicks', () => {
        const renderedDOM: HTMLElement = renderIntoDocument(
          <DefaultButton
            disabled={ true }
            data-automation-id='test'
            text='Create account'
            split={ true }
            onClick={ setTrue }
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
        const buttonElement = renderedDOM.querySelectorAll('button')[0];

        ReactTestUtils.Simulate.click(buttonElement);
        expect(didClick).toEqual(false);
      });
    });
  });
});
