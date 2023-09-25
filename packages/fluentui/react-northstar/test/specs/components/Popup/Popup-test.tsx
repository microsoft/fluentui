import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';

import { Box } from 'src/components/Box/Box';
import { Popup, PopupEvents } from 'src/components/Popup/Popup';
import { popupContentClassName } from 'src/components/Popup/PopupContent';
import { domEvent, EmptyThemeProvider, mountWithProvider } from '../../../utils';
import { keyboardKey, KeyNames, SpacebarKey } from '@fluentui/accessibility';
import { ReactWrapper } from 'enzyme';
import { implementsPopperProps } from 'test/specs/commonTests/implementsPopperProps';

import {
  validateBehavior,
  ComponentTestFacade,
  popupBehaviorDefinitionTriggerSlotNotTabbable,
  popupBehaviorDefinitionTriggerSlotTabbable,
  popupBehaviorDefinitionTriggerSlotWithTabIndex,
  popupBehaviorDefinitionPopupSlot,
} from '@fluentui/a11y-testing';

describe('Popup', () => {
  implementsPopperProps(Popup, {
    requiredProps: { open: true },
  });

  const triggerId = 'triggerElement';
  const contentId = 'contentId';

  const getPopupContent = (popup: ReactWrapper) => {
    return popup.find(`div#${contentId}`);
  };

  type TriggerEvent = {
    event?: 'click' | 'contextmenu' | 'keydown';
    keyCode?: KeyNames[keyof KeyNames];
  };

  type ExpectPopupToOpenAndCloseParams = {
    onProp: PopupEvents;
    eventToOpen: TriggerEvent;
    eventToClose: TriggerEvent;
  };

  const expectPopupToOpenAndClose = ({ onProp, eventToOpen, eventToClose }: ExpectPopupToOpenAndCloseParams) => {
    const openEvent: TriggerEvent = {
      event: eventToOpen.event || 'keydown',
      keyCode: eventToOpen.event ? undefined : eventToOpen.keyCode,
    };
    const closeEvent: TriggerEvent = {
      event: eventToClose.event || 'keydown',
      keyCode: eventToClose.event ? undefined : eventToClose.keyCode,
    };

    const popup = mountWithProvider(
      <Popup trigger={<span id={triggerId}> text to trigger popup </span>} content={{ id: contentId }} on={onProp} />,
    );
    // check popup open on key press
    const popupTriggerElement = popup.find(`span#${triggerId}`);
    popupTriggerElement.simulate(openEvent.event, { keyCode: openEvent.keyCode });

    expect(getPopupContent(popup).exists()).toBe(true);

    // check popup closes on Esc
    popupTriggerElement.simulate(closeEvent.event, { keyCode: closeEvent.keyCode });
    expect(getPopupContent(popup).exists()).toBe(false);
  };

  describe('trigger', () => {
    test('is called on click when on includes hover', () => {
      const spy = jest.fn();

      mountWithProvider(<Popup trigger={<button onClick={spy} />} content="Hi" on={['hover']} />)
        .find('button')
        .simulate('click');
      expect(spy).toHaveBeenCalledTimes(1);
      mountWithProvider(<Popup trigger={<button onClick={spy} />} content="Hi" on={['hover', 'focus']} />)
        .find('button')
        .simulate('click');
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });

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

    test('is not called on click when on is contextmenu and hover', () => {
      const spy = jest.fn();

      mountWithProvider(<Popup trigger={<button />} content="Hi" onOpenChange={spy} on={['context', 'hover']} />)
        .find('button')
        .simulate('click');

      expect(spy).not.toHaveBeenCalled();
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
        eventToClose: { keyCode: keyboardKey.Escape },
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
      const popupTriggerElement = popup.find(`span#${triggerId}`);
      popupTriggerElement.simulate('click');

      expect(getPopupContent(popup).exists()).toBe(false);
      expect(clickSpy).toHaveBeenCalled();
    });
  });

  describe('open/close popup by keyboard', () => {
    test(`toggle popup with Enter key`, () => {
      expectPopupToOpenAndClose({
        onProp: 'click',
        eventToOpen: { keyCode: keyboardKey.Enter },
        eventToClose: { keyCode: keyboardKey.Enter },
      });
    });
    test(`toggle popup with Space key`, () => {
      expectPopupToOpenAndClose({
        onProp: 'click',
        eventToOpen: { keyCode: SpacebarKey },
        eventToClose: { keyCode: SpacebarKey },
      });
    });
    test(`open popup with Enter key and close it with escape key`, () => {
      expectPopupToOpenAndClose({
        onProp: 'hover',
        eventToOpen: { keyCode: keyboardKey.Enter },
        eventToClose: { keyCode: keyboardKey.Escape },
      });
    });
    test(`open popup with Space key and close it with escape key`, () => {
      expectPopupToOpenAndClose({
        onProp: 'hover',
        eventToOpen: { keyCode: SpacebarKey },
        eventToClose: { keyCode: keyboardKey.Escape },
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
            <>
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
            </>
          </EmptyThemeProvider>,
          attachTo,
        );
      });

      expect(document.querySelector(`#${contentId}`)).toBe(null);
      expect(document.querySelector(`#${contentId2}`)).toBe(null);

      ReactTestUtils.act(() => {
        domEvent.keyDown(`span#${triggerId}`, { keyCode: keyboardKey.Enter });
      });

      expect(document.querySelector(`#${contentId}`)).toBeDefined();
      expect(document.querySelector(`#${contentId2}`)).toBe(null);

      ReactTestUtils.act(() => {
        domEvent.keyDown(`span#${triggerId2}`, { keyCode: keyboardKey.Enter });
      });

      expect(document.querySelector(`#${contentId}`)).toBe(null);
      expect(document.querySelector(`#${contentId2}`)).toBeDefined();

      ReactTestUtils.act(() => {
        ReactDOM.unmountComponentAtNode(attachTo);
      });

      document.body.removeChild(attachTo);
    });
  });

  describe('inline', () => {
    test('renders the content in the document body the inline prop is not provided', () => {
      // reset body, because then "firstElementChild" was not properly getting right element
      document.body.innerHTML = '';
      mountWithProvider(<Popup trigger={<button />} content="Content" open />);
      const contentElement = document.body.firstElementChild.firstElementChild;

      expect(contentElement.classList.contains(popupContentClassName)).toEqual(true);
    });

    test('renders the content next to the trigger element if the inline prop is provided', () => {
      const attachTo = document.createElement('div');
      document.body.appendChild(attachTo);

      const wrapper = mountWithProvider(<Popup trigger={<button id={triggerId} />} inline content="Content" open />, {
        attachTo,
      });
      const contentElement = document.querySelector(`#${triggerId}`).nextSibling as HTMLDivElement;

      expect(contentElement.classList.contains(popupContentClassName)).toEqual(true);

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
      const popupTriggerElement = popup.find(`span#${triggerId}`);
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
  describe('PopupBehavior', () => {
    describe('trigger slot - tabbable - Button', () => {
      const triggerWithoutTabIndex = <button data-slotid="trigger" />;
      const testFacade = new ComponentTestFacade(Popup, { trigger: triggerWithoutTabIndex, id: 'popup1' });
      const errors = validateBehavior(popupBehaviorDefinitionTriggerSlotTabbable, testFacade);
      expect(errors).toEqual([]);
    });

    describe('trigger slot - tabbable - Anchor', () => {
      const triggerWithoutTabIndex = (
        <a href="" data-slotid="trigger">
          triggerLink
        </a>
      );
      const testFacade = new ComponentTestFacade(Popup, { trigger: triggerWithoutTabIndex, id: 'popup1' });
      const errors = validateBehavior(popupBehaviorDefinitionTriggerSlotTabbable, testFacade);
      expect(errors).toEqual([]);
    });

    describe('trigger slot - NO tabbabble - Anchor without href', () => {
      const triggerAnchorWtihoutHref = <a data-slotid="trigger"> triggerLink </a>;
      const testFacade = new ComponentTestFacade(Popup, { trigger: triggerAnchorWtihoutHref, id: 'popup2' });
      const errors = validateBehavior(popupBehaviorDefinitionTriggerSlotNotTabbable, testFacade);
      expect(errors).toEqual([]);
    });

    describe('trigger slot - tabbable - Input', () => {
      const triggerWithoutTabIndex = <input data-slotid="trigger" />;
      const testFacade = new ComponentTestFacade(Popup, { trigger: triggerWithoutTabIndex, id: 'popup1' });
      const errors = validateBehavior(popupBehaviorDefinitionTriggerSlotTabbable, testFacade);
      expect(errors).toEqual([]);
    });

    describe('trigger slot - NO tabbabble - Span', () => {
      const triggerWithoutTabIndex = <span data-slotid="trigger"> text to trigger popup </span>;
      const testFacade = new ComponentTestFacade(Popup, { trigger: triggerWithoutTabIndex, id: 'popup2' });
      const errors = validateBehavior(popupBehaviorDefinitionTriggerSlotNotTabbable, testFacade);
      expect(errors).toEqual([]);
    });

    describe('trigger slot - tabbable - Box as button', () => {
      const triggerWithoutTabIndex = <Box data-slotid="trigger" as="button" />;
      const testFacade = new ComponentTestFacade(Popup, { trigger: triggerWithoutTabIndex, id: 'popup2' });
      const errors = validateBehavior(popupBehaviorDefinitionTriggerSlotTabbable, testFacade);
      expect(errors).toEqual([]);
    });

    describe('trigger slot - doesnt override tabIndex if exists', () => {
      const triggerWithoutTabIndex = <button data-slotid="trigger" tabIndex={-1} />;
      const testFacade = new ComponentTestFacade(Popup, { trigger: triggerWithoutTabIndex, id: 'popup1' });
      const errors = validateBehavior(popupBehaviorDefinitionTriggerSlotWithTabIndex, testFacade);
      expect(errors).toEqual([]);
    });

    describe('popup content slot ', () => {
      const triggerWithoutTabIndex = <button tabIndex={-1} />;
      const testFacade = new ComponentTestFacade(Popup, {
        trigger: triggerWithoutTabIndex,
        content: { content: triggerWithoutTabIndex, 'data-slotid': 'popup' },
        open: true,
      });
      const errors = validateBehavior(popupBehaviorDefinitionPopupSlot, testFacade);
      expect(errors).toEqual([]);
    });
  });
});
