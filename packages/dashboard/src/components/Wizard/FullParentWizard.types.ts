import { IWizardProps, IWizardStyles } from './Wizard.types';
import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling';

export interface IFullParentWizardProps extends IWizardProps {
  styles?: IFullParentWizardStyles;

  theme?: ITheme;
}

export interface IFullParentWizardStyles extends IWizardStyles {
  headerContainer: IStyle;
  footerContainer: IStyle;
  parentContainer: IStyle;
}

export interface IFullParentWizardStyleProps {
  theme: ITheme;
}
