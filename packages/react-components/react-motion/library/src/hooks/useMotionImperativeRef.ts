'use client';

import * as React from 'react';
import type { AnimationHandle, MotionImperativeRef } from '../types';

export function useMotionImperativeRef(
  imperativeRef: React.Ref<MotionImperativeRef | undefined> | undefined,
  callbacks?: {
    onPause?: () => void;
    onPlay?: (handle: AnimationHandle) => void;
  },
  // eslint-disable-next-line @typescript-eslint/no-deprecated
): React.MutableRefObject<AnimationHandle | undefined> {
  const animationRef = React.useRef<AnimationHandle | undefined>(undefined);

  React.useImperativeHandle(
    imperativeRef,
    () => ({
      setPlayState: state => {
        if (state === 'running') {
          const handle = animationRef.current;

          if (handle) {
            handle.play();
            callbacks?.onPlay?.(handle);
          }
        }

        if (state === 'paused') {
          animationRef.current?.pause();
          callbacks?.onPause?.();
        }
      },
      setPlaybackRate: rate => {
        if (animationRef.current) {
          animationRef.current.playbackRate = rate;
        }
      },
    }),
    [callbacks],
  );

  return animationRef;
}
