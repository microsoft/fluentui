import { IWizardStyles, IWizardStyleProps } from './Wizard.types';
import {
  contentSlideUpOutAnimation,
  contentSlideUpInAnimation,
  contentSlideDownOutAnimation,
  contentSlideDownInAnimation
} from './Wizard.animation';

export const subwayNavWidth = 303;
export const subwayNavPadding = 48;

export const getWizardStyles = (props: IWizardStyleProps): IWizardStyles => {
  const retVal: IWizardStyles = {
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
    contentSectionContainer: {
      flex: 1,
      position: 'relative',
      overflow: 'hidden'
    },
    contentSection: {
      flex: 1,
      boxSizing: 'border-box',
      paddingTop: `37px`,
      paddingLeft: `${subwayNavPadding}px`,
      paddingBottom: `${subwayNavPadding}px`,
      flexDirection: 'column',
      position: 'absolute',
      overflowY: 'auto',
      height: '100%',
      top: 0
    },
    contentTitle: {},
    content: {},
    stepSlideUpEnter: {
      opacity: 0.1,
      transform: 'translateY(790px)'
    },
    stepSlideUpEnterActive: contentSlideUpInAnimation,
    stepSlideUpExit: {
      opacity: 1,
      transform: 'translateY(-790px)'
    },
    stepSlideUpExitActive: contentSlideUpOutAnimation,
    stepSlideDownEnter: {
      opacity: 0.1,
      transform: 'translateY(-480px)'
    },
    stepSlideDownEnterActive: contentSlideDownInAnimation,
    stepSlideDownExit: {
      opacity: 0,
      transform: 'translateY(0px)'
    },
    stepSlideDownExitActive: contentSlideDownOutAnimation
  };

  return retVal;
};
