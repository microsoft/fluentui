import { IWizardProps, IWizardStepProps } from './Wizard.types';
import { ISetupWizardProps } from './SetupWizard.types';
import { SubwayNavNodeState } from '../SubwayNav/index';

// Get content to show
export function getStepContentToShow(props: IWizardProps | ISetupWizardProps): IWizardStepProps {
  const { steps } = props;
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
