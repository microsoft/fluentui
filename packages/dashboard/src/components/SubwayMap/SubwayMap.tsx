import * as React from 'react';

import { classNamesFunction, css } from 'office-ui-fabric-react/lib/Utilities';
import { ISubwayMap, ISubwayMapProps, ISubwayMapStep, SubwayMapStepState, ISubwayMapStyles } from './SubwayMap.types';
import { Icon } from 'office-ui-fabric-react';
import { getSubwayMapStyles } from './SubwayMap.styles';

export interface ISubwayMapState {
  /** Steps to render. */
  stepStates?: SubwayMapStepState[];

  /** Current step index that the user is viewing */
  currentStepIndex: number;

  /** Current sub step index of the step that user is viewing */
  currentSubStepIndex: number;

  /** Number of steps enabled */
  enabledStepCount: number;
}

export interface IIconProps {
  iconName: string;

  iconClassName: string;
}

const getClassNames = classNamesFunction<ISubwayMapProps, ISubwayMapStyles>();
const classNames = getClassNames(getSubwayMapStyles!, {
  /*theme: theme!, */
});

/**
 * Component for Subway control
 */
export class SubwayMap extends React.Component<ISubwayMapProps, ISubwayMapState> implements ISubwayMap {
  constructor(props: ISubwayMapProps) {
    super(props);

    // Bind to event handlers
    this._onClickStep = this._onClickStep.bind(this);

    this.state = {
      stepStates: [],
      currentStepIndex: 0,
      currentSubStepIndex: 0,
      enabledStepCount: 1
    };
  }

  /**
   * Component did mount
   */
  public componentDidMount(): void {
    this._setInitState();
  }

  /**
   * Render the Subway map control
   */
  public render(): JSX.Element {
    let stepStatesCount = -1;
    if (this.state.stepStates !== undefined) {
      stepStatesCount = this.state.stepStates.length;
    }
    console.log('Number of step states: ' + stepStatesCount);

    const { steps /*theme, */ } = this.props;
    let stepElements: JSX.Element[] = [];

    let renderedSteps: JSX.Element[] = [];
    if (steps) {
      for (let stepIndex = 0, prevStepIndex = -1; stepIndex < steps.length; stepIndex++, prevStepIndex++) {
        renderedSteps = this._renderStep(stepIndex, prevStepIndex);
        stepElements = stepElements.concat(renderedSteps);
      }

      return (
        <div className={classNames.subwayMapContainer}>
          <div className={classNames.subwayMapContentContainer}>
            <div className={classNames.subwayMapContent}>{stepElements}</div>
          </div>
        </div>
      );
    } else {
      // Empty element
      return <React.Fragment />;
    }
  }

  /**
   * Render step of the subway map control
   *
   * @param currStep
   * @param prevStep
   * @param renderSubStep
   */
  private _renderStep(currStep: number, prevStep: number): JSX.Element[] {
    let stepElements: JSX.Element[] = [];
    const renderSubStep = this.state.currentStepIndex == currStep ? true : false;
    const iconProps = this._getIconPropsStep(currStep);

    const { steps } = this.props;

    if (steps !== undefined) {
      if (prevStep > -1) {
        stepElements.push(<div className={classNames.subwayMapStepConnector} key={'connector' + '-' + currStep} />);
      }

      stepElements.push(
        <div
          className={css(
            classNames.subwayMapStepDiv,
            this.props.allowSkipStep && currStep < this.state.enabledStepCount ? classNames.disableStep : undefined
          )}
          key={currStep}
          onClick={() => this._onClickStep(currStep)}
        >
          <Icon iconName={iconProps.iconName} className={css(iconProps.iconClassName, classNames.subwayMapStep)} />
          <span className={currStep === this.state.currentStepIndex ? classNames.boldStep : undefined}>{steps[currStep].label}</span>
        </div>
      );

      if (steps[currStep].subSteps && renderSubStep) {
        let subSteps = steps[currStep].subSteps;

        if (subSteps !== undefined) {
          for (let stepIndex = 0, prevStepIndex = -1; stepIndex < subSteps.length; stepIndex++, prevStepIndex++) {
            stepElements = stepElements.concat(this._renderSubStep(currStep, stepIndex, prevStepIndex));
          }
        }
      }
    }

    return stepElements;
  }

