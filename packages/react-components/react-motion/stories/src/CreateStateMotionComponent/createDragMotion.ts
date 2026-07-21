import type { StateMotionAnimation } from '@fluentui/react-components';

type DragPresentationOptions = {
  offsetX: number;
  offsetY: number;
  rotation: number;
  boxShadow: string;
};

type DragPresentationStyle = Pick<
  CSSStyleDeclaration,
  'translate' | 'rotate' | 'boxShadow' | 'setProperty' | 'getPropertyPriority'
>;

type DropAnimationOptions = Pick<StateMotionAnimation, 'duration'> & {
  destinationTransform: string;
  liftedShadow: string;
  settleOffset: number;
  settleEasing: string;
};

export const dropScaleEasing = 'cubic-bezier(.33, 2.632, .67, 1)';

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

export const applyDragPresentation = (style: DragPresentationStyle, options: DragPresentationOptions): void => {
  const presentation = createDragPresentation(options);
  style.setProperty('translate', String(presentation.translate), 'important');
  style.setProperty('rotate', String(presentation.rotate), 'important');
  style.boxShadow = String(presentation.boxShadow);
};

export const releaseDragPresentation = (style: DragPresentationStyle): void => {
  for (const property of ['translate', 'rotate'] as const) {
    if (style.getPropertyPriority(property) === 'important') {
      style.setProperty(property, style[property]);
    }
  }
};

export const createDropAnimation = (
  current: Keyframe,
  { destinationTransform, liftedShadow, duration, settleOffset, settleEasing }: DropAnimationOptions,
): StateMotionAnimation => ({
  keyframes: [
    { ...current, easing: settleEasing },
    {
      transform: destinationTransform,
      translate: '0px 0px',
      rotate: '0deg',
      boxShadow: liftedShadow,
      offset: settleOffset,
      easing: dropScaleEasing,
    },
    { state: 'target' },
  ],
  duration,
  easing: 'linear',
});
