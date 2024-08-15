import { act, render } from '@testing-library/react';
import * as React from 'react';

import type { PresenceMotion } from '../types';
import { createPresenceComponent } from './createPresenceComponent';
import { PresenceGroupChildContext } from '../contexts/PresenceGroupChildContext';
import { MotionDisableProvider } from '../contexts/MotionDisableContext';

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
  describe('appear', () => {
    it('does not animate by default', () => {
      const TestPresence = createPresenceComponent(motion);
      const { animateMock, ElementMock } = createElementMock();

      render(
        <TestPresence visible>
          <ElementMock />
        </TestPresence>,
      );

      expect(animateMock).not.toHaveBeenCalled();
    });

    it('animates when is "true"', () => {
      const TestPresence = createPresenceComponent(motion);
      const { animateMock, ElementMock } = createElementMock();

      render(
        <TestPresence appear visible>
          <ElementMock />
        </TestPresence>,
      );

      expect(animateMock).toHaveBeenCalledWith(enterKeyframes, options);
    });
  });

  describe('onMotionStart', () => {
    describe('exit', () => {
      it('is not called on first render', () => {
        const onMotionStart = jest.fn();
        const TestPresence = createPresenceComponent(motion);
        const { ElementMock } = createElementMock();

        render(
          <TestPresence onMotionStart={onMotionStart}>
            <ElementMock />
          </TestPresence>,
        );

        expect(onMotionStart).toHaveBeenCalledTimes(0);
      });

      it('is called when visible becomes false', () => {
        const onMotionStart = jest.fn();
        const TestPresence = createPresenceComponent(motion);
        const { ElementMock } = createElementMock();

        const { rerender } = render(
          <TestPresence onMotionStart={onMotionStart} appear visible>
            <ElementMock />
          </TestPresence>,
        );

        expect(onMotionStart).toHaveBeenCalledTimes(1);
        expect(onMotionStart).toHaveBeenNthCalledWith(1, null, { direction: 'enter' });

        // ---

        rerender(
          <TestPresence onMotionStart={onMotionStart} appear visible={false}>
            <ElementMock />
          </TestPresence>,
        );

        expect(onMotionStart).toHaveBeenCalledTimes(2);
        expect(onMotionStart).toHaveBeenNthCalledWith(2, null, { direction: 'exit' });
      });
    });

    describe('enter', () => {
      it('is not called on first render without appear', () => {
        const onMotionStart = jest.fn();
        const TestPresence = createPresenceComponent(motion);
        const { ElementMock } = createElementMock();

        render(
          <TestPresence onMotionStart={onMotionStart} visible>
            <ElementMock />
          </TestPresence>,
        );

        expect(onMotionStart).toHaveBeenCalledTimes(0);
      });

      it('is called on first render with appear', () => {
        const onMotionStart = jest.fn();
        const TestPresence = createPresenceComponent(motion);
        const { ElementMock } = createElementMock();

        render(
          <TestPresence onMotionStart={onMotionStart} visible appear>
            <ElementMock />
          </TestPresence>,
        );

        expect(onMotionStart).toHaveBeenCalledTimes(1);
        expect(onMotionStart).toHaveBeenCalledWith(null, { direction: 'enter' });
      });

      it('is called when visible becomes true', () => {
        const onMotionStart = jest.fn();
        const TestPresence = createPresenceComponent(motion);
        const { ElementMock } = createElementMock();

        const { rerender } = render(
          <TestPresence onMotionStart={onMotionStart} visible={false}>
            <ElementMock />
          </TestPresence>,
        );
        expect(onMotionStart).toHaveBeenCalledTimes(0);

        // ---

        rerender(
          <TestPresence onMotionStart={onMotionStart} visible>
            <ElementMock />
          </TestPresence>,
        );

        expect(onMotionStart).toHaveBeenCalledTimes(1);
        expect(onMotionStart).toHaveBeenNthCalledWith(1, null, { direction: 'enter' });
      });
    });
  });

  describe('onMotionFinish', () => {
    it('is not called on first render', () => {
      const onMotionFinish = jest.fn();
      const TestPresence = createPresenceComponent(motion);
      const { ElementMock } = createElementMock();

      render(
        <TestPresence onMotionFinish={onMotionFinish}>
          <ElementMock />
        </TestPresence>,
      );

      expect(onMotionFinish).toHaveBeenCalledTimes(0);
    });

    it('calls "onMotionFinish" when animation finishes', async () => {
      const onMotionFinish = jest.fn();
      const TestPresence = createPresenceComponent(motion);
      const { ElementMock } = createElementMock();

      const { rerender } = render(
        <TestPresence onMotionFinish={onMotionFinish} visible>
          <ElementMock />
        </TestPresence>,
      );

      await act(async () => {
        rerender(
          <TestPresence onMotionFinish={onMotionFinish} visible={false}>
            <ElementMock />
          </TestPresence>,
        );
      });

      expect(onMotionFinish).toHaveBeenCalledTimes(1);
      expect(onMotionFinish).toHaveBeenCalledWith(null, { direction: 'exit' });
    });
  });

  describe('visible', () => {
    it('animates when state changes', () => {
      const TestPresence = createPresenceComponent(motion);
      const onRender = jest.fn();
      const { animateMock, ElementMock, finishMock } = createElementMock();

      const { rerender } = render(
        <TestPresence visible>
          <ElementMock onRender={onRender} />
        </TestPresence>,
      );

      expect(animateMock).not.toHaveBeenCalled();
      expect(onRender).toHaveBeenCalledTimes(1);
      expect(finishMock).not.toHaveBeenCalled();

      // ---

      jest.clearAllMocks();
      rerender(
        <TestPresence visible={false}>
          <ElementMock onRender={onRender} />
        </TestPresence>,
      );

      expect(animateMock).toHaveBeenCalledWith(exitKeyframes, options);
      expect(finishMock).not.toHaveBeenCalled();
      expect(onRender).toHaveBeenCalledTimes(1);
    });

    it('calls ".finish()" on first mount when "visible" is "false"', () => {
      const TestPresence = createPresenceComponent(motion);
      const { animateMock, ElementMock, finishMock } = createElementMock();

      render(
        <TestPresence visible={false}>
          <ElementMock />
        </TestPresence>,
      );

      expect(animateMock).toHaveBeenCalledWith(exitKeyframes, options);
      expect(finishMock).toHaveBeenCalled();
    });
  });

  describe('unmountOnExit', () => {
    it('unmounts when state changes', async () => {
      const TestPresence = createPresenceComponent(motion);
      const onRender = jest.fn();
      const { animateMock, ElementMock } = createElementMock();

      const { rerender, queryByText } = render(
        <TestPresence visible unmountOnExit>
          <ElementMock onRender={onRender} />
        </TestPresence>,
      );

      expect(queryByText('ElementMock')).toBeTruthy();
      expect(animateMock).not.toHaveBeenCalled();
      expect(onRender).toHaveBeenCalledTimes(1);

      // ---

      jest.clearAllMocks();

      await act(async () => {
        rerender(
          <TestPresence visible={false} unmountOnExit>
            <ElementMock onRender={onRender} />
          </TestPresence>,
        );
      });

      expect(queryByText('ElementMock')).toBe(null);
      expect(animateMock).toHaveBeenCalledWith(exitKeyframes, options);
      expect(onRender).toHaveBeenCalledTimes(1);
    });

    it('mounts when state changes', () => {
      const TestPresence = createPresenceComponent(motion);
      const onRender = jest.fn();
      const { animateMock, ElementMock } = createElementMock();

      const { rerender, queryByText } = render(
        <TestPresence visible={false} unmountOnExit>
          <ElementMock onRender={onRender} />
        </TestPresence>,
      );

      expect(queryByText('ElementMock')).toBe(null);
      expect(animateMock).not.toHaveBeenCalled();
      expect(onRender).toHaveBeenCalledTimes(0);

      // ---

      jest.clearAllMocks();
      rerender(
        <TestPresence visible unmountOnExit>
          <ElementMock onRender={onRender} />
        </TestPresence>,
      );

      expect(queryByText('ElementMock')).toBeTruthy();
      expect(animateMock).toHaveBeenCalledWith(enterKeyframes, options);
      expect(onRender).toHaveBeenCalledTimes(1);
    });

    it('finishes motion when wrapped in disabled context', () => {
      const TestPresence = createPresenceComponent(motion);
      const onRender = jest.fn();
      const { finishMock, ElementMock } = createElementMock();
      const onMotionStart = jest.fn();
      const onMotionFinish = jest.fn();

      const { queryByText } = render(
        <MotionDisableProvider value={true}>
          <TestPresence visible appear onMotionStart={onMotionStart} onMotionFinish={onMotionFinish}>
            <ElementMock onRender={onRender} />
          </TestPresence>
        </MotionDisableProvider>,
      );

      expect(queryByText('ElementMock')).toBeTruthy();
      expect(finishMock).toHaveBeenCalledTimes(1);
      expect(onMotionStart).toHaveBeenCalledTimes(0);
      expect(onMotionFinish).toHaveBeenCalledTimes(0);
    });
  });

  describe('definitions', () => {
    it('supports functions as motion definitions', () => {
      const fnMotion = jest.fn().mockImplementation(() => motion);
      const TestPresence = createPresenceComponent(fnMotion);
      const { animateMock, ElementMock } = createElementMock();

      const { rerender } = render(
        <TestPresence visible>
          <ElementMock />
        </TestPresence>,
      );

      expect(animateMock).not.toHaveBeenCalled();
      expect(fnMotion).not.toHaveBeenCalled();

      // ---

      jest.clearAllMocks();
      rerender(
        <TestPresence visible={false}>
          <ElementMock />
        </TestPresence>,
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
    const TestPresence = createPresenceComponent(motion);
    const { ElementMock } = createElementMock();

    const Wrapper: React.FC<{ visible: boolean }> = ({ children, visible }) => (
      <PresenceGroupChildContext.Provider value={{ appear: false, onExit, visible, unmountOnExit: true }}>
        {children}
      </PresenceGroupChildContext.Provider>
    );

    const { queryByText, rerender } = render(
      <Wrapper visible>
        <TestPresence>
          <ElementMock />
        </TestPresence>
      </Wrapper>,
    );

    expect(queryByText('ElementMock')).toBeTruthy();
    expect(onExit).toHaveBeenCalledTimes(0);

    // ---

    await act(async () => {
      rerender(
        <Wrapper visible={false}>
          <TestPresence>
            <ElementMock />
          </TestPresence>
        </Wrapper>,
      );
    });

    expect(queryByText('ElementMock')).toBe(null);
    expect(onExit).toHaveBeenCalledTimes(1);
  });
});
