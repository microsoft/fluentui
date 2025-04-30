import * as React from 'react';
import { safeSetTimeout } from './safeSetTimeout';
import * as renderer from 'react-test-renderer';

describe('safeSetTimeout', () => {
  let setTimeoutCalled = false;

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
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('can request animation frame', () => {
    renderer.create(<Foo />);

    expect(setTimeoutCalled).toEqual(false);

    jest.advanceTimersByTime(100);

    expect(setTimeoutCalled).toEqual(true);
  });

  it('can cancel request animation frame', () => {
    const component = renderer.create(<Foo />);

    expect(setTimeoutCalled).toEqual(false);

    component.unmount();

    jest.advanceTimersByTime(100);

    expect(setTimeoutCalled).toEqual(false);
  });
});
