import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import type { AnimationHandle, MotionImperativeRef } from '../types';
import { useMotionImperativeRef } from './useMotionImperativeRef';

describe('useMotionImperativeRef', () => {
  it('exposes methods to control motions on a passed ref', () => {
    const imperativeRef = React.createRef<MotionImperativeRef>();
    const { result } = renderHook(() => useMotionImperativeRef(imperativeRef));

    expect(result.current).toMatchObject({ current: undefined });
    expect(imperativeRef.current).toMatchObject({
      setPlayState: expect.any(Function),
      setPlaybackRate: expect.any(Function),
    });
  });

  it('exposed methods control a web animation', () => {
    const animationMock = {
      play: jest.fn(),
      pause: jest.fn(),
    } as Partial<AnimationHandle> as AnimationHandle;

    const setPlaybackRate = jest.fn();
    Object.defineProperty(animationMock, 'playbackRate', {
      set: setPlaybackRate,
    });

    const imperativeRef = React.createRef<MotionImperativeRef>();
    const { result } = renderHook(() => useMotionImperativeRef(imperativeRef));

    result.current.current = animationMock;

    imperativeRef.current?.setPlayState('running');
    expect(animationMock.play).toHaveBeenCalled();

    imperativeRef.current?.setPlayState('paused');
    expect(animationMock.pause).toHaveBeenCalled();

    imperativeRef.current?.setPlaybackRate(0.5);
    expect(setPlaybackRate).toHaveBeenCalledWith(0.5);
  });
});
