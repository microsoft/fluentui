import { IStyle } from 'office-ui-fabric-react/lib/Styling';

export interface ISubwayMapProps {
  /** Steps to render. */
  steps: ISubwayMapStep[];

  /** Wizard complete flag */
  wizardComplete?: boolean;

  /** Optional classname to append to root list. */
  className?: string;
}

export interface ISubwayMapStep {
  /**
   * Unique ID for the given step
   */
  key: string;

  /**
   * Label for the step.
   */
  label: string;

  /**
   * Flag to indicate if step is viewed
   */
  formViewed?: boolean;

  /**
   * Flag to indicate if current step
   */
  isCurrentStep?: boolean;

  /**
   * Flag to indicate if the form status is complete
   */
  formComplete?: boolean;

  /**
   * Flag to indicate if the form status is skipped
   */
  formSkipped?: boolean;

  /**
   * Flag to indicate if the form data is saved
   */
  formSaved?: boolean;

  /**
   * Flag to indicate if the form has errors
   */
  formError?: boolean;

  /**
   * Flag to indicate if the form status is complete so that "Next" button is enabled
   */
  skippedStep?: boolean;

  /**
   * Flag to indicate if step is disabled
   */
  isDisabledStep?: boolean;

  /**
   * Handler to be executed on click of a step
   */
  onClickStep: (step: ISubwayMapStep, subStep: ISubwayMapStep | undefined) => void;

  /**
   * Sub steps in the step
   */
  subSteps?: ISubwayMapStep[];
}

/**
 * Styles for the Subway map component
 */
export interface ISubwayMapStyles {
  /**
   * Styles for the Subway map container
   */
  subwayMapContainer: IStyle;

  /**
   * Styles for map content container
   */
  subwayMapContentContainer: IStyle;

  /**
   * Styles for map content
   */
  subwayMapContent: IStyle;

  /**
   * Styles for subway map step div
   */
  subwayMapStepDiv: IStyle;

  /**
   * Styles for subway step label
   */
  subwayMapStepLabel: IStyle;

  /**
   * Styles for subway step connector
   */
  subwayMapStepConnector: IStyle;

  /**
   * Styles for subway substep connector
   */
  subwayMapSubStepConnector: IStyle;

  /**
   * Styles for subway substep connector not started
   */
  stepConnectorNotStarted: IStyle;

  /**
   * Styles for subway substep connector completed
   */
  stepConnectorCompleted: IStyle;

  /**
   * Styles for subway substep connector wizard complete
   */
  stepConnectorWizardComplete: IStyle;

  /**
   * Styles for subway map step
   */
  subwayMapStepIcon: IStyle;

  /**
   * Styles for subway map sub step
   */
  subwayMapSubStepIcon: IStyle;

  /**
   * Styles for subway step label
   */
  stepLabel: IStyle;

  /**
   * Styles for subway substep label
   */
  subStepLabel: IStyle;

  /**
   * Styles for subway map step
   */
  boldStep: IStyle;

  /**
   * Styles for not started step icon
   */
  disableStep: IStyle;

  /**
   * Styles for not started step icon
   */
  stepNotStarted: IStyle;

  /**
   * Styles for current step icon
   */
  stepCurrent: IStyle;

  /**
   * Styles for completed step icon
   */
  stepCompleted: IStyle;

  /**
   * Styles for Viewed, Not completed step icon
   */
  stepViewedNotCompleted: IStyle;

  /**
   * Styles for Step with substeps icon
   */
  stepWithSubSteps: IStyle;

  /**
   * Styles for Unsaved step icon
   */
  stepUnsaved: IStyle;

  /**
   * Styles for Skipped step icon
   */
  stepSkipped: IStyle;

  /**
   * Styles for Error step icon
   */
  stepError: IStyle;

  /**
   * Styles for Completed wizard step icon
   */
  stepWizardComplete: IStyle;

  /**
   * Styles for substep not started icon
   */
  subStepNotStarted: IStyle;

  /**
   * Styles for substep current icon
   */
  subStepCurrent: IStyle;

  /**
   * Styles for substep completed icon
   */
  subStepCompleted: IStyle;

  /**
   * Styles for substep unsaved icon
   */
  subStepUnsaved: IStyle;

  /**
   * Styles for substep skipped icon
   */
  subStepSkipped: IStyle;

  /**
   * Styles for error in substep icon
   */
  subStepError: IStyle;
}

/**
 * Props for style customizations
 */
export interface ISubwayMapStyleProps {
  /**
   * Additional CSS class to apply to the SubwayMap.
   */
  className?: string;
}
