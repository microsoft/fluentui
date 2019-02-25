import { IFullParentWizardStyles, IFullParentWizardStyleProps } from './FullParentWizard.types';
import { getWizardStyles, subwayNavWidthPx } from './Wizard.styles';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

export const getFullParentWizardStyles = (props: IFullParentWizardStyleProps): IFullParentWizardStyles => {
  const defaultStyle = getWizardStyles();

  const styleOverride = <IFullParentWizardStyles>{
    wizardContentNavContainer: {
      height: '100%'
    },
    subwayNavSection: {
      borderRight: `1px solid ${props.theme.semanticColors.bodyDivider}`,
      paddingTop: '40px'
    },
    parentContainer: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    },
    headerContainer: {
      borderBottom: `1px solid ${props.theme.semanticColors.bodyDivider}`,
      padding: '10px 0 10px 5px'
    },
    footerContainer: {
      borderTop: `1px solid ${props.theme.semanticColors.bodyDivider}`,
      padding: `17px 48px 15px ${subwayNavWidthPx + 48}px`,
      display: 'flex',
      flexDirection: 'row'
    }
  };

  return mergeStyleSets(defaultStyle, styleOverride);
};
