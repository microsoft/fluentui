import { IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IWizardProps, IWizardStepAction } from './Wizard.types';

export interface ISetupWizardProps extends IWizardProps {
  wizardTitle?: ISetupWizardTitleProps;

  exitWizardAction: IWizardStepAction;

  backClickAction: IWizardStepAction;
}

export interface ISetupWizardTitleProps {
  title: string;
}

/** Styles for the wizard component */
export interface ISetupWizardStyles {
  wizardContainer: IStyle;

  titleSection: IStyle;
}
