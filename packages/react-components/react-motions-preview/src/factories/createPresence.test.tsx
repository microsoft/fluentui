import { render } from '@testing-library/react';
import * as React from 'react';

import type { PresenceMotion } from '../types';
import { createPresence } from './createPresence';

const motion: PresenceMotion = {
  enter: {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],

    duration: 500,
    fill: 'forwards',
  },
  exit: {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],

    duration: 500,
    fill: 'forwards',
  },
};

function createElementMock() {
  const animateMock = jest.fn().mockImplementation(() => ({
    cancel: jest.fn(),
    finish: jest.fn(),
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

describe('createPresence', () => {
  describe('definitions', () => {
    it('supports functions as motion definitions', () => {
      const { keyframes, ...options } = motion.exit;

      const fnMotion = jest.fn().mockImplementation(() => motion);
      const TestAtom = createPresence(fnMotion);
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

      expect(fnMotion).toHaveBeenCalledTimes(1);
      expect(fnMotion).toHaveBeenCalledWith({ animate: animateMock } /* mock of html element */);

      expect(animateMock).toHaveBeenCalledWith(keyframes, options);
    });
  });

  describe('appear', () => {
    it('does not animate by default', () => {
      const TestAtom = createPresence(motion);
      const { animateMock, ElementMock } = createElementMock();

      render(
        <TestAtom visible>
          <ElementMock />
        </TestAtom>,
      );

      expect(animateMock).not.toHaveBeenCalled();
    });

    it('animates when is "true"', () => {
      const { keyframes, ...options } = motion.enter;
      const TestAtom = createPresence(motion);

      const { animateMock, ElementMock } = createElementMock();

      render(
        <TestAtom appear visible>
          <ElementMock />
        </TestAtom>,
      );

      expect(animateMock).toHaveBeenCalledWith(keyframes, options);
    });
  });

  describe('visible', () => {
    it('animates when state changes', () => {
      const { keyframes, ...options } = motion.exit;
      const TestAtom = createPresence(motion);

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

      expect(animateMock).toHaveBeenCalledWith(keyframes, options);
    });
  });

  describe('unmountOnExit', () => {
    it('unmounts when state changes', () => {
      const { keyframes, ...options } = motion.enter;
      const TestAtom = createPresence(motion);

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
      expect(animateMock).toHaveBeenCalledWith(keyframes, options);
    });
  });
});
