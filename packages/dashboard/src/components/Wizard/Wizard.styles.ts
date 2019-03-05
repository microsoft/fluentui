import { IWizardStyles, IWizardStyleProps } from './Wizard.types';
import { keyframes } from 'office-ui-fabric-react';

export const subwayNavWidthPx = 303;
export const subwayNavPaddingPx = 48;

const animationTimingFunction = 'cubic-bezier(0,.9,.2,1)';
const animationDuration = '1000ms';

/*
const stepSlideUpIn = keyframes({
  from: { transform: 'translate3d(0,200,0)' },
  to: { transform: 'translate3d(0,0,0)' }
});

const stepSlideUpOut = keyframes({
  from: { transform: 'translate3d(0,0,0)' },
  to: { transform: 'translate3d(0,-200px,0)' }
});
*/

const stepSlideLeftIn = keyframes({
  from: { transform: 'translate3d(400px,0,0)' },
  to: { transform: 'translate3d(0,0,0)' }
});

/*
  const stepSlideLeftOut = keyframes({
  from: { transform: 'translate3d(0,0,0)' },
  to: { transform: 'translate3d(-200,0,0)' }
});

const fadeIn = keyframes({
  from: { opacity: 0.0 },
  to: { opacity: 1.0 }
});

const fadeOut = keyframes({
  from: { opacity: '1.0' },
  to: { opacity: '0.0' }
});
*/

export const getWizardStyles = (props: IWizardStyleProps): IWizardStyles => {
  let substepTitleMotion: string | undefined = undefined;
  let substepContentMotion: string | undefined = undefined;
  let fullContentMotion: string | undefined = undefined;

  if (props.isSubStep) {
    // substepContentMotion = `${stepSlideLeftIn}, ${fadeIn}, ${stepSlideLeftOut}, ${fadeOut}`;
    substepContentMotion = `${stepSlideLeftIn}`;

    if (props.isFirstSubStep) {
      // substepTitleMotion = `${stepSlideUpIn}, ${fadeOut}, ${stepSlideUpOut}, ${fadeOut}`;
      substepTitleMotion = `${stepSlideLeftIn}`;
    }
  } else {
    // fullContentMotion = `${stepSlideUpIn}, ${fadeOut}`;
    fullContentMotion = `${stepSlideLeftIn}`;
  }

  return {
    wizardContentNavContainer: {
      display: 'flex',
      flexDirection: 'row',
      height: '100%'
    },
    subwayNavSection: {
      width: `${subwayNavWidthPx}px`,
      paddingLeft: `${subwayNavPaddingPx}px`,
      paddingTop: `${subwayNavPaddingPx}px`,
      paddingBottom: `${subwayNavPaddingPx}px`,
      borderRight: `1px solid ${props.theme.semanticColors.bodyDivider}`,
      overflowY: 'auto'
    },
    contentSection: {
      animationName: fullContentMotion,
      animationDuration: animationDuration,
      animationTimingFunction: animationTimingFunction,
      animationDelay: '0.2s',
      animationFillMode: 'both',
      width: '100%',
      paddingTop: `37px`,
      paddingLeft: `${subwayNavPaddingPx}px`,
      paddingBottom: `${subwayNavPaddingPx}px`,
      overflowY: 'auto'
    },
    contentTitle: {
      animationName: substepTitleMotion,
      animationDuration: animationDuration,
      animationTimingFunction: animationTimingFunction,
      animationDelay: '0.2s',
      animationFillMode: 'both'
    },
    content: {
      animationName: substepContentMotion,
      animationDuration: animationDuration,
      animationTimingFunction: animationTimingFunction,
      animationDelay: '0.2s',
      animationFillMode: 'both'
    }
  };
};
