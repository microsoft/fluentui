import type { PresenceDuration, PresenceEasing, AnimateOpacity } from '../../types';
import type { Axis3D } from '../../atoms/rotate-atom';

export type RotateParams = PresenceDuration &
  PresenceEasing &
  AnimateOpacity & {
    /**
     * The axis of rotation: 'x', 'y', or 'z'.
     * Defaults to 'y'.
     */
    axis?: Axis3D;

    /**
     * The starting rotation angle in degrees.
     * Defaults to -90.
     */
    enterAngle?: number;

    /**
     * The ending rotation angle in degrees.
     * Defaults to the negation of `enterAngle`.
     */
    exitAngle?: number;
  };
