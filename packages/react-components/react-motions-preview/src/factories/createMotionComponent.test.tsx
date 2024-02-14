import { render } from '@testing-library/react';
import * as React from 'react';

import type { AtomMotion } from '../types';
import { createMotionComponent } from './createMotionComponent';

const motion: AtomMotion = {
  keyframes: [{ opacity: 0 }, { opacity: 1 }],

  duration: 500,
};

function createElementMock() {
  const animateMock = jest.fn().mockImplementation(() => ({
    play: jest.fn(),
    cancel: jest.fn(),
  }));
  const ElementMock = React.forwardRef((props, ref) => {
    React.useImperativeHandle(ref, () => ({
      animate: animateMock,
    }));

    return <div>ElementMock</div>;
  });

  return {
    animateMock,
    ElementMock,
  };
}

describe('createMotionComponent', () => {
  it('creates a motion and plays it', () => {
    const TestAtom = createMotionComponent(motion);
    const { animateMock, ElementMock } = createElementMock();

    render(
      <TestAtom>
        <ElementMock />
      </TestAtom>,
    );

    expect(animateMock).toHaveBeenCalledWith(motion.keyframes, {
      duration: motion.duration,
      fill: 'forwards',
      iterations: 1,
    });
  });

  it('supports functions as motion definitions', () => {
    const fnMotion = jest.fn().mockImplementation(() => motion);
    const TestAtom = createMotionComponent(fnMotion);

    const { animateMock, ElementMock } = createElementMock();

    render(
      <TestAtom>
        <ElementMock />
      </TestAtom>,
    );

    expect(fnMotion).toHaveBeenCalledTimes(1);
    expect(fnMotion).toHaveBeenCalledWith({ animate: animateMock } /* mock of html element */);

    expect(animateMock).toHaveBeenCalledTimes(1);
  });
});
