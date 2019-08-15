import * as React from 'react';
import { safeSetTimeout } from './safeSetTimeout';
import { mount } from 'enzyme';
import * as sinon from 'sinon';

describe('safeSetTimeout', () => {
  let setTimeoutCalled = false;
  let clock: sinon.SinonFakeTimers;

  class Foo extends React.Component {
    private _setTimeout = safeSetTimeout(this);

    constructor(props: {}) {
      super(props);
    }

    public render(): JSX.Element {
      return <div>Hello</div>;
    }

    public componentDidMount(): void {
      this._setTimeout(() => (setTimeoutCalled = true), 0);
    }
  }

  beforeEach(() => {
    setTimeoutCalled = false;
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  it('can request animation frame', () => {
    mount(<Foo />);

    expect(setTimeoutCalled).toEqual(false);

    clock.tick(100);

    expect(setTimeoutCalled).toEqual(true);
  });

  it('can cancel request animation frame', () => {
    const wrapper = mount(<Foo />);

    expect(setTimeoutCalled).toEqual(false);

    wrapper.unmount();

    clock.tick(100);

    expect(setTimeoutCalled).toEqual(false);
  });
});
