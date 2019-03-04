import { IWizardStyles, IWizardStyleProps } from './Wizard.types';

export const subwayNavWidthPx = 303;

export const subwayNavPaddingPx = 48;

export const getWizardStyles = (props: IWizardStyleProps): IWizardStyles => {
  return {
    wizardContentNavContainer: {
      display: 'flex',
      flexDirection: 'row'
    },
    subwayNavSection: {
      width: `${subwayNavWidthPx}px`,
      paddingLeft: `${subwayNavPaddingPx}px`,
      paddingTop: `${subwayNavPaddingPx}px`,
      paddingBottom: `${subwayNavPaddingPx}px`,
      borderRight: `1px solid ${props.theme.semanticColors.bodyDivider}`
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
