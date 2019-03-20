import { IWizardProps } from './Wizard.types';
import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling';

export interface IFullParentWizardProps {
  wizardProps: IWizardProps;

  styles?: IFullParentWizardStyles;

  theme?: ITheme;
}

export interface IFullParentWizardStyles {
  headerContainer: IStyle;

  footerContainer: IStyle;

  parentContainer: IStyle;
}

export interface IFullParentWizardStyleProps {
  theme: ITheme;
}
