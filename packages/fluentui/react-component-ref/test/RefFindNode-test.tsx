import { RefFindNode } from '@fluentui/react-component-ref';
import { mount } from 'enzyme';
import * as React from 'react';

import { CompositeClass, CompositeFunction, DOMClass, DOMFunction } from './fixtures';

const testInnerRef = (Component: React.ElementType) => {
  const innerRef = jest.fn();
  const node = mount(
    <RefFindNode innerRef={innerRef}>
      <Component />
    </RefFindNode>,
  ).getDOMNode();

  expect(innerRef).toHaveBeenCalledTimes(1);
  expect(innerRef).toHaveBeenCalledWith(node);
};

describe('RefFindNode', () => {
  describe('innerRef', () => {
    it('returns node from a functional component with DOM node', () => {
      testInnerRef(DOMFunction);
    });

    it('returns node from a functional component', () => {
      testInnerRef(CompositeFunction);
    });

    it('returns node from a class component with DOM node', () => {
      testInnerRef(DOMClass);
    });

    it('returns node from a class component', () => {
      testInnerRef(CompositeClass);
    });

    it('returns "null" after unmount', () => {
      const innerRef = jest.fn();
      const wrapper = mount(
        <RefFindNode innerRef={innerRef}>
          <CompositeClass />
        </RefFindNode>,
      );

      innerRef.mockClear();
      wrapper.unmount();

      expect(innerRef).toHaveBeenCalledTimes(1);
      expect(innerRef).toHaveBeenCalledWith(null);
    });

    it('passes an updated node', () => {
      const innerRef = jest.fn();
      const wrapper = mount(
        <RefFindNode innerRef={innerRef}>
          <div />
        </RefFindNode>,
      );

      expect(innerRef).toHaveBeenCalledWith(expect.objectContaining({ tagName: 'DIV' }));
      wrapper.setProps({ children: <button /> });

      expect(innerRef).toHaveBeenCalledTimes(2);
      expect(innerRef).toHaveBeenCalledWith(expect.objectContaining({ tagName: 'BUTTON' }));
    });

    it('skips an update if node did not change', () => {
      const innerRef = jest.fn();
      const wrapper = mount(
        <RefFindNode innerRef={innerRef}>
          <div />
        </RefFindNode>,
      );

      expect(innerRef).toHaveBeenCalledWith(expect.objectContaining({ tagName: 'DIV' }));
      wrapper.setProps({ children: <div /> });

      expect(innerRef).toHaveBeenCalledTimes(1);
      expect(innerRef).toHaveBeenCalledWith(expect.objectContaining({ tagName: 'DIV' }));
    });

    it('handles updates of props', () => {
      const initialRef = jest.fn();
      const updatedRef = jest.fn();
      const wrapper = mount(
        <RefFindNode innerRef={initialRef}>
          <div />
        </RefFindNode>,
      );

      expect(initialRef).toHaveBeenCalled();
      expect(updatedRef).not.toHaveBeenCalled();

      jest.resetAllMocks();
      wrapper.setProps({ innerRef: updatedRef });

      expect(initialRef).not.toHaveBeenCalled();
      expect(updatedRef).toHaveBeenCalled();
    });
  });
});
