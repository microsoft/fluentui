import { render } from '@testing-library/react';
import * as React from 'react';

import type { MotionAtom } from '../types';
import { createAtom } from './createAtom';

const motion: MotionAtom = {
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  options: {
    duration: 500,
  },
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

describe('createAtom', () => {
  it('creates a motion and plays it', () => {
    const TestAtom = createAtom(motion);
    const { animateMock, ElementMock } = createElementMock();

    render(
      <TestAtom>
        <ElementMock />
      </TestAtom>,
    );

    expect(animateMock).toHaveBeenCalledWith(motion.keyframes, {
      ...motion.options,
      fill: 'forwards',
      iterations: 1,
    });
  });
});
