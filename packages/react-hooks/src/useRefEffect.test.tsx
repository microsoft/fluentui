import * as React from 'react';
import { ReactWrapper, mount } from 'enzyme';
import { useRefEffect } from './useRefEffect';

describe('useRefEffect', () => {
  let ref: React.RefObject<HTMLElement>;

  // Use a jest.fn to log the calls to callback and cleanup
  const log = jest.fn((type: 'callback' | 'cleanup', as: 'div' | 'span', ele: HTMLElement) => {});
  afterEach(() => log.mockClear());

  const TestComponent: React.FunctionComponent<{ as: 'div' | 'span' }> = props => {
    let setRef;
    [ref, setRef] = useRefEffect<HTMLElement>(ele => {
      log('callback', props.as, ele);
      return () => log('cleanup', props.as, ele);
    });
    return <props.as ref={setRef} />;
  };

  let wrapper: ReactWrapper;

  it('sets ref.current and calls callback, when the component is mounted', () => {
    wrapper = mount(<TestComponent as="div" />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);

    expect(log).toHaveBeenCalledTimes(1);
    expect(log).toHaveBeenCalledWith('callback', 'div', ref.current);
  });

  it('updates ref.current and calls cleanup and callback, when the ref changes', () => {
    const prevRef = ref.current;

    // Re-render as a <span /> to cause the ref to change
    wrapper.setProps({ as: 'span' });

    expect(ref.current).not.toBe(prevRef);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);

    expect(log).toHaveBeenCalledTimes(2);
    expect(log).toHaveBeenNthCalledWith(1, 'cleanup', 'div', prevRef);
    expect(log).toHaveBeenNthCalledWith(2, 'callback', 'span', ref.current);
  });

  it('does not call callback on render, if the ref has not changed', () => {
    // Re-render without changing the type
    wrapper.setProps({});

    expect(log).not.toHaveBeenCalled();
  });

  it('clears ref.current and calls cleanup when the component is unmounted', () => {
    const prevRef = ref.current;
    wrapper.unmount();

    expect(ref.current).toBeNull();

    expect(log).toHaveBeenCalledTimes(1);
    expect(log).toHaveBeenCalledWith('cleanup', 'span', prevRef);
  });
});
