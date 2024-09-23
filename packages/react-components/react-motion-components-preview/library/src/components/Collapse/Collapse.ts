import { motionTokens, type PresenceMotionFnCreator, createPresenceComponent } from '@fluentui/react-motion';

const { durationNormal, durationSlower, durationUltraFast, curveEasyEase, curveEasyEaseMax } = motionTokens;

export type CollapseOrientation = 'horizontal' | 'vertical';

/** Variant options are locked into the variant when its motion function is created. */
type CollapseVariantOptions = {
  /** Time (ms) for the size expand. Defaults to the durationNormal value (200 ms). */
  enterSizeDuration?: number;

  /** Time (ms) for the fade-in. Defaults to the enterSizeDuration param, to sync fade-in with expand. */
  enterOpacityDuration?: number;

  /** Time (ms) for the size collapse. Defaults to the enterSizeDuration param, for temporal symmetry.. */
  exitSizeDuration?: number;

  /** Defaults to the exitSizeDuration param, to sync the fade-out with the collapse. */
  exitOpacityDuration?: number;

  /** Time (ms) between the size expand start and the fade-in start. Defaults to `0`.  */
  enterDelay?: number;

  /** Time (ms) between the fade-out start and the size collapse start. Defaults to `0`.  */
  exitDelay?: number;

  /** Easing curve for the enter transition, shared by size and opacity. Defaults to the easeEaseMax value.  */
  enterEasing?: string;

  /** Easing curve for the exit transition, shared by size and opacity. Defaults to the enterEasing param. */
  exitEasing?: string;
};

/**
 * Runtime params allow values to be supplied when the motion function is called,
 * whereas variant options are locked when the motion function is created.
 *
 */
type CollapseRuntimeParams = {
  /** The orientation of the size animation. Defaults to `'vertical'`. */
  orientation?: CollapseOrientation;

  /** Whether to animate the opacity. Defaults to `true`. */
  animateOpacity?: boolean;

  /** Whether to collapse the margin. Defaults to `true`.  */
  collapseMargin?: boolean;

  /** Whether to collapse the padding. Defaults to `true`. */
  collapsePadding?: boolean;
};

/**
 * Creates a motion function for a collapse presence transition.
 * The motion function defines enter and exit transitions which can be applied to a DOM element,
 * governing size expansion along one dimension (width or height) and a fade.
 *
 * By default, the size and fade transitions start and end in sync,
 * but they can be given separate durations and/or have a delay between them.
 *
 * @param {options} - An object with options for variant customizing via the generated motion function.
 * @see type CollapseVariantOptions.
 *
 * - `enterSizeDuration` (optional): The duration of the size animation when entering. Defaults to `durationNormal`.
 * - `enterOpacityDuration` (optional): The duration of the opacity animation when entering. Defaults to `durationSlower`.
 * - `exitSizeDuration` (optional): The duration of the size animation when exiting. Defaults to `enterSizeDuration`.
 * - `exitOpacityDuration` (optional): The duration of the opacity animation when exiting. Defaults to `enterOpacityDuration`.
 * - `enterDelay` (optional): The delay before the enter animation starts. Defaults to `0`.
 * - `exitDelay` (optional): The delay before the exit animation starts. Defaults to `0`.
 * - `enterEasing` (optional): The easing function for the enter animation. Defaults to `curveEasyEase`.
 * - `exitEasing` (optional): The easing function for the exit animation. Defaults to `curveEasyEase`.
 *
 * @returns A motion function which will accept an options object at runtime, with the following properties:
 * - `element`: The element to animate.
 * - `orientation` (optional): The orientation of the size animation. Defaults to `'vertical'`.
 * - `animateOpacity` (optional): Whether to animate the opacity. Defaults to `true`.
 * - `collapseMargin` (optional): Whether to collapse the margin. Defaults to `true`.
 * - `collapsePadding` (optional): Whether to collapse the padding. Defaults to `true`.
 */
