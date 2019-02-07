import { IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IAction } from '../Card/ActionBar/ActionBar.types';
import { IWizardProps } from './Wizard.types';

export interface ISetupWizardProps extends IWizardProps {
  wizardTitle?: ISetupWizardTitleProps;

  exitWizardAction: IAction;

  backClickAction: IAction;
}

export interface ISetupWizardTitleProps {
  title: string;
}

/** Styles for the wizard component */
export interface ISetupWizardStyles {
  wizardContainer: IStyle;

  titleSection: IStyle;

  title: IStyle;

  actionBarSection: IStyle;
}
