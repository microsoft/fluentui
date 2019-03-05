import { IWizardProps, IWizardStepProps } from './Wizard.types';
import { SubwayNavNodeState } from '../SubwayNav/index';

// Get current step
export function getCurrentStep(steps: IWizardStepProps[]): IWizardStepProps {
  let stepToShow;

  steps.some((wizStep: IWizardStepProps) => {
    if (wizStep.state === SubwayNavNodeState.Current) {
      stepToShow = wizStep;
      return true;
    } else if (wizStep.state === SubwayNavNodeState.CurrentWithSubSteps) {
      // throw error if CurrentWithSubSteps is set without subSteps
      if (!wizStep.subSteps) {
        throw new Error('The state "CurrentWithSubSteps" must be used in conjuction with the "subSteps" prop');
      }

      const foundSubStep = wizStep.subSteps.some((wizSubStep: IWizardStepProps) => {
        if (wizSubStep.state === SubwayNavNodeState.Current) {
          stepToShow = wizSubStep;
          return true;
        }
        return false;
      });

      if (!foundSubStep) {
        stepToShow = wizStep.subSteps[0];
      }
      return true;
    }
    return false;
  });

  if (!stepToShow) {
    // If no steps is set as "Current", just return the first step
    stepToShow = steps[0];
  }

  return stepToShow;
}

// Get step to show
export function getStepToShow(props: IWizardProps): IWizardStepProps {
  const { wizardComplete, wizardCompleteStep, stepToShow: stepToShowFromProps } = props;
  if (stepToShowFromProps) {
    return stepToShowFromProps;
  }

  let stepToShow;

  if (wizardComplete! && wizardCompleteStep) {
    stepToShow = wizardCompleteStep;
  } else {
    stepToShow = getCurrentStep(props.steps);
  }

  return stepToShow!;
}
