import { AtomMotion } from '@fluentui/react-motion';
import type { MotionAtomProps } from './Atoms.types';

export const motionAtom = ({
  keyframes,
  fill = 'both',
  ...props
}: MotionAtomProps & { keyframes: Keyframe[] }): AtomMotion => ({
  keyframes,
  ...props,
});

export const opacityAtom = ({
  fromOpacity = 0,
  toOpacity = 1,
  ...props
}: { fromOpacity?: number; toOpacity?: number } & MotionAtomProps): AtomMotion =>
  motionAtom({
    keyframes: [{ opacity: fromOpacity }, { opacity: toOpacity }],
    ...props,
  });
