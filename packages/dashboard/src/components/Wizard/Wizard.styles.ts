import { IWizardStyles } from './Wizard.types';

export const getWizardStyles = (): IWizardStyles => {
  return {
    wizardContentNavContainer: {
      height: '601px'
    },
    subwayNavSection: {
      height: '100%',
      width: '221px',
      float: 'left',
      border: '1px solid blue'
    },
    contentSection: {
      height: '100%',
      float: 'right',
      border: '1px solid blue'
    },
    content: {
      width: '100%',
      margin: '20px'
    }
  };
};
