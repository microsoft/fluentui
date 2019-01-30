import * as React from 'react';

import { classNamesFunction, css } from 'office-ui-fabric-react/lib/Utilities';
import { ISubwayNavStepProps, ISubwayNavStepStyles, ISubwayNavStep, SubwayNavStepState } from './SubwayNavStep.types';
import { Icon } from 'office-ui-fabric-react';
import { getSubwayNavStepStyles } from './SubwayNavStep.styles';

export interface IIconProps {
  iconName: string;

  iconClassName: string;
}

const getClassNames = classNamesFunction<ISubwayNavStepProps, ISubwayNavStepStyles>();
const classNames = getClassNames(getSubwayNavStepStyles!);

/**
 * Component for Subway nav step
 */
export class SubwayNavStep extends React.Component<ISubwayNavStepProps, {}> {
  constructor(props: ISubwayNavStepProps) {
    super(props);
  }

  /**
   * Render the Subway Nav step
   */
  public render(): JSX.Element {
    const { step } = this.props;

    if (step !== undefined) {
      let iconProps;

      if (step.isSubStep) {
        iconProps = this._getIconPropsSubStep(step);
      } else {
        iconProps = this._getIconPropsStep(step);
      }

      return (
        <div
          key={step.key}
          className={css(
            classNames.subwayNavStepDiv,
            step.state !== SubwayNavStepState.Current && step.disabled ? classNames.disableStep : undefined
          )}
          onClick={() => step.onClickStep(step, undefined)}
        >
          <Icon
            iconName={iconProps.iconName}
            className={css(iconProps.iconClassName, step.isSubStep ? classNames.subwayNavSubStepIcon : classNames.subwayNavStepIcon)}
          />
          <span className={css(classNames.stepLabel, step.state === SubwayNavStepState.Current ? classNames.boldStep : undefined)}>
            {step!.label}
          </span>
        </div>
      );
    } else {
      // Empty element
      return <React.Fragment />;
    }
  }

  /**
   * Get the icon props for the given step
   * @param step
   */
  private _getIconPropsStep(step: ISubwayNavStep | undefined): IIconProps {
    let defaultProps = { iconName: 'LocationCircle', iconClassName: classNames.stepNotStarted };

    if (step !== undefined) {
      if (step.state != SubwayNavStepState.WizardComplete && step.subSteps !== undefined && step.subSteps.length > 0) {
        return { iconName: 'FullCircleMask', iconClassName: classNames.stepWithSubSteps };
      }

      switch (step.state) {
        case SubwayNavStepState.WizardComplete:
          return { iconName: 'CompletedSolid', iconClassName: classNames.stepWizardComplete };

        case SubwayNavStepState.Current:
          return { iconName: 'FullCircleMask', iconClassName: classNames.stepCurrent };

        case SubwayNavStepState.NotStarted:
          return { iconName: 'LocationCircle', iconClassName: classNames.stepNotStarted };

        case SubwayNavStepState.Completed:
          return { iconName: 'CompletedSolid', iconClassName: classNames.stepCompleted };

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
    let defaultProps = { iconName: 'LocationCircle', iconClassName: classNames.subStepNotStarted };

    if (subStep !== undefined) {
      switch (subStep.state) {
        case SubwayNavStepState.WizardComplete:
          return { iconName: 'CompletedSolid', iconClassName: classNames.subStepCompleted };

        case SubwayNavStepState.Current:
          return { iconName: 'FullCircleMask', iconClassName: classNames.subStepCurrent };

        case SubwayNavStepState.NotStarted:
          return { iconName: 'LocationCircle', iconClassName: classNames.subStepNotStarted };

        case SubwayNavStepState.Error:
          return { iconName: 'AlertSolid', iconClassName: classNames.subStepError };

        case SubwayNavStepState.Completed:
          return { iconName: 'CompletedSolid', iconClassName: classNames.subStepCompleted };

        case SubwayNavStepState.Skipped:
          return { iconName: 'LocationCircle', iconClassName: classNames.subStepSkipped };

        case SubwayNavStepState.Unsaved:
        case SubwayNavStepState.ViewedNotCompleted:
          return { iconName: 'LocationCircle', iconClassName: classNames.subStepUnsaved };
      }
    }

    return defaultProps;
  }
}
