import * as React from 'react';

import { classNamesFunction, css } from 'office-ui-fabric-react/lib/Utilities';
import { ISubwayNavProps, ISubwayNavStyles } from './SubwayNav.types';
import { ISubwayNavStep, SubwayNavStepState } from './SubwayNavStep.types';
import { SubwayNavStep } from './SubwayNavStep';
import { getSubwayNavStyles } from './SubwayNav.styles';

const getClassNames = classNamesFunction<ISubwayNavProps, ISubwayNavStyles>();
const classNames = getClassNames(getSubwayNavStyles!);

/**
 * Component for Subway control
 */
export class SubwayNav extends React.Component<ISubwayNavProps, {}> {
  constructor(props: ISubwayNavProps) {
    super(props);
  }

  /**
   * Render the Subway Nav control
   */
  public render(): JSX.Element {
    const { steps } = this.props;
    let stepElements: JSX.Element[] = [];
    let renderedSteps: JSX.Element[] = [];

    if (steps) {
      for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
        renderedSteps = this._renderStep(steps[stepIndex], stepIndex === 0 ? undefined : steps[stepIndex - 1]);
        stepElements = stepElements.concat(renderedSteps);
      }

      return (
        <div className={css(this.props.className, classNames.subwayNavContainer)}>
          <div className={classNames.subwayNavContentContainer}>
            <div className={classNames.subwayNavContent}>{stepElements}</div>
          </div>
        </div>
      );
    } else {
      // Empty element
      return <React.Fragment />;
    }
  }

  /**
   * Render step of the subway Nav control
   * @param stepToRender
   * @param prevStep
   */
  private _renderStep(stepToRender: ISubwayNavStep, prevStep: ISubwayNavStep | undefined): JSX.Element[] {
    let stepElements: JSX.Element[] = [];

    if (stepToRender === undefined) {
      return stepElements;
    }

    const { steps } = this.props;

    if (steps !== undefined) {
      if (prevStep !== undefined) {
        const connectorClass = this._getStepConnectorClassName(stepToRender);
        stepElements.push(
          <div className={css(classNames.subwayNavStepConnector, connectorClass)} key={'connector' + '-' + stepToRender.key} />
        );
      }

      if (stepToRender !== undefined) {
        const renderSubStep = stepToRender.state === SubwayNavStepState.Current && this._hasSubSteps(stepToRender);

        stepElements.push(<SubwayNavStep key={'navStep' + '-' + stepToRender.key} step={stepToRender} />);

        /** Render substeps if current step has substeps */
        if (renderSubStep && stepToRender!.subSteps) {
          let subStepElements: JSX.Element[] = [];

          stepElements.push(
            <div
              className={css(classNames.subwayNavStepConnector, classNames.stepConnectorCompleted)}
              key={'connector-sub' + '-' + stepToRender.key}
            />
          );

          let subSteps = stepToRender.subSteps;
          let prevStep: ISubwayNavStep | undefined = undefined;

          if (subSteps !== undefined) {
            subSteps.forEach((subStep: ISubwayNavStep, index: number) => {
              subStepElements = subStepElements.concat(this._renderSubStep(stepToRender, subStep, index > 0 ? prevStep : undefined));
              prevStep = subStep;
            });

            stepElements = stepElements.concat(subStepElements);
          }
        }
      } // if stepToRender
    } // if steps !== undefined

    return stepElements;
  }

  /**
   * Render substeps of current step in subway Nav control
   * @param parentStep
   * @param subStepToRender
   * @param prevSubStep
   */
  private _renderSubStep(
    parentStep: ISubwayNavStep | undefined,
    subStepToRender: ISubwayNavStep | undefined,
    prevSubStep: ISubwayNavStep | undefined
  ): JSX.Element[] {
    const stepElements: JSX.Element[] = [];
    const { steps } = this.props;

    if (steps !== undefined) {
      if (parentStep !== undefined) {
        if (subStepToRender !== undefined) {
          // Add the connectiong line
          if (prevSubStep !== undefined) {
            const connectorClass = this._getStepConnectorClassName(subStepToRender);
            stepElements.push(
              <div className={css(classNames.subwayNavSubStepConnector, connectorClass)} key={'connector' + '-' + subStepToRender.key} />
            );
          }

          stepElements.push(<SubwayNavStep key={'navStep' + '-' + subStepToRender.key} step={subStepToRender} />);
        }
      } // parentStep !== undefined
    } // steps !== undefined
    return stepElements;
  }

  /**
   * Get the step connector class name
   * @param step
   */
  private _getStepConnectorClassName(step: ISubwayNavStep | undefined): string {
    if (step !== undefined) {
      if (this.props.wizardComplete) {
        return classNames.stepConnectorWizardComplete;
      }

      if (step.state === SubwayNavStepState.NotStarted) {
        return classNames.stepConnectorNotStarted;
      }
    }

    return classNames.stepConnectorCompleted;
  }

  /**
   *  Check if given step has sub steps
   */
  private _hasSubSteps(step: ISubwayNavStep | undefined): boolean {
    let hasSubSteps = false;

    if (step !== undefined) {
      hasSubSteps = step.subSteps !== undefined && step.subSteps.length > 0 ? true : false;
    }

    return hasSubSteps;
  }
}
