import { render } from '@testing-library/react';
import * as React from 'react';

import type { MotionTransition } from '../types';
import { createTransition } from './createTransition';

const transition: MotionTransition = {
  enter: {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    options: {
      duration: 500,
      fill: 'forwards',
    },
  },
  exit: {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    options: {
      duration: 500,
      fill: 'forwards',
    },
  },
};

function createElementMock() {
  const animateMock = jest.fn().mockImplementation(() => ({
    cancel: jest.fn(),
    set onfinish(callback: Function) {
      callback();
      return;
    },
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

describe('createTransition', () => {
  describe('appear', () => {
    it('does not animate by default', () => {
      const TestAtom = createTransition(transition);
      const { animateMock, ElementMock } = createElementMock();

      render(
        <TestAtom visible>
          <ElementMock />
        </TestAtom>,
      );

      expect(animateMock).not.toHaveBeenCalled();
    });

    it('animates when is "true"', () => {
      const TestAtom = createTransition(transition);
      const { animateMock, ElementMock } = createElementMock();

      render(
        <TestAtom appear visible>
          <ElementMock />
        </TestAtom>,
      );

      expect(animateMock).toHaveBeenCalledWith(transition.enter.keyframes, transition.enter.options);
    });
  });

  describe('visible', () => {
    it('animates when state changes', () => {
      const TestAtom = createTransition(transition);
      const { animateMock, ElementMock } = createElementMock();

      const { rerender } = render(
        <TestAtom visible>
          <ElementMock />
        </TestAtom>,
      );

      expect(animateMock).not.toHaveBeenCalled();

      rerender(
        <TestAtom visible={false}>
          <ElementMock />
        </TestAtom>,
      );

      expect(animateMock).toHaveBeenCalledWith(transition.exit.keyframes, transition.exit.options);
    });
  });

  describe('unmountOnExit', () => {
    it('unmounts when state changes', () => {
      const TestAtom = createTransition(transition);
      const { animateMock, ElementMock } = createElementMock();

      const { rerender, queryByText } = render(
        <TestAtom visible unmountOnExit>
          <ElementMock />
        </TestAtom>,
      );

      expect(queryByText('ElementMock')).toBeTruthy();
      expect(animateMock).not.toHaveBeenCalled();

      rerender(
        <TestAtom visible={false} unmountOnExit>
          <ElementMock />
        </TestAtom>,
      );

      expect(queryByText('ElementMock')).toBe(null);
      expect(animateMock).toHaveBeenCalledWith(transition.exit.keyframes, transition.exit.options);
    });
  });
});
