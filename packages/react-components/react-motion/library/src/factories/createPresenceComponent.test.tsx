import { act, render } from '@testing-library/react';
import * as React from 'react';

import type { PresenceMotion } from '../types';
import { createPresenceComponent } from './createPresenceComponent';
import { PresenceGroupChildContext } from '../contexts/PresenceGroupChildContext';

jest.mock('./createPresenceComponent', () => {
  // Add a mock for the `animate` method on the HTMLElement prototype as jsdom does not support it
  Element.prototype.animate = jest.fn();

  return jest.requireActual('./createPresenceComponent');
});

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
    persist: jest.fn(),
    finish: finishMock,
    finished: Promise.resolve(),
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
  it('has mock for .animate()', () => {
    expect(Element.prototype.animate).toBeDefined();
  });

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

  describe('onMotionStart', () => {
    describe('exit', () => {
      it('is not called on first render', () => {
        const onMotionStart = jest.fn();
        const TestAtom = createPresenceComponent(motion);
        const { ElementMock } = createElementMock();

        render(
          <TestAtom onMotionStart={onMotionStart}>
            <ElementMock />
          </TestAtom>,
        );

        expect(onMotionStart).toHaveBeenCalledTimes(0);
      });

      it('is called when visible becomes false', () => {
        const onMotionStart = jest.fn();
        const TestAtom = createPresenceComponent(motion);
        const { ElementMock } = createElementMock();

        const { rerender } = render(
          <TestAtom onMotionStart={onMotionStart} appear visible>
            <ElementMock />
          </TestAtom>,
        );

        expect(onMotionStart).toHaveBeenCalledTimes(1);
        expect(onMotionStart).toHaveBeenNthCalledWith(1, null, { direction: 'enter' });

        // ---

        rerender(
          <TestAtom onMotionStart={onMotionStart} appear visible={false}>
            <ElementMock />
          </TestAtom>,
        );

        expect(onMotionStart).toHaveBeenCalledTimes(2);
        expect(onMotionStart).toHaveBeenNthCalledWith(2, null, { direction: 'exit' });
      });
    });

    describe('enter', () => {
      it('is not called on first render without appear', () => {
        const onMotionStart = jest.fn();
        const TestAtom = createPresenceComponent(motion);
        const { ElementMock } = createElementMock();

        render(
          <TestAtom onMotionStart={onMotionStart} visible>
            <ElementMock />
          </TestAtom>,
        );

        expect(onMotionStart).toHaveBeenCalledTimes(0);
      });

      it('is called on first render with appear', () => {
        const onMotionStart = jest.fn();
        const TestAtom = createPresenceComponent(motion);
        const { ElementMock } = createElementMock();

        render(
          <TestAtom onMotionStart={onMotionStart} visible appear>
            <ElementMock />
          </TestAtom>,
        );

        expect(onMotionStart).toHaveBeenCalledTimes(1);
        expect(onMotionStart).toHaveBeenCalledWith(null, { direction: 'enter' });
      });

      it('is called when visible becomes true', () => {
        const onMotionStart = jest.fn();
        const TestAtom = createPresenceComponent(motion);
        const { ElementMock } = createElementMock();

        const { rerender } = render(
          <TestAtom onMotionStart={onMotionStart} visible={false}>
            <ElementMock />
          </TestAtom>,
        );
        expect(onMotionStart).toHaveBeenCalledTimes(0);

        // ---

        rerender(
          <TestAtom onMotionStart={onMotionStart} visible>
            <ElementMock />
          </TestAtom>,
        );

        expect(onMotionStart).toHaveBeenCalledTimes(1);
        expect(onMotionStart).toHaveBeenNthCalledWith(1, null, { direction: 'enter' });
      });
    });
  });

  describe('onMotionFinish', () => {
    it('is not called on first render', () => {
      const onMotionFinish = jest.fn();
      const TestAtom = createPresenceComponent(motion);
      const { ElementMock } = createElementMock();

      render(
        <TestAtom onMotionFinish={onMotionFinish}>
          <ElementMock />
        </TestAtom>,
      );

      expect(onMotionFinish).toHaveBeenCalledTimes(0);
    });

    it('calls "onMotionFinish" when animation finishes', async () => {
      const onMotionFinish = jest.fn();
      const TestAtom = createPresenceComponent(motion);
      const { ElementMock } = createElementMock();

      const { rerender } = render(
        <TestAtom onMotionFinish={onMotionFinish} visible>
          <ElementMock />
        </TestAtom>,
      );

      await act(async () => {
        rerender(
          <TestAtom onMotionFinish={onMotionFinish} visible={false}>
            <ElementMock />
          </TestAtom>,
        );
      });

      expect(onMotionFinish).toHaveBeenCalledTimes(1);
      expect(onMotionFinish).toHaveBeenCalledWith(null, { direction: 'exit' });
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
    it('unmounts when state changes', async () => {
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

      await act(async () => {
        rerender(
          <TestAtom visible={false} unmountOnExit>
            <ElementMock onRender={onRender} />
          </TestAtom>,
        );
      });

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
      expect(fnMotion).toHaveBeenCalledWith({ element: { animate: animateMock } /* mock of html element */ });

      expect(animateMock).toHaveBeenCalledWith(exitKeyframes, options);
    });
  });
});

describe('PresenceGroupChildContext', () => {
  it('calls "onExit" when "visible" changes to "false"', async () => {
    const onExit = jest.fn();
    const TestAtom = createPresenceComponent(motion);
    const { ElementMock } = createElementMock();

    const Wrapper: React.FC<{ visible: boolean }> = ({ children, visible }) => (
      <PresenceGroupChildContext.Provider value={{ appear: false, onExit, visible, unmountOnExit: true }}>
        {children}
      </PresenceGroupChildContext.Provider>
    );

    const { queryByText, rerender } = render(
      <Wrapper visible>
        <TestAtom>
          <ElementMock />
        </TestAtom>
      </Wrapper>,
    );

    expect(queryByText('ElementMock')).toBeTruthy();
    expect(onExit).toHaveBeenCalledTimes(0);

    // ---

    await act(async () => {
      rerender(
        <Wrapper visible={false}>
          <TestAtom>
            <ElementMock />
          </TestAtom>
        </Wrapper>,
      );
    });

    expect(queryByText('ElementMock')).toBe(null);
    expect(onExit).toHaveBeenCalledTimes(1);
  });
});
