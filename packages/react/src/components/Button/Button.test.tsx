import * as React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DefaultButton } from './DefaultButton/DefaultButton';
import { IconButton } from './IconButton/IconButton';
import { ActionButton } from './ActionButton/ActionButton';
import { CommandBarButton } from './CommandBarButton/CommandBarButton';
import { CompoundButton } from './CompoundButton/CompoundButton';
import { KeyCodes, resetIds } from '../../Utilities';
import type { IContextualMenuProps } from '../../ContextualMenu';

const alertClicked = (): void => {
  /*noop*/
};

describe('Button', () => {
  beforeEach(() => {
    resetIds();
    cleanup();
    document.body.innerHTML = '';
  });

  it('renders DefaultButton correctly', () => {
    const { container } = render(<DefaultButton text="Button" />);
    expect(container).toMatchSnapshot();
  });

  it('renders ActionButton correctly', () => {
    const { container } = render(<ActionButton>Button</ActionButton>);
    expect(container).toMatchSnapshot();
  });

  it('renders a DefaultButton with a keytip correctly', () => {
    const keytipProps = {
      content: 'A',
      keySequences: ['a'],
    };
    const { container } = render(<DefaultButton text="Button" keytipProps={keytipProps} />);
    expect(container).toMatchSnapshot();
  });

  it('renders CommandBarButton correctly', () => {
    const { container } = render(
      <CommandBarButton
        iconProps={{ iconName: 'Add' }}
        text="Create account"
        menuProps={{
          items: [
            {
              key: 'emailMessage',
              text: 'Email message',
              iconProps: { iconName: 'Mail' },
            },
            {
              key: 'calendarEvent',
              text: 'Calendar event',
              iconProps: { iconName: 'Calendar' },
            },
          ],
        }}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders CompoundButton correctly', () => {
    const { container } = render(
      <CompoundButton secondaryText="You can create a new account here.">Create account</CompoundButton>,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders IconButton correctly', () => {
    const { container } = render(<IconButton iconProps={{ iconName: 'Emoji2' }} title="Emoji" ariaLabel="Emoji" />);
    expect(container).toMatchSnapshot();
  });

  describe('DefaultButton', () => {
    it('can render without an onClick.', () => {
      const { container } = render(<DefaultButton>Hello</DefaultButton>);
      expect(container.firstElementChild!.tagName).toEqual('BUTTON');
    });

    it('can render with an onClick.', () => {
      const onClick: () => null = () => null;
      const { container } = render(<DefaultButton onClick={onClick}>Hello</DefaultButton>);
      expect(container.firstElementChild!.tagName).toEqual('BUTTON');
    });

    it('can render with an href', () => {
      const { container } = render(
        <DefaultButton href="http://www.microsoft.com" target="_blank">
          Hello
        </DefaultButton>,
      );
      expect(container.firstElementChild!.tagName).toEqual('A');
    });

    it('can handle elementRef', () => {
      const ref = React.createRef<HTMLElement>();
      render(<DefaultButton elementRef={ref}>Content</DefaultButton>);
      expect(ref.current).toBeTruthy();
    });

    describe('aria attributes', () => {
      it('does not apply aria attributes that are not passed in', () => {
        const { getByRole } = render(
          <DefaultButton href="http://www.microsoft.com" target="_blank">
            Hello
          </DefaultButton>,
        );
        const button = getByRole('link');

        expect(button.getAttribute('aria-label')).toBeNull();
        expect(button.getAttribute('aria-labelledby')).toBeNull();
        expect(button.getAttribute('aria-describedby')).toBeNull();
        expect(button.getAttribute('aria-pressed')).toBeNull();
      });

      it('overrides native aria-label with Button ariaLabel', () => {
        const { getByRole } = render(
          <DefaultButton
            href="http://www.microsoft.com"
            target="_blank"
            aria-label="NativeLabel"
            ariaLabel="ButtonLabel"
          >
            Hello
          </DefaultButton>,
        );
        const button = getByRole('link');

        expect(button.getAttribute('aria-label')).toEqual('ButtonLabel');
        expect(button.getAttribute('aria-labelledby')).toBeNull();
        expect(button.getAttribute('aria-describedby')).toBeNull();
      });

      it('applies aria-label', () => {
        const { getByRole } = render(
          <DefaultButton href="http://www.microsoft.com" target="_blank" aria-label="MyLabel">
            Hello
          </DefaultButton>,
        );
        const button = getByRole('link');

        expect(button.getAttribute('aria-label')).toEqual('MyLabel');
        expect(button.getAttribute('aria-labelledby')).toBeNull();
        expect(button.getAttribute('aria-describedby')).toBeNull();
      });

      it('applies aria-labelledby', () => {
        const { getByRole } = render(
          <DefaultButton href="http://www.microsoft.com" target="_blank" aria-labelledby="someid">
            Hello
          </DefaultButton>,
        );
        const button = getByRole('link');

        expect(button.getAttribute('aria-labelledby')).toEqual('someid');
        expect(button.getAttribute('aria-describedby')).toBeNull();
      });

      it('does not apply aria-labelledby to a button with no text', () => {
        const { getByRole } = render(
          <DefaultButton href="http://www.microsoft.com" target="_blank" aria-describedby="someid" />,
        );
        const button = getByRole('link');

        expect(button.getAttribute('aria-labelledby')).toBeNull();
        expect(button.getAttribute('aria-describedby')).toEqual('someid');
      });

      it('applies aria-labelledby and aria-describedby', () => {
        const { getByRole } = render(
          <DefaultButton
            href="http://www.microsoft.com"
            target="_blank"
            ariaDescription="This description is not visible"
            styles={{ screenReaderText: 'some-screenreader-class' }}
          >
            Hello
          </DefaultButton>,
        );
        const button = getByRole('link');

        expect(button.getAttribute('aria-label')).toBeNull();

        expect(button.getAttribute('aria-labelledby')).toEqual(button.querySelector(`.ms-Button-label`)!.id);

        expect(button.getAttribute('aria-describedby')).toEqual(button.querySelector('.some-screenreader-class')!.id);
      });

      it('applies aria-describedby to an IconButton', () => {
        const { getByRole } = render(
          <IconButton
            iconProps={{ iconName: 'Emoji2' }}
            ariaDescription="Description on icon button"
            styles={{ screenReaderText: 'some-screenreader-class' }}
          />,
        );
        const button = getByRole('button');

        expect(button.getAttribute('aria-label')).toBeNull();

        expect(button.getAttribute('aria-labelledby')).toBeNull();

        expect(button.getAttribute('aria-describedby')).toEqual(button.querySelector('.some-screenreader-class')!.id);
      });

      it('applies aria-labelledby and aria-describedby to a CompoundButton with ariaDescription', () => {
        const { getByRole } = render(
          <CompoundButton
            secondaryText="Some awesome description"
            ariaDescription="Description on icon button"
            styles={{ screenReaderText: 'some-screenreader-class' }}
          >
            And this is the label
          </CompoundButton>,
        );
        const button = getByRole('button');

        expect(button.getAttribute('aria-label')).toBeNull();

        expect(button.getAttribute('aria-labelledby')).toEqual(button.querySelector('.ms-Button-label')!.id);

        expect(button.getAttribute('aria-describedby')).toEqual(button.querySelector('.some-screenreader-class')!.id);
      });

      it(
        'applies aria-labelledby and aria-describedby to a CompoundButton with secondaryText ' +
          'and no ariaDescription',
        () => {
          const { getByRole } = render(
            <CompoundButton secondaryText="Some awesome description">And this is the label</CompoundButton>,
          );
          const button = getByRole('button');

          expect(button.getAttribute('aria-label')).toBeNull();

          expect(button.getAttribute('aria-labelledby')).toEqual(button.querySelector('.ms-Button-label')!.id);

          expect(button.getAttribute('aria-describedby')).toEqual(button.querySelector('.ms-Button-description')!.id);
        },
      );

      it('does not apply aria-pressed to an unchecked button', () => {
        const { getByRole } = render(<DefaultButton toggle={true}>Hello</DefaultButton>);

        expect(getByRole('button').getAttribute('aria-pressed')).toEqual('false');
      });

      it('applies aria-pressed to a checked button', () => {
        const { getByRole } = render(
          <DefaultButton toggle={true} checked={true}>
            Hello
          </DefaultButton>,
        );

        expect(getByRole('button').getAttribute('aria-pressed')).toEqual('true');
      });

      it('does not apply aria-pressed to an unchecked split button', () => {
        const { getAllByRole } = render(
          <DefaultButton
            toggle={true}
            split={true}
            onClick={alertClicked}
            menuProps={{
              items: [
                {
                  key: 'emailMessage',
                  text: 'Email message',
                  iconProps: { iconName: 'Mail' },
                },
              ],
            }}
          >
            Hello
          </DefaultButton>,
        );

        expect(getAllByRole('button')[0].getAttribute('aria-pressed')).toEqual('false');
      });

      it('applies aria-checked to a role=menuitemcheckbox checked button', () => {
        const { getByRole } = render(
          <DefaultButton role="menuitemcheckbox" toggle={true} checked={true}>
            Hello
          </DefaultButton>,
        );

        expect(getByRole('menuitemcheckbox').getAttribute('aria-checked')).toEqual('true');
      });

      it('applies aria-checked to a role=checkbox checked button', () => {
        const { getByRole } = render(
          <DefaultButton role="checkbox" toggle={true} checked={true}>
            Hello
          </DefaultButton>,
        );

        expect(getByRole('checkbox').getAttribute('aria-checked')).toEqual('true');
      });

      it('applies aria-checked=false to a role=checkbox button even if toggle is not passed', () => {
        const { getByRole } = render(<DefaultButton role="checkbox">Hello</DefaultButton>);

        expect(getByRole('checkbox').getAttribute('aria-checked')).toEqual('false');
      });

      it('does not mutate menuprops hidden property', () => {
        const menuProps: IContextualMenuProps = {
          hidden: false,
          items: [
            {
              key: 'emailMessage',
              text: 'Email message',
              iconProps: { iconName: 'Mail' },
            },
          ],
        };
        const { getAllByRole } = render(
          <DefaultButton toggle={true} split={true} onClick={alertClicked} persistMenu={true} menuProps={menuProps}>
            Hello
          </DefaultButton>,
        );

        expect(getAllByRole('button')[0]).toBeTruthy();
        expect(menuProps.hidden).toEqual(false);
      });

      it('uses menuprops id in aria-controls when passed', () => {
        const menuProps: IContextualMenuProps = {
          id: 'custom-id',
          items: [
            {
              key: 'menuItem',
              text: 'Menu Item',
            },
          ],
        };

        const { getByRole } = render(<DefaultButton menuProps={menuProps}>Hello</DefaultButton>);
        const button = getByRole('button');

        userEvent.click(button);

        expect(button.getAttribute('aria-controls')).toBe('custom-id');
      });

      it('applies aria-pressed to a checked split button', () => {
        const { getAllByRole } = render(
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
                  iconProps: { iconName: 'Mail' },
                },
              ],
            }}
          >
            Hello
          </DefaultButton>,
        );

        expect(getAllByRole('button')[0].getAttribute('aria-pressed')).toEqual('true');
      });
    });

    describe('with menuProps', () => {
      it('contains aria-haspopup=true', () => {
        const { getAllByRole } = render(
          <DefaultButton menuProps={{ items: [{ key: 'item', text: 'Item' }] }}>Hello</DefaultButton>,
        );

        expect(getAllByRole('button')[0].getAttribute('aria-haspopup')).toEqual('true');
      });
    });

    describe('without menuProps', () => {
      it('does not contain aria-haspopup', () => {
        const { getByRole } = render(<DefaultButton>Hello</DefaultButton>);
        expect(getByRole('button').getAttribute('aria-haspopup')).toEqual(null);
      });
    });

    describe('with menuIconProps', () => {
      it('Contains the expected icon via menuIconProps', () => {
        const { getAllByRole } = render(<DefaultButton menuIconProps={{ iconName: 'fontColor' }}>Hello</DefaultButton>);
        expect(getAllByRole('button')[0].querySelectorAll('[data-icon-name="fontColor"]').length).toEqual(1);
      });
    });

    it('Providing onClick and menuProps does not render a SplitButton', () => {
      const { getAllByRole } = render(
        <DefaultButton
          text="Create account"
          onClick={alertClicked}
          menuProps={{
            items: [
              {
                key: 'emailMessage',
                text: 'Email message',
                iconProps: { iconName: 'Mail' },
              },
              {
                key: 'calendarEvent',
                text: 'Calendar event',
                iconProps: { iconName: 'Calendar' },
              },
            ],
          }}
        />,
      );
      expect(getAllByRole('button')[0].tagName).not.toEqual('DIV');
    });

    it('Providing onKeyDown and menuProps still fires provided onKeyDown', () => {
      const keyDownSpy = jest.fn();
      render(
        <DefaultButton
          text="Create account"
          onKeyDown={keyDownSpy}
          menuProps={{
            items: [
              {
                key: 'emailMessage',
                text: 'Email message',
                iconProps: { iconName: 'Mail' },
              },
              {
                key: 'calendarEvent',
                text: 'Calendar event',
                iconProps: { iconName: 'Calendar' },
              },
            ],
          }}
        />,
      );
      userEvent.tab();
      userEvent.keyboard('{enter}');
      expect(keyDownSpy).toHaveBeenCalled();
    });

    it('Providing onKeyDown, menuProps and splitButton=true fires provided onKeyDown on both buttons', () => {
      const keyDownSpy = jest.fn();
      render(
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
                iconProps: { iconName: 'Mail' },
              },
              {
                key: 'calendarEvent',
                text: 'Calendar event',
                iconProps: { iconName: 'Calendar' },
              },
            ],
          }}
        />,
      );
      userEvent.tab();
      userEvent.keyboard('{arrowdown}');
      expect(keyDownSpy).toHaveBeenCalled();
    });

    it('Space keydown in a splitButton will fire onClick', () => {
      const onClickSpy = jest.fn();

      render(
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
                iconProps: { iconName: 'Mail' },
              },
              {
                key: 'calendarEvent',
                text: 'Calendar event',
                iconProps: { iconName: 'Calendar' },
              },
            ],
          }}
        />,
      );
      userEvent.tab();
      userEvent.keyboard('{space}');
      expect(onClickSpy).toHaveBeenCalled();
    });

    it('Providing onClick, menuProps and setting splitButton to true renders a SplitButton', () => {
      const { getAllByRole } = render(
        <DefaultButton
          text="Create account"
          split={true}
          onClick={alertClicked}
          menuProps={{
            items: [
              {
                key: 'emailMessage',
                text: 'Email message',
                iconProps: { iconName: 'Mail' },
              },
              {
                key: 'calendarEvent',
                text: 'Calendar event',
                iconProps: { iconName: 'Calendar' },
              },
            ],
          }}
        />,
      );
      expect(getAllByRole('button')[0].tagName).toEqual('DIV');
    });

    it('Tapping menu button of SplitButton expands menu', () => {
      const { getAllByRole } = render(
        <DefaultButton
          text="Create account"
          split={true}
          onClick={alertClicked}
          menuProps={{
            items: [
              {
                key: 'emailMessage',
                text: 'Email message',
                iconProps: { iconName: 'Mail' },
              },
              {
                key: 'calendarEvent',
                text: 'Calendar event',
                iconProps: { iconName: 'Calendar' },
              },
            ],
          }}
        />,
      );
      const menuButton = getAllByRole('button')[2];
      userEvent.click(menuButton);
      expect(getAllByRole('button')[0].getAttribute('aria-expanded')).toEqual('true');
    });

    it('Touch Start on primary button of SplitButton expands menu', () => {
      const { getAllByRole } = render(
        <DefaultButton
          text="Create account"
          split={true}
          onClick={alertClicked}
          menuProps={{
            items: [
              {
                key: 'emailMessage',
                text: 'Email message',
                iconProps: { iconName: 'Mail' },
              },
              {
                key: 'calendarEvent',
                text: 'Calendar event',
                iconProps: { iconName: 'Calendar' },
              },
            ],
          }}
        />,
      );
      const primaryButton = getAllByRole('button')[1];

      // in a normal scenario, when we do a touchstart we would also cause a
      // click event to fire. This doesn't happen in the simulator so we're
      // manually adding this in.
      fireEvent.touchStart(primaryButton);
      userEvent.click(primaryButton);
      expect(getAllByRole('button')[0].getAttribute('aria-expanded')).toEqual('true');
    });

    it('If menu trigger is disabled, pressing down does not trigger menu', () => {
      const { getAllByRole } = render(
        <DefaultButton
          text="Create account"
          menuTriggerKeyCode={null}
          menuProps={{
            items: [
              {
                key: 'emailMessage',
                text: 'Email message',
                iconProps: { iconName: 'Mail' },
              },
              {
                key: 'calendarEvent',
                text: 'Calendar event',
                iconProps: { iconName: 'Calendar' },
              },
            ],
          }}
        />,
      );
      userEvent.tab();
      userEvent.keyboard('{arrowdown}');
      expect(getAllByRole('button')[0].getAttribute('aria-expanded')).toEqual('false');
    });

    it('If menu trigger is specified, default key is overridden', () => {
      const { getAllByRole } = render(
        <DefaultButton
          text="Create account"
          menuTriggerKeyCode={KeyCodes.right}
          menuProps={{
            items: [
              {
                key: 'emailMessage',
                text: 'Email message',
                iconProps: { iconName: 'Mail' },
              },
              {
                key: 'calendarEvent',
                text: 'Calendar event',
                iconProps: { iconName: 'Calendar' },
              },
            ],
          }}
        />,
      );

      const button = getAllByRole('button')[0];
      userEvent.tab();

      userEvent.keyboard('{arrowdown}');
      expect(button.getAttribute('aria-expanded')).toEqual('false');

      userEvent.keyboard('{arrowright}');
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
        const { getAllByRole } = render(
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
                  iconProps: { iconName: 'Mail' },
                },
                {
                  key: 'calendarEvent',
                  text: 'Calendar event',
                  iconProps: { iconName: 'Calendar' },
                },
              ],
            }}
          />,
        );
        return getAllByRole('button')[0];
      }

      it('Clicking SplitButton button triggers action', () => {
        const button: HTMLElement = buildRenderButtonWithMenu();
        const menuButtonDOM: HTMLButtonElement = button.querySelectorAll('button')[0];
        userEvent.click(menuButtonDOM);
        expect(didClick).toEqual(true);
      });

      it('Pressing alt + down on SplitButton triggers menu', () => {
        const button: HTMLElement = buildRenderButtonWithMenu();
        userEvent.tab();
        userEvent.keyboard('{alt}{arrowdown}');
        expect(button.getAttribute('aria-expanded')).toEqual('true');
      });

      it('Click on button opens the menu, a second click closes the menu and calls onAfterMenuDismiss', () => {
        const callbackMock = jest.fn();

        const button: HTMLElement = buildRenderButtonWithMenu(callbackMock);
        const menuButtonElement = button.querySelectorAll('button')[1];
        userEvent.click(menuButtonElement);

        expect(button.getAttribute('aria-expanded')).toEqual('true');
        userEvent.click(menuButtonElement);
        expect(button.getAttribute('aria-expanded')).toEqual('false');
        expect(callbackMock.mock.calls.length).toBe(1);
      });

      it('[PersistedMenu] Opens on first click, closes on second click and calls onAfterMenuDismiss', () => {
        const callbackMock = jest.fn();

        const button: HTMLElement = buildRenderButtonWithMenu(callbackMock, true);
        const menuButtonElement = button.querySelectorAll('button')[1];
        userEvent.click(menuButtonElement);

        expect(button.getAttribute('aria-expanded')).toEqual('true');
        userEvent.click(menuButtonElement);
        expect(button.getAttribute('aria-expanded')).toEqual('false');
        expect(callbackMock.mock.calls.length).toBe(1);
      });

      it('A disabled SplitButton does not respond to input events', () => {
        const { getAllByRole } = render(
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
                  iconProps: { iconName: 'Mail' },
                },
                {
                  key: 'calendarEvent',
                  text: 'Calendar event',
                  iconProps: { iconName: 'Calendar' },
                },
              ],
            }}
          />,
        );

        const button = getAllByRole('button')[0];
        userEvent.click(button);
        userEvent.keyboard('{alt}{arrowdown}');
        expect(didClick).toEqual(false);
      });

      it('A disabled Button does not respond to input events', () => {
        const { getAllByRole } = render(
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
          />,
        );

        const button = getAllByRole('button')[0];
        userEvent.click(button);
        userEvent.keyboard('{alt}{arrowdown}');
        expect(didClick).toEqual(false);
      });
      it('A focusable disabled button does not respond to input events', () => {
        const { getAllByRole } = render(
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
          />,
        );

        const button = getAllByRole('button')[0];
        userEvent.click(button);
        userEvent.keyboard('{alt}{arrowdown}');
        expect(didClick).toEqual(false);
      });
      it('A focusable disabled menu button does not respond to input events', () => {
        const { getAllByRole } = render(
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
                  iconProps: { iconName: 'Mail' },
                },
                {
                  key: 'calendarEvent',
                  text: 'Calendar event',
                  iconProps: { iconName: 'Calendar' },
                },
              ],
            }}
          />,
        );

        const button = getAllByRole('button')[0];
        userEvent.click(button);
        userEvent.keyboard('{alt}{arrowdown}');
        expect(didClick).toEqual(false);
      });
    });

    describe('with contextual menu', () => {
      function buildRenderAndClickButtonAndReturnContextualMenuDOMElement(
        menuPropsPatch?: any,
        text?: string,
        textAsChildElement: boolean = false,
      ): HTMLElement {
        const menuProps = { items: [{ key: 'item', name: 'Item' }], ...menuPropsPatch };
        const element: React.ReactElement<any> = (
          <DefaultButton
            iconProps={{ iconName: 'Add' }}
            text={!textAsChildElement && text ? text : undefined}
            menuProps={menuProps}
          >
            {textAsChildElement && text ? text : null}
          </DefaultButton>
        );

        const { getAllByRole } = render(element);
        const button = getAllByRole('button')[0];
        userEvent.click(button);
        // get the menu id from the button's aria attribute
        const menuId = button.getAttribute('aria-controls');
        expect(menuId).toBeTruthy();

        const menuDOM = button.ownerDocument!.getElementById(menuId as string);
        expect(menuDOM).toBeTruthy();

        return menuDOM as HTMLElement;
      }

      it('If button has text, contextual menu has aria-labelledBy attribute set', () => {
        const contextualMenuElement = buildRenderAndClickButtonAndReturnContextualMenuDOMElement(null, 'Button Text');

        expect(contextualMenuElement).not.toBeNull();
        expect(contextualMenuElement?.getAttribute('aria-label')).toBeNull();
        expect(contextualMenuElement?.getAttribute('aria-labelledBy')).toBeTruthy();
      });

      it('If button has a text child, contextual menu has aria-labelledBy attribute set', () => {
        const contextualMenuElement = buildRenderAndClickButtonAndReturnContextualMenuDOMElement(
          null,
          'Button Text',
          true,
        );

        expect(contextualMenuElement).not.toBeNull();
        expect(contextualMenuElement?.getAttribute('aria-label')).toBeNull();
        expect(contextualMenuElement?.getAttribute('aria-labelledBy')).not.toBeNull();
      });

      it('If button has no text, contextual menu has no aria-label or aria-labelledBy attributes', () => {
        const contextualMenuElement = buildRenderAndClickButtonAndReturnContextualMenuDOMElement();

        expect(contextualMenuElement).not.toBeNull();
        expect(contextualMenuElement?.getAttribute('aria-label')).toBeNull();
        expect(contextualMenuElement?.getAttribute('aria-labelledBy')).toBeNull();
      });

      it('If button has text but ariaLabel provided in menuProps, contextual menu has aria-label set', () => {
        const explicitLabel = 'ExplicitLabel';
        const contextualMenuElement = buildRenderAndClickButtonAndReturnContextualMenuDOMElement(
          { ariaLabel: explicitLabel },
          'Button Text',
        );

        expect(contextualMenuElement).not.toBeNull();
        expect(contextualMenuElement?.getAttribute('aria-label')).toEqual(explicitLabel);
        expect(contextualMenuElement?.getAttribute('aria-labelledBy')).toBeNull();
      });
      it('Click on button opens the menu, escape press dismisses menu', () => {
        const callbackMock = jest.fn();
        const menuProps = { items: [{ key: 'item', name: 'Item' }], onDismiss: callbackMock };

        const { getAllByRole } = render(
          <DefaultButton iconProps={{ iconName: 'Add' }} menuProps={menuProps}>
            {'Button Text'}
          </DefaultButton>,
        );

        const button = getAllByRole('button')[0];
        userEvent.click(button);

        // get the menu id from the button's aria attribute
        const menuId = button.getAttribute('aria-controls');

        expect(menuId).toBeTruthy();
        const contextualMenuElement = button.ownerDocument!.getElementById(menuId as string);

        expect(contextualMenuElement).not.toBeNull();
        userEvent.tab();

        userEvent.keyboard('{esc}');

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
          'Button Text',
        );

        expect(contextualMenuElement).not.toBeNull();
        expect(contextualMenuElement?.getAttribute('aria-label')).toBeNull();
        expect(contextualMenuElement?.getAttribute('aria-labelledBy')).toEqual(explicitLabelElementId);
      });
    });
  });
});
