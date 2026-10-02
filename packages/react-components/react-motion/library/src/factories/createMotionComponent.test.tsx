import { render, act } from '@testing-library/react';
import * as React from 'react';
import { useAncestorMotionState_unstable } from '@fluentui/react-shared-contexts';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';

import type { AtomMotion, MotionImperativeRef } from '../types';
import { createMotionComponent } from './createMotionComponent';
import { MotionBehaviourProvider } from '../contexts/MotionBehaviourContext';

const motion: AtomMotion = {
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  duration: 500,
};

function createElementMock() {
  const finishMock = jest.fn();
  let oncancel: Animation['oncancel'];
  let playState: AnimationPlayState = 'running';
  const cancelMock = jest.fn(() => {
    playState = 'idle';
    oncancel?.call({} as Animation, {} as AnimationPlaybackEvent);
  });
  const playMock = jest.fn(() => {
    playState = 'running';
  });
  const animateMock = jest.fn().mockImplementation(() => ({
    cancel: cancelMock,
    play: playMock,
    persist: jest.fn(),
    finish: finishMock,
    get playState() {
      return playState;
    },
    set onfinish(fn: () => void) {
      playState = 'finished';
      fn();
    },
    set oncancel(fn: Animation['oncancel']) {
      oncancel = fn;
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
    cancelMock,
    playMock,
    ElementMock,
    finishMock,
  };
}

function createControllableElementMock() {
  let onfinish: Animation['onfinish'];
  let oncancel: Animation['oncancel'];
  let playState: AnimationPlayState = 'running';
  const animation = {
    cancel: jest.fn(() => {
      playState = 'idle';
    }),
    finish: jest.fn(() => {
      playState = 'finished';
    }),
    pause: jest.fn(() => {
      playState = 'paused';
    }),
    play: jest.fn(() => {
      playState = 'running';
    }),
    persist: jest.fn(),
    get playState() {
      return playState;
    },
    set onfinish(callback: Animation['onfinish']) {
      onfinish = callback;
    },
    set oncancel(callback: Animation['oncancel']) {
      oncancel = callback;
    },
  } as Partial<Animation> as Animation;
  const ElementMock = React.forwardRef<{ animate: () => Animation }, { onChange: (active: boolean) => void }>(
    (props, ref) => {
      const motionState = useAncestorMotionState_unstable();

      React.useImperativeHandle(ref, () => ({
        animate: () => animation,
      }));
      useIsomorphicLayoutEffect(() => {
        const notify = () => props.onChange(motionState?.active ?? false);
        notify();
        motionState?.listeners.add(notify);
        return () => {
          motionState?.listeners.delete(notify);
        };
      }, [motionState, props]);

      return <div>ControllableElementMock</div>;
    },
  );

  return {
    animation,
    ElementMock,
    emitCancel: () => {
      playState = 'idle';
      oncancel?.call(animation, {} as AnimationPlaybackEvent);
    },
    emitFinish: () => {
      playState = 'finished';
      onfinish?.call(animation, {} as AnimationPlaybackEvent);
    },
  };
}

const MotionStateObserver = React.forwardRef<HTMLDivElement, { onChange: (active: boolean) => void }>((props, ref) => {
  const motionState = useAncestorMotionState_unstable();

  useIsomorphicLayoutEffect(() => {
    const notify = () => props.onChange(motionState?.active ?? false);
    notify();
    motionState?.listeners.add(notify);
    return () => {
      motionState?.listeners.delete(notify);
    };
  }, [motionState, props]);

  return <div ref={ref}>MotionStateObserver</div>;
});

describe('createMotionComponent', () => {
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
    });
  });

  it('creates a motion and plays it (without .persist())', () => {
    // @ts-expect-error mock
    delete global.Animation.prototype.persist;
    const TestAtom = createMotionComponent(motion);
    const { animateMock, ElementMock } = createElementMock();

    render(
      <TestAtom>
        <ElementMock />
      </TestAtom>,
    );

    expect(animateMock).toHaveBeenCalledWith(motion.keyframes, {
      duration: 500,
      fill: 'forwards',
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
    expect(fnMotion).toHaveBeenCalledWith({ element: { animate: animateMock } /* mock of html element */ });

    expect(animateMock).toHaveBeenCalledTimes(1);
  });

  it('calls onMotionStart and onMotionFinish', async () => {
    const fnMotion = jest.fn().mockImplementation(() => motion);
    const TestAtom = createMotionComponent(fnMotion);
    const onMotionStart = jest.fn();
    const onMotionFinish = jest.fn();

    const { ElementMock } = createElementMock();

    render(
      <TestAtom onMotionFinish={onMotionFinish} onMotionStart={onMotionStart}>
        <ElementMock />
      </TestAtom>,
    );

    await act(async () => {
      await new Promise<void>(process.nextTick);
    });

    expect(onMotionStart).toHaveBeenCalledTimes(1);
    expect(onMotionFinish).toHaveBeenCalledTimes(1);
  });

  it('publishes active motion until a skipped motion finishes', () => {
    const TestAtom = createMotionComponent(motion);
    const onChange = jest.fn();

    render(
      <MotionBehaviourProvider value="skip">
        <TestAtom>
          <MotionStateObserver onChange={onChange} />
        </TestAtom>
      </MotionBehaviourProvider>,
    );

    const transitions = onChange.mock.calls
      .map(([active]) => active)
      .filter((active, index, values) => index === 0 || active !== values[index - 1]);
    expect(transitions).toEqual([false, true, false]);
  });

  it('tracks imperative pause, resume, and replay after completion', () => {
    const TestAtom = createMotionComponent(motion);
    const imperativeRef = React.createRef<MotionImperativeRef>();
    const onChange = jest.fn();
    const { animation, ElementMock, emitFinish } = createControllableElementMock();

    render(
      <TestAtom imperativeRef={imperativeRef}>
        <ElementMock onChange={onChange} />
      </TestAtom>,
    );

    expect(onChange).toHaveBeenLastCalledWith(true);

    act(() => imperativeRef.current?.setPlayState('paused'));
    expect(animation.pause).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith(false);

    act(() => imperativeRef.current?.setPlayState('running'));
    expect(animation.play).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith(true);

    act(emitFinish);
    expect(onChange).toHaveBeenLastCalledWith(false);

    act(() => imperativeRef.current?.setPlayState('running'));
    expect(animation.play).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenLastCalledWith(true);

    act(emitFinish);
    expect(onChange).toHaveBeenLastCalledWith(false);
  });

  it('does not let a queued replay cancellation settle the new playback cycle', () => {
    const TestAtom = createMotionComponent(motion);
    const onChange = jest.fn();
    const onMotionCancel = jest.fn();
    const onMotionFinish = jest.fn();
    const onMotionStart = jest.fn();
    const { ElementMock, emitCancel, emitFinish } = createControllableElementMock();

    const { rerender } = render(
      <TestAtom
        replayKey="first"
        onMotionCancel={onMotionCancel}
        onMotionFinish={onMotionFinish}
        onMotionStart={onMotionStart}
      >
        <ElementMock onChange={onChange} />
      </TestAtom>,
    );

    rerender(
      <TestAtom
        replayKey="second"
        onMotionCancel={onMotionCancel}
        onMotionFinish={onMotionFinish}
        onMotionStart={onMotionStart}
      >
        <ElementMock onChange={onChange} />
      </TestAtom>,
    );

    expect(onMotionStart).toHaveBeenCalledTimes(1);

    act(emitCancel);

    expect(onMotionCancel).toHaveBeenCalledTimes(1);
    expect(onMotionStart).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenLastCalledWith(true);

    act(emitFinish);

    expect(onMotionFinish).toHaveBeenCalledTimes(1);
    expect(onMotionCancel).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith(false);
  });

  it('does not restart a pending replay after unmount', () => {
    const TestAtom = createMotionComponent(motion);
    const onMotionStart = jest.fn();
    const { animation, ElementMock, emitCancel } = createControllableElementMock();

    const { rerender, unmount } = render(
      <TestAtom replayKey="first" onMotionStart={onMotionStart}>
        <ElementMock onChange={jest.fn()} />
      </TestAtom>,
    );

    rerender(
      <TestAtom replayKey="second" onMotionStart={onMotionStart}>
        <ElementMock onChange={jest.fn()} />
      </TestAtom>,
    );
    unmount();

    act(emitCancel);

    expect(animation.play).not.toHaveBeenCalled();
    expect(onMotionStart).toHaveBeenCalledTimes(1);
  });

  it('replays animation when replayKey changes', () => {
    const TestAtom = createMotionComponent(motion);
    const { animateMock, cancelMock, playMock, ElementMock } = createElementMock();

    const { rerender } = render(
      <TestAtom replayKey="a">
        <ElementMock />
      </TestAtom>,
    );

    // element.animate() is called once on initial mount
    expect(animateMock).toHaveBeenCalledTimes(1);

    // Same replayKey — no replay
    rerender(
      <TestAtom replayKey="a">
        <ElementMock />
      </TestAtom>,
    );
    expect(animateMock).toHaveBeenCalledTimes(1);
    expect(cancelMock).not.toHaveBeenCalled();
    expect(playMock).not.toHaveBeenCalled();

    // Changed replayKey — imperatively cancel + replay on the existing handle
    rerender(
      <TestAtom replayKey="b">
        <ElementMock />
      </TestAtom>,
    );
    // element.animate() is NOT called again — no new Animation objects created
    expect(animateMock).toHaveBeenCalledTimes(1);
    expect(cancelMock).toHaveBeenCalledTimes(1);
    expect(playMock).toHaveBeenCalledTimes(1);
  });

  it('does not remount the child element when replayKey changes', () => {
    const TestAtom = createMotionComponent(motion);
    const { ElementMock } = createElementMock();
    let mountCount = 0;

    const TrackedChild = React.forwardRef<{ animate: () => void }, Record<string, never>>((_, ref) => {
      React.useEffect(() => {
        mountCount++;
      }, []);
      return <ElementMock ref={ref} />;
    });

    const { rerender } = render(
      <TestAtom replayKey="a">
        <TrackedChild />
      </TestAtom>,
    );

    expect(mountCount).toBe(1);

    rerender(
      <TestAtom replayKey="b">
        <TrackedChild />
      </TestAtom>,
    );

    expect(mountCount).toBe(1); // child was not remounted
  });

  it('fires onMotionStart and onMotionFinish again when replayKey changes', async () => {
    const TestAtom = createMotionComponent(motion);
    const onMotionStart = jest.fn();
    const onMotionFinish = jest.fn();
    const { ElementMock } = createElementMock();

    const { rerender } = render(
      <TestAtom replayKey="a" onMotionStart={onMotionStart} onMotionFinish={onMotionFinish}>
        <ElementMock />
      </TestAtom>,
    );

    await act(async () => {
      await new Promise<void>(process.nextTick);
    });

    expect(onMotionStart).toHaveBeenCalledTimes(1);
    expect(onMotionFinish).toHaveBeenCalledTimes(1);

    rerender(
      <TestAtom replayKey="b" onMotionStart={onMotionStart} onMotionFinish={onMotionFinish}>
        <ElementMock />
      </TestAtom>,
    );

    await act(async () => {
      await new Promise<void>(process.nextTick);
    });

    // onMotionStart and onMotionFinish fire again for the replayed animation
    expect(onMotionStart).toHaveBeenCalledTimes(2);
    expect(onMotionFinish).toHaveBeenCalledTimes(2);
  });

  it('finishes motion when wrapped in motion context with skip behaviour', async () => {
    const TestAtom = createMotionComponent(motion);
    const onMotionStart = jest.fn();
    const onMotionFinish = jest.fn();

    const { finishMock, ElementMock } = createElementMock();

    render(
      <TestAtom onMotionFinish={onMotionFinish} onMotionStart={onMotionStart}>
        <ElementMock />
      </TestAtom>,
      { wrapper: ({ children }) => <MotionBehaviourProvider value="skip">{children}</MotionBehaviourProvider> },
    );

    await act(async () => {
      await new Promise<void>(process.nextTick);
    });

    expect(onMotionStart).toHaveBeenCalledTimes(1);
    expect(onMotionFinish).toHaveBeenCalledTimes(1);
    expect(finishMock).toHaveBeenCalledTimes(1);
  });

  it('calls finish on replay when wrapped in motion context with skip behaviour', async () => {
    const TestAtom = createMotionComponent(motion);
    const { finishMock, ElementMock } = createElementMock();

    const { rerender } = render(
      <TestAtom replayKey="a">
        <ElementMock />
      </TestAtom>,
      { wrapper: ({ children }) => <MotionBehaviourProvider value="skip">{children}</MotionBehaviourProvider> },
    );

    await act(async () => {
      await new Promise<void>(process.nextTick);
    });

    expect(finishMock).toHaveBeenCalledTimes(1);

    rerender(
      <TestAtom replayKey="b">
        <ElementMock />
      </TestAtom>,
    );

    await act(async () => {
      await new Promise<void>(process.nextTick);
    });

    expect(finishMock).toHaveBeenCalledTimes(2);
  });

  it('does not replay on initial mount in StrictMode when replayKey is set', () => {
    const TestAtom = createMotionComponent(motion);
    const { animateMock, playMock, ElementMock } = createElementMock();

    render(
      <React.StrictMode>
        <TestAtom replayKey="a">
          <ElementMock />
        </TestAtom>
      </React.StrictMode>,
    );

    // React 18+ StrictMode invokes mount/cleanup/remount cycles in development; cleanup can call cancel().
    // React 17 StrictMode does not double-invoke effects, so cancel() may not be called at all.
    // play() is the reliable cross-version replay signal and must stay untouched on initial mount.
    expect(animateMock).toHaveBeenCalled();
    expect(playMock).not.toHaveBeenCalled();
  });
});
