import * as React from 'react';
import { safeRequestAnimationFrame } from './safeRequestAnimationFrame';
import { mount } from 'enzyme';
import * as sinon from 'sinon';

describe('safeRequestAnimationFrame', () => {
  let rafCalled = false;
  let clock: sinon.SinonFakeTimers;

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
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  it('can request animation frame', () => {
    mount(<Foo />);

    expect(rafCalled).toEqual(false);

    clock.tick(100);

    expect(rafCalled).toEqual(true);
  });

  it('can cancel request animation frame', () => {
    const wrapper = mount(<Foo />);

    expect(rafCalled).toEqual(false);

    wrapper.unmount();

    clock.tick(100);

    expect(rafCalled).toEqual(false);
  });
});
