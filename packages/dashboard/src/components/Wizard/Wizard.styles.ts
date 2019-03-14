import { IWizardStyles, IWizardStyleProps } from './Wizard.types';
import { keyframes } from 'office-ui-fabric-react';

export const subwayNavWidth = 303;
export const subwayNavPadding = 48;
export const wizardAnimationDurationMilliSec = 1000;

const slideUpOutKeyframes = keyframes({
  '0%': {
    opacity: 0.75,
    transform: 'translateY(-100%)'
  },
  '50%': {
    opacity: 0.5,
    transform: 'translateY(-150%)'
  },
  '100%': {
    opacity: 0,
    transform: 'translateY(-200%)'
  }
});

const slideUpInKeyframes = keyframes({
  '0%': {
    opacity: 0
  },
  '50%': {
    opacity: 0
  },
  '75%': {
    opacity: 0.5,
    transform: 'translateY(50%)'
  },
  '100%': {
    opacity: 0.9,
    transform: 'translateY(0%)'
  }
});

const slideDownOutKeyframes = keyframes({
  '0%': {
    opacity: 0.75,
    transform: 'translateY(-100%)'
  },
  '50%': {
    opacity: 0.5,
    transform: 'translateY(-50%)'
  },
  '100%': {
    opacity: 0,
    transform: 'translateY(0%)'
  }
});

const slideDownInKeyframes = keyframes({
  '0%': {
    opacity: 0
  },
  '50%': {
    opacity: 0
  },
  '75%': {
    opacity: 0.5,
    transform: 'translateY(-150%)'
  },
  '100%': {
    opacity: 0.9,
    transform: 'translateY(0%)'
  }
});

export const getWizardStyles = (props: IWizardStyleProps): IWizardStyles => {
  return {
    wizardContentNavContainer: {
      display: 'flex',
      flexDirection: 'row',
      height: '100%'
    },
    subwayNavSection: {
      width: `${subwayNavWidth}px`,
      paddingLeft: `${subwayNavPadding}px`,
      paddingTop: `${subwayNavPadding}px`,
      paddingBottom: `${subwayNavPadding}px`,
      borderRight: `1px solid ${props.theme.semanticColors.bodyDivider}`,
      overflowY: 'auto'
    },
    contentAnimSection: {
      flex: 1,
      overflowY: 'auto'
    },
    contentSection: {
      flex: 1,
      paddingTop: `37px`,
      paddingLeft: `${subwayNavPadding}px`,
      paddingBottom: `${subwayNavPadding}px`,
      display: 'flex',
      flexDirection: 'column'
    },
    contentTitle: {},
    content: {
      flex: 1
    },

    stepSlideUpEnter: {
      opacity: 0.5,
      transform: 'translateY(50%)'
    },
    stepSlideUpEnterActive: {
      animation: slideUpInKeyframes,
      animationDuration: `${wizardAnimationDurationMilliSec}ms`,
      animationTimingFunction: 'ease-in'
    },
    stepSlideUpExit: {
      opacity: 0,
      transform: 'translateY(-100%)'
    },
    stepSlideUpExitActive: {
      animation: slideUpOutKeyframes,
      animationDuration: `${wizardAnimationDurationMilliSec}ms`,
      animationTimingFunction: 'ease-in-out'
    },
    stepSlideUpExitDone: {
      opacity: 0
    },
    stepSlideDownEnter: {
      opacity: 0.5,
      transform: 'translateY(-150%)'
    },
    stepSlideDownEnterActive: {
      opacity: 1,
      animation: slideDownInKeyframes,
      animationDuration: `${wizardAnimationDurationMilliSec}ms`,
      animationTimingFunction: 'ease-in'
    },
    stepSlideDownExit: {
      opacity: 0,
      transform: 'translateY(0%)'
    },
    stepSlideDownExitActive: {
      animation: slideDownOutKeyframes,
      animationDuration: `${wizardAnimationDurationMilliSec}ms`,
      animationTimingFunction: 'ease-in-out'
    },
    stepSlideDownExitDone: {
      opacity: 0
    }
  };
};
