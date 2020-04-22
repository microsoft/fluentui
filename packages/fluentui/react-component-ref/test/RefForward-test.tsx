import { RefForward } from '@fluentui/react-component-ref';
import { mount } from 'enzyme';
import * as React from 'react';

import { ForwardedRef } from './fixtures';

describe('RefForward', () => {
  describe('innerRef', () => {
    it('works with "forwardRef" API', () => {
      const forwardedRef = React.createRef<HTMLButtonElement>();
      const innerRef = React.createRef<HTMLDivElement>();

      mount(<RefForward innerRef={innerRef}>{(<ForwardedRef ref={forwardedRef} />) as any}</RefForward>);

      expect(forwardedRef.current).toBeInstanceOf(Element);
      expect(innerRef.current).toBeInstanceOf(Element);
    });

    it('handles updates of props', () => {
      const initialRef = jest.fn();
      const updatedRef = jest.fn();

      const wrapper = mount(<RefForward innerRef={initialRef}>{(<ForwardedRef />) as any}</RefForward>);

      expect(initialRef).toHaveBeenCalled();
      expect(updatedRef).not.toHaveBeenCalled();

      jest.resetAllMocks();
      wrapper.setProps({ innerRef: updatedRef });

      expect(initialRef).not.toHaveBeenCalled();
      expect(updatedRef).toHaveBeenCalled();
    });
  });
});
