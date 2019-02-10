import { IStyle } from 'office-ui-fabric-react/lib/Styling';
import { ISubwayNavStep, SubwayNavStepState } from '../SubwayNav/SubwayNav.types';

export interface IWizardProps {
  // List of steps in the wizard
  steps: IWizardStepProps[];

  wizardComplete?: boolean;

  allowSkipAhead?: boolean;
}

export interface IWizardStepProps {
  key: string;

  label: string;

  state: SubwayNavStepState;

  disabled?: boolean;

  isSubStep?: boolean;

  onClickStep: (step: ISubwayNavStep, subStep: ISubwayNavStep | undefined) => void;

  wizardContent?: IWizardContentProps;

  subSteps?: IWizardStepProps[];
}

export interface IWizardContentProps {
  contentTitle?: string;

  content: JSX.Element;

  mainAction: IWizardStepAction;
}

export interface IWizardStepAction {
  // Defines the title of the button
  title: string;

  // Defines the function that is executed on clicking this action
  action: () => void;

  // Action is disabled or not
  disabled?: boolean;
}

export interface IWizardTitleProps {
  title: string;
}

// Possible states of content (or reuse SubwayNavStepState??)
export enum WizardContentState {
  NotStarted = 0,
  Completed = 1,
  Saved = 2,
  Error = 3
}

// Styles for the wizard component
export interface IWizardStyles {
  wizardContentNavContainer: IStyle;

  subwayNavSection: IStyle;

  contentSection: IStyle;

  content: IStyle;
}
