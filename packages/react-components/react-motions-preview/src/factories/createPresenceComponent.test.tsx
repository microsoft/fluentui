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
  const finishMock = jest.fn();
  const animateMock = jest.fn().mockImplementation(() => ({
    cancel: jest.fn(),
    finish: finishMock,
    set onfinish(callback: Function) {
      callback();
      return;
    },
  }));
  const ElementMock = React.forwardRef<{ animate: () => void }, { onRender?: () => void }>((props, ref) => {
    React.useImperativeHandle(ref, () => ({
      animate: animateMock,
    }));

    props.onRender?.();

    return <div>ElementMock</div>;
  });

  return {
    animateMock,
    ElementMock,
    finishMock,
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
      const onRender = jest.fn();
      const { animateMock, ElementMock, finishMock } = createElementMock();

      const { rerender } = render(
        <TestAtom visible>
          <ElementMock onRender={onRender} />
        </TestAtom>,
      );

      expect(animateMock).not.toHaveBeenCalled();
      expect(onRender).toHaveBeenCalledTimes(1);
      expect(finishMock).not.toHaveBeenCalled();

      // ---

      jest.clearAllMocks();
      rerender(
        <TestAtom visible={false}>
          <ElementMock onRender={onRender} />
        </TestAtom>,
      );

      expect(animateMock).toHaveBeenCalledWith(exitKeyframes, options);
      expect(finishMock).not.toHaveBeenCalled();
      expect(onRender).toHaveBeenCalledTimes(1);
    });

    it('calls ".finish()" on first mount when "visible" is "false"', () => {
      const TestAtom = createPresenceComponent(motion);
      const { animateMock, ElementMock, finishMock } = createElementMock();

      render(
        <TestAtom visible={false}>
          <ElementMock />
        </TestAtom>,
      );

      expect(animateMock).toHaveBeenCalledWith(exitKeyframes, options);
      expect(finishMock).toHaveBeenCalled();
    });
  });

  describe('unmountOnExit', () => {
    it('unmounts when state changes', () => {
      const TestAtom = createPresenceComponent(motion);
      const onRender = jest.fn();
      const { animateMock, ElementMock } = createElementMock();

      const { rerender, queryByText } = render(
        <TestAtom visible unmountOnExit>
          <ElementMock onRender={onRender} />
        </TestAtom>,
      );

      expect(queryByText('ElementMock')).toBeTruthy();
      expect(animateMock).not.toHaveBeenCalled();
      expect(onRender).toHaveBeenCalledTimes(1);

      // ---

      jest.clearAllMocks();
      rerender(
        <TestAtom visible={false} unmountOnExit>
          <ElementMock onRender={onRender} />
        </TestAtom>,
      );

      expect(queryByText('ElementMock')).toBe(null);
      expect(animateMock).toHaveBeenCalledWith(exitKeyframes, options);
      expect(onRender).toHaveBeenCalledTimes(1);
    });

    it('mounts when state changes', () => {
      const TestAtom = createPresenceComponent(motion);
      const onRender = jest.fn();
      const { animateMock, ElementMock } = createElementMock();

      const { rerender, queryByText } = render(
        <TestAtom visible={false} unmountOnExit>
          <ElementMock onRender={onRender} />
        </TestAtom>,
      );

      expect(queryByText('ElementMock')).toBe(null);
      expect(animateMock).not.toHaveBeenCalled();
      expect(onRender).toHaveBeenCalledTimes(0);

      // ---

      jest.clearAllMocks();
      rerender(
        <TestAtom visible unmountOnExit>
          <ElementMock onRender={onRender} />
        </TestAtom>,
      );

      expect(queryByText('ElementMock')).toBeTruthy();
      expect(animateMock).toHaveBeenCalledWith(enterKeyframes, options);
      expect(onRender).toHaveBeenCalledTimes(1);
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
      expect(fnMotion).not.toHaveBeenCalled();

      // ---

      jest.clearAllMocks();
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