const createCollapsePresence: PresenceMotionFnCreator<CollapseVariantOptions, CollapseRuntimeParams> =
  ({
    // duration
    enterSizeDuration = durationNormal,
    enterOpacityDuration = enterSizeDuration,
    exitSizeDuration = enterSizeDuration,
    exitOpacityDuration = exitSizeDuration,
    // delay
    enterDelay = 0,
    exitDelay = 0,
    // easing
    enterEasing = curveEasyEaseMax,
    exitEasing = enterEasing,
  } = {}) =>
  ({ element, orientation = 'vertical', animateOpacity = true, collapseMargin = true, collapsePadding = true }) => {
    const fromOpacity = animateOpacity ? 0 : 1; // Possible future custom param, for fading in from a different opacity.
    const toOpacity = 1;

    // "size" is the width or height of the element, depending on the orientation.
    const fromSize = '0'; // Possible future custom param, for collapsing to a width or height.
    const measuredSize = orientation === 'horizontal' ? element.scrollWidth : element.scrollHeight;
    const toSize = `${measuredSize}px`;
    const sizeName = orientation === 'horizontal' ? 'maxWidth' : 'maxHeight';
    const overflowName = orientation === 'horizontal' ? 'overflowX' : 'overflowY';
    // const overflow = 'hidden';

    // Setting height to zero does not eliminate margin or padding, so allow collapsing those as well.
    // TODO: rename to be agnostic to orientation
    const collapsedWhiteSpace = {
      marginTop: collapseMargin ? 0 : undefined,
      marginBottom: collapseMargin ? 0 : undefined,
      paddingTop: collapsePadding ? 0 : undefined,
      paddingBottom: collapsePadding ? 0 : undefined,
    };

    return {
      // The enter transition is an array of 2 motion atoms: for size and for opacity.
      enter: [
        // Expand size (width or height).
        {
          keyframes: [
            {
              [sizeName]: fromSize,
              // opacity: fromOpacity,
              [overflowName]: 'hidden',
              ...collapsedWhiteSpace,
            },
            { [sizeName]: toSize, offset: 0.9999, [overflowName]: 'hidden' },
            { [sizeName]: 'unset', [overflowName]: 'unset' },
          ],
          duration: enterSizeDuration,
          easing: enterEasing,
        },
        // Fade in. If enterDelay > 0, this is after the size expand.
        {
          delay: enterDelay,
          keyframes: [{ opacity: fromOpacity }, { opacity: toOpacity }],
          duration: enterOpacityDuration,
          easing: enterEasing,
          fill: 'both',
        },
      ],

      // The enter transition is an array of 2 motion atoms: for size and for opacity.
      exit: [
        // Fade out first (if delay > 0)
        {
          keyframes: [
            { opacity: toOpacity /*, [overflowName]: 'hidden'*/ },
            { opacity: fromOpacity /*, [overflowName]: 'hidden'*/ },
          ],
          duration: exitOpacityDuration,
          easing: exitEasing,
        },
        // Collapse size (width or height). If exitDelay > 0, this is after the fade-out.
        {
          delay: exitDelay,
          keyframes: [
            { [sizeName]: toSize /*, [overflowName]: 'hidden'*/ },
            { [sizeName]: fromSize /*, [overflowName]: 'hidden'*/, ...collapsedWhiteSpace },
          ],
          duration: exitSizeDuration,
          easing: exitEasing,
          fill: 'both',
        },
      ],
    };
  };

/** A React component that applies collapse/expand transitions to its child content. */
export const Collapse = createPresenceComponent(createCollapsePresence());

export const CollapseSnappy = createPresenceComponent(
  createCollapsePresence({
    enterSizeDuration: durationUltraFast,
  }),
);

export const CollapseExaggerated = createPresenceComponent(
  createCollapsePresence({
    enterSizeDuration: durationSlower,
    enterOpacityDuration: durationNormal,
  }),
);

export const CollapseDelayed = createPresenceComponent(
  createCollapsePresence({
    enterSizeDuration: durationNormal,
    enterOpacityDuration: durationSlower,
    enterDelay: durationNormal,
    exitDelay: durationSlower,
    enterEasing: curveEasyEase,
  }),
);
