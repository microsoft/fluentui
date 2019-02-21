import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling';
import { IWizardProps } from './Wizard.types';
import { IPanelProps } from 'office-ui-fabric-react/lib/Panel';

export interface IPanelWizardProps {
  /** pass-thru fabric Panel props  */
  panelProps?: IPanelProps;

  /** pass-thru wizard props */
  wizardProps: IWizardProps;

  styles?: IPanelWizardStyles;

  theme?: ITheme;
}

/** Styles for the wizard component */
export interface IPanelWizardStyles {
  footerContainer: IStyle;
  titleElementContainer: IStyle;
}

export interface IPanelWizardStyleProps {
  theme: ITheme;
}
