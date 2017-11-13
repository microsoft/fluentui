import { IStyle, keyframes } from '../../Styling';
import { memoizeFunction } from '../../Utilities';
import { mergeStyleSets } from '../../Styling';

export const themePrimary = '#0078d7';

export interface ICoachmarkStyleProps {
  /**
   * Is the Coachmark collapsed
   */
  isCollapsed: boolean;

  /**
   * Is the beacon currently animating.
   */
  isBeaconAnimating: boolean;
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
   * Coachmark isCollapsed.
   */
  entityInnerHost: string;

  /**
   * The styles applied when the coachmark has collapsed.
   */
  isCollapsed?: IStyle;
};


// @TODO remove this extra block once the updates to mergeStyles reach master
export interface ICoachmarkStylesNames {
  /**
  * Style for the root element in the default enabled/unchecked state.
  */
  root: string;

  /**
   * The pulsing beacon that animates when the coachmark
   * is collapsed.
   */
  pulsingBeacon: string;

  /**
   * The layer, or div, that the translate animation will be applied to.
   */
  translateAnimationContainer: string;

  /**
   * The layer the Scale animation will be applied to.
   */
  scaleAnimationLayer: string;

  /**
   * The layer the Rotate animation will be applied to.
   */
  rotateAnimationLayer: string;

  /**
   * The outer layer that content/components/elments will be hosted in
   * and primary purpose is to display a background color
   */
  entityHost: string;

  /**
   * The inner layer that components will be hosted in
   * and primary purpose is scaling the layer down while the
   * Coachmark isCollapsed.
   */
  entityInnerHost: string;

  /**
   * The styles applied when the coachmark has collapsed.
   */
  isCollapsed: string;
};

export const coachmarkCollapsedSize = '36px';
export const beaconColorOne = '#00FFEC';
export const beaconColorTwo = '#005EDD';

function continuousPulseStepOne() {
  return {
    borderColor: beaconColorOne,
    borderWidth: '0px',
    width: '35px',
    height: '35px'
  };
}

function continuousPulseStepTwo() {
  return {
    opacity: '1',
    borderWidth: '10px'
  };
}

function continuousPulseStepThree() {
  return {
    opacity: 1
  }
}

function continuousPulseStepFour() {
  return {
    borderWidth: '0',
    width: '150px',
    height: '150px',
    opacity: '0',
    borderColor: beaconColorTwo
  }
}

function continuousPulseStepFive() {
  return Object.assign(continuousPulseStepOne(), {
    opacity: '0'
  })
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
    transform: 'translate(0, 0)', //orig 25
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
    transform: 'translate(0, -2px)', //orig 23
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

export const getStyles = memoizeFunction((props: ICoachmarkStyleProps): ICoachmarkStylesNames => {
  return mergeStyleSets({
    root: [
      {
        position: 'relative'
      },
      props.isCollapsed && {
        borderRadius: coachmarkCollapsedSize,
        width: coachmarkCollapsedSize,
        height: coachmarkCollapsedSize
      },
      (!props.isCollapsed) && {
        borderRadius: '1px'
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
      (props.isCollapsed && props.isBeaconAnimating) && {
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
      props.isCollapsed && {
        animationDuration: '14s',
        animationTimingFunction: 'linear',
        animationDirection: 'normal',
        animationIterationCount: '1',
        animationDelay: '0s',
        animationFillMode: 'forwards',
        animationName: translateOne,
        opacity: '0.8',
        transition: 'opacity 0.5s ease-in-out'
      },
      (!props.isCollapsed) && {
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
      }
    ],
    // Layer Host
    entityHost: [
      {
        width: '100%',
        height: '100%',
        position: 'relative',
        outline: 'none',
        overflow: 'hidden',
        backgroundColor: themePrimary
      },
      props.isCollapsed && {
        borderRadius: coachmarkCollapsedSize
      },
      (!props.isCollapsed) && {
        borderRadius: '1px'
      }
    ],
    entityInnerHost: [
      {
        width: '100%',
        position: 'relative'
      }
    ]
  });
});