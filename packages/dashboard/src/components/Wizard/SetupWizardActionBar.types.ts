import { IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IWizardStepAction } from './Wizard.types';

export interface ISetupWizardActionBarStyles {
  root: IStyle;

  actionLink: IStyle;

  backAction: IStyle;

  exitAction: IStyle;

  mainAction: IStyle;
}

export interface ISetupWizardActionBarProps {
  backClickAction: IWizardStepAction;

  mainAction: IWizardStepAction;

  exitWizardAction: IWizardStepAction;
}
