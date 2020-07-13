import * as React from 'react';

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
});
