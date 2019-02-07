import { ISetupWizardStyles } from './SetupWizard.types';

const regularFontSize = 14;
const regularLineHeight = 20;
const fontWeight = 300;
const commonFontFamily = 'Segoe UI';
const subwayNavBaseColor = '#333333';

export const getSetupWizardStyles = (): ISetupWizardStyles => {
  return {
    wizardContainer: {
      fontSize: regularFontSize,
      lineHeight: regularLineHeight,
      fontWeight: fontWeight,
      fontFamily: commonFontFamily,
      color: subwayNavBaseColor,
      display: 'flex',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      wordWrap: 'break-word'
    },
    titleSection: {
      border: '1px solid #E1DFDD',
      height: '75px',
      width: '100%'
    },
    title: {
      margin: '30px'
    },
    actionBarSection: {
      border: '1px solid #E1DFDD',
      height: '75px',
      width: '100%'
    }
  };
};
