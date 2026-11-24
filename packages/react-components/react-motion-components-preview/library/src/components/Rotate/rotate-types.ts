import type { BasePresenceParams, AnimateOpacity } from '../../types';
import type { RotateAxis, RotatePose } from '../../atoms/rotate-atom';

export type RotateParams = BasePresenceParams &
  AnimateOpacity & {
    /**
     * The axis of rotation: 'x', 'y', or 'z'.
     * Defaults to 'z'.
     */
    axis?: RotateAxis;

    /** Rotation before entering, or the playback source on `.In`/`.Out`, in degrees. Defaults to -90 on the root and `.In`, or 0 on `.Out`. */
    fromAngle?: RotatePose;

    /** Rotation while present, in degrees. Defaults to 0. Only used by the root presence component. */
    inAngle?: RotatePose;

    /** Rotation after exiting, or the playback destination on `.In`/`.Out`, in degrees. Defaults to `fromAngle` on the root, 0 on `.In`, or -90 on `.Out`. */
    toAngle?: RotatePose;
  };
