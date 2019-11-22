import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';

import { DefaultButton } from './DefaultButton/DefaultButton';
import { IconButton } from './IconButton/IconButton';
import { ActionButton } from './ActionButton/ActionButton';
import { CommandBarButton } from './CommandBarButton/CommandBarButton';
import { CompoundButton } from './CompoundButton/CompoundButton';
import { KeyCodes, resetIds } from '../../Utilities';
import { renderIntoDocument } from '../../common/testUtilities';
import { IContextualMenuProps } from '../ContextualMenu/index';

const alertClicked = (): void => {
  /*noop*/
};

describe('Button', () => {
  let container: HTMLElement;

  beforeEach(() => {
    resetIds();
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (container) {
      ReactDOM.unmountComponentAtNode(container);
    }
    document.body.innerHTML = '';
  });

  function render(content: JSX.Element): Element {
    ReactDOM.render(content, container);

    return container.firstChild as Element;
  }

  it('renders DefaultButton correctly', () => {
    const component = renderer.create(<DefaultButton text="Button" />);
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
    const component = renderer.create(<DefaultButton text="Button" keytipProps={keytipProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders CommandBarButton correctly', () => {
    const component = renderer.create(
      <CommandBarButton
        iconProps={{ iconName: 'Add' }}
        text="Create account"
        menuProps={{
          items: [
            {
              key: 'emailMessage',
              text: 'Email message',
              iconProps: { iconName: 'Mail' }
            },
            {
              key: 'calendarEvent',
              text: 'Calendar event',
              iconProps: { iconName: 'Calendar' }
            }
          ]
        }}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders CompoundButton correctly', () => {
    const component = renderer.create(<CompoundButton secondaryText="You can create a new account here.">Create account</CompoundButton>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders IconButton correctly', () => {
    const component = renderer.create(<IconButton iconProps={{ iconName: 'Emoji2' }} title="Emoji" ariaLabel="Emoji" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('DefaultButton', () => {
    it('can render without an onClick.', () => {
      const button = render(<DefaultButton>Hello</DefaultButton>);

      expect(button.tagName).toEqual('BUTTON');
    });

    it('can render with an onClick.', () => {
      const onClick: () => null = () => null;
      const button = render(<DefaultButton onClick={onClick}>Hello</DefaultButton>);
      expect(button.tagName).toEqual('BUTTON');
    });

    it('can render with an href', () => {
      const button = render(
        <DefaultButton href="http://www.microsoft.com" target="_blank">
          Hello
        </DefaultButton>
      );
      expect(button.tagName).toEqual('A');
    });

    describe('aria attributes', () => {
      it('does not apply aria attributes that are not passed in', () => {
        const button: any = render(
          <DefaultButton href="http://www.microsoft.com" target="_blank">
            Hello
          </DefaultButton>
        );

        expect(button.getAttribute('aria-label')).toBeNull();
        expect(button.getAttribute('aria-labelledby')).toBeNull();
        expect(button.getAttribute('aria-describedby')).toBeNull();
        expect(button.getAttribute('aria-pressed')).toBeNull();
      });

      it('overrides native aria-label with Button ariaLabel', () => {
        const button = render(
          <DefaultButton href="http://www.microsoft.com" target="_blank" aria-label="NativeLabel" ariaLabel="ButtonLabel">
            Hello
          </DefaultButton>
        );

        expect(button.getAttribute('aria-label')).toEqual('ButtonLabel');
        expect(button.getAttribute('aria-labelledby')).toBeNull();
        expect(button.getAttribute('aria-describedby')).toBeNull();
      });

      it('applies aria-label', () => {
        const button = render(
          <DefaultButton href="http://www.microsoft.com" target="_blank" aria-label="MyLabel">
            Hello
          </DefaultButton>
        );

        expect(button.getAttribute('aria-label')).toEqual('MyLabel');
        expect(button.getAttribute('aria-labelledby')).toBeNull();
        expect(button.getAttribute('aria-describedby')).toBeNull();
      });

      it('applies aria-labelledby', () => {
        const button = render(
          <DefaultButton href="http://www.microsoft.com" target="_blank" aria-labelledby="someid">
            Hello
          </DefaultButton>
        );

        expect(button.getAttribute('aria-labelledby')).toEqual('someid');
        expect(button.getAttribute('aria-describedby')).toBeNull();
      });

      it('does not apply aria-labelledby to a button with no text', () => {
        const button = render(<DefaultButton href="http://www.microsoft.com" target="_blank" aria-describedby="someid" />);

        expect(button.getAttribute('aria-labelledby')).toBeNull();
        expect(button.getAttribute('aria-describedby')).toEqual('someid');
      });

      it('applies aria-labelledby and aria-describedby', () => {
        const button = render(
          <DefaultButton
            href="http://www.microsoft.com"
            target="_blank"
            ariaDescription="This description is not visible"
            styles={{ screenReaderText: 'some-screenreader-class' }}
          >
            Hello
          </DefaultButton>
        );

        expect(button.getAttribute('aria-label')).toBeNull();

        expect(button.getAttribute('aria-labelledby')).toEqual(button.querySelector(`.ms-Button-label`)!.id);
        expect(button.getAttribute('aria-labelledby')).toBeDefined();

        expect(button.getAttribute('aria-describedby')).toEqual(button.querySelector('.some-screenreader-class')!.id);
        expect(button.getAttribute('aria-describedby')).toBeDefined();
      });

      it('applies aria-describedby to an IconButton', () => {
        const button = render(
          <IconButton
            iconProps={{ iconName: 'Emoji2' }}
            ariaDescription="Description on icon button"
            styles={{ screenReaderText: 'some-screenreader-class' }}
          />
        );

        expect(button.getAttribute('aria-label')).toBeNull();

        expect(button.getAttribute('aria-labelledby')).toBeNull();
        expect(button.getAttribute('aria-labelledby')).toBeDefined();

        expect(button.getAttribute('aria-describedby')).toEqual(button.querySelector('.some-screenreader-class')!.id);
        expect(button.getAttribute('aria-describedby')).toBeDefined();
      });

      it('applies aria-labelledby and aria-describedby to a CompoundButton with ariaDescription', () => {
        const button = render(
          <CompoundButton
            secondaryText="Some awesome description"
            ariaDescription="Description on icon button"
            styles={{ screenReaderText: 'some-screenreader-class' }}
          >
            And this is the label
          </CompoundButton>
        );

        expect(button.getAttribute('aria-label')).toBeNull();

        expect(button.getAttribute('aria-labelledby')).toEqual(button.querySelector('.ms-Button-label')!.id);
        expect(button.getAttribute('aria-labelledby')).toBeDefined();

        expect(button.getAttribute('aria-describedby')).toEqual(button.querySelector('.some-screenreader-class')!.id);
        expect(button.getAttribute('aria-describedby')).toBeDefined();
      });

      it('applies aria-labelledby and aria-describedby to a CompoundButton with secondaryText and no ariaDescription', () => {
        const button = render(<CompoundButton secondaryText="Some awesome description">And this is the label</CompoundButton>);

        expect(button.getAttribute('aria-label')).toBeNull();

        expect(button.getAttribute('aria-labelledby')).toEqual(button.querySelector('.ms-Button-label')!.id);
        expect(button.getAttribute('aria-labelledby')).toBeDefined();

        expect(button.getAttribute('aria-describedby')).toEqual(button.querySelector('.ms-Button-description')!.id);
        expect(button.getAttribute('aria-describedby')).toBeDefined();
      });

      it('does not apply aria-pressed to an unchecked button', () => {
        const button: any = render(<DefaultButton toggle={true}>Hello</DefaultButton>);

        expect(button.getAttribute('aria-pressed')).toEqual('false');
      });

      it('applies aria-pressed to a checked button', () => {
        const button: any = render(
          <DefaultButton toggle={true} checked={true}>
            Hello
          </DefaultButton>
        );

        expect(button.getAttribute('aria-pressed')).toEqual('true');
      });

      it('does not apply aria-pressed to an unchecked split button', () => {
        const button: any = render(
          <DefaultButton
            toggle={true}
            split={true}
            onClick={alertClicked}
            menuProps={{
              items: [
                {
                  key: 'emailMessage',
                  text: 'Email message',
                  iconProps: { iconName: 'Mail' }
                }
              ]
            }}
          >
            Hello
          </DefaultButton>
        );

        expect(button.getAttribute('aria-pressed')).toEqual('false');
      });

      it('does not mutate menuprops hidden property', () => {
        const menuProps: IContextualMenuProps = {
          hidden: false,
          items: [
            {
              key: 'emailMessage',
              text: 'Email message',
              iconProps: { iconName: 'Mail' }
            }
          ]
        };
        const button: any = render(
          <DefaultButton toggle={true} split={true} onClick={alertClicked} persistMenu={true} menuProps={menuProps}>
            Hello
          </DefaultButton>
        );

        expect(button).toBeTruthy();
        expect(menuProps.hidden).toEqual(false);
      });

      it('applies aria-pressed to a checked split button', () => {
        const button: any = render(
          <DefaultButton
            toggle={true}
            checked={true}
            split={true}
            onClick={alertClicked}
            menuProps={{
              items: [
                {
                  key: 'emailMessage',
                  text: 'Email message',
                  iconProps: { iconName: 'Mail' }
                }
              ]
            }}
          >
            Hello
          </DefaultButton>
        );

        expect(button.getAttribute('aria-pressed')).toEqual('true');
      });
    });

    describe('with menuProps', () => {
      let button: Element;

      beforeAll(() => {
        button = render(<DefaultButton menuProps={{ items: [{ key: 'item', text: 'Item' }] }}>Hello</DefaultButton>);
      });

      it('contains aria-haspopup=true', () => {
        expect(button.getAttribute('aria-haspopup')).toEqual('true');
      });
    });

    describe('without menuProps', () => {
      let button: Element;

      beforeAll(() => {
        button = render(<DefaultButton>Hello</DefaultButton>);
      });

      it('does not contain aria-haspopup', () => {
        expect(button.getAttribute('aria-haspopup')).toEqual(null);
      });
    });

    describe('with menuIconProps', () => {
      let button: Element;

      beforeAll(() => {
        button = render(<DefaultButton menuIconProps={{ iconName: 'fontColor' }}>Hello</DefaultButton>);
      });

      it('Contains the expected icon via menuIconProps', () => {
        expect(button.querySelectorAll('[data-icon-name="fontColor"]').length).toEqual(1);
      });
    });

    it('Providing onClick and menuProps does not render a SplitButton', () => {
      const button = render(
        <DefaultButton
          text="Create account"
          onClick={alertClicked}
          menuProps={{
            items: [
              {
                key: 'emailMessage',
                text: 'Email message',
                iconProps: { iconName: 'Mail' }
              },
              {
                key: 'calendarEvent',
                text: 'Calendar event',
                iconProps: { iconName: 'Calendar' }
              }
            ]
          }}
        />
      );
      expect(button.tagName).not.toEqual('DIV');
    });

    it('Providing onKeyDown and menuProps still fires provided onKeyDown', () => {
      const keyDownSpy = jest.fn();

      const button = render(
        <DefaultButton
          text="Create account"
          onKeyDown={keyDownSpy}
          menuProps={{
            items: [
              {
                key: 'emailMessage',
                text: 'Email message',
                iconProps: { iconName: 'Mail' }
              },
              {
                key: 'calendarEvent',
                text: 'Calendar event',
                iconProps: { iconName: 'Calendar' }
              }
            ]
          }}
        />
      );

      ReactTestUtils.Simulate.keyDown(button, { which: KeyCodes.enter });

      expect(keyDownSpy).toHaveBeenCalled();
    });

    it('Providing onKeyDown, menuProps and setting splitButton to true fires provided onKeyDown on both buttons', () => {
      const keyDownSpy = jest.fn();

      const button = render(
        <DefaultButton
          text="Create account"
          onKeyDown={keyDownSpy}
          split={true}
          onClick={alertClicked}
          menuProps={{
            items: [
              {
                key: 'emailMessage',
                text: 'Email message',
                iconProps: { iconName: 'Mail' }
              },
              {
                key: 'calendarEvent',
                text: 'Calendar event',
                iconProps: { iconName: 'Calendar' }
              }
            ]
          }}
        />
      );
      const primaryButtonDOM: HTMLElement = button.querySelector("[data-automationid='splitbuttonprimary']") as HTMLElement;

      ReactTestUtils.Simulate.keyDown(primaryButtonDOM, { which: KeyCodes.enter });

      expect(keyDownSpy).toHaveBeenCalled();
    });

    it('Space keydown in a splitButton will fire onClick', () => {
      const onClickSpy = jest.fn();

      const button = render(
        <DefaultButton
          data-automation-id="test"
          text="Create account"
          split={true}
          onClick={onClickSpy}
          menuProps={{
            items: [
              {
                key: 'emailMessage',
                text: 'Email message',
                iconProps: { iconName: 'Mail' }
              },
              {
                key: 'calendarEvent',
                text: 'Calendar event',
                iconProps: { iconName: 'Calendar' }
              }
            ]
          }}
        />
      );
      const buttonContainer: HTMLDivElement = button.getElementsByTagName('span')[0] as HTMLDivElement;

      ReactTestUtils.Simulate.keyDown(buttonContainer, { which: KeyCodes.space });

      expect(onClickSpy).toHaveBeenCalled();
    });

    it('Providing onClick, menuProps and setting splitButton to true renders a SplitButton', () => {
      const button = render(
        <DefaultButton
          text="Create account"
          split={true}
          onClick={alertClicked}
          menuProps={{
            items: [
              {
                key: 'emailMessage',
                text: 'Email message',
                iconProps: { iconName: 'Mail' }
              },
              {
                key: 'calendarEvent',
                text: 'Calendar event',
                iconProps: { iconName: 'Calendar' }
              }
            ]
          }}
        />
      );
      expect(button.tagName).toEqual('DIV');
    });

    it('Tapping menu button of SplitButton expands menu', () => {
      const button = render(
        <DefaultButton
          text="Create account"
          split={true}
          onClick={alertClicked}
          menuProps={{
            items: [
              {
                key: 'emailMessage',
                text: 'Email message',
                iconProps: { iconName: 'Mail' }
              },
              {
                key: 'calendarEvent',
                text: 'Calendar event',
                iconProps: { iconName: 'Calendar' }
              }
            ]
          }}
        />
      );
      const menuButtonDOM: HTMLButtonElement = button.getElementsByTagName('button')[1] as HTMLButtonElement;
      ReactTestUtils.Simulate.click(menuButtonDOM);
      expect(button.getAttribute('aria-expanded')).toEqual('true');
    });

    it('Touch Start on primary button of SplitButton expands menu', () => {
      const button = render(
        <DefaultButton
          text="Create account"
          split={true}
          onClick={alertClicked}
          menuProps={{
            items: [
              {
                key: 'emailMessage',
                text: 'Email message',
                iconProps: { iconName: 'Mail' }
              },
              {
                key: 'calendarEvent',
                text: 'Calendar event',
                iconProps: { iconName: 'Calendar' }
              }
            ]
          }}
        />
      );
      const primaryButtonDOM: HTMLButtonElement = button.getElementsByTagName('button')[0] as HTMLButtonElement;

      // in a normal scenario, when we do a touchstart we would also cause a
      // click event to fire. This doesn't happen in the simulator so we're
      // manually adding this in.
      ReactTestUtils.Simulate.touchStart(primaryButtonDOM);
      ReactTestUtils.Simulate.click(primaryButtonDOM);
      expect(button.getAttribute('aria-expanded')).toEqual('true');
    });

    it('If menu trigger is disabled, pressing down does not trigger menu', () => {
      const button = render(
        <DefaultButton
          text="Create account"
          menuTriggerKeyCode={null}
          menuProps={{
            items: [
              {
                key: 'emailMessage',
                text: 'Email message',
                iconProps: { iconName: 'Mail' }
              },
              {
                key: 'calendarEvent',
                text: 'Calendar event',
                iconProps: { iconName: 'Calendar' }
              }
            ]
          }}
        />
      );

      ReactTestUtils.Simulate.keyDown(button, {
        which: KeyCodes.down
      });
      expect(button.getAttribute('aria-expanded')).toEqual('false');
    });

    it('If menu trigger is specified, default key is overridden', () => {
      const button = render(
        <DefaultButton
          text="Create account"
          menuTriggerKeyCode={KeyCodes.right}
          menuProps={{
            items: [
              {
                key: 'emailMessage',
                text: 'Email message',
                iconProps: { iconName: 'Mail' }
              },
              {
                key: 'calendarEvent',
                text: 'Calendar event',
                iconProps: { iconName: 'Calendar' }
              }
            ]
          }}
        />
      );

      ReactTestUtils.Simulate.keyDown(button, {
        which: KeyCodes.down
      });
      expect(button.getAttribute('aria-expanded')).toEqual('false');

      ReactTestUtils.Simulate.keyDown(button, {
        which: KeyCodes.right
      });
      expect(button.getAttribute('aria-expanded')).toEqual('true');
    });

    describe('Response to click event', () => {
      let didClick = false;
      const setTrue = (): void => {
        didClick = true;
      };

      beforeEach(() => {
        didClick = false;
      });

      function buildRenderButtonWithMenu(callbackMock?: jest.Mock<unknown>, persistMenu?: boolean): HTMLElement {
        const button: HTMLElement = renderIntoDocument(
          <DefaultButton
            text="Create account"
            split={true}
            onClick={setTrue}
            onAfterMenuDismiss={callbackMock}
            persistMenu={persistMenu}
            menuProps={{
              items: [
                {
                  key: 'emailMessage',
                  text: 'Email message',
                  iconProps: { iconName: 'Mail' }
                },
                {
                  key: 'calendarEvent',
                  text: 'Calendar event',
                  iconProps: { iconName: 'Calendar' }
                }
              ]
            }}
          />
        );
        return button;
      }

      it('Clicking SplitButton button triggers action', () => {
        const button: HTMLElement = buildRenderButtonWithMenu();
        const menuButtonDOM: HTMLButtonElement = button.querySelectorAll('button')[0];

        ReactTestUtils.Simulate.click(menuButtonDOM);
        expect(didClick).toEqual(true);
      });

      it('Pressing alt + down on SplitButton triggers menu', () => {
        const button: HTMLElement = buildRenderButtonWithMenu();
        const menuButtonElement = button.querySelectorAll('button')[1];

        ReactTestUtils.Simulate.keyDown(menuButtonElement, {
          which: KeyCodes.down,
          altKey: true
        });
        expect(button.getAttribute('aria-expanded')).toEqual('true');
      });

      it('Click on button opens the menu, a second click closes the menu and calls onAfterMenuDismiss', () => {
        const callbackMock = jest.fn();

        const button: HTMLElement = buildRenderButtonWithMenu(callbackMock);
        const menuButtonElement = button.querySelectorAll('button')[1];

        ReactTestUtils.Simulate.click(menuButtonElement);
        expect(button.getAttribute('aria-expanded')).toEqual('true');

        ReactTestUtils.Simulate.click(menuButtonElement);
        expect(button.getAttribute('aria-expanded')).toEqual('false');
        expect(callbackMock.mock.calls.length).toBe(1);
      });

      it('[PersistedMenu] Click on button opens the menu, a second click closes the menu and calls onAfterMenuDismiss', () => {
        const callbackMock = jest.fn();

        const button: HTMLElement = buildRenderButtonWithMenu(callbackMock, true);
        const menuButtonElement = button.querySelectorAll('button')[1];

        ReactTestUtils.Simulate.click(menuButtonElement);
        expect(button.getAttribute('aria-expanded')).toEqual('true');

        ReactTestUtils.Simulate.click(menuButtonElement);
        expect(button.getAttribute('aria-expanded')).toEqual('false');
        expect(callbackMock.mock.calls.length).toBe(1);
      });

      it('A disabled SplitButton does not respond to input events', () => {
        const button: HTMLElement = renderIntoDocument(
          <DefaultButton
            disabled={true}
            text="Create account"
            split={true}
            onClick={setTrue}
            onKeyPress={setTrue}
            onKeyUp={setTrue}
            onKeyDown={setTrue}
            onMouseDown={setTrue}
            onMouseUp={setTrue}
            menuProps={{
              items: [
                {
                  key: 'emailMessage',
                  text: 'Email message',
                  iconProps: { iconName: 'Mail' }
                },
                {
                  key: 'calendarEvent',
                  text: 'Calendar event',
                  iconProps: { iconName: 'Calendar' }
                }
              ]
            }}
          />
        );

        ReactTestUtils.Simulate.click(button);
        ReactTestUtils.Simulate.keyDown(button, {
          which: KeyCodes.down,
          altKey: true
        });
        ReactTestUtils.Simulate.keyUp(button, {
          which: KeyCodes.down,
          altKey: true
        });
        ReactTestUtils.Simulate.keyPress(button, {
          which: KeyCodes.down,
          altKey: true
        });
        ReactTestUtils.Simulate.mouseDown(button, {
          type: 'mousedown',
          clientX: 0,
          clientY: 0
        });

        ReactTestUtils.Simulate.mouseUp(button, {
          type: 'mouseup',
          clientX: 0,
          clientY: 0
        });
        expect(didClick).toEqual(false);
      });

      it('A disabled Button does not respond to input events', () => {
        const button: HTMLElement = renderIntoDocument(
          <DefaultButton
            disabled={true}
            text="Create account"
            split={false}
            onClick={setTrue}
            onKeyPress={setTrue}
            onKeyUp={setTrue}
            onKeyDown={setTrue}
            onMouseDown={setTrue}
            onMouseUp={setTrue}
          />
        );

        ReactTestUtils.Simulate.click(button);
        ReactTestUtils.Simulate.keyDown(button, {
          which: KeyCodes.down,
          altKey: true
        });
        ReactTestUtils.Simulate.keyUp(button, {
          which: KeyCodes.down,
          altKey: true
        });
        ReactTestUtils.Simulate.keyPress(button, {
          which: KeyCodes.down,
          altKey: true
        });
        ReactTestUtils.Simulate.mouseDown(button, {
          type: 'mousedown',
          clientX: 0,
          clientY: 0
        });

        ReactTestUtils.Simulate.mouseUp(button, {
          type: 'mouseup',
          clientX: 0,
          clientY: 0
        });
        expect(didClick).toEqual(false);
      });
      it('A focusable disabled button does not respond to input events', () => {
        const button: HTMLElement = renderIntoDocument(
          <DefaultButton
            disabled={true}
            allowDisabledFocus={true}
            text="Create account"
            split={false}
            onClick={setTrue}
            onKeyPress={setTrue}
            onKeyUp={setTrue}
            onKeyDown={setTrue}
            onMouseDown={setTrue}
            onMouseUp={setTrue}
          />
        );

        ReactTestUtils.Simulate.click(button);
        ReactTestUtils.Simulate.keyDown(button, {
          which: KeyCodes.down,
          altKey: true
        });
        ReactTestUtils.Simulate.keyUp(button, {
          which: KeyCodes.down,
          altKey: true
        });
        ReactTestUtils.Simulate.keyPress(button, {
          which: KeyCodes.down,
          altKey: true
        });
        ReactTestUtils.Simulate.mouseDown(button, {
          type: 'mousedown',
          clientX: 0,
          clientY: 0
        });

        ReactTestUtils.Simulate.mouseUp(button, {
          type: 'mouseup',
          clientX: 0,
          clientY: 0
        });
        expect(didClick).toEqual(false);
      });
      it('A focusable disabled menu button does not respond to input events', () => {
        const button: HTMLElement = renderIntoDocument(
          <DefaultButton
            disabled={true}
            allowDisabledFocus={true}
            text="Create account"
            split={false}
            onClick={setTrue}
            onKeyPress={setTrue}
            onKeyUp={setTrue}
            onKeyDown={setTrue}
            onMouseDown={setTrue}
            onMouseUp={setTrue}
            menuProps={{
              items: [
                {
                  key: 'emailMessage',
                  text: 'Email message',
                  iconProps: { iconName: 'Mail' }
                },
                {
                  key: 'calendarEvent',
                  text: 'Calendar event',
                  iconProps: { iconName: 'Calendar' }
                }
              ]
            }}
          />
        );

        ReactTestUtils.Simulate.click(button);
        ReactTestUtils.Simulate.keyDown(button, {
          which: KeyCodes.down,
          altKey: true
        });
        ReactTestUtils.Simulate.keyUp(button, {
          which: KeyCodes.down,
          altKey: true
        });
        ReactTestUtils.Simulate.keyPress(button, {
          which: KeyCodes.down,
          altKey: true
        });
        ReactTestUtils.Simulate.mouseDown(button, {
          type: 'mousedown',
          clientX: 0,
          clientY: 0
        });

        ReactTestUtils.Simulate.mouseUp(button, {
          type: 'mouseup',
          clientX: 0,
          clientY: 0
        });
        expect(didClick).toEqual(false);
      });
    });

    describe('with contextual menu', () => {
      function buildRenderAndClickButtonAndReturnContextualMenuDOMElement(
        menuPropsPatch?: any,
        text?: string,
        textAsChildElement: boolean = false
      ): HTMLElement {
        const menuProps = { items: [{ key: 'item', name: 'Item' }], ...menuPropsPatch };
        const element: React.ReactElement<any> = (
          <DefaultButton iconProps={{ iconName: 'Add' }} text={!textAsChildElement && text ? text : undefined} menuProps={menuProps}>
            {textAsChildElement && text ? text : null}
          </DefaultButton>
        );

        render(element);

        const button = render(element);

        expect(button).toBeDefined();
        ReactTestUtils.Simulate.click(button);

        // get the menu id from the button's aria attribute
        const menuId = button.getAttribute('aria-owns');
        expect(menuId).toBeDefined();

        const menuDOM = button.ownerDocument!.getElementById(menuId as string);
        expect(menuDOM).toBeDefined();

        return menuDOM as HTMLElement;
      }

      it('If button has text, contextual menu has aria-labelledBy attribute set', () => {
        const contextualMenuElement = buildRenderAndClickButtonAndReturnContextualMenuDOMElement(null, 'Button Text');

        expect(contextualMenuElement).not.toBeNull();
        expect(contextualMenuElement.getAttribute('aria-label')).toBeNull();
        expect(contextualMenuElement.getAttribute('aria-labelledBy')).toBeDefined();
      });

      it('If button has a text child, contextual menu has aria-labelledBy attribute set', () => {
        const contextualMenuElement = buildRenderAndClickButtonAndReturnContextualMenuDOMElement(null, 'Button Text', true);

        expect(contextualMenuElement).not.toBeNull();
        expect(contextualMenuElement.getAttribute('aria-label')).toBeNull();
        expect(contextualMenuElement.getAttribute('aria-labelledBy')).not.toBeNull();
      });

      it('If button has no text, contextual menu has no aria-label or aria-labelledBy attributes', () => {
        const contextualMenuElement = buildRenderAndClickButtonAndReturnContextualMenuDOMElement();

        expect(contextualMenuElement).not.toBeNull();
        expect(contextualMenuElement.getAttribute('aria-label')).toBeNull();
        expect(contextualMenuElement.getAttribute('aria-labelledBy')).toBeNull();
      });

      it('If button has text but ariaLabel provided in menuProps, contextual menu has aria-label set', () => {
        const explicitLabel = 'ExplicitLabel';
        const contextualMenuElement = buildRenderAndClickButtonAndReturnContextualMenuDOMElement(
          { ariaLabel: explicitLabel },
          'Button Text'
        );

        expect(contextualMenuElement).not.toBeNull();
        expect(contextualMenuElement.getAttribute('aria-label')).toEqual(explicitLabel);
        expect(contextualMenuElement.getAttribute('aria-labelledBy')).toBeNull();
      });
      it('Click on button opens the menu, escape press dismisses menu', () => {
        const callbackMock = jest.fn();
        const menuProps = { items: [{ key: 'item', name: 'Item' }], onDismiss: callbackMock };
        const element: React.ReactElement<any> = (
          <DefaultButton iconProps={{ iconName: 'Add' }} menuProps={menuProps}>
            {'Button Text'}
          </DefaultButton>
        );

        render(element);

        const button = render(element);

        expect(button).toBeDefined();
        ReactTestUtils.Simulate.click(button);

        // get the menu id from the button's aria attribute
        const menuId = button.getAttribute('aria-owns');
        expect(menuId).toBeDefined();

        const contextualMenuElement = button.ownerDocument!.getElementById(menuId as string);
        expect(contextualMenuElement).not.toBeNull();

        ReactTestUtils.Simulate.keyDown(contextualMenuElement!, { which: KeyCodes.escape });
        expect(callbackMock.mock.calls.length).toBe(1);

        // Expect that the menu doesn't exist any more since it's been dismissed
        const dismissed = button.ownerDocument!.getElementById(menuId as string);
        expect(dismissed).toBeNull();
      });

      it(`If button has text but labelElementId provided in menuProps, contextual menu has
      aria-labelledBy reflecting labelElementId`, () => {
        const explicitLabelElementId = 'id_ExplicitLabel';
        const contextualMenuElement = buildRenderAndClickButtonAndReturnContextualMenuDOMElement(
          { labelElementId: explicitLabelElementId },
          'Button Text'
        );

        expect(contextualMenuElement).not.toBeNull();
        expect(contextualMenuElement.getAttribute('aria-label')).toBeNull();
        expect(contextualMenuElement.getAttribute('aria-labelledBy')).toEqual(explicitLabelElementId);
      });
    });
  });
});
