import { IWizardStyles, IWizardStyleProps } from './Wizard.types';
import { keyframes } from 'office-ui-fabric-react';

export const subwayNavWidth = 303;
export const subwayNavPadding = 48;

const animationTimingFunction = 'cubic-bezier(0,.9,.2,1)';
const animationDuration = '1000ms';
const subStepAnimationDuration = '500ms';

const stepSlideUpIn = keyframes({
  from: { transform: 'translate3d(0,100px,0)' },
  to: { transform: 'translate3d(0,0,0)' }
});

const stepSlideLeftIn = keyframes({
  from: { transform: 'translate3d(100px,0,0)' },
  to: { transform: 'translate3d(0,0,0)' }
});

const fadeIn = keyframes({
  from: { opacity: 0.0 },
  to: { opacity: 1.0 }
});

export const getWizardStyles = (props: IWizardStyleProps): IWizardStyles => {
  let substepContentMotion: string = '';
  let fullContentMotion: string = '';

  if (props.isSubStep) {
    substepContentMotion = `${stepSlideLeftIn}, ${fadeIn}`;
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
      width: `${subwayNavWidth}px`,
      paddingLeft: `${subwayNavPadding}px`,
      paddingTop: `${subwayNavPadding}px`,
      paddingBottom: `${subwayNavPadding}px`,
      borderRight: `1px solid ${props.theme.semanticColors.bodyDivider}`,
      overflowY: 'auto'
    },
    contentSectionAnim: {
      animationName: fullContentMotion,
      animationDuration: animationDuration,
      animationTimingFunction: animationTimingFunction,
      flex: 1,
      paddingTop: `37px`,
      paddingLeft: `${subwayNavPadding}px`,
      overflow: 'hidden'
    },
    contentSection: {
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    },
    contentTitle: {},
    contentAnim: {
      animationName: substepContentMotion,
      animationDuration: subStepAnimationDuration,
      animationTimingFunction: animationTimingFunction,
      flex: 1,
      overflowX: 'hidden'
    },
    content: {
      overflowX: 'auto'
    }
  };
};
