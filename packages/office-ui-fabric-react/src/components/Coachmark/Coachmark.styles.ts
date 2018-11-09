import { IStyle, keyframes, PulsingBeaconAnimationStyles, ITheme, getTheme } from '../../Styling';

export const COACHMARK_WIDTH = 32;
export const COACHMARK_HEIGHT = 32;

export interface ICoachmarkStyleProps {
  /**
   * Is the Coachmark collapsed.
   * Deprecated, use `isCollapsed` instead.
   * @deprecated Use `isCollapsed` instead.
   */
  collapsed?: boolean;

  /**
   * Is the Coachmark collapsed
   */
  isCollapsed: boolean;

  /**
   * Is the beacon currently animating.
   */
  isBeaconAnimating: boolean;

  /**
   * Is the component taking measurements
   */
  isMeasuring: boolean;

  /**
   * Is the Coachmark finished measuring the dimensions of innerHostElement
   */
  isMeasured: boolean;

  /**
   * The height measured before the component has been mounted
   * in pixels
   */
  entityHostHeight?: string;

  /**
   * The width measured in pixels
   */
  entityHostWidth?: string;

  /**
   * Width of the coachmark
   */
  width?: string;

  /**
   * Height of the coachmark
   */
  height?: string;

  /**
   * Color
   */
  color?: string;

  /**
   * Beacon color one
   */
  beaconColorOne?: string;

  /**
   * Beacon color two
   */
  beaconColorTwo?: string;

  /**
   * Transform origin for teaching bubble content
   */
  transformOrigin?: string;

  /**
   * Delay time for the animation to start
   */
  delayBeforeCoachmarkAnimation?: string;
}

export interface ICoachmarkStyles {
  /**
   * Style for the root element in the default enabled/unchecked state.
   */
  root?: IStyle;

  /**
   * The pulsing beacon that animates when the Coachmark is collapsed.
   */
  pulsingBeacon?: IStyle;

  /**
   * The layer, or div, that the translate animation will be applied to.
   */
  translateAnimationContainer?: IStyle;

  /**
   * The layer the Scale animation will be applied to.
   */
  scaleAnimationLayer?: IStyle;

  /**
   * The layer the Rotate animation will be applied to.
   */
  rotateAnimationLayer?: IStyle;

  /**
   * The layer that content/components/elments will be hosted in.
   */
  entityHost?: IStyle;

  /**
   * The inner layer that components will be hosted in
   * and primary purpose is scaling the layer down while the
   * Coachmark collapsed.
   */
  entityInnerHost: IStyle;

  /**
   * The layer that directly contains the TeachingBubbleContent
   */
  childrenContainer: IStyle;

  /**
   * The styles applied when the Coachmark has collapsed.
   */
  collapsed?: IStyle;

  /**
   * The styles applied to the ARIA attribute container
   */
  ariaContainer?: IStyle;
}

export const translateOne: string = keyframes({
  '0%': {
    transform: 'translate(0, 0)', // orig 25
    animationTimingFunction: 'linear'
  },
  '78.57%': {
    transform: 'translate(0, 0)', // orig 25
    animationTimingFunction: 'cubic-bezier(0.62, 0, 0.56, 1)'
  },
  '82.14%': {
    transform: 'translate(0, -5px)', // orig 20
    animationTimingFunction: 'cubic-bezier(0.58, 0, 0, 1)'
  },
  '84.88%': {
    transform: 'translate(0, 9px)', // 34
    animationTimingFunction: 'cubic-bezier(1, 0, 0.56, 1)'
  },
  '88.1%': {
    transform: 'translate(0, -2px)', // orig 23
    animationTimingFunction: 'cubic-bezier(0.58, 0, 0.67, 1)'
  },
  '90.12%': {
    transform: 'translate(0, 0)',
    animationTimingFunction: 'linear'
  },
  '100%': {
    transform: 'translate(0, 0)'
  }
});

export const scaleOne: string = keyframes({
  '0%': {
    transform: ' scale(0)',
    animationTimingFunction: 'linear'
  },
  '14.29%': {
    transform: 'scale(0)',
    animationTimingFunction: 'cubic-bezier(0.84, 0, 0.52, 0.99)'
  },
  '16.67%': {
    transform: 'scale(1.15)',
    animationTimingFunction: 'cubic-bezier(0.48, -0.01, 0.52, 1.01)'
  },
  '19.05%': {
    transform: 'scale(0.95)',
    animationTimingFunction: 'cubic-bezier(0.48, 0.02, 0.52, 0.98)'
  },
  '21.43%': {
    transform: 'scale(1)',
    animationTimingFunction: 'linear'
  },
  '42.86%': {
    transform: 'scale(1)',
    animationTimingFunction: 'cubic-bezier(0.48, -0.02, 0.52, 1.02)'
  },
  '45.71%': {
    transform: 'scale(0.8)',
    animationTimingFunction: 'cubic-bezier(0.48, 0.01, 0.52, 0.99)'
  },
  '50%': {
    transform: 'scale(1)',
    animationTimingFunction: 'linear'
  },
  '90.12%': {
    transform: 'scale(1)',
    animationTimingFunction: 'cubic-bezier(0.48, -0.02, 0.52, 1.02)'
  },
  '92.98%': {
    transform: 'scale(0.8)',
    animationTimingFunction: 'cubic-bezier(0.48, 0.01, 0.52, 0.99)'
  },
  '97.26%': {
    transform: 'scale(1)',
    animationTimingFunction: 'linear'
  },
  '100%': {
    transform: 'scale(1)'
  }
});

