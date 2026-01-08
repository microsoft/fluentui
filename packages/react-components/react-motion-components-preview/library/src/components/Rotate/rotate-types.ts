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
     * Rotation angle for the out state (exited) in degrees.
     * Defaults to -90.
     */
    outAngle?: number;

    /**
     * Rotation angle for the in state (entered) in degrees.
     * Defaults to 0.
     */
    inAngle?: number;
  };
