import * as React from 'react';
import { safeRequestAnimationFrame } from './safeRequestAnimationFrame';
import { mount } from 'enzyme';

describe('safeRequestAnimationFrame', () => {
  let rafCalled = false;

  class Foo extends React.Component {
    private _raf = safeRequestAnimationFrame(this);

    constructor(props: {}) {
      super(props);
    }

    public render(): JSX.Element {
      return <div>Hello</div>;
    }

    public componentDidMount(): void {
      this._raf(() => (rafCalled = true));
    }
  }

  beforeEach(() => {
    rafCalled = false;
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('can request animation frame', () => {
    mount(<Foo />);

    expect(rafCalled).toEqual(false);

    jest.runOnlyPendingTimers();

    expect(rafCalled).toEqual(true);
  });

  it('can cancel request animation frame', () => {
    const wrapper = mount(<Foo />);

    expect(rafCalled).toEqual(false);

    wrapper.unmount();

    jest.runOnlyPendingTimers();

    expect(rafCalled).toEqual(false);
  });
});
