import { IWizardStyles, IWizardStyleProps } from './Wizard.types';

export const subwayNavWidth = 303;
export const subwayNavPadding = 48;

export const getWizardStyles = (props: IWizardStyleProps): IWizardStyles => {
  return {
    wizardContentNavContainer: {
      display: 'flex',
      flexDirection: 'row',
      height: '100%'
    },
    subwayNavSection: {
      width: `${subwayNavWidth}px`,
      paddingLeft: `${subwayNavPadding}px`,
      paddingTop: `${subwayNavPadding}px`,
      paddingBottom: `${subwayNavPadding}px`,
      borderRight: `1px solid ${props.theme.semanticColors.bodyDivider}`,
      overflowY: 'auto'
    },
    contentSection: {
      flex: 1,
      paddingTop: `37px`,
      paddingLeft: `${subwayNavPadding}px`,
      paddingBottom: `${subwayNavPadding}px`,
      overflowY: 'auto'
    },
    contentTitle: {},
    content: {}
  };
};
