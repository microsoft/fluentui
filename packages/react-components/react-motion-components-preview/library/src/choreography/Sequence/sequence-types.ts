import * as React from 'react';

/**
 * Props for the Sequence component that manages sequential animations.
 */
export interface SequenceProps {
  /** React elements (motion components) to animate in sequence. */
  children: React.ReactNode;

  /**
   * Number of times to repeat the series sequence.
   * - A positive integer (e.g., 1, 2, 3) runs the series that many times
   * - Infinity loops the series indefinitely
   * Defaults to 1 (play once).
   */
  iterations?: EffectTiming['iterations'];

  /**
   * Props to be passed to all child components in the sequence.
   * Useful for applying common settings (e.g., duration, easing) to all children.
   */
  commonProps?: Record<string, unknown>;

  /** Callback invoked when the sequence completes (after all iterations). */
  onMotionFinish?: () => void;
}

/**
 * Props for the Hold/Scene component that pauses for a duration.
 */
export interface HoldProps {
  /** Duration in milliseconds to hold/pause before calling onMotionFinish. */
  duration: number;

  /** Content to display during the hold period. */
  children?: React.ReactNode;

  /** Callback invoked when the hold duration completes. */
  onMotionFinish?: () => void;
}
