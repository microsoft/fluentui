import { PresenceComponentProps, PresenceDirection } from '@fluentui/react-motion';
import * as React from 'react';

/**
 * Defines how Stagger manages its children's visibility/mounting.
 * - 'visibleProp': Children are components with a `visible` prop (e.g. motion components)
 * - 'visibilityStyle': Children remain in DOM with inline style `visibility: hidden | visible`
 * - 'unmount': Children are mounted/unmounted from DOM based on visibility
 */
export type StaggerHideMode = 'visibleProp' | 'visibilityStyle' | 'unmount';

/**
 * Defines how Stagger implements the timing of staggered animations.
 * - 'timing': Manages visibility over time using JavaScript timing (current behavior)
 * - 'delayProp': Passes delay props to motion components to use native Web Animations API delays
 */
export type StaggerDelayMode = 'timing' | 'delayProp';

/**
 * Props for the Stagger component that manages staggered entrance and exit animations.
 */
export interface StaggerProps {
  /** React elements to animate. Elements are cloned with animation props. */
  children: React.ReactNode;

  /**
   * Controls children animation direction. When `true`, the group is animating "enter" (items shown).
   * When `false`, the group is animating "exit" (items hidden).
   */
  visible?: PresenceComponentProps['visible'];

  /** Whether to reverse the stagger sequence (last item animates first). Defaults to `false`. */
  reversed?: boolean;

  /**
   * Milliseconds between each child's animation start.
   * Defaults to the package's default delay (see `DEFAULT_ITEM_DELAY`).
   */
  itemDelay?: number;

  /**
   * Milliseconds each child's animation lasts. Only used with `delayMode="timing"`.
   * Defaults to the package's default duration (see `DEFAULT_ITEM_DURATION`).
   */
  itemDuration?: number;

  /** How children's visibility/mounting is managed. Auto-detects if not specified. */
  hideMode?: StaggerHideMode;

  /** How staggering timing is implemented. Defaults to 'timing'. */
  delayMode?: StaggerDelayMode;

  /** Callback invoked when the staggered animation sequence completes. */
  onMotionFinish?: () => void;
}

export interface StaggerOneWayProps extends Omit<StaggerProps, 'visible' | 'hideMode' | 'delayMode'> {
  /** Animation direction: 'enter' or 'exit'. */
  direction: PresenceDirection;

  /** How children's visibility/mounting is managed. Required - provided by wrapper components. */
  hideMode: StaggerHideMode;

  /** How staggering timing is implemented. Required - provided by wrapper components. */
  delayMode: StaggerDelayMode;
}
