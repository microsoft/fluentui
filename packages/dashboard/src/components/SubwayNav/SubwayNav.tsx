import * as React from 'react';

import { classNamesFunction, css } from 'office-ui-fabric-react/lib/Utilities';
import { ISubwayNavProps, ISubwayNavStep, ISubwayNavStyles, SubwayNavStepState } from './SubwayNav.types';
import { Icon, Link } from 'office-ui-fabric-react';
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

    steps.map((step: ISubwayNavStep, index: number) => {
      renderedSteps = this._renderStep(step, index === 0 ? undefined : steps[index]);
      stepElements = stepElements.concat(renderedSteps);
    });

    return (
      <div className={css(this.props.className, classNames.subwayNavContainer)}>
        <div className={classNames.subwayNavContentContainer}>
          <div className={classNames.subwayNavContent}>{stepElements}</div>
        </div>
      </div>
    );
  }

  /**
   * Render step of the subway Nav control
   * @param stepToRender
   * @param prevStep
   */
  private _renderStep(stepToRender: ISubwayNavStep, prevStep: ISubwayNavStep | undefined): JSX.Element[] {
    let stepElements: JSX.Element[] = [];

    const iconProps = this._getIconPropsStep(stepToRender);

    if (prevStep !== undefined) {
      const connectorClass = this._getStepConnectorClassName(stepToRender);
      stepElements.push(
        <div className={css(classNames.subwayNavStepConnector, connectorClass)} key={'connector' + '-' + stepToRender.key} />
      );
    }

    const renderSubStep = stepToRender.state === SubwayNavStepState.Current && this._hasSubSteps(stepToRender);

    stepElements.push(
      <div
        key={stepToRender.key}
        className={css(
          classNames.subwayNavStepDiv,
          stepToRender.state !== SubwayNavStepState.Current && stepToRender.disabled ? classNames.disableStep : undefined
        )}
      >
        <Icon iconName={iconProps.iconName} className={css(iconProps.iconClassName, classNames.subwayNavStepIcon)} />
        <Link
          // tslint:disable-next-line jsx-no-lambda
          onClick={() => {
            stepToRender.onClickStep(stepToRender, undefined);
          }}
        >
          <span className={css(classNames.stepLabel, stepToRender.state === SubwayNavStepState.Current ? classNames.boldStep : undefined)}>
            {stepToRender!.label}
          </span>
        </Link>
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

      const subSteps = stepToRender.subSteps;

      if (subSteps !== undefined) {
        subSteps.forEach((subStep: ISubwayNavStep, index: number) => {
          subStepElements = subStepElements.concat(this._renderSubStep(stepToRender, subStep, index > 0 ? subSteps[index] : undefined));
        });

        stepElements = stepElements.concat(subStepElements);
      }
    }

    return stepElements;
  }

  /**
   * Render substeps of current step in subway Nav control
   * @param parentStep
   * @param subStepToRender
   * @param prevSubStep
   */
  private _renderSubStep(
    parentStep: ISubwayNavStep,
    subStepToRender: ISubwayNavStep,
    prevSubStep: ISubwayNavStep | undefined
  ): JSX.Element[] {
    const stepElements: JSX.Element[] = [];
    let iconProps;

    // Add the connecting line
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
          subStepToRender.state !== SubwayNavStepState.Current && subStepToRender.disabled ? classNames.disableStep : undefined
        )}
      >
        <Icon iconName={iconProps.iconName} className={css(iconProps.iconClassName, classNames.subwayNavSubStepIcon)} />
        <Link
          // tslint:disable-next-line jsx-no-lambda
          onClick={() => {
            subStepToRender.onClickStep(parentStep, subStepToRender);
          }}
        >
          <span
            className={css(classNames.subStepLabel, subStepToRender.state === SubwayNavStepState.Current ? classNames.boldStep : undefined)}
          >
            {subStepToRender.label}
          </span>
        </Link>
      </div>
    );

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
   * Get the icon props for the given step
   * @param step
   */
  private _getIconPropsStep(step: ISubwayNavStep | undefined): IIconProps {
    const defaultProps = { iconName: 'LocationCircle', iconClassName: classNames.stepNotStarted };

    if (step !== undefined) {
      if (this.props.wizardComplete) {
        return { iconName: 'CompletedSolid', iconClassName: classNames.stepWizardComplete };
      }

      if (step.subSteps !== undefined && step.subSteps.length > 0) {
        return { iconName: 'FullCircleMask', iconClassName: classNames.stepWithSubSteps };
      }

      switch (step.state) {
        case SubwayNavStepState.Current:
          return { iconName: 'FullCircleMask', iconClassName: classNames.stepCurrent };

        case SubwayNavStepState.NotStarted:
          return { iconName: 'LocationCircle', iconClassName: classNames.stepNotStarted };

        case SubwayNavStepState.Completed:
          return { iconName: 'CompletedSolid', iconClassName: classNames.stepCompleted };

        case SubwayNavStepState.StepWithSubSteps:
          return { iconName: 'FullCircleMask', iconClassName: classNames.stepWithSubSteps };

        case SubwayNavStepState.Error:
          return { iconName: 'AlertSolid', iconClassName: classNames.stepError };

        case SubwayNavStepState.ViewedNotCompleted:
          return { iconName: 'FullCircleMask', iconClassName: classNames.stepViewedNotCompleted };

        case SubwayNavStepState.Skipped:
          return { iconName: 'LocationCircle', iconClassName: classNames.stepSkipped };

        case SubwayNavStepState.Unsaved:
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
    const defaultProps = { iconName: 'LocationCircle', iconClassName: classNames.subStepNotStarted };

    if (subStep !== undefined) {
      if (this.props.wizardComplete) {
        return { iconName: 'CompletedSolid', iconClassName: classNames.subStepCompleted };
      }

      switch (subStep.state) {
        case SubwayNavStepState.Current:
          return { iconName: 'FullCircleMask', iconClassName: classNames.subStepCurrent };

        case SubwayNavStepState.NotStarted:
          return { iconName: 'LocationCircle', iconClassName: classNames.subStepNotStarted };

        case SubwayNavStepState.Error:
          return { iconName: 'AlertSolid', iconClassName: classNames.subStepError };

        case SubwayNavStepState.Completed:
          return { iconName: 'CompletedSolid', iconClassName: classNames.subStepCompleted };

        case SubwayNavStepState.StepWithSubSteps:
          return { iconName: 'FullCircleMask', iconClassName: classNames.stepWithSubSteps };

        case SubwayNavStepState.Skipped:
          return { iconName: 'LocationCircle', iconClassName: classNames.subStepSkipped };

        case SubwayNavStepState.Unsaved:
        case SubwayNavStepState.ViewedNotCompleted:
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
