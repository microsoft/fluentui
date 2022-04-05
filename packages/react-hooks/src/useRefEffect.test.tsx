import * as React from 'react';
import { mount } from 'enzyme';
import { useRefEffect } from './useRefEffect';
import type { RefCallback } from './useRefEffect';

describe('useRefEffect', () => {
  it('maintains ref.current and calls the callback and cleanup functions appropriately', () => {
    // Use a jest.fn to log the calls to callback and cleanup
    const log = jest.fn<void, [/*event:*/ 'callback' | 'cleanup', /*as:*/ 'div' | 'span', /*ele:*/ HTMLElement]>();

    let ref: RefCallback<HTMLElement>;
    const TestComponent: React.FunctionComponent<{ as: 'div' | 'span' }> = props => {
      ref = useRefEffect<HTMLElement>(ele => {
        log('callback', props.as, ele);
        return () => log('cleanup', props.as, ele);
      });
      return <props.as ref={ref} />;
    };

    // Mount the test component
    // This should set ref.current to the <div />, and call the callback
    const wrapper = mount(<TestComponent as="div" />);
    const divEle = ref!.current;

    expect(ref!.current).toBeInstanceOf(HTMLDivElement);
    expect(log).toHaveBeenCalledTimes(1);
    expect(log).toHaveBeenCalledWith('callback', 'div', divEle);
    log.mockClear();

    // Re-render as a <span /> to cause the ref to change
    // This should update ref.current, call cleanup for the old <div />, and callback for the new <span />
    wrapper.setProps({ as: 'span' });
    const spanEle = ref!.current;

    expect(ref!.current).not.toBe(divEle);
    expect(ref!.current).toBeInstanceOf(HTMLSpanElement);
    expect(log).toHaveBeenCalledTimes(2);
    expect(log).toHaveBeenNthCalledWith(1, 'cleanup', 'div', divEle);
    expect(log).toHaveBeenNthCalledWith(2, 'callback', 'span', spanEle);
    log.mockClear();

    // Re-render without changing the type
    // This should not cause the ref to change, nor the callback to be called
    wrapper.setProps({});

    expect(ref!.current).toBe(spanEle);
    expect(log).not.toHaveBeenCalled();
    log.mockClear();

    // Unmount the element
    // This should set the ref to null, and call cleanup for the old <span />
    wrapper.unmount();

    expect(ref!.current).toBeNull();
    expect(log).toHaveBeenCalledTimes(1);
    expect(log).toHaveBeenCalledWith('cleanup', 'span', spanEle);
  });
});
