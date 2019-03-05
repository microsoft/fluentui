import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling';
import { IWizardProps } from './Wizard.types';

export interface ISetupWizardProps {
  /** pass-thru wizard props */
  wizardProps: IWizardProps;

  styles?: ISetupWizardStyles;

  theme?: ITheme;
}

export interface ISetupWizardTitleProps {
  title: string;
}

/** Styles for the wizard component */
export interface ISetupWizardStyles {
  wizardContainer: IStyle;

  titleSection: IStyle;

  actionBarSection: IStyle;
}

export interface ISetupWizardStyleProps {
  theme: ITheme;
}
