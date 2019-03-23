import { IFullPageWizardStyles, IFullPageWizardStyleProps } from './FullPageWizard.types';
import { subwayNavWidth, subwayNavPadding } from './Wizard.styles';
import { ITheme } from 'office-ui-fabric-react';
import { IWizardStyles } from './Wizard.types';

export const getFullPageWizardStyles = (props: IFullPageWizardStyleProps): IFullPageWizardStyles => {
  return {
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
      padding: `17px 48px 15px ${subwayNavWidth + subwayNavPadding + 48}px`,
      display: 'flex',
      flexDirection: 'row'
    }
  };
};

export const wizardStyleOverride = (theme: ITheme): Partial<IWizardStyles> => {
  return {
    wizardContentNavContainer: {
      height: '100%'
    },
    subwayNavSection: {
      borderRight: `1px solid ${theme.semanticColors.bodyDivider}`,
      paddingTop: '40px'
    }
  };
};
