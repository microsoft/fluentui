import { IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IWizardStepAction, IWizardStepProps } from './Wizard.types';

export interface ISetupWizardActionBarStyles {
  root: IStyle;

  backAction: IStyle;

  exitAction: IStyle;

  mainAction: IStyle;
}

export interface ISetupWizardActionBarProps {
  backClickAction: IWizardStepAction;

  mainAction: IWizardStepAction;

  exitWizardAction: IWizardStepAction;

  currentStep: IWizardStepProps;
}
