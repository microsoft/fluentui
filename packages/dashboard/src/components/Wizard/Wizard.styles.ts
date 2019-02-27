import { IWizardStyles } from './Wizard.types';

export const getWizardStyles = (): IWizardStyles => {
  return {
    wizardContentNavContainer: {
      display: 'flex',
      flexDirection: 'row'
    },
    subwayNavSection: {
      width: '303px',
      marginLeft: '48px',
      marginTop: '48px',
      marginBottom: '48px'
    },
    contentSection: {
      marginTop: '48px'
    },
    contentTitle: {},
    content: {
      marginLeft: '20px'
    }
  };
};
