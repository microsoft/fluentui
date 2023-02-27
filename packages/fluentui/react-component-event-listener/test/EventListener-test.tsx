import { documentRef, EventListener } from '@fluentui/react-component-event-listener';
import { mount } from 'enzyme';
import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
// @ts-ignore
import * as simulant from 'simulant';

class TestBoundary extends React.Component<{ onError: (e: Error) => void }, { hasError: boolean }> {
  state = { hasError: false };

  componentDidCatch(error: Error) {
    this.props.onError(error);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

describe('EventListener', () => {
  describe('listener', () => {
    it('handles events on `target`', () => {
      const onClick = jest.fn();
      const onKeyDown = jest.fn();

      mount(
        <>
          <EventListener listener={onClick} targetRef={documentRef} type="click" />
          <EventListener listener={onKeyDown} targetRef={documentRef} type="keydown" />
        </>,
      );

      simulant.fire(document, 'click');
      simulant.fire(document, 'keydown');

      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ type: 'click' }));

      expect(onKeyDown).toHaveBeenCalledTimes(1);
      expect(onKeyDown).toHaveBeenCalledWith(expect.objectContaining({ type: 'keydown' }));
    });

    it('unsubscribes correctly', () => {
      const onClick = jest.fn();

      const wrapper = mount(<EventListener listener={onClick} targetRef={documentRef} type="click" />);

      ReactTestUtils.act(() => {
        wrapper.unmount();
      });

      simulant.fire(document, 'click');
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('capture', () => {
    it('passes "false" by default', () => {
      const addEventListener = jest.spyOn(document, 'addEventListener');
      const removeEventListener = jest.spyOn(document, 'removeEventListener');

      const wrapper = mount(<EventListener listener={() => {}} targetRef={documentRef} type="click" />);
      ReactTestUtils.act(() => {
        wrapper.unmount();
      });

      expect(addEventListener).toHaveBeenCalledWith('click', expect.any(Function), false);
      expect(removeEventListener).toHaveBeenCalledWith('click', expect.any(Function), false);
    });

    it('passes `capture` prop when it is defined', () => {
      const addEventListener = jest.spyOn(document, 'addEventListener');
      const removeEventListener = jest.spyOn(document, 'removeEventListener');

      const wrapper = mount(<EventListener capture listener={() => {}} targetRef={documentRef} type="click" />);
      ReactTestUtils.act(() => {
        wrapper.unmount();
      });

      expect(addEventListener).toHaveBeenCalledWith('click', expect.any(Function), true);
      expect(removeEventListener).toHaveBeenCalledWith('click', expect.any(Function), true);
    });
  });

  describe('type', () => {
    it('handles changes', () => {
      const listener = jest.fn();
      const wrapper = mount(<EventListener listener={listener} targetRef={documentRef} type="click" />);

      simulant.fire(document, 'click');
      expect(listener).toHaveBeenCalledTimes(1);

      wrapper.setProps({ type: 'scroll' });
      simulant.fire(document, 'scroll');
      expect(listener).toHaveBeenCalledTimes(2);
    });
  });

  describe('target', () => {
    it('handles events', () => {
      const listener = jest.fn();
      mount(<EventListener listener={listener} target={document} type="click" />);

      simulant.fire(document, 'click');
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('throws an error when is used with `targetRef`', () => {
      jest.spyOn(console, 'error').mockImplementation(() => {});
      const onError = jest.fn();

      mount(
        <TestBoundary onError={onError}>
          <EventListener listener={jest.fn()} target={document} targetRef={documentRef} type="click" />
        </TestBoundary>,
      );

      expect(onError).toBeCalledWith(
        expect.objectContaining({
          message: '`target` and `targetRef` props are mutually exclusive, please use one of them.',
        }),
      );

      // We need to clean up mocks to avoid errors reported by React
      // eslint-disable-next-line no-console
      (console.error as any).mockClear();
    });

    it('throws an error when not defined', () => {
      jest.spyOn(console, 'error').mockImplementation(() => {});
      const onError = jest.fn();

      mount(
        <TestBoundary onError={onError}>
          <EventListener listener={jest.fn()} type="click" />
        </TestBoundary>,
      );

      expect(onError).toBeCalledWith(
        expect.objectContaining({
          message: "`target` and `targetRef` props are `undefined`, it' required to use one of them.",
        }),
      );

      // We need to clean up mocks to avoid errors reported by React
      // eslint-disable-next-line no-console
      (console.error as any).mockClear();
    });
  });

  describe('targetRef', () => {
    it('handles events', () => {
      const listener = jest.fn();
      mount(<EventListener listener={listener} targetRef={documentRef} type="click" />);

      simulant.fire(document, 'click');
      expect(listener).toHaveBeenCalledTimes(1);
    });
  });
});
