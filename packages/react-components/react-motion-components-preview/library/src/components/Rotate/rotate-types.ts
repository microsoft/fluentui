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
     * Rotation angle before entry in degrees. Used by Rotate and Rotate.In.
     * Also supplies the default for `toAngle`. Defaults to -90.
     */
    fromAngle?: number;

    /**
     * Rotation angle at rest in degrees. Used as the entry destination and exit origin.
     * Defaults to 0.
     */
    restAngle?: number;

    /**
     * Rotation angle after exit in degrees. Used by Rotate and Rotate.Out.
     * Defaults to `fromAngle`.
     */
    toAngle?: number;
  };
