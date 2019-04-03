import { IWizardProps } from './Wizard.types';
import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling';

export interface IFullPageWizardProps {
  wizardProps: IWizardProps;

  styles?: IFullPageWizardStyles;

  theme?: ITheme;

  title: string;
}

export interface IFullPageWizardStyles {
  headerContainer: IStyle;

  footerContainer: IStyle;

  parentContainer: IStyle;
}

export interface IFullPageWizardStyleProps {
  theme: ITheme;
}
