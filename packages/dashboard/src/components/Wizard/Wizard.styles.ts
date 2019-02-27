import { IWizardStyles } from './Wizard.types';
import { NeutralColors } from '@uifabric/fluent-theme';

export const getWizardStyles = (): IWizardStyles => {
  return {
    wizardContentNavContainer: {
      display: 'flex',
      flexDirection: 'row'
    },
    subwayNavSection: {
      width: '303px',
      paddingLeft: '48px',
      paddingTop: '48px',
      paddingBottom: '48px',
      borderRight: `1px solid ${NeutralColors.gray40}`
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
