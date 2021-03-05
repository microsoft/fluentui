import * as React from 'react';
import { domEvent, nextFrame, mountWithProvider } from 'test/utils';

import { Portal } from 'src/components/Portal/Portal';
import { PortalInner } from 'src/components/Portal/PortalInner';
import { act } from 'react-dom/test-utils';

describe('Portal', () => {
  const testPortalInnerIsOpen = (rootWrapper, visible: boolean) => {
    expect(rootWrapper.find(PortalInner).length).toBe(visible ? 1 : 0);
  };

  const testPortalOpenState = (rootWrapper, content: React.ReactNode, isOpen: boolean) => {
    const portalIsOpen = isOpen;

    testPortalInnerIsOpen(rootWrapper, portalIsOpen);
    expect(rootWrapper.contains(content)).toBe(portalIsOpen);
  };

  it('translates open prop to state', () => {
    const content = <p />;
    const wrapper = mountWithProvider(<Portal content={<p />} />);
    testPortalOpenState(wrapper, content, false);

    const openPortalWrapper = mountWithProvider(<Portal content={<p />} open />);
    testPortalOpenState(openPortalWrapper, content, true);
  });

  describe('click', () => {
    it('opens the portal on trigger click when true', () => {
      const wrapper = mountWithProvider(<Portal content={<p />} trigger={<button>button</button>} />);
      testPortalInnerIsOpen(wrapper, false);

      wrapper.find('button').simulate('click');
      testPortalInnerIsOpen(wrapper, true);
    });

    it('closes the portal on click when set', () => {
      const wrapper = mountWithProvider(<Portal content={<p />} defaultOpen trigger={<button>button</button>} />);
      testPortalInnerIsOpen(wrapper, true);

      wrapper.find('button').simulate('click');
      testPortalInnerIsOpen(wrapper, false);
    });
  });

  describe('document click', () => {
    it('closes the portal', async () => {
      const wrapper = mountWithProvider(<Portal content={<p />} defaultOpen />);
      testPortalInnerIsOpen(wrapper, true);

      await nextFrame();

      act(() => {
        domEvent.click(document.body);
      });
      wrapper.update();
      testPortalInnerIsOpen(wrapper, false);
    });

    it('does not close on click inside', () => {
      const wrapper = mountWithProvider(<Portal content={<p id="inner" />} defaultOpen />);
      testPortalInnerIsOpen(wrapper, true);

      act(() => {
        domEvent.click('#inner');
      });
      wrapper.update();
      testPortalInnerIsOpen(wrapper, true);
    });
  });

  describe('onMount', () => {
    it('called when portal opens', () => {
      const onMount = jest.fn();
      const wrapper = mountWithProvider(<Portal content={<p />} onMount={onMount} />);
      wrapper.setProps({ open: true } as any);

      expect(onMount).toHaveBeenCalledTimes(1);
    });
  });

  describe('onUnmount', () => {
    it('is called when portal closes', () => {
      const onUnmount = jest.fn();
      const wrapper = mountWithProvider(<Portal content={<p />} onUnmount={onUnmount} open />);
      wrapper.setProps({ open: false } as any);

      expect(onUnmount).toHaveBeenCalledTimes(1);
    });

    it('is called only once when portal closes and then is unmounted', () => {
      const onUnmount = jest.fn();
      const wrapper = mountWithProvider(<Portal content={<p />} onUnmount={onUnmount} open />);
      wrapper.setProps({ open: false } as any);
      wrapper.unmount();

      expect(onUnmount).toHaveBeenCalledTimes(1);
    });

    it('is called only once when directly unmounting', () => {
      const onUnmount = jest.fn();
      const wrapper = mountWithProvider(<Portal content={<p />} onUnmount={onUnmount} open />);
      wrapper.unmount();

      expect(onUnmount).toHaveBeenCalledTimes(1);
    });
  });

  describe('triggerRef', () => {
    it('maintains ref on the trigger', () => {
      const triggerRef = jest.fn();
      const mountNode = document.createElement('div');
      document.body.appendChild(mountNode);

      const wrapper = mountWithProvider(
        <Portal content={<p />} trigger={<button id="trigger" />} triggerRef={triggerRef} />,
        {
          attachTo: mountNode,
        },
      );

      const triggerElem = document.querySelector('#trigger');

      expect(triggerRef).toHaveBeenCalledTimes(1);
      expect(triggerRef).toHaveBeenCalledWith(triggerElem);

      wrapper.detach();
      document.body.removeChild(mountNode);
    });
  });

  describe('trigger', () => {
    it('renders null when not set', () => {
      const wrapper = mountWithProvider(<Portal content={<p />} />);

      expect(wrapper.html()).toEqual(null);
    });

    it('renders the trigger when set', () => {
      const text = 'open by click on me';
      const wrapper = mountWithProvider(<Portal content={<p />} trigger={<button>{text}</button>} />);

      expect(wrapper.find('button').length).toBe(1);
      expect(wrapper.text()).toEqual(text);
    });
  });
});