  /**
   * Render substeps of current step in subway map control
   *
   * @param currSubStep
   * @param prevSubStep
   */
  private _renderSubStep(currStepIdx: number, currSubStepIdx: number, prevSubStepIdx: number): JSX.Element[] {
    const stepElements: JSX.Element[] = [];
    const { steps } = this.props;
    let iconProps;

    if (prevSubStepIdx > -1) {
      // Add the connectiong line
    }

    if (steps !== undefined) {
      const currSubSteps = steps[currStepIdx].subSteps;

      if (currSubSteps !== undefined) {
        iconProps = this._getIconPropsStep(currSubStepIdx);

        stepElements.push(
          <div key={currStepIdx + '-' + currSubStepIdx}>
            <Icon iconName={iconProps.iconName} className={iconProps.iconClassName} />
            <span>{currSubSteps[currSubStepIdx].label}</span>
          </div>
        );
      }
    }
    return stepElements;
  }

  /**
   * Set initial states of all steps
   * First step is "Current" and all others are "NotStarted"
   * Set the current step index to 0
   */
  private _setInitState(): void {
    let initStates: SubwayMapStepState[] = [];
    let enabledStepCount = 1;

    if (this.props.steps) {
      this.props.steps.forEach((row: ISubwayMapStep, index: number) => {
        // Initial every step to "NotStarted" state
        initStates.push(SubwayMapStepState.NotStarted);
      });

      // First state would be "Current" as the user will view it when opened
      if (initStates.length > 0) {
        initStates[0] = SubwayMapStepState.Current;
      }

      if (this.props.allowSkipStep) {
        enabledStepCount = this.props.steps.length;
      }

      this.setState({ stepStates: initStates, currentStepIndex: 0, enabledStepCount: enabledStepCount });
    }
  }

  /**
   * Get the icon props for the given step
   * @param stepIdx
   */
  private _getIconPropsStep(stepIdx: number): IIconProps {
    let defaultProps = { iconName: 'LocationCircle', iconClassName: classNames.stepNotStarted };
    if (this.props.steps && this.state.stepStates) {
      if (this.props.steps[stepIdx].subSteps) {
        return { iconName: 'LocationCircle', iconClassName: classNames.stepNotStarted };
      }

      switch (this.state.stepStates[stepIdx]) {
        case SubwayMapStepState.NotStarted:
          return { iconName: 'LocationCircle', iconClassName: classNames.stepNotStarted };

        case SubwayMapStepState.Current:
          return { iconName: 'FullCircleMask', iconClassName: classNames.stepCurrent };

        case SubwayMapStepState.Completed:
          return { iconName: 'CompletedSolid', iconClassName: classNames.stepCompleted };

        case SubwayMapStepState.ViewedNotCompleted:
          return { iconName: 'FullCircleMask', iconClassName: classNames.stepViewedNotCompleted };

        case SubwayMapStepState.StepWithSubSteps:
          return { iconName: 'FullCircleMask', iconClassName: classNames.stepWithSubSteps };

        case SubwayMapStepState.Unsaved:
          return { iconName: 'LocationCircle', iconClassName: classNames.stepUnsaved };

        case SubwayMapStepState.Skipped:
          return { iconName: 'LocationCircle', iconClassName: classNames.stepSkipped };

        case SubwayMapStepState.Error:
          return { iconName: 'AlertSolid', iconClassName: classNames.stepError };

        case SubwayMapStepState.CompletedWizard:
          return { iconName: 'CompletedSolid', iconClassName: classNames.stepWizardComplete };

        case SubwayMapStepState.ErrorInSubstep:
          // TODO
          return { iconName: 'FullCircleMask', iconClassName: classNames.stepErrorInSubstep };

        default:
          return defaultProps;
      }
    }

    return defaultProps;
  }

  /**
   * On click of a step
   */
  private _onClickStep(clickedStepIdx: number): void {
    if (this.state.currentStepIndex === clickedStepIdx) {
      // Clicking the same step already on, do nothing
      return;
    }

    if (this.props.steps !== undefined) {
      let newStates = this.state.stepStates;

      if (newStates !== undefined) {
        newStates[this.state.currentStepIndex] = SubwayMapStepState.ViewedNotCompleted;

        if (this.props.steps[this.state.currentStepIndex].contentArea.formComplete) {
          newStates[this.state.currentStepIndex] = SubwayMapStepState.Completed;
        }

        if (this.props.steps[this.state.currentStepIndex].contentArea.formError) {
          newStates[this.state.currentStepIndex] = SubwayMapStepState.Error;
        }

        newStates[clickedStepIdx] = SubwayMapStepState.Current;
      }

      this.setState({ currentStepIndex: clickedStepIdx, stepStates: newStates });
    }
  }
}
