import { IWizardStyles, IWizardStyleProps } from './Wizard.types';

export const getWizardStyles = (props: IWizardStyleProps): IWizardStyles => {
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
      borderRight: `1px solid ${props.theme.semanticColors.bodyDivider}`
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
