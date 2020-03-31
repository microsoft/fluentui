import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';

import Popup, { PopupEvents } from 'src/components/Popup/Popup';
import { domEvent, EmptyThemeProvider, mountWithProvider } from '../../../utils';
import * as keyboardKey from 'keyboard-key';
import { ReactWrapper } from 'enzyme';
import implementsPopperProps from 'test/specs/commonTests/implementsPopperProps';

describe('Popup', () => {
  implementsPopperProps(Popup, {
    requiredProps: { open: true },
  });

  const triggerId = 'triggerElement';
  const contentId = 'contentId';

  const getPopupContent = (popup: ReactWrapper) => {
    return popup.find(`div#${contentId}`);
  };

  type TriggerEvent = keyboardKey | { event: 'click' | 'contextmenu' };

  type ExpectPopupToOpenAndCloseParams = {
    onProp: PopupEvents;
    eventToOpen: TriggerEvent;
    eventToClose: TriggerEvent;
  };

  const expectPopupToOpenAndClose = ({ onProp, eventToOpen, eventToClose }: ExpectPopupToOpenAndCloseParams) => {
    const openEvent = {
      event: eventToOpen.event || 'keydown',
      keyCode: eventToOpen.event ? undefined : eventToOpen,
    };
    const closeEvent = {
      event: eventToClose.event || 'keydown',
      keyCode: eventToClose.event ? undefined : eventToClose,
    };

    const popup = mountWithProvider(
      <Popup trigger={<span id={triggerId}> text to trigger popup </span>} content={{ id: contentId }} on={onProp} />,
    );
    // check popup open on key press
    const popupTriggerElement = popup.find(`#${triggerId}`);
    popupTriggerElement.simulate(openEvent.event, { keyCode: openEvent.keyCode });

    expect(getPopupContent(popup).exists()).toBe(true);

    // check popup closes on Esc
    popupTriggerElement.simulate(closeEvent.event, { keyCode: closeEvent.keyCode });
    expect(getPopupContent(popup).exists()).toBe(false);
  };

  describe('onOpenChange', () => {
    test('is called on click', () => {
      const spy = jest.fn();

      mountWithProvider(<Popup trigger={<button />} content="Hi" onOpenChange={spy} />)
        .find('button')
        .simulate('click');

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][1]).toMatchObject({ open: true });
    });

    // https://github.com/microsoft/fluent-ui-react/pull/619
    test('is called on click when controlled', () => {
      const spy = jest.fn();

      mountWithProvider(<Popup open={false} trigger={<button />} content="Hi" onOpenChange={spy} />)
        .find('button')
        .simulate('click');

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][1]).toMatchObject({ open: true });
    });

    test('is called on contextmenu', () => {
      const spy = jest.fn();

      mountWithProvider(<Popup trigger={<button />} content="Hi" onOpenChange={spy} on="context" />)
        .find('button')
        .simulate('contextmenu');

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][1]).toMatchObject({ open: true });
    });

    // https://github.com/microsoft/fluent-ui-react/pull/619
    test('is called on contextmenu when controlled', () => {
      const spy = jest.fn();

      mountWithProvider(<Popup open={false} trigger={<button />} content="Hi" onOpenChange={spy} on="context" />)
        .find('button')
        .simulate('contextmenu');

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][1]).toMatchObject({ open: true });
    });
  });

  describe('context popup', () => {
    test(`open popup with Context event and close it with escape key`, () => {
      expectPopupToOpenAndClose({
        onProp: 'context',
        eventToOpen: { event: 'contextmenu' },
        eventToClose: keyboardKey.Escape,
      });
    });

    test('click does not open the popup but calls its handler instead', () => {
      const clickSpy = jest.fn();
      const popup = mountWithProvider(
        <Popup
          trigger={
            <span id={triggerId} onClick={clickSpy}>
              {' '}
              text to trigger popup{' '}
            </span>
          }
          content={{ id: contentId }}
          on="context"
        />,
      );
      const popupTriggerElement = popup.find(`#${triggerId}`);
      popupTriggerElement.simulate('click');

      expect(getPopupContent(popup).exists()).toBe(false);
      expect(clickSpy).toHaveBeenCalled();
    });
  });

  describe('open/close popup by keyboard', () => {
    test(`toggle popup with Enter key`, () => {
      expectPopupToOpenAndClose({
        onProp: 'click',
        eventToOpen: keyboardKey.Enter,
        eventToClose: keyboardKey.Enter,
      });
    });
    test(`toggle popup with Space key`, () => {
      expectPopupToOpenAndClose({
        onProp: 'click',
        eventToOpen: keyboardKey.Spacebar,
        eventToClose: keyboardKey.Spacebar,
      });
    });
    test(`open popup with Enter key and close it with escape key`, () => {
      expectPopupToOpenAndClose({
        onProp: 'hover',
        eventToOpen: keyboardKey.Enter,
        eventToClose: keyboardKey.Escape,
      });
    });
    test(`open popup with Space key and close it with escape key`, () => {
      expectPopupToOpenAndClose({
        onProp: 'hover',
        eventToOpen: keyboardKey.Spacebar,
        eventToClose: keyboardKey.Escape,
      });
    });
    test(`close previous popup with Enter key`, () => {
      const attachTo = document.createElement('div');
      document.body.appendChild(attachTo);

      const triggerId2 = 'triggerElement2';
      const contentId2 = 'contentId2';

      ReactTestUtils.act(() => {
        ReactDOM.render(
          <EmptyThemeProvider>
            <React.Fragment>
              <Popup
                trigger={<span id={triggerId}>text to trigger popup</span>}
                content={{ id: contentId }}
                on="click"
              />
              <Popup
                trigger={<span id={triggerId2}>text to trigger popup</span>}
                content={{ id: contentId2 }}
                on="click"
              />
            </React.Fragment>
          </EmptyThemeProvider>,
          attachTo,
        );
      });

      expect(document.querySelector(`#${contentId}`)).toBe(null);
      expect(document.querySelector(`#${contentId2}`)).toBe(null);

      ReactTestUtils.act(() => {
        domEvent.keyDown(`#${triggerId}`, { keyCode: keyboardKey.Enter });
      });

      expect(document.querySelector(`#${contentId}`)).toBeDefined();
      expect(document.querySelector(`#${contentId2}`)).toBe(null);

      ReactTestUtils.act(() => {
        domEvent.keyDown(`#${triggerId2}`, { keyCode: keyboardKey.Enter });
      });

      expect(document.querySelector(`#${contentId}`)).toBe(null);
      expect(document.querySelector(`#${contentId2}`)).toBeDefined();

      ReactDOM.unmountComponentAtNode(attachTo);
      document.body.removeChild(attachTo);
    });
  });

  describe('inline', () => {
    test('renders the content in the document body the inline prop is not provided', () => {
      mountWithProvider(<Popup trigger={<button />} content="Content" open />);
      const contentElement = document.body.firstElementChild;

      expect(contentElement.classList.contains(Popup.Content.className)).toEqual(true);
    });

    test('renders the content next to the trigger element if the inline prop is provided', () => {
      const attachTo = document.createElement('div');
      document.body.appendChild(attachTo);

      const wrapper = mountWithProvider(<Popup trigger={<button id={triggerId} />} inline content="Content" open />, {
        attachTo,
      });
      const contentElement = document.querySelector(`#${triggerId}`).nextSibling as HTMLDivElement;

      expect(contentElement.classList.contains(Popup.Content.className)).toEqual(true);

      wrapper.unmount();
      document.body.removeChild(attachTo);
    });
  });

  describe('keyboard event propagation', () => {
    const expectPopupToHandleStopPropagation = (trapFocus: boolean, shouldStopPropagation: boolean) => {
      const popup = mountWithProvider(
        <Popup
          trigger={<span id={triggerId}> text to trigger popup </span>}
          content={{ id: contentId }}
          trapFocus={trapFocus}
        />,
      );

      // open popup
      const popupTriggerElement = popup.find(`#${triggerId}`);
      popupTriggerElement.simulate('keydown', { keyCode: keyboardKey.Enter });

      // when popup open, check that stopPropagation is called when keyboard events are invoked
      const stopPropagation = jest.fn();
      const popupContentElement = getPopupContent(popup);
      popupContentElement.simulate('keyDown', { stopPropagation });
      expect(stopPropagation).toHaveBeenCalledTimes(shouldStopPropagation ? 1 : 0);
    };
    test('stops when focus is trapped', () => {
      expectPopupToHandleStopPropagation(true, true);
    });
    test('does not stop when focus is not trapped', () => {
      expectPopupToHandleStopPropagation(false, false);
    });
  });
});
