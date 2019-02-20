import { IStyle, IStyleFunctionOrObject, IIconRecord, IProcessedStyleSet } from 'office-ui-fabric-react';

export interface ISubwayNavNodeProps {
  /**
   * Unique ID for the given step
   */
  id: string;

  /**
   * Optional ID for the parent of the step.
   * to aid in data operations
   */
  parentId?: string;

  /**
   * Visual index used for animations
   */
  index?: number;

  /**
   * Label for the step.
   */
  label: string;

  /* State of the step */
  state: SubwayNavNodeState;

  /** Flag to indicate if step is disabled */
  disabled?: boolean;

  /**
   * Handler to be executed on click of a step
   */
  onClickStep?: (props: ISubwayNavNodeProps) => void;

  /**
   * Sub steps in the step
   */
  subSteps?: ISubwayNavNodeProps[];

  /**
   * Prop to that determines the type of step to render
   */
  isSubStep?: boolean;

  /**
   * Styles function or object that drives rendering of the step
   */
  styles?: IStyleFunctionOrObject<ISubwayNavNodeStyleProps, ISubwayNavNodeStyles>;

  /**
   * Optional custom icon record that can be passed into the control
   */
  iconRecord?: IIconRecord;

  /**
   * Optional render function for sub step focus zone and sub steps
   */
  onRenderSubSteps?: (props: ISubwayNavNodeProps, classNames: IProcessedStyleSet<ISubwayNavNodeStyles>) => JSX.Element | null;

  /**
   * Optional render function for the step's icon
   */
  onRenderStepIcon?: (
    props: ISubwayNavNodeProps,
    classNames: IProcessedStyleSet<ISubwayNavNodeStyles>,
    iconRecord: IIconRecord | undefined
  ) => JSX.Element;
}

/**
 * Possible states of a given step
 */
export const enum SubwayNavNodeState {
  NotStarted = 'NotStarted',
  Current = 'Current',
  CurrentWithSubSteps = 'CurrentWithSubSteps',
  Completed = 'Completed',
  ViewedNotCompleted = 'ViewedNotCompleted',
  Unsaved = 'Unsaved',
  Skipped = 'Skipped',
  Error = 'Error',
  WizardComplete = 'WizardComplete'
}

/**
 * Styles for the Subway Nav component
 */
export interface ISubwayNavNodeStyles {
  /**
   * Overall root of the node
   */
  root: IStyle;

  /**
   * The container within which each node is rendered
   */
  flexContainer: IStyle;

  /**
   * The container within which the icon for a node is rendered
   */
  iconContainer: IStyle;

  /**
   * The icon to render for a node
   */
  icon: IStyle;

  /**
   * The ring that is rendered over the icon
   */
  iconRing: IStyle;

  /**
   * Flex spacer that is used to help support RTL instead of margins
   */
  spacer: IStyle;

  /**
   * The label of the node in the normal state
   */
  label: IStyle;

  /**
   * The label of the node in the selected state
   */
  labelSelected: IStyle;

  /**
   * The container within which the substeps of the node are rendered
   */
  subStepContainer: IStyle;
}

/**
 * Props for style customizations
 */
export interface ISubwayNavNodeStyleProps {
  isSubStep: boolean;

  /**
   * Flag to indicate if step is disabled
   */
  disabled: boolean;

  /**
   *  State of the step
   */
  state: SubwayNavNodeState;

  /**
   * Icon record prop used in style merging
   */
  iconRecord: IIconRecord;

  /**
   * Prop to help determine what style of step to render
   */
  hasSubSteps: boolean;

  /**
   * A visual index used to determine animation timings
   */
  index: number;
}

export const IconNames = {
  FullCircleMask: 'FullCircleMask',
  CompletedSolid: 'CompletedSolid',
  StatusErrorFull: 'StatusErrorFull'
};

/**
 * Mapping that contains Icon definitions for each state
 */
export type IconMap = { [key in SubwayNavNodeState]: string | undefined };

/**
 * Mapping that contains Icon color definitions for each state
 */
export type IconColorMap = { [key in SubwayNavNodeState]: string };

/**
 * Mapping that contains Icon ring color definitions
 */
export type IconRingColorMap = { [key in SubwayNavNodeState]: string };
