import * as React from 'react';
import { safeSetTimeout } from './safeSetTimeout';
import { render } from '@testing-library/react';

import type { JSXElement } from './jsx';

describe('safeSetTimeout', () => {
  let setTimeoutCalled = false;

  class Foo extends React.Component {
    private _setTimeout = safeSetTimeout(this);

    constructor(props: {}) {
      super(props);
    }

    public render(): JSXElement {
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
    const { unmount } = render(<Foo />);

    expect(setTimeoutCalled).toEqual(false);

    jest.advanceTimersByTime(100);

    expect(setTimeoutCalled).toEqual(true);
    unmount();
  });

  it('can cancel request animation frame', () => {
    const { unmount } = render(<Foo />);

    expect(setTimeoutCalled).toEqual(false);

    unmount();

    jest.advanceTimersByTime(100);

    expect(setTimeoutCalled).toEqual(false);
  });
});
