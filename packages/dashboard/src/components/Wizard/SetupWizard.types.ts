import { IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IAction } from '../Card/ActionBar/ActionBar.types';
import { IWizardStepProps } from './Wizard.types';

export interface ISetupWizardProps {
  wizardTitle?: ISetupWizardTitleProps;

  wizardSteps: IWizardStepProps[];

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
