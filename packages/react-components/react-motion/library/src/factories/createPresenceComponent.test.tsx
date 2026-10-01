import { act, render } from '@testing-library/react';
import * as React from 'react';

import type { PresenceMotion, PresenceMotionFn } from '../types';
import { createPresenceComponent } from './createPresenceComponent';
import { createPresenceComponentVariant } from './createPresenceComponentVariant';
import { PresenceGroupChildContext } from '../contexts/PresenceGroupChildContext';
import { MotionBehaviourProvider } from '../contexts/MotionBehaviourContext';

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

    set onfinish(fn: () => void) {
      fn();
    },
    set oncancel(fn: () => void) {
      fn();
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
  let hasAnimation: boolean;
  beforeEach(() => {
    if (!global.Animation) {
      hasAnimation = false;
      global.Animation = {
        // @ts-expect-error mock
        prototype: {
          persist: jest.fn(),
        },
      };
    } else {
      hasAnimation = true;
    }
  });

  afterEach(() => {
    if (!hasAnimation) {
      // @ts-expect-error mock
      delete global.Animation;
    }
  });

  describe('directional pose parameters', () => {
    const posedMotion: PresenceMotionFn<{
      from?: number;
      present?: number;
      to?: number;
      duration?: number;
      easing?: string;
      delay?: number;
      exitDuration?: number;
      exitEasing?: string;
      exitDelay?: number;
    }> = ({
      from = 0,
      present = 1,
      to = from,
      duration = 500,
      easing = 'linear',
      delay = 0,
      exitDuration = duration,
      exitEasing = easing,
      exitDelay = delay,
    }) => ({
      enter: { ...options, keyframes: [{ opacity: from }, { opacity: present }], duration, easing, delay },
      exit: {
        ...options,
        keyframes: [{ opacity: present }, { opacity: to }],
        duration: exitDuration,
        easing: exitEasing,
        delay: exitDelay,
      },
    });
    const TestPresence = createPresenceComponent(posedMotion, {
      poses: [{ from: 'from', in: 'present', to: 'to' }],
    });

    it('excludes presence-only props from directional components and rejects unknown variant params', () => {
      const child = <div />;
      <TestPresence present={0.7}>{child}</TestPresence>;
      // @ts-expect-error the present pose belongs to the presence component
      <TestPresence.In present={0.7}>{child}</TestPresence.In>;
      // @ts-expect-error the present pose belongs to the presence component
      <TestPresence.Out present={0.7}>{child}</TestPresence.Out>;
      const Variant = createPresenceComponentVariant(TestPresence, { present: 0.7 });
      // @ts-expect-error variants retain the directional prop contract
      <Variant.In present={0.7}>{child}</Variant.In>;
      // @ts-expect-error variant parameters must be declared by the original definition
      createPresenceComponentVariant(TestPresence, { unknown: 1 });
    });

    it('uses from and to as playback endpoints on both directional components', () => {
      const { animateMock, ElementMock } = createElementMock();
      const { unmount } = render(
        <TestPresence.In from={0.2} to={0.7}>
          <ElementMock />
        </TestPresence.In>,
      );
      expect(animateMock).toHaveBeenLastCalledWith([{ opacity: 0.2 }, { opacity: 0.7 }], expect.any(Object));
      unmount();
      render(
        <TestPresence.Out from={0.7} to={0.2} duration={123} easing="ease-in" delay={25}>
          <ElementMock />
        </TestPresence.Out>,
      );
      expect(animateMock).toHaveBeenLastCalledWith(
        [{ opacity: 0.7 }, { opacity: 0.2 }],
        expect.objectContaining({ duration: 123, easing: 'ease-in', delay: 25 }),
      );
    });

    it('keeps the main component presence-only with independent enter and exit endpoints', () => {
      const { animateMock, ElementMock } = createElementMock();
      const onMotionStart = jest.fn();
      const { rerender } = render(
        <TestPresence from={0.2} present={0.7} to={0.4} visible={false} onMotionStart={onMotionStart}>
          <ElementMock />
        </TestPresence>,
      );
      expect(onMotionStart).not.toHaveBeenCalled();
      rerender(
        <TestPresence from={0.2} present={0.7} to={0.4} visible onMotionStart={onMotionStart}>
          <ElementMock />
        </TestPresence>,
      );
      expect(animateMock).toHaveBeenLastCalledWith([{ opacity: 0.2 }, { opacity: 0.7 }], expect.any(Object));
      rerender(
        <TestPresence from={0.2} present={0.7} to={0.4} visible={false} onMotionStart={onMotionStart}>
          <ElementMock />
        </TestPresence>,
      );
      expect(animateMock).toHaveBeenLastCalledWith([{ opacity: 0.7 }, { opacity: 0.4 }], expect.any(Object));
      expect(onMotionStart).toHaveBeenLastCalledWith(null, { direction: 'exit' });
    });

    it('normalizes runtime endpoints before nested variant defaults', () => {
      const Variant = createPresenceComponentVariant(TestPresence, {
        from: 0.2,
        present: 0.7,
        to: 0.4,
        duration: 250,
        exitDuration: 150,
      });
      const Nested = createPresenceComponentVariant(Variant, { easing: 'ease-out' });
      const { animateMock, ElementMock } = createElementMock();
      const { unmount } = render(
        <Nested.In from={0.3} to={0.8}>
          <ElementMock />
        </Nested.In>,
      );
      expect(animateMock).toHaveBeenLastCalledWith(
        [{ opacity: 0.3 }, { opacity: 0.8 }],
        expect.objectContaining({ duration: 250, easing: 'ease-out' }),
      );
      unmount();
      render(
        <Nested.Out to={0} duration={123}>
          <ElementMock />
        </Nested.Out>,
      );
      expect(animateMock).toHaveBeenLastCalledWith(
        [{ opacity: 0.7 }, { opacity: 0 }],
        expect.objectContaining({ duration: 123 }),
      );
    });

    it('fills omitted axes of authored poses with neutral values before variant defaults', () => {
      const axisMotion: PresenceMotionFn<{
        fromX?: string;
        fromY?: string;
        inX?: string;
        inY?: string;
        toX?: string;
        toY?: string;
      }> = ({ fromX = '0px', fromY = '0px', inX = '0px', inY = '0px', toX = fromX, toY = fromY }) => ({
        enter: { ...options, keyframes: [{ translate: `${fromX} ${fromY}` }, { translate: `${inX} ${inY}` }] },
        exit: { ...options, keyframes: [{ translate: `${inX} ${inY}` }, { translate: `${toX} ${toY}` }] },
      });
      const Axis = createPresenceComponent(axisMotion, {
        poses: [
          { from: 'fromX', in: 'inX', to: 'toX', neutral: '0px' },
          { from: 'fromY', in: 'inY', to: 'toY', neutral: '0px' },
        ],
      });
      const Variant = createPresenceComponentVariant(Axis, { fromY: '-8px', inY: '7px', toY: '16px' });
      const { animateMock, ElementMock } = createElementMock();
      const { unmount } = render(
        <Variant.In fromX="24px" toX="4px">
          <ElementMock />
        </Variant.In>,
      );
      expect(animateMock).toHaveBeenLastCalledWith([{ translate: '24px 0px' }, { translate: '4px 0px' }], options);
      unmount();
      const { unmount: unmountOut } = render(
        <Variant.Out fromX="4px" toY="-12px">
          <ElementMock />
        </Variant.Out>,
      );
      expect(animateMock).toHaveBeenLastCalledWith([{ translate: '4px 0px' }, { translate: '0px -12px' }], options);
      unmountOut();
      render(
        <Variant toX="24px" visible={false}>
          <ElementMock />
        </Variant>,
      );
      expect(animateMock).toHaveBeenLastCalledWith([{ translate: '0px 7px' }, { translate: '24px 0px' }], options);
    });
  });

  describe('appear', () => {
    it('by default on initial mount applies styles immediately', () => {
      const onMotionFinish = jest.fn();
      const TestPresence = createPresenceComponent(motion);
      const { animateMock, ElementMock, finishMock } = createElementMock();

      render(
        <TestPresence onMotionFinish={onMotionFinish} visible>
          <ElementMock />
        </TestPresence>,
      );

      // Should be called with "enter" keyframes
      expect(animateMock).toHaveBeenCalledTimes(1);
      expect(animateMock).toHaveBeenCalledWith(enterKeyframes, options);

      expect(finishMock).toHaveBeenCalledTimes(1);
      expect(onMotionFinish).toHaveBeenCalledTimes(0);
    });

    it('runs animation on mount when is "true"', async () => {
      const onMotionFinish = jest.fn();
      const TestPresence = createPresenceComponent(motion);
      const { animateMock, ElementMock, finishMock } = createElementMock();

      render(
        <TestPresence appear onMotionFinish={onMotionFinish} visible>
          <ElementMock />
        </TestPresence>,
      );

      expect(animateMock).toHaveBeenCalledTimes(1);
      expect(animateMock).toHaveBeenCalledWith(enterKeyframes, options);

      await act(async () => {
        await new Promise<void>(process.nextTick);
      });

      expect(finishMock).toHaveBeenCalledTimes(0);
      expect(onMotionFinish).toHaveBeenCalledTimes(1);
    });

    it('animates when is "true" (without .persist())', () => {
      // @ts-expect-error mock
      delete window.Animation.prototype.persist;
      const TestPresence = createPresenceComponent(motion);
      const { animateMock, ElementMock } = createElementMock();

      render(
        <TestPresence appear visible>
          <ElementMock />
        </TestPresence>,
      );

      expect(animateMock).toHaveBeenCalledWith(enterKeyframes, {
        ...options,
        duration: 500,
      });
    });

    describe('MotionBehaviourProvider', () => {
      it('finishes motion when wrapped in context with "skip" behaviour, but executes callbacks', async () => {
        const onMotionStart = jest.fn();
        const onMotionFinish = jest.fn();

        const TestPresence = createPresenceComponent(motion);
        const { finishMock, ElementMock } = createElementMock();

        const { queryByText } = render(
          <TestPresence appear onMotionStart={onMotionStart} onMotionFinish={onMotionFinish} visible>
            <ElementMock />
          </TestPresence>,
          { wrapper: ({ children }) => <MotionBehaviourProvider value="skip">{children}</MotionBehaviourProvider> },
        );

        await act(async () => {
          await new Promise<void>(process.nextTick);
        });

        expect(queryByText('ElementMock')).toBeTruthy();
        expect(finishMock).toHaveBeenCalledTimes(1);
        expect(onMotionStart).toHaveBeenCalledTimes(1);
        expect(onMotionFinish).toHaveBeenCalledTimes(1);
      });
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
    it('animates when state changes', async () => {
      const onMotionFinish = jest.fn();
      const onRender = jest.fn();

      const TestPresence = createPresenceComponent(motion);
      const { animateMock, ElementMock, finishMock } = createElementMock();

      const { rerender } = render(
        <TestPresence onMotionFinish={onMotionFinish} visible>
          <ElementMock onRender={onRender} />
        </TestPresence>,
      );

      expect(animateMock).toHaveBeenCalledTimes(1);
      expect(animateMock).toHaveBeenCalledWith(enterKeyframes, options);
      expect(finishMock).toHaveBeenCalledTimes(1);

      expect(onMotionFinish).toHaveBeenCalledTimes(0);
      expect(onRender).toHaveBeenCalledTimes(1);

      // ---

      jest.clearAllMocks();

      rerender(
        <TestPresence onMotionFinish={onMotionFinish} visible={false}>
          <ElementMock onRender={onRender} />
        </TestPresence>,
      );

      expect(animateMock).toHaveBeenCalledTimes(1);
      expect(animateMock).toHaveBeenCalledWith(exitKeyframes, options);
      expect(finishMock).not.toHaveBeenCalled();

      await act(async () => {
        await new Promise<void>(process.nextTick);
      });

      expect(onMotionFinish).toHaveBeenCalledTimes(1);
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

      expect(animateMock).toHaveBeenCalledTimes(1);
      expect(animateMock).toHaveBeenCalledWith(exitKeyframes, options);
      expect(finishMock).toHaveBeenCalled();
    });
  });

  describe('unmountOnExit', () => {
    it('unmounted when "visible" is "false"', () => {
      const TestPresence = createPresenceComponent(motion);
      const { queryByText } = render(
        <TestPresence visible={false} unmountOnExit>
          <div>ElementMock</div>
        </TestPresence>,
      );

      expect(queryByText('ElementMock')).toBe(null);
    });

    it('unmounts when state changes', async () => {
      const onMotionFinish = jest.fn();
      const onRender = jest.fn();

      const TestPresence = createPresenceComponent(motion);
      const { animateMock, finishMock, ElementMock } = createElementMock();

      const { rerender, queryByText } = render(
        <TestPresence onMotionFinish={onMotionFinish} visible unmountOnExit>
          <ElementMock onRender={onRender} />
        </TestPresence>,
      );

      expect(queryByText('ElementMock')).toBeTruthy();

      expect(animateMock).toHaveBeenCalledTimes(1);
      expect(animateMock).toHaveBeenCalledWith(enterKeyframes, options);
      expect(finishMock).toHaveBeenCalledTimes(1);

      expect(onMotionFinish).toHaveBeenCalledTimes(0);
      expect(onRender).toHaveBeenCalledTimes(1);

      // ---

      jest.clearAllMocks();

      await act(async () => {
        rerender(
          <TestPresence onMotionFinish={onMotionFinish} visible={false} unmountOnExit>
            <ElementMock onRender={onRender} />
          </TestPresence>,
        );
      });

      expect(queryByText('ElementMock')).toBe(null);

      expect(animateMock).toHaveBeenCalledTimes(1);
      expect(animateMock).toHaveBeenCalledWith(exitKeyframes, options);
      expect(finishMock).toHaveBeenCalledTimes(0);

      expect(onMotionFinish).toHaveBeenCalledTimes(1);
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

      expect(animateMock).toHaveBeenCalledTimes(1);
      expect(animateMock).toHaveBeenCalledWith(enterKeyframes, options);

      // Is called to apply initial styles
      expect(fnMotion).toHaveBeenCalledTimes(1);

      // ---

      jest.clearAllMocks();

      rerender(
        <TestPresence visible={false}>
          <ElementMock />
        </TestPresence>,
      );

      expect(fnMotion).toHaveBeenCalledTimes(1);
      expect(fnMotion).toHaveBeenCalledWith({ element: { animate: animateMock } /* mock of html element */ });

      expect(animateMock).toHaveBeenCalledTimes(1);
      expect(animateMock).toHaveBeenCalledWith(exitKeyframes, options);
    });
  });

  describe('.In static method', () => {
    it('references the enter motion object', () => {
      const TestPresence = createPresenceComponent(motion);
      const { animateMock, ElementMock } = createElementMock();

      render(
        <TestPresence.In>
          <ElementMock />
        </TestPresence.In>,
      );

      expect(animateMock).toHaveBeenCalledWith(enterKeyframes, options);
    });

    it('references the enter motion function', () => {
      const fnMotion = jest.fn().mockImplementation(() => motion);
      const TestPresence = createPresenceComponent(fnMotion);
      const { animateMock, ElementMock } = createElementMock();

      render(
        <TestPresence.In>
          <ElementMock />
        </TestPresence.In>,
      );

      expect(fnMotion).toHaveBeenCalledTimes(1);
      expect(fnMotion).toHaveBeenCalledWith({ element: { animate: animateMock } /* mock of html element */ });

      expect(animateMock).toHaveBeenCalledTimes(1);
      expect(animateMock).toHaveBeenCalledWith(enterKeyframes, options);
    });
  });

  describe('.Out static method', () => {
    it('references the exit motion object', () => {
      const TestPresence = createPresenceComponent(motion);
      const { animateMock, ElementMock } = createElementMock();

      render(
        <TestPresence.Out>
          <ElementMock />
        </TestPresence.Out>,
      );

      expect(animateMock).toHaveBeenCalledWith(exitKeyframes, options);
    });

    it('references the exit motion function', () => {
      const fnMotion = jest.fn().mockImplementation(() => motion);
      const TestPresence = createPresenceComponent(fnMotion);
      const { animateMock, ElementMock } = createElementMock();

      render(
        <TestPresence.Out>
          <ElementMock />
        </TestPresence.Out>,
      );

      expect(fnMotion).toHaveBeenCalledTimes(1);
      expect(fnMotion).toHaveBeenCalledWith({ element: { animate: animateMock } /* mock of html element */ });

      expect(animateMock).toHaveBeenCalledTimes(1);
      expect(animateMock).toHaveBeenCalledWith(exitKeyframes, options);
    });
  });
});

describe('PresenceGroupChildContext', () => {
  it('calls "onExit" when "visible" changes to "false"', async () => {
    const onExit = jest.fn();
    const TestPresence = createPresenceComponent(motion);
    const { ElementMock } = createElementMock();

    const Wrapper: React.FC<{ children: React.ReactNode; visible: boolean }> = ({ children, visible }) => (
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
