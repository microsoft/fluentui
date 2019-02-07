import { IWizardStyles } from './Wizard.types';

export const getWizardStyles = (): IWizardStyles => {
  return {
    wizardContentNavContainer: {
      height: '601px'
    },
    subwayNavSection: {
      height: '100%',
      width: '221px',
      float: 'left'
    },
    contentSection: {
      height: '100%',
      float: 'right'
    },
    content: {
      width: '100%',
      margin: '20px'
    }
  };
};
