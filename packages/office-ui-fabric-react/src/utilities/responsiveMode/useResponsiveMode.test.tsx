import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import { mount, ReactWrapper } from 'enzyme';
import { useResponsiveMode, setResponsiveMode, ResponsiveMode } from './index';
import { setSSR } from '../../Utilities';

const resizeTo = (width: number, height: number = 100) => {
  ReactTestUtils.act(() => {
    const win = window as any;

    win.innerWidth = width;
    win.innerHeight = height;
    win.dispatchEvent(new Event('resize'));
  });
};

let lastResponsiveMode: any = undefined;
let renderCount = 0;
let wrapper: ReactWrapper | undefined;

const TestComponent: React.FunctionComponent = () => {
  const ref = React.useRef(null);
  lastResponsiveMode = useResponsiveMode(ref);
  renderCount++;
  return null;
};

describe('useResponsiveMode', () => {
  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
      renderCount = 0;
    }
  });

  it('can return the correct value', () => {
    wrapper = mount(<TestComponent />);

    expect(lastResponsiveMode).toBe(wrapper);
  });

  it('can re-render on window resize', () => {
    wrapper = mount(<TestComponent />);

    resizeTo(1000);

    expect(renderCount).toBe(1);

    resizeTo(500);

    expect(renderCount).toBe(2);
  });

  it('can be used in a server scenario', () => {
    setSSR(true);

    setResponsiveMode(ResponsiveMode.large);
    expect(() => ReactTestUtils.renderIntoDocument(<TestComponent />)).toBeDefined();

    setSSR(false);
  });
});
