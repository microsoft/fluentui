import { IWizardStyles, IWizardStyleProps } from './Wizard.types';

export const subwayNavWidthPx = 303;
export const subwayNavPaddingPx = 48;

export const getWizardStyles = (props: IWizardStyleProps): IWizardStyles => {
  return {
    wizardContentNavContainer: {
      display: 'flex',
      flexDirection: 'row',
      height: '100%'
    },
    subwayNavSection: {
      width: `${subwayNavWidthPx}px`,
      paddingLeft: `${subwayNavPaddingPx}px`,
      paddingTop: `${subwayNavPaddingPx}px`,
      paddingBottom: `${subwayNavPaddingPx}px`,
      borderRight: `1px solid ${props.theme.semanticColors.bodyDivider}`,
      overflowY: 'auto'
    },
    contentSection: {
      width: '100%',
      paddingTop: `37px`,
      paddingLeft: `${subwayNavPaddingPx}px`,
      paddingBottom: `${subwayNavPaddingPx}px`,
      overflowY: 'auto'
    },
    contentTitle: {},
    content: {}
  };
};
