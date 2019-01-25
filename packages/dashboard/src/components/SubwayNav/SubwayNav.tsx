import * as React from 'react';

import { classNamesFunction, css } from 'office-ui-fabric-react/lib/Utilities';
import { ISubwayNavProps, ISubwayNavStep, ISubwayNavStyles } from './SubwayNav.types';
import { Icon } from 'office-ui-fabric-react';
import { getSubwayNavStyles } from './SubwayNav.styles';

export interface IIconProps {
  iconName: string;

  iconClassName: string;
}

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
    const { steps /*theme, */ } = this.props;
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
      const iconProps = this._getIconPropsStep(stepToRender);

      if (prevStep !== undefined) {
        const connectorClass = this._getStepConnectorClassName(stepToRender);
        stepElements.push(
          <div className={css(classNames.subwayNavStepConnector, connectorClass)} key={'connector' + '-' + stepToRender.key} />
        );
      }

      if (stepToRender !== undefined) {
        const renderSubStep = stepToRender.isCurrentStep && this._hasSubSteps(stepToRender);

        stepElements.push(
          <div
            key={stepToRender.key}
            className={css(
              classNames.subwayNavStepDiv,
              !stepToRender.isCurrentStep && stepToRender.isDisabledStep ? classNames.disableStep : undefined
            )}
            onClick={() => stepToRender.onClickStep(stepToRender, undefined)}
          >
            <Icon iconName={iconProps.iconName} className={css(iconProps.iconClassName, classNames.subwayNavStepIcon)} />
            <span className={css(classNames.stepLabel, stepToRender.isCurrentStep ? classNames.boldStep : undefined)}>
              {stepToRender!.label}
            </span>
          </div>
        );

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
    let iconProps;

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

          iconProps = this._getIconPropsSubStep(subStepToRender);

          stepElements.push(
            <div
              key={subStepToRender.key}
              className={css(
                classNames.subwayNavStepDiv,
                !subStepToRender.isCurrentStep && subStepToRender.isDisabledStep ? classNames.disableStep : undefined
              )}
              onClick={() => subStepToRender.onClickStep(parentStep, subStepToRender)}
            >
              <Icon iconName={iconProps.iconName} className={css(iconProps.iconClassName, classNames.subwayNavSubStepIcon)} />
              <span className={css(classNames.subStepLabel, subStepToRender.isCurrentStep ? classNames.boldStep : undefined)}>
                {subStepToRender.label}
              </span>
            </div>
          );
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

      if (step.formViewed) {
        return classNames.stepConnectorCompleted;
      }
    }

    return classNames.stepConnectorNotStarted;
  }

  /**
   * Get the icon props for the given step
   * @param step
   */
  private _getIconPropsStep(step: ISubwayNavStep | undefined): IIconProps {
    let defaultProps = { iconName: 'LocationCircle', iconClassName: classNames.stepNotStarted };

    if (step !== undefined) {
      if (this.props.wizardComplete) {
        return { iconName: 'CompletedSolid', iconClassName: classNames.stepWizardComplete };
      }

      if (step.isCurrentStep) {
        return { iconName: 'FullCircleMask', iconClassName: classNames.stepCurrent };
      }

      if (step.formComplete) {
        return { iconName: 'CompletedSolid', iconClassName: classNames.stepCompleted };
      }

      if (step.subSteps !== undefined && step.subSteps.length > 0) {
        return { iconName: 'FullCircleMask', iconClassName: classNames.stepWithSubSteps };
      }

      if (step.formError) {
        return { iconName: 'AlertSolid', iconClassName: classNames.stepError };
      }

      if (step.formViewed && !step.formComplete) {
        return { iconName: 'FullCircleMask', iconClassName: classNames.stepViewedNotCompleted };
      }

      if (step.formSkipped) {
        return { iconName: 'LocationCircle', iconClassName: classNames.stepSkipped };
      }

      if (step.formSaved !== undefined && step.formSaved) {
        return { iconName: 'LocationCircle', iconClassName: classNames.stepUnsaved };
      }
    }

    return defaultProps;
  }

  /**
   * Get the icon props for the given sub step
   * @param subStep
   */
  private _getIconPropsSubStep(subStep: ISubwayNavStep | undefined): IIconProps {
    let defaultProps = { iconName: 'LocationCircle', iconClassName: classNames.subStepNotStarted };

    if (subStep !== undefined) {
      if (subStep.isCurrentStep) {
        return { iconName: 'FullCircleMask', iconClassName: classNames.subStepCurrent };
      }

      if (subStep.formError) {
        return { iconName: 'FullCircleMask', iconClassName: classNames.subStepError };
      }

      if (subStep.formComplete) {
        return { iconName: 'FullCircleMask', iconClassName: classNames.subStepCompleted };
      }

      if (subStep.formSkipped) {
        return { iconName: 'LocationCircle', iconClassName: classNames.subStepSkipped };
      }

      if (subStep.formSaved !== undefined && !subStep.formSaved) {
        return { iconName: 'LocationCircle', iconClassName: classNames.subStepUnsaved };
      }
    }

    return defaultProps;
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
