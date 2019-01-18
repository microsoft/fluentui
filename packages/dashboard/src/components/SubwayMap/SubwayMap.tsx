import * as React from 'react';

import { classNamesFunction, css } from 'office-ui-fabric-react/lib/Utilities';
import { ISubwayMap, ISubwayMapProps, ISubwayMapStep, SubwayMapStepState, ISubwayMapStyles } from './SubwayMap.types';
import { Icon } from 'office-ui-fabric-react';
import { getSubwayMapStyles } from './SubwayMap.styles';

export interface ISubwayMapStepStateData {
  key?: string;

  state: SubwayMapStepState;

  subStepStateData?: ISubwayMapStepStateData[];
}

export interface ISubwayMapState {
  /** Steps data. */
  stepsData?: ISubwayMapStepStateData[];

  /** Current step index that the user is viewing */
  currentStepId?: string;

  /** Current sub step index of the step that user is viewing */
  currentSubStepId?: string;

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
    this._handleClickStep = this._handleClickStep.bind(this);
    this._handleClickSubStep = this._handleClickSubStep.bind(this);

    this.state = {
      stepsData: [],
      currentStepId: undefined,
      currentSubStepId: undefined,
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
    const { steps /*theme, */ } = this.props;
    let stepElements: JSX.Element[] = [];
    let renderedSteps: JSX.Element[] = [];

    if (steps) {
      for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
        renderedSteps = this._renderStep(steps[stepIndex].key, stepIndex === 0 ? undefined : steps[stepIndex - 1].key);
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
  private _renderStep(currStepId: string | undefined, prevStepId: string | undefined): JSX.Element[] {
    let stepElements: JSX.Element[] = [];
    const renderSubStep = this.state.currentStepId == currStepId ? true : false;
    const iconProps = this._getIconPropsStep(currStepId);

    const { steps } = this.props;

    if (steps !== undefined) {
      if (prevStepId !== undefined) {
        stepElements.push(<div className={classNames.subwayMapStepConnector} key={'connector' + '-' + currStepId} />);
      }

      const currStepObj = this._getStep(currStepId);

      if (currStepObj) {
        stepElements.push(
          <div
            key={currStepId}
            className={css(
              classNames.subwayMapStepDiv
              // TODO handle enabledStepCount
              // this.props.allowSkipStep && currStep < this.state.enabledStepCount ? classNames.disableStep : undefined
            )}
            onClick={() => this._handleClickStep(currStepId)}
          >
            <Icon iconName={iconProps.iconName} className={css(iconProps.iconClassName, classNames.subwayMapStep)} />
            <span className={currStepId === this.state.currentStepId ? classNames.boldStep : undefined}>{currStepObj!.label}</span>
          </div>
        );

        /** Render substeps if current step has substeps */
        let subStepElements: JSX.Element[] = [];
        if (renderSubStep && currStepObj!.subSteps) {
          stepElements.push(<div className={classNames.subwayMapStepConnector} key={'connector-sub' + '-' + currStepId} />);

          let subSteps = currStepObj.subSteps;
          let prevStep: ISubwayMapStep | undefined = undefined;

          if (subSteps !== undefined) {
            subSteps.forEach((subStep: ISubwayMapStep, index: number) => {
              subStepElements = subStepElements.concat(this._renderSubStep(currStepId, subStep.key, index > 0 ? prevStep!.key : undefined));
              prevStep = subStep;
            });

            stepElements = stepElements.concat(subStepElements);
          }
        }
      } // if currStepObject
    } // if steps !== undefined

    return stepElements;
  }

  /**
   * Render substeps of current step in subway map control
   *
   * @param currSubStep
   * @param prevSubStep
   */
  private _renderSubStep(
    currStepId: string | undefined,
    currSubStepId: string | undefined,
    prevSubStepId: string | undefined
  ): JSX.Element[] {
    const stepElements: JSX.Element[] = [];
    const { steps } = this.props;
    let iconProps;

    if (steps !== undefined) {
      const currStep = this._getStep(currStepId);

      if (currStep !== undefined) {
        const currSubSteps = currStep.subSteps;

        if (currSubSteps !== undefined && currSubSteps.length > 0) {
          // Add the connectiong line
          if (prevSubStepId !== undefined) {
            stepElements.push(
              <div
                className={classNames.subwayMapSubStepConnector}
                key={'connector' + '-' + currSubStepId}
                onClick={() => this._handleClickSubStep(currStepId, currSubStepId)}
              />
            );
          }

          iconProps = this._getIconPropsSubStep(currStepId, currSubStepId);
          const currSubStep = this._getSubStep(currStepId, currSubStepId);

          if (currSubStep !== undefined) {
            stepElements.push(
              <div key={currSubStepId} className={css(classNames.subwayMapStepDiv)}>
                <Icon iconName={iconProps.iconName} className={css(iconProps.iconClassName, classNames.subwayMapSubStep)} />
                <span className={currSubStep.key === this.state.currentSubStepId ? classNames.boldStep : undefined}>
                  {currSubStep.label}
                </span>
              </div>
            );
          }
        }
      } // currStep !== undefined
    } // steps !== undefined
    return stepElements;
  }

  /**
   * Set initial states of all steps
   * First step is "Current" and all others are "NotStarted"
   * Set the current step index to 0
   */
  private _setInitState(): void {
    let initStateData: ISubwayMapStepStateData[] = [];
    let enabledStepCount = 1;
    let currentStepId: string | undefined;
    let currentSubStepId: string | undefined;

    if (this.props.steps) {
      this.props.steps.forEach((subwayStep: ISubwayMapStep, index: number) => {
        // Initial every step to "NotStarted" state
        initStateData.push({
          key: subwayStep.key,
          state: SubwayMapStepState.NotStarted,
          subStepStateData: this._getInitSubStepState(subwayStep)
        });
      });

      // First state would be "Current" as the user will view it when opened
      if (initStateData.length > 0) {
        initStateData[0].state = SubwayMapStepState.Current;
        currentStepId = this.props.steps[0].key;

        const subStepData = initStateData[0].subStepStateData;
        if (subStepData !== undefined && subStepData.length > 0) {
          currentSubStepId = subStepData[0].key;
        }
      }

      if (this.props.allowSkipStep) {
        enabledStepCount = this.props.steps.length;
      }

      this.setState({
        stepsData: initStateData,
        currentStepId: currentStepId,
        currentSubStepId: currentSubStepId,
        enabledStepCount: enabledStepCount
      });
    }
  }

  /**
   * Get the initial sub step state.  All sub step states are "NotStarted", except for first one is "Current"
   * @param step
   */
  private _getInitSubStepState(step: ISubwayMapStep): ISubwayMapStepStateData[] {
    let subStepStateData: ISubwayMapStepStateData[] = [];
    if (step.subSteps && step.subSteps.length > 0) {
      step.subSteps.forEach(subStep => {
        subStepStateData.push({ key: subStep.key, state: SubwayMapStepState.NotStartedSubStep, subStepStateData: undefined });
      });

      subStepStateData[0].state = SubwayMapStepState.CurrentSubStep;
      subStepStateData[0].key = step.subSteps[0].key;
    }

    return subStepStateData;
  }

  /**
   * Get the icon props for the given step
   * @param stepIdx
   */
  private _getIconPropsStep(stepId: string | undefined): IIconProps {
    let defaultProps = { iconName: 'LocationCircle', iconClassName: classNames.stepNotStarted };

    const stepData = this._getStepData(stepId);

    //if (this.props.steps /*&& this.state.stepStates */ && this.state.stepsData && this.state.stepsData.length > 0) {
    if (stepData !== undefined) {
      if (stepData.subStepStateData!.length > 0) {
        return { iconName: 'FullCircleMask', iconClassName: classNames.stepWithSubSteps };
      }

      switch (stepData.state) {
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

        case SubwayMapStepState.NotStartedSubStep:
          return { iconName: 'LocationCircle', iconClassName: classNames.subStepNotStarted };

        case SubwayMapStepState.CurrentSubStep:
          return { iconName: 'FullCircleMask', iconClassName: classNames.subStepCurrent };

        case SubwayMapStepState.CompletedSubStep:
          return { iconName: 'FullCircleMask', iconClassName: classNames.subStepCompleted };

        case SubwayMapStepState.UnsavedSubStep:
          return { iconName: 'LocationCircle', iconClassName: classNames.subStepUnsaved };

        case SubwayMapStepState.SkippedSubStep:
          return { iconName: 'LocationCircle', iconClassName: classNames.subStepSkipped };

        case SubwayMapStepState.ErrorSubstep:
          return { iconName: 'FullCircleMask', iconClassName: classNames.subStepError };

        default:
          return defaultProps;
      }
    }

    return defaultProps;
  }

  /**
   * Get the icon props for the given step
   * @param stepIdx
   */
  private _getIconPropsSubStep(stepId: string | undefined, subStepId: string | undefined): IIconProps {
    let defaultProps = { iconName: 'LocationCircle', iconClassName: classNames.stepNotStarted };

    const subStep = this._getSubStepData(stepId, subStepId);

    if (subStep !== undefined) {
      switch (subStep.state) {
        case SubwayMapStepState.NotStartedSubStep:
          return { iconName: 'LocationCircle', iconClassName: classNames.subStepNotStarted };

        case SubwayMapStepState.CurrentSubStep:
          return { iconName: 'FullCircleMask', iconClassName: classNames.subStepCurrent };

        case SubwayMapStepState.CompletedSubStep:
          return { iconName: 'FullCircleMask', iconClassName: classNames.subStepCompleted };

        case SubwayMapStepState.UnsavedSubStep:
          return { iconName: 'LocationCircle', iconClassName: classNames.subStepUnsaved };

        case SubwayMapStepState.SkippedSubStep:
          return { iconName: 'LocationCircle', iconClassName: classNames.subStepSkipped };

        case SubwayMapStepState.ErrorSubstep:
          return { iconName: 'FullCircleMask', iconClassName: classNames.subStepError };

        default:
          return defaultProps;
      }
    }

    return defaultProps;
  }

  /**
   * Get the step with given id
   */
  private _getStep(stepId: string | undefined): ISubwayMapStep | undefined {
    const { steps } = this.props;
    let returnSteps: ISubwayMapStep[];

    if (steps !== undefined) {
      returnSteps = steps.filter(step => step.key === stepId);

      if (returnSteps !== undefined && returnSteps.length > 0) {
        return returnSteps[0];
      }
    }

    return undefined;
  }

  /**
   * Get the substep with given id
   */
  private _getSubStep(stepId: string | undefined, subStepId: string | undefined): ISubwayMapStep | undefined {
    const { steps } = this.props;
    let returnSteps: ISubwayMapStep[];

    if (steps !== undefined) {
      /** Get the given Step */
      returnSteps = steps.filter(step => step.key === stepId);

      /**  If substeps are present in the step, find and return the substep with given id */
      if (returnSteps !== undefined && returnSteps.length > 0) {
        const subSteps = returnSteps[0].subSteps;
        if (subSteps !== undefined) {
          returnSteps = subSteps.filter(subStep => subStep.key === subStepId);
        }
      }

      if (returnSteps !== undefined && returnSteps.length > 0) {
        return returnSteps[0];
      }
    }

    return undefined;
  }

  /**
   * Get the step with given id
   */
  private _getStepData(stepId: string | undefined): ISubwayMapStepStateData | undefined {
    let returnStepData: ISubwayMapStepStateData[];

    if (this.state.stepsData !== undefined) {
      returnStepData = this.state.stepsData.filter(state => state.key === stepId);

      if (returnStepData !== undefined && returnStepData.length > 0) {
        return returnStepData[0];
      }
    }

    return undefined;
  }

  /**
   * Get the substep with given id
   */
  private _getSubStepData(stepId: string | undefined, subStepId: string | undefined): ISubwayMapStepStateData | undefined {
    let returnStepData: ISubwayMapStepStateData[];

    if (this.state.stepsData !== undefined) {
      returnStepData = this.state.stepsData.filter(state => state.key === stepId);

      /**  If substeps are present in the step, find and return the substep with given id */
      if (returnStepData !== undefined && returnStepData.length > 0) {
        const subStepsData = returnStepData[0].subStepStateData;
        if (subStepsData !== undefined) {
          returnStepData = subStepsData.filter(subStepData => subStepData.key === subStepId);
        }
      }

      if (returnStepData !== undefined && returnStepData.length > 0) {
        return returnStepData[0];
      }
    }

    return undefined;
  }

  /**
   * On click of a step
   */
  private _handleClickStep(clickedStepId: string | undefined): void {
    if (this.state.currentStepId === clickedStepId) {
      // Clicking the same step already on, do nothing
      return;
    }

    const { steps } = this.props;

    if (steps !== undefined) {
      let newStatesData = this.state.stepsData;
      let currentStepData = this._getStepData(this.state.currentStepId);
      let currentStep = this._getStep(this.state.currentStepId);

      if (newStatesData !== undefined) {
        if (currentStepData !== undefined) {
          currentStepData.state = SubwayMapStepState.ViewedNotCompleted;
          // newStatesData[this.state.currentStepIndex].state = SubwayMapStepState.ViewedNotCompleted;

          if (currentStep!.contentArea.formComplete) {
            currentStepData.state = SubwayMapStepState.Completed;
          }

          if (currentStep!.contentArea.formError) {
            currentStepData.state = SubwayMapStepState.Error;
          }

          const currentObjIdx = newStatesData.findIndex(obj => obj.key === this.state.currentStepId);
          newStatesData[currentObjIdx] = currentStepData;

          const clickedObjIdx = newStatesData.findIndex(obj => obj.key === clickedStepId);
          newStatesData[clickedObjIdx].state = SubwayMapStepState.Current;
        }

        this.setState({ currentStepId: clickedStepId, stepsData: newStatesData });

        /**
         * If the new step clicked has Sub steps, then first substep state should be current
         */
        const clickedStep = this._getStep(clickedStepId);

        if (clickedStep !== undefined) {
          if (clickedStep.subSteps !== undefined && clickedStep.subSteps.length > 0) {
            let firstSubStep: ISubwayMapStep | undefined = this._getSubStep(clickedStep.key, clickedStep.subSteps[0].key);

            if (firstSubStep !== undefined) {
              // Go to first substep
              this._goToSubStep(clickedStep.key, firstSubStep.key);
            }
          }
        }
      } // if newStatesData !== undefined
    } // if steps !== undefined
  }

  /**
   * On click of a step
   */
  private _handleClickSubStep(clickedStepId: string | undefined, clickedSubStepId: string | undefined): void {
    this._goToSubStep(clickedStepId, clickedSubStepId);
  }

  /**
   * Go to a given sub step
   */
  private _goToSubStep(clickedStepId: string | undefined, clickedSubStepId: string | undefined): void {
    if (this.state.currentStepId === clickedStepId && this.state.currentSubStepId === clickedSubStepId) {
      // Clicking the same step already on, do nothing
      return;
    }

    /**
     * We have clickedStepIdx and clickedSubStepIdx
     * If we are still on current main step:
     *    1. Udpate the state of previous step to Completed/Error/Unsaved/Skipped
     *    2. Update the state of clicked step - Current
     */

    const { steps } = this.props;

    if (steps !== undefined) {
      let newStepsData = this.state.stepsData;
      const currStep = this._getStep(this.state.currentStepId);
      let currSubStep: ISubwayMapStep | undefined;

      if (currStep !== undefined) {
        if (currStep.subSteps !== undefined) {
          currSubStep = this._getSubStep(this.state.currentStepId, this.state.currentSubStepId);

          if (newStepsData !== undefined) {
            const currStepDataIdx = newStepsData.findIndex(obj => obj.key === this.state.currentStepId);
            const currSubStepsData = newStepsData[currStepDataIdx].subStepStateData;

            const currSubStepDataIdx = currSubStepsData!.findIndex(obj => obj.key === this.state.currentSubStepId);

            if (currSubStepsData !== undefined) {
              if (currSubStep!.contentArea.formComplete) {
                // newStepsData[currStepDataIdx].subStepStateData[currSubStepDataIdx].state = SubwayMapStepState.CompletedSubStep;
                currSubStepsData[currSubStepDataIdx].state = SubwayMapStepState.CompletedSubStep;
              }

              if (currSubStep!.contentArea.formError) {
                currSubStepsData[currSubStepDataIdx].state = SubwayMapStepState.ErrorSubstep;
              }

              const clickedSubStepIdx = newStepsData.findIndex(obj => obj.key === clickedSubStepId);
              if (clickedSubStepIdx > -1) {
                currSubStepsData[clickedSubStepIdx].state = SubwayMapStepState.CurrentSubStep;
              }
            }

            newStepsData[currStepDataIdx].subStepStateData = currSubStepsData;
          }
        }
      }

      this.setState({ currentStepId: clickedStepId, currentSubStepId: clickedSubStepId, stepsData: newStepsData });
    }
  }
}
