import { Ref } from '@fluentui/react-component-ref';
import { mount, shallow } from 'enzyme';
import * as React from 'react';

import { CompositeClass, CompositeFunction, DOMClass, DOMFunction, ForwardedRef } from './fixtures';
import { create } from 'react-test-renderer';

const testInnerRef = (Component: React.ElementType) => {
  const innerRef = jest.fn();
  const node = mount(
    <Ref innerRef={innerRef}>
      <Component />
    </Ref>,
  ).getDOMNode();

  expect(innerRef).toHaveBeenCalledTimes(1);
  expect(innerRef).toHaveBeenCalledWith(node);
};

describe('Ref', () => {
  describe('children', () => {
    it('renders a child', () => {
      const child = <div data-child="whatever" />;
      const innerRef = React.createRef<HTMLDivElement>();
      const component = shallow(<Ref innerRef={innerRef}>{child}</Ref>);

      expect(component.contains(child)).toBeTruthy();
    });
  });

  describe('kind="find"', () => {
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
        <Ref innerRef={innerRef}>
          <CompositeClass />
        </Ref>,
      );

      innerRef.mockClear();
      wrapper.unmount();

      expect(innerRef).toHaveBeenCalledTimes(1);
      expect(innerRef).toHaveBeenCalledWith(null);
    });

    it('passes an updated node', () => {
      const innerRef = jest.fn();
      const wrapper = mount(
        <Ref innerRef={innerRef}>
          <div />
        </Ref>,
      );

      expect(innerRef).toHaveBeenCalledWith(expect.objectContaining({ tagName: 'DIV' }));
      wrapper.setProps({ children: <button /> });

      expect(innerRef).toHaveBeenCalledTimes(2);
      expect(innerRef).toHaveBeenCalledWith(expect.objectContaining({ tagName: 'BUTTON' }));
    });

    it('skips an update if node did not change', () => {
      const innerRef = jest.fn();
      const wrapper = mount(
        <Ref innerRef={innerRef}>
          <div />
        </Ref>,
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
        <Ref innerRef={initialRef}>
          <div />
        </Ref>,
      );

      expect(initialRef).toHaveBeenCalled();
      expect(updatedRef).not.toHaveBeenCalled();

      jest.resetAllMocks();
      wrapper.setProps({ innerRef: updatedRef });

      expect(initialRef).not.toHaveBeenCalled();
      expect(updatedRef).toHaveBeenCalled();
    });

    it('resolves once on node/ref change', () => {
      const initialRef = jest.fn();
      const updatedRef = jest.fn();
      const wrapper = mount(
        <Ref innerRef={initialRef}>
          <div />
        </Ref>,
      );

      expect(initialRef).toHaveBeenCalledTimes(1);
      expect(updatedRef).not.toHaveBeenCalled();

      jest.resetAllMocks();
      wrapper.setProps({ children: <span />, innerRef: updatedRef });

      expect(initialRef).not.toHaveBeenCalled();
      expect(updatedRef).toHaveBeenCalledTimes(1);
    });

    it('always returns "null" for react-test-renderer', () => {
      const innerRef = jest.fn();
      const ref = jest.fn();

      create(
        <Ref innerRef={innerRef}>
          <div ref={ref} />
        </Ref>,
      );

      expect(innerRef).toHaveBeenCalledWith(null);
      expect(ref).toHaveBeenCalledWith(null);
    });
  });

  describe('kind="forward"', () => {
    it('works with "forwardRef" API', () => {
      const forwardedRef = React.createRef<HTMLButtonElement>();
      const innerRef = React.createRef<HTMLDivElement>();

      mount(
        <Ref innerRef={innerRef}>
          <ForwardedRef ref={forwardedRef} />
        </Ref>,
      );

      expect(forwardedRef.current).toBeInstanceOf(Element);
      expect(innerRef.current).toBeInstanceOf(Element);
    });

    it('passes an updated node', () => {
      const innerRef = jest.fn();
      const forwardedRef = jest.fn();
      const updatedForwardedRef = jest.fn();

      const wrapper = mount(
        <Ref innerRef={innerRef}>
          <ForwardedRef ref={forwardedRef} key="first" />
        </Ref>,
      );

      expect(innerRef).toHaveBeenCalledWith(expect.objectContaining({ tagName: 'BUTTON' }));
      expect(forwardedRef).toHaveBeenCalledWith(expect.objectContaining({ tagName: 'BUTTON' }));

      jest.resetAllMocks();
      wrapper.setProps({ children: <ForwardedRef ref={updatedForwardedRef} key="second" /> });

      expect(innerRef).toHaveBeenCalledWith(expect.objectContaining({ tagName: 'BUTTON' }));
      expect(updatedForwardedRef).toHaveBeenCalledWith(expect.objectContaining({ tagName: 'BUTTON' }));
      expect(forwardedRef).not.toHaveBeenCalled();
    });

    it('handles updates of props', () => {
      const initialRef = jest.fn();
      const updatedRef = jest.fn();

      const wrapper = mount(
        <Ref innerRef={initialRef}>
          <ForwardedRef />
        </Ref>,
      );

      expect(initialRef).toHaveBeenCalled();
      expect(updatedRef).not.toHaveBeenCalled();

      jest.resetAllMocks();
      wrapper.setProps({ innerRef: updatedRef });

      expect(initialRef).not.toHaveBeenCalled();
      expect(updatedRef).toHaveBeenCalled();
    });
  });

  describe('kind="self"', () => {
    it('works with "forwardRef" API', () => {
      const forwardedRef = React.createRef<HTMLButtonElement>();
      const innerRef = React.createRef<HTMLDivElement>();
      const outerRef = React.createRef<HTMLDivElement>();

      mount(
        <Ref innerRef={outerRef}>
          <Ref innerRef={innerRef}>
            <ForwardedRef ref={forwardedRef} />
          </Ref>
        </Ref>,
      );

      expect(forwardedRef.current).toBeInstanceOf(Element);
      expect(innerRef.current).toBeInstanceOf(Element);
      expect(outerRef.current).toBeInstanceOf(Element);

      expect(forwardedRef.current?.tagName).toBe('BUTTON');
      expect(innerRef.current?.tagName).toBe('BUTTON');
      expect(outerRef.current?.tagName).toBe('BUTTON');
    });

    it('passes an updated node', () => {
      const innerRef = jest.fn();
      const outerRef = jest.fn();

      const wrapper = mount(
        <Ref innerRef={outerRef}>
          <Ref innerRef={innerRef}>
            <div />
          </Ref>
        </Ref>,
      );

      expect(innerRef).toHaveBeenCalledWith(expect.objectContaining({ tagName: 'DIV' }));
      expect(outerRef).toHaveBeenCalledWith(expect.objectContaining({ tagName: 'DIV' }));

      jest.resetAllMocks();
      wrapper.setProps({
        children: (
          <Ref innerRef={innerRef}>
            <button />
          </Ref>
        ),
      });

      expect(innerRef).toHaveBeenCalledWith(expect.objectContaining({ tagName: 'BUTTON' }));
      expect(outerRef).toHaveBeenCalledWith(expect.objectContaining({ tagName: 'BUTTON' }));
    });
  });
});
