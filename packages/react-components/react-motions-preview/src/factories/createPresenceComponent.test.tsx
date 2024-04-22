import { render } from '@testing-library/react';
import * as React from 'react';

import type { PresenceMotion } from '../types';
import { createPresenceComponent } from './createPresenceComponent';

const enterKeyframes = [{ opacity: 0 }, { opacity: 1 }];
const exitKeyframes = [{ opacity: 1 }, { opacity: 0 }];
const options = { duration: 500 as const, fill: 'forwards' as const };

const motion: PresenceMotion = {
  enter: { keyframes: enterKeyframes, ...options },
  exit: { keyframes: exitKeyframes, ...options },
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

describe('createPresenceComponent', () => {
  describe('appear', () => {
    it('does not animate by default', () => {
      const TestAtom = createPresenceComponent(motion);
      const { animateMock, ElementMock } = createElementMock();

      render(
        <TestAtom visible>
          <ElementMock />
        </TestAtom>,
      );

      expect(animateMock).not.toHaveBeenCalled();
    });

    it('animates when is "true"', () => {
      const TestAtom = createPresenceComponent(motion);
      const { animateMock, ElementMock } = createElementMock();

      render(
        <TestAtom appear visible>
          <ElementMock />
        </TestAtom>,
      );

      expect(animateMock).toHaveBeenCalledWith(enterKeyframes, options);
    });
  });

  describe('visible', () => {
    it('animates when state changes', () => {
      const TestAtom = createPresenceComponent(motion);
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

      expect(animateMock).toHaveBeenCalledWith(exitKeyframes, options);
    });
  });

  describe('unmountOnExit', () => {
    it('unmounts when state changes', () => {
      const TestAtom = createPresenceComponent(motion);
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
      expect(animateMock).toHaveBeenCalledWith(exitKeyframes, options);
    });
  });

  describe('definitions', () => {
    it('supports functions as motion definitions', () => {
      const fnMotion = jest.fn().mockImplementation(() => motion);
      const TestAtom = createPresenceComponent(fnMotion);
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

      expect(animateMock).toHaveBeenCalledWith(exitKeyframes, options);
    });
  });
});
