/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */

import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';

import { ButtonBase } from './_base/Button.base';
import { MenuButtonBase } from './_base/MenuButton.base';
import { SplitButtonBase } from './_base/SplitButton.base';
import { DefaultButton } from './DefaultButton/DefaultButton';
import { IconButton } from './IconButton/IconButton';
import { ActionButton } from './ActionButton/ActionButton';
import { CommandBarButton } from './CommandBarButton/CommandBarButton';
import { CompoundButton } from './CompoundButton/CompoundButton';
import { KeyCodes } from '../../Utilities';

const alertClicked = (): void => { /*noop*/ };

describe('Button', () => {
  it('renders DefaultButton correctly', () => {
    const component = renderer.create(<DefaultButton text='Button' />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Primary correctly', () => {
    const component = renderer.create(<DefaultButton primary text='Button' />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders ActionButton correctly', () => {
    const component = renderer.create(<ActionButton>Button</ActionButton>);
    let tree = component.toJSON();
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
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders CompoundButton correctly', () => {
    const component = renderer.create(
      <CompoundButton description='You can create a new account here.'>
        Create account
    </CompoundButton>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Primary CompoundButton correctly', () => {
    const component = renderer.create(
      <CompoundButton primary description='You can create a new account here.'>
        Create account
    </CompoundButton>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders IconButton correctly', () => {
    const component = renderer.create(
      <IconButton
        iconProps={ { iconName: 'Emoji2' } }
        title='Emoji'
        ariaLabel='Emoji'
      />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('ButtonBase', () => {
    function renderIntoDocument(element: React.ReactElement<any>): HTMLElement {
      const component = ReactTestUtils.renderIntoDocument(element);
      const renderedDOM: Element = ReactDOM.findDOMNode(component as React.ReactInstance);
      return renderedDOM as HTMLElement;
    }

    it('can render without an onClick.', () => {
      const button = ReactTestUtils.renderIntoDocument<any>(
        <ButtonBase>Hello</ButtonBase>
      );

      const renderedDOM = ReactDOM.findDOMNode(button as React.ReactInstance);
      expect(renderedDOM.tagName).toEqual('BUTTON');
    });

    it('can render with an onClick.', () => {
      let onClick: () => null = () => null;

      const button = ReactTestUtils.renderIntoDocument<any>(
        <ButtonBase onClick={ onClick }>Hello</ButtonBase>
      );
      const renderedDOM = ReactDOM.findDOMNode(button as React.ReactInstance);
      expect(renderedDOM.tagName).toEqual('BUTTON');
    });

    it('can render with an href', () => {
      const button = ReactTestUtils.renderIntoDocument<any>(
        <ButtonBase href='http://www.microsoft.com' target='_blank'>Hello</ButtonBase>
      );
      const renderedDOM = ReactDOM.findDOMNode(button as React.ReactInstance);
      expect(renderedDOM.tagName).toEqual('A');
    });

    it('applies the correct aria attributes', () => {
      let button: any;
      let renderedDOM: any;

      button = ReactTestUtils.renderIntoDocument<any>(
        <ButtonBase
          href='http://www.microsoft.com'
          target='_blank'
        >
          Hello
        </ButtonBase>
      );
      renderedDOM = ReactDOM.findDOMNode(button as React.ReactInstance);
      expect(renderedDOM.getAttribute('aria-label') === null);
      expect(renderedDOM.getAttribute('aria-labelledby') === null);
      expect(renderedDOM.getAttribute('aria-describedby') === null);

      button = ReactTestUtils.renderIntoDocument<any>(
        <ButtonBase
          href='http://www.microsoft.com'
          target='_blank'
          aria-label='MyLabel'
        >
          Hello
        </ButtonBase>
      );
      renderedDOM = ReactDOM.findDOMNode(button as React.ReactInstance);
      expect(renderedDOM.getAttribute('aria-label') === 'MyLabel');
      expect(renderedDOM.getAttribute('aria-labelledby') === null);
      expect(renderedDOM.getAttribute('aria-describedby') === null);

      button = ReactTestUtils.renderIntoDocument<any>(
        <ButtonBase
          href='http://www.microsoft.com'
          target='_blank'
          aria-labelledby='someid'
        >
          Hello
        </ButtonBase>
      );
      renderedDOM = ReactDOM.findDOMNode(button as React.ReactInstance);
      expect(renderedDOM.getAttribute('aria-label') === 'MyLabel');
      expect(renderedDOM.getAttribute('aria-labelledby') === 'someid');
      expect(renderedDOM.getAttribute('aria-describedby') === null);

      button = ReactTestUtils.renderIntoDocument<any>(
        <ButtonBase
          href='http://www.microsoft.com'
          target='_blank'
          ariaDescription='This description is not visible'
          ariaDescriptionId='ariaID'
          labelId='labelID'
        >
          Hello
        </ButtonBase>
      );
      renderedDOM = ReactDOM.findDOMNode(button as React.ReactInstance);
      expect(renderedDOM.getAttribute('aria-label') === null);
      expect(renderedDOM.getAttribute('aria-labelledby') === renderedDOM.querySelector(`#labelID`).id);
      expect(renderedDOM.getAttribute('aria-describedby') === renderedDOM.querySelector('#ariaID').id);

      button = ReactTestUtils.renderIntoDocument<any>(
        <ButtonBase
          iconProps={ { iconName: 'Emoji2' } }
          ariaDescription='Description on icon button'
          ariaDescriptionId='ariaID'
        />
      );
      renderedDOM = ReactDOM.findDOMNode(button as React.ReactInstance);
      expect(renderedDOM.getAttribute('aria-label') === null);
      expect(renderedDOM.getAttribute('aria-labelledby') === null);
      expect(renderedDOM.getAttribute('aria-describedby') === renderedDOM.querySelector('#ariaID').id);

      button = ReactTestUtils.renderIntoDocument<any>(
        <ButtonBase
          description='Some awesome description'
          ariaDescription='Description on icon button'
          ariaDescriptionId='ariaID'
          labelId='labelID'
        >
          And this is the label
        </ButtonBase>
      );
      renderedDOM = ReactDOM.findDOMNode(button as React.ReactInstance);
      expect(renderedDOM.getAttribute('aria-label') === null);
      expect(renderedDOM.getAttribute('aria-labelledby') === renderedDOM.querySelector('#labelID').id);
      expect(renderedDOM.getAttribute('aria-describedby') === renderedDOM.querySelector('#ariaID').id);
    });

    describe('with menuProps', () => {
      let button: Element;

      beforeAll(() => {
        const wrapper = ReactTestUtils.renderIntoDocument<any>(
          <SplitButtonBase menuProps={ { items: [{ key: 'item', name: 'Item' }] } }>Hello</SplitButtonBase>
        ) as SplitButtonBase;
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
          <SplitButtonBase>Hello</SplitButtonBase>
        ) as SplitButtonBase;
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
          <ButtonBase menuIconProps={ { iconName: 'fontColor' } }>Hello</ButtonBase>
        ) as MenuButtonBase;
        button = ReactTestUtils.findRenderedDOMComponentWithTag(wrapper, 'button');
      });

      it('Contains the expected icon via menuIconProps', () => {
        expect(button.querySelectorAll('[data-icon-name="fontColor"]').length).toEqual(1);
      });
    });

    it('Providing onClick and menuProps does not render a SplitButton', () => {
      const button = ReactTestUtils.renderIntoDocument<any>(
        <SplitButtonBase
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
      const renderedDOM = ReactDOM.findDOMNode(button as React.ReactInstance);
      expect(renderedDOM.tagName).toEqual('BUTTON');
    });

    it('Providing onClick, menuProps and setting splitButton to true renders a SplitButton', () => {
      const button = ReactTestUtils.renderIntoDocument<any>(
        <SplitButtonBase
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
      const renderedDOM = ReactDOM.findDOMNode(button as React.ReactInstance);
      expect(renderedDOM.childElementCount).toEqual(2);
    });

    it('Tapping menu button of SplitButton expands menu', () => {
      const button = ReactTestUtils.renderIntoDocument<any>(
        <SplitButtonBase
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
      const renderedDOM = ReactDOM.findDOMNode(button as React.ReactInstance);
      const menuButtonDOM: HTMLButtonElement = renderedDOM.getElementsByTagName('button')[1] as HTMLButtonElement;
      ReactTestUtils.Simulate.click(menuButtonDOM);
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
          <SplitButtonBase
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

      // Not yet supported
      // it('Pressing down on SplitButton triggers menu', () => {
      //   const renderedDOM: HTMLElement = renderIntoDocument(
      //     <SplitButtonBase
      //       data-automation-id='test'
      //       text='Create account'
      //       split={ true }
      //       onClick={ setTrue }
      //       menuProps={ {
      //         items: [
      //           {
      //             key: 'emailMessage',
      //             name: 'Email message',
      //             icon: 'Mail'
      //           },
      //           {
      //             key: 'calendarEvent',
      //             name: 'Calendar event',
      //             icon: 'Calendar'
      //           }
      //         ]
      //       } }
      //     />
      //   );

      //   const menuButtonElement = renderedDOM.querySelectorAll('button')[1];

      //   ReactTestUtils.Simulate.keyDown(menuButtonElement,
      //     {
      //       which: KeyCodes.down
      //     });
      //   expect(renderedDOM.getAttribute('aria-expanded')).toEqual('true');
      // });

      it('A disabled SplitButton does not respond to clicks', () => {
        const renderedDOM: HTMLElement = renderIntoDocument(
          <SplitButtonBase
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
