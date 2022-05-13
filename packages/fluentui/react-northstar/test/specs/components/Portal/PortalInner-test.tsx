// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore "react-portal-compat-context" uses v9 configs via path aliases
import { PortalCompatContextProvider } from '@fluentui/react-portal-compat-context';
import * as React from 'react';

import { PortalContext } from 'src/components/Provider/portalContext';
import { PortalInner, PortalInnerProps } from 'src/components/Portal/PortalInner';
import { mountWithProvider } from 'test/utils';

const mountPortalInner = (props: PortalInnerProps) =>
  mountWithProvider(
    <PortalInner {...props}>
      <p />
    </PortalInner>,
  );

describe('PortalInner', () => {
  describe('render', () => {
    it('calls react createPortal', () => {
      const mountNode = document.createElement('div');
      const comp = mountPortalInner({ mountNode });

      expect(mountNode.contains(comp.getDOMNode())).toBeTruthy();
    });
  });

  describe('onMount', () => {
    it('called when mounting', () => {
      const onMount = jest.fn();
      mountPortalInner({ onMount });

      expect(onMount).toHaveBeenCalledTimes(1);
    });
  });

  describe('onUnmount', () => {
    it('is called only once when unmounting', () => {
      const onUnmount = jest.fn();
      const wrapper = mountPortalInner({ onUnmount });
      wrapper.unmount();

      expect(onUnmount).toHaveBeenCalledTimes(1);
    });
  });

  describe('document.body', () => {
    it('adds an element to document.body', () => {
      const className = 'a-sample-classname';
      const wrapper = mountWithProvider(
        <PortalContext.Provider value={{ className }}>
          <PortalInner>
            <div />
          </PortalInner>
        </PortalContext.Provider>,
      );

      expect(document.querySelector(`.${className}`)).toBeInTheDocument();

      // element should be removed on unmount
      wrapper.unmount();
      expect(document.querySelector(`.${className}`)).not.toBeInTheDocument();
    });

    it('reacts on "className" update and keeps node in HTML tree', () => {
      const className = 'a-sample-classname';
      const wrapper = mountWithProvider(
        <PortalContext.Provider value={{ className }}>
          <PortalInner>
            <div id="sample" />
          </PortalInner>
        </PortalContext.Provider>,
      );

      expect(document.querySelector(`.${className}`)).toBeInTheDocument();
      expect(document.querySelector(`.${className} #sample`)).toBeInTheDocument();

      const newClassName = 'an-another-classname';
      wrapper.setProps({ value: { className: newClassName } });

      expect(document.querySelector(`.${className}`)).not.toBeInTheDocument();
      expect(document.querySelector(`.${newClassName}`)).toBeInTheDocument();
      expect(document.querySelector(`.${newClassName} #sample`)).toBeInTheDocument();
    });
  });

  describe('compat', () => {
    it('calls "register" from "react-portal-compat"', () => {
      const unregister = jest.fn();
      const register = jest.fn().mockImplementation(() => unregister);

      const wrapper = mountWithProvider(
        <PortalCompatContextProvider value={register}>
          <PortalInner>
            <div id="sample" />
          </PortalInner>
        </PortalCompatContextProvider>,
      );

      expect(register).toHaveBeenCalledTimes(1);
      expect(register).toHaveBeenCalledWith(expect.any(HTMLElement));

      wrapper.unmount();
      expect(unregister).toHaveBeenCalledTimes(1);
    });
  });
});
