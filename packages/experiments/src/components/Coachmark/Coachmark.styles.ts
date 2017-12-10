import { IStyle, keyframes } from '../../Styling';
import { IRawStyleBase } from '@uifabric/merge-styles/lib/IRawStyleBase';

export const themePrimary = '#0078d7';

export interface ICoachmarkStyleProps {
  /**
   * Is the Coachmark collapsed
   */
  collapsed: boolean;

  /**
   * Is the beacon currently animating.
   */
  isBeaconAnimating: boolean;

  /**
   * Is the component taking measurements
   */
  isMeasuring: boolean;

  /**
   * The height measured before the component has been mounted
   * in pixels
   */
  entityHostHeight?: string;

  /**
   * The width measured in pixels
   */
  entityHostWidth?: string;
}

export interface ICoachmarkStyles {
  /**
  * Style for the root element in the default enabled/unchecked state.
  */
  root?: IStyle;

  /**
   * The pulsing beacon that animates when the coachmark
   * is collapsed.
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
   * The styles applied when the coachmark has collapsed.
   */
  collapsed?: IStyle;
}

export const coachmarkCollapsedSize = '36px';
export const beaconColorOne = '#00FFEC';
export const beaconColorTwo = '#005EDD';

function continuousPulseStepOne(): IRawStyleBase {
  return {
    borderColor: beaconColorOne,
    borderWidth: '0px',
    width: '35px',
    height: '35px'
  };
}

function continuousPulseStepTwo(): IRawStyleBase {
  return {
    opacity: '1',
    borderWidth: '10px'
  };
}

function continuousPulseStepThree(): IRawStyleBase {
  return {
    opacity: 1
  };
}

function continuousPulseStepFour(): IRawStyleBase {
  return {
    borderWidth: '0',
    width: '150px',
    height: '150px',
    opacity: '0',
    borderColor: beaconColorTwo
  };
}

function continuousPulseStepFive(): IRawStyleBase {
  return Object.assign(continuousPulseStepOne(), {
    opacity: '0'
  });
}

export const ContinuousPulse: string = keyframes({
  '0%': continuousPulseStepOne(),
  '1.42%': continuousPulseStepTwo(),
  '3.57%': continuousPulseStepThree(),
  '7.14%': continuousPulseStepFour(),
  '8%': continuousPulseStepFive(),
  '29.99%': continuousPulseStepFive(),
  '30%': continuousPulseStepOne(),
  '31.42%': continuousPulseStepTwo(),
  '33.57%': continuousPulseStepThree(),
  '37.14%': continuousPulseStepFour(),
  '38%': continuousPulseStepFive(),
  '79.42%': continuousPulseStepFive(),
  '79.43': continuousPulseStepOne(),
  '81.85': continuousPulseStepTwo(),
  '83.42': continuousPulseStepThree(),
  '87%': continuousPulseStepFour(),
  '100%': {}
});

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

export function getStyles(props: ICoachmarkStyleProps): ICoachmarkStyles {
  return {
    root: [
      {
        position: 'relative'
      }
    ],
    // The pulsing beacon
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
      (props.collapsed && props.isBeaconAnimating) && {
        animationName: ContinuousPulse,
        animationIterationCount: '1',
        animationDuration: '14s',
        zIndex: 1000,
        animationDelay: '2s'
      }
    ],
    // Translate Animation Layer
    translateAnimationContainer: [
      {
        width: '100%',
        height: '100%'
      },
      props.collapsed && {
        animationDuration: '14s',
        animationTimingFunction: 'linear',
        animationDirection: 'normal',
        animationIterationCount: '1',
        animationDelay: '0s',
        animationFillMode: 'forwards',
        animationName: translateOne,
        transition: 'opacity 0.5s ease-in-out'
      },
      (!props.collapsed) && {
        opacity: '1'
      }
    ],
    // Scale Animation Layer
    scaleAnimationLayer: [
      {
        width: '100%',
        height: '100%'
      },
      props.collapsed && {
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
      props.collapsed && {
        animationDuration: '14s',
        animationTimingFunction: 'linear',
        animationDirection: 'normal',
        animationIterationCount: '1',
        animationDelay: '0s',
        animationFillMode: 'forwards',
        animationName: rotateOne
      }
    ],
    // Layer Host, defaults to collapsed
    entityHost: [
      {
        position: 'relative',
        outline: 'none',
        overflow: 'hidden',
        backgroundColor: themePrimary,
        borderRadius: coachmarkCollapsedSize,
        opacity: '0.8',
        transition: 'border-radius 250ms, width 500ms, height 500ms cubic-bezier(0.5, 0, 0, 1)',
        visibility: 'hidden'
      },
      (!props.isMeasuring) && {
        width: coachmarkCollapsedSize,
        height: coachmarkCollapsedSize,
        visibility: 'visible'
      },
      !props.collapsed && {
        borderRadius: '1px',
        opacity: '1',
        width: props.entityHostWidth,
        height: props.entityHostHeight
      }
    ],
    entityInnerHost: [
      {
        transition: 'transform 500ms cubic-bezier(0.5, 0, 0, 1)',
        transformOrigin: 'top left',
        transform: 'scale(0)'
      },
      (!props.collapsed) && {
        transform: 'scale(1)'
      },
      (!props.isMeasuring) && {
        visibility: 'visible'
      }
    ]
  };
}