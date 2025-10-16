import * as React from 'react';
import { safeRequestAnimationFrame } from './safeRequestAnimationFrame';
import { render } from '@testing-library/react';

import type { JSXElement } from './jsx';

describe('safeRequestAnimationFrame', () => {
  let rafCalled = false;

  class Foo extends React.Component {
    private _raf = safeRequestAnimationFrame(this);

    constructor(props: {}) {
      super(props);
    }

    public render(): JSXElement {
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
    const component = render(<Foo />);

    expect(rafCalled).toEqual(false);

    jest.runOnlyPendingTimers();

    expect(rafCalled).toEqual(true);
    component.unmount();
  });

  it('can cancel request animation frame', () => {
    const component = render(<Foo />);

    expect(rafCalled).toEqual(false);

    component.unmount();

    jest.runOnlyPendingTimers();

    expect(rafCalled).toEqual(false);
  });
});
