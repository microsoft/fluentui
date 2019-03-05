import { IWizardStyles, IWizardStyleProps } from './Wizard.types';
import { keyframes } from 'office-ui-fabric-react';

export const subwayNavWidthPx = 303;
export const subwayNavPaddingPx = 48;

const animationDuration = '1000ms';

const stepSlideUpIn = keyframes({
  from: { transform: 'translate3d(0,400px,0)' },
  to: { transform: 'translate3d(0,0,0)' }
});

/*
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
  to: { transform: 'translate3d(-200px,0,0)' }
});

const fadeOut = keyframes({
  from: { opacity: '1.0' },
  to: { opacity: '0.0' }
});
*/

const fadeIn = keyframes({
  from: { opacity: 0.0 },
  to: { opacity: 1.0 }
});

export const getWizardStyles = (props: IWizardStyleProps): IWizardStyles => {
  // let substepTitleMotion: string  = '';
  // let contentAnimationDelay = '0ms';
  let substepContentMotion: string = '';
  let fullContentMotion: string = '';

  if (props.isSubStep) {
    substepContentMotion = `${stepSlideLeftIn}, ${fadeIn}`;

    if (props.isFirstSubStep) {
      // If first sub step, then first slide up the title, and then slide left the substep content
      /* substepTitleMotion = `${stepSlideUpIn}, ${fadeOut}, ${stepSlideUpOut}, ${fadeOut}`;
        contentAnimationDelay = animationDuration;
        substepTitleMotion = `${stepSlideUpIn}`; */
    }
  } else {
    fullContentMotion = `${stepSlideUpIn}, ${fadeIn}`;
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
      animationFillMode: 'forwards',
      width: '100%',
      paddingTop: `37px`,
      paddingLeft: `${subwayNavPaddingPx}px`,
      paddingBottom: `${subwayNavPaddingPx}px`,
      overflowY: 'auto'
    },
    contentTitle: {
      // animationName: substepTitleMotion,
      // animationDuration: animationDuration,
      // animationFillMode: 'forwards'
    },
    content: {
      animationName: substepContentMotion,
      animationDuration: animationDuration,
      animationFillMode: 'forwards'
      // animationDelay: contentAnimationDelay
    }
  };
};
