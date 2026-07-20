import type { StateMotionAnimation } from '@fluentui/react-components';

type DragPresentationOptions = {
  offsetX: number;
  offsetY: number;
  rotation: number;
  boxShadow: string;
};

type DropAnimationOptions = Pick<StateMotionAnimation, 'duration'> & {
  destinationTransform: string;
  liftedShadow: string;
  settleOffset: number;
  settleEasing: string;
  dropEasing: string;
};

export const createDragPresentation = ({
  offsetX,
  offsetY,
  rotation,
  boxShadow,
}: DragPresentationOptions): Keyframe => ({
  translate: `${offsetX}px ${offsetY}px`,
  rotate: `${rotation}deg`,
  boxShadow,
});

export const createDropAnimation = (
  current: Keyframe,
  { destinationTransform, liftedShadow, duration, settleOffset, settleEasing, dropEasing }: DropAnimationOptions,
): StateMotionAnimation => ({
  keyframes: [
    { ...current, easing: settleEasing },
    {
      transform: destinationTransform,
      translate: '0px 0px',
      rotate: '0deg',
      boxShadow: liftedShadow,
      offset: settleOffset,
      easing: dropEasing,
    },
    { state: 'target' },
  ],
  duration,
  easing: 'linear',
});