export const rotateOne: string = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
    animationTimingFunction: 'linear'
  },
  '83.33%': {
    transform: ' rotate(0deg)',
    animationTimingFunction: 'cubic-bezier(0.33, 0, 0.67, 1)'
  },
  '83.93%': {
    transform: 'rotate(15deg)',
    animationTimingFunction: 'cubic-bezier(0.33, 0, 0.67, 1)'
  },
  '84.52%': {
    transform: 'rotate(-15deg)',
    animationTimingFunction: 'cubic-bezier(0.33, 0, 0.67, 1)'
  },
  '85.12%': {
    transform: 'rotate(15deg)',
    animationTimingFunction: 'cubic-bezier(0.33, 0, 0.67, 1)'
  },
  '85.71%': {
    transform: 'rotate(-15deg)',
    animationTimingFunction: 'cubic-bezier(0.33, 0, 0.67, 1)'
  },
  '86.31%': {
    transform: 'rotate(0deg)',
    animationTimingFunction: 'linear'
  },
  '100%': {
    transform: 'rotate(0deg)'
  }
});

export function getStyles(props: ICoachmarkStyleProps, theme: ITheme = getTheme()): ICoachmarkStyles {
  const animationInnerDimension = '35px';
  const animationOuterDimension = '150px';
  const animationBorderWidth = '10px';

  const ContinuousPulse: string = PulsingBeaconAnimationStyles.continuousPulseAnimationDouble(
    props.beaconColorOne ? props.beaconColorOne : theme.palette.themePrimary,
    props.beaconColorTwo ? props.beaconColorTwo : theme.palette.themeTertiary,
    animationInnerDimension,
    animationOuterDimension,
    animationBorderWidth
  );

  const ContinuousPulseAnimation = PulsingBeaconAnimationStyles.createDefaultAnimation(
    ContinuousPulse,
    props.delayBeforeCoachmarkAnimation
  );

  return {
    root: [
      theme.fonts.medium,
      {
        position: 'relative'
      }
    ],
    pulsingBeacon: [
      {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '0px',
        height: '0px',
        borderRadius: '225px',
        borderStyle: 'solid',
        opacity: '0'
      },
      props.isCollapsed && props.isBeaconAnimating && ContinuousPulseAnimation
    ],
    // Translate Animation Layer
    translateAnimationContainer: [
      {
        width: '100%',
        height: '100%'
      },
      props.isCollapsed && {
        animationDuration: '14s',
        animationTimingFunction: 'linear',
        animationDirection: 'normal',
        animationIterationCount: '1',
        animationDelay: '0s',
        animationFillMode: 'forwards',
        animationName: translateOne,
        transition: 'opacity 0.5s ease-in-out'
      },
      !props.isCollapsed && {
        opacity: '1'
      }
    ],
    // Scale Animation Layer
    scaleAnimationLayer: [
      {
        width: '100%',
        height: '100%'
      },
      props.isCollapsed && {
        animationDuration: '14s',
        animationTimingFunction: 'linear',
        animationDirection: 'normal',
        animationIterationCount: '1',
        animationDelay: '0s',
        animationFillMode: 'forwards',
        animationName: scaleOne
      }
    ],
    // Rotate Animation Layer
    rotateAnimationLayer: [
      {
        width: '100%',
        height: '100%'
      },
      props.isCollapsed && {
        animationDuration: '14s',
        animationTimingFunction: 'linear',
        animationDirection: 'normal',
        animationIterationCount: '1',
        animationDelay: '0s',
        animationFillMode: 'forwards',
        animationName: rotateOne
      },
      !props.isCollapsed && {
        opacity: '1'
      }
    ],
    // Layer Host, defaults to collapsed
    entityHost: [
      {
        position: 'relative',
        outline: 'none',
        overflow: 'hidden',
        backgroundColor: props.color,
        borderRadius: COACHMARK_WIDTH,
        transition: 'border-radius 250ms, width 500ms, height 500ms cubic-bezier(0.5, 0, 0, 1)',
        visibility: 'hidden'
      },
      !props.isMeasuring && {
        width: COACHMARK_WIDTH,
        height: COACHMARK_HEIGHT,
        visibility: 'visible'
      },
      !props.isCollapsed && {
        borderRadius: '1px',
        opacity: '1',
        width: props.entityHostWidth,
        height: props.entityHostHeight
      }
    ],
    entityInnerHost: [
      {
        transition: 'transform 500ms cubic-bezier(0.5, 0, 0, 1)',
        transformOrigin: props.transformOrigin,
        transform: 'scale(0)'
      },
      !props.isCollapsed && {
        width: props.entityHostWidth,
        height: props.entityHostHeight,
        transform: 'scale(1)'
      },
      !props.isMeasuring && {
        visibility: 'visible'
      }
    ],
    childrenContainer: [
      {
        display: props.isMeasured && props.isCollapsed ? 'none' : 'block'
      }
    ],
    ariaContainer: {
      position: 'fixed',
      opacity: 0,
      height: 0,
      width: 0,
      pointerEvents: 'none'
    }
  };
}
