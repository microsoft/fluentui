import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import { mount, ReactWrapper } from 'enzyme';
import { ResponsiveMode } from '../decorators/withResponsiveMode';
import { useResponsiveMode } from './useResponsiveMode';

const resizeTo = (width: number, height: number = 100) => {
  ReactTestUtils.act(() => {
    const win = window as any;
    Object.defineProperty(win.HTMLHtmlElement.prototype, 'clientWidth', { configurable: true, value: width });
    win.innerHeight = height;
    win.dispatchEvent(new Event('resize'));
  });
};

describe('useResponsiveMode', () => {
  let responsiveModes: ResponsiveMode[] = [];
  let wrapper: ReactWrapper | undefined;

  const TestComponent: React.FunctionComponent = () => {
    const ref = React.useRef(null);

    responsiveModes.push(useResponsiveMode(ref));

    return null;
  };

  const cleanup = () => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
      responsiveModes = [];
    }
  };

  afterEach(cleanup);

  it('can return the correct value', () => {
    // Set initial window size.
    resizeTo(400);

    // Mount with initial value.
    wrapper = mount(<TestComponent />);
    expect(responsiveModes).toEqual([ResponsiveMode.large, ResponsiveMode.small]);

    // Set to max small constraint, should not re-render.
    resizeTo(479);
    expect(responsiveModes).toEqual([ResponsiveMode.large, ResponsiveMode.small]);

    // Go one over.
    resizeTo(480);
    expect(responsiveModes).toEqual([ResponsiveMode.large, ResponsiveMode.small, ResponsiveMode.medium]);

    // Back to large.
    resizeTo(1000);
    expect(responsiveModes).toEqual([
      ResponsiveMode.large,
      ResponsiveMode.small,
      ResponsiveMode.medium,
      ResponsiveMode.large,
    ]);

    cleanup();

    // Expect only one render as the size has not changed.
    wrapper = mount(<TestComponent />);
    expect(responsiveModes).toEqual([ResponsiveMode.large]);
  });
});
