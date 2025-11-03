import type { BasePresenceParams, AnimateOpacity } from '../../types';

type Axis3D = 'x' | 'y' | 'z';

export type RotateParams = BasePresenceParams &
  AnimateOpacity & {
    /**
     * The axis of rotation: 'x', 'y', or 'z'.
     * Defaults to 'z'.
     */
    axis?: Axis3D;

    /**
     * The starting rotation angle in degrees.
     * Defaults to -90.
     */
    fromAngle?: number;

    /**
     * The ending rotation angle in degrees.
     * Defaults to 0.
     */
    toAngle?: number;
  };
