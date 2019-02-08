import { IWizardStyles } from './Wizard.types';

export const getWizardStyles = (): IWizardStyles => {
  return {
    wizardContentNavContainer: {
      display: 'flex',
      flexDirection: 'row'
    },
    subwayNavSection: {
      width: '221px'
    },
    contentSection: {},
    content: {
      margin: '20px'
    }
  };
};
