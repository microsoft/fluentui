/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import type { AtomMotion } from '@fluentui/react-motion';

/**
 * Collapse-specific test utilities for validating motion structure and behavior.
 * These utilities are meant to be used within Jest test files.
 */

export interface CollapseMotionCounts {
  enter: number;
  exit: number;
}

export interface CollapseTimingExpectations {
  enter: { size: number; whitespace: number; opacity?: number };
  exit: { opacity?: number; size: number; whitespace: number };
}

export interface CollapseDurationExpectations {
  enter: { size: number; whitespace: number; opacity?: number };
  exit: { opacity?: number; size: number; whitespace: number };
}

/**
 * Helper to validate the structure of a collapse motion object.
 * Returns validation data that can be used with Jest expectations.
 */
export function getCollapseMotionValidation(motion: { enter: AtomMotion[]; exit: AtomMotion[] }) {
  return {
    enterCount: motion.enter.length,
    exitCount: motion.exit.length,
    hasEnterOpacity: motion.enter.length === 3 && 'opacity' in (motion.enter[2].keyframes[0] || {}),
    hasExitOpacity: motion.exit.length === 3 && 'opacity' in (motion.exit[0].keyframes[0] || {}),
    enterStructure: motion.enter.map(atom => ({
      hasKeyframes: Array.isArray(atom.keyframes),
      hasDuration: typeof atom.duration === 'number',
      hasEasing: typeof atom.easing === 'string',
      hasDelay: typeof atom.delay === 'number',
    })),
    exitStructure: motion.exit.map(atom => ({
      hasKeyframes: Array.isArray(atom.keyframes),
      hasDuration: typeof atom.duration === 'number',
      hasEasing: typeof atom.easing === 'string',
      hasDelay: typeof atom.delay === 'number',
    })),
  };
}

/**
 * Helper to extract timing information from collapse motion atoms.
 */
export function getCollapseTimingInfo(
  motion: { enter: AtomMotion[]; exit: AtomMotion[] },
  animateOpacity: boolean = true,
) {
  const enterDelays = {
    size: motion.enter[0]?.delay ?? 0,
    whitespace: motion.enter[1]?.delay ?? 0,
    opacity: animateOpacity ? motion.enter[2]?.delay ?? 0 : undefined,
  };

  const exitDelays = animateOpacity
    ? {
        opacity: motion.exit[0]?.delay ?? 0,
        size: motion.exit[1]?.delay ?? 0,
        whitespace: motion.exit[2]?.delay ?? 0,
      }
    : {
        size: motion.exit[0]?.delay ?? 0,
        whitespace: motion.exit[1]?.delay ?? 0,
      };

  return { enter: enterDelays, exit: exitDelays };
}

/**
 * Helper to extract duration information from collapse motion atoms.
 */
export function getCollapseDurationInfo(
  motion: { enter: AtomMotion[]; exit: AtomMotion[] },
  animateOpacity: boolean = true,
) {
  const enterDurations = {
    size: motion.enter[0]?.duration ?? 0,
    whitespace: motion.enter[1]?.duration ?? 0,
    opacity: animateOpacity ? motion.enter[2]?.duration ?? 0 : undefined,
  };

  const exitDurations = animateOpacity
    ? {
        opacity: motion.exit[0]?.duration ?? 0,
        size: motion.exit[1]?.duration ?? 0,
        whitespace: motion.exit[2]?.duration ?? 0,
      }
    : {
        size: motion.exit[0]?.duration ?? 0,
        whitespace: motion.exit[1]?.duration ?? 0,
      };

  return { enter: enterDurations, exit: exitDurations };
}

/**
 * Helper to analyze orientation-specific properties in collapse atoms.
 */
export function getCollapseOrientationInfo(
  motion: { enter: AtomMotion[]; exit: AtomMotion[] },
  animateOpacity: boolean = true,
) {
  const enterSizeAtom = motion.enter[0];
  const enterWhitespaceAtom = motion.enter[1];

  const exitOffset = animateOpacity ? 1 : 0;
  const exitSizeAtom = motion.exit[exitOffset];
  const exitWhitespaceAtom = motion.exit[exitOffset + 1];

  return {
    enter: {
      sizeProperties: Object.keys(enterSizeAtom?.keyframes[0] || {}),
      whitespaceProperties: Object.keys(enterWhitespaceAtom?.keyframes[0] || {}),
    },
    exit: {
      sizeProperties: Object.keys(exitSizeAtom?.keyframes[0] || {}),
      whitespaceProperties: Object.keys(exitWhitespaceAtom?.keyframes[0] || {}),
    },
  };
}

/**
 * Helper to analyze size atom keyframes for validation.
 */
export function getSizeAtomInfo(sizeAtom: AtomMotion, direction: 'enter' | 'exit') {
  const keyframes = sizeAtom.keyframes;
  const properties = Object.keys(keyframes[0] || {});

  return {
    keyframeCount: keyframes.length,
    properties,
    hasOffset: direction === 'enter' ? 'offset' in (keyframes[1] || {}) : false,
    hasFill: 'fill' in sizeAtom,
    fillValue: sizeAtom.fill,
    firstFrameValues: keyframes[0] || {},
    lastFrameValues: keyframes[keyframes.length - 1] || {},
  };
}

/**
 * Helper to analyze whitespace atom keyframes for validation.
 */
export function getWhitespaceAtomInfo(whitespaceAtom: AtomMotion, direction: 'enter' | 'exit') {
  const keyframe = whitespaceAtom.keyframes[0] || {};

  return {
    properties: Object.keys(keyframe),
    offset: keyframe.offset,
    expectedOffset: direction === 'enter' ? 0 : 1,
    hasFill: 'fill' in whitespaceAtom,
    fillValue: whitespaceAtom.fill,
    isVertical: 'paddingBlockStart' in keyframe,
    isHorizontal: 'paddingInlineStart' in keyframe,
  };
}

/**
 * Helper to compare opacity handling between two motion objects.
 */
export function getOpacityComparisonInfo(
  withOpacity: { enter: AtomMotion[]; exit: AtomMotion[] },
  withoutOpacity: { enter: AtomMotion[]; exit: AtomMotion[] },
) {
  return {
    withOpacity: {
      enterCount: withOpacity.enter.length,
      exitCount: withOpacity.exit.length,
      hasEnterOpacity: withOpacity.enter.length === 3,
      hasExitOpacity: withOpacity.exit.length === 3,
    },
    withoutOpacity: {
      enterCount: withoutOpacity.enter.length,
      exitCount: withoutOpacity.exit.length,
      hasEnterOpacity: false,
      hasExitOpacity: false,
    },
  };
}
