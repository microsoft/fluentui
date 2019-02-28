import { IWizardStyles } from './Wizard.types';

export const subwayNavWidthPx = 303;

export const subwayNavPaddingPx = 48;

export const getWizardStyles = (): IWizardStyles => {
  return {
    wizardContentNavContainer: {
      display: 'flex',
      flexDirection: 'row'
    },
    subwayNavSection: {
      width: `${subwayNavWidthPx}px`,
      paddingLeft: `${subwayNavPaddingPx}px`,
      paddingTop: `${subwayNavPaddingPx}px`,
      paddingBottom: `${subwayNavPaddingPx}px`
    },
    contentSection: {
      paddingTop: `${subwayNavPaddingPx}px`
    },
    contentTitle: {},
    content: {
      marginLeft: '20px'
    }
  };
};
