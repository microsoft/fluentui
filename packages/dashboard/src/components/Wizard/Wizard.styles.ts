import { IWizardStyles } from './Wizard.types';

export const subwayNavWidthPx = 221;

export const getWizardStyles = (): IWizardStyles => {
  return {
    wizardContentNavContainer: {
      display: 'flex',
      flexDirection: 'row'
    },
    subwayNavSection: {
      width: `${subwayNavWidthPx}px`
    },
    contentSection: {},
    content: {
      margin: '20px'
    }
  };
};
