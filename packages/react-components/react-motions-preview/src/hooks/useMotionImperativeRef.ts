import * as React from 'react';
import type { MotionImperativeRef } from '../types';

export function useMotionImperativeRef(imperativeRef: React.Ref<MotionImperativeRef | undefined> | undefined) {
  const animationRef = React.useRef<Animation | undefined>();

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
