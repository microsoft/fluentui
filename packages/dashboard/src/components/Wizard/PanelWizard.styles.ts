import { IPanelStyles, ITheme } from 'office-ui-fabric-react';
import { IWizardStyles } from './Wizard.types';
import { IPanelWizardStyles, IPanelWizardStyleProps } from './PanelWizard.types';

export const defaultPanelStyleSet = (theme: ITheme): Partial<IPanelStyles> => {
  return {
    content: {
      height: '100%',
      padding: 0,
      overflow: 'hidden'
    },
    commands: {
      display: 'flex',
      flexDirection: 'row',
      borderBottom: `1px solid ${theme.semanticColors.bodyDivider}`
    },
    scrollableContent: {
      overflowY: 'hidden'
    }
  };
};

export const defaultWizardStyleSet = (theme: ITheme): Partial<IWizardStyles> => {
  return {
    wizardContentNavContainer: {
      height: '100%'
    },
    subwayNavSection: {
      borderRight: `1px solid ${theme.semanticColors.bodyDivider}`
    }
  };
};
export const getPanelWizardStyles = (props: IPanelWizardStyleProps): IPanelWizardStyles => {
  return {
    footerContainer: {
      borderTop: `1px solid ${props.theme.semanticColors.bodyDivider}`,
      padding: `17px 48px 15px ${304 + 48}px`, // 304 is to offset width of subway nav
      display: 'flex',
      flexDirection: 'row'
    },
    titleElementContainer: {
      flex: '1 1 0%',
      padding: '11px 0 0 48px'
    }
  };
};
