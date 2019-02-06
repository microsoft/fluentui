import { IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IAction } from '../Card/ActionBar/ActionBar.types';
import { IWizardStepAction } from './Wizard.types';

export interface IWizardActionBarStyles {
  /**
   * Style set for the action bar component root
   */
  root: IStyle;

  actionLink: IStyle;

  backAction: IStyle;

  exitAction: IStyle;

  mainAction: IStyle;
}

export interface IWizardActionBarProps {
  backClickAction: IAction;

  processContentAction: IWizardStepAction;

  exitWizardAction: IAction;
}
