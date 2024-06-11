import * as React from 'react';
import type { AnimationHandle, MotionImperativeRef } from '../types';

export function useMotionImperativeRef(imperativeRef: React.Ref<MotionImperativeRef | undefined> | undefined) {
  const animationRef = React.useRef<AnimationHandle | undefined>();

  React.useImperativeHandle(imperativeRef, () => ({
    setPlayState: state => {
      if (state === 'running') {
        animationRef.current?.play();
      }

      if (state === 'paused') {
        animationRef.current?.pause();
      }
    },
    setPlaybackRate: rate => {
      if (animationRef.current) {
        animationRef.current.playbackRate = rate;
      }
    },
  }));

  return animationRef;
}
