import { IWizardStepProps } from '../Wizard.types';

export interface ISetupWizardState {
  steps: IWizardStepProps[];
  currentStepId: string;
}

/**
 * generate Random id
 */
export function generateRandomId(): string {
  return (
    Math.random()
      .toString(36)
      .substring(2) + new Date().getTime().toString(36)
  );
}

export function getNextStep(
  steps: IWizardStepProps[],
  currentStepId: string
): { nextStep: IWizardStepProps | undefined; parentId: string | undefined } {
  let nextStep: IWizardStepProps | undefined;
  let parentId: string | undefined;
  // iterate through steps, find substep if exists, assign parentId if necessary
  steps.some((step: IWizardStepProps, index: number) => {
    if (step.id === currentStepId && steps[index + 1]) {
      nextStep = steps[index + 1];
      return true;
    } else if (step.subSteps) {
      let nextSubStep: IWizardStepProps | undefined;
      step.subSteps.some((subStep: IWizardStepProps, subIndex: number) => {
        if (subStep.id === currentStepId && step.subSteps![subIndex + 1]) {
          nextSubStep = step.subSteps![subIndex + 1];
          parentId = step.id;
          return true;
        } else if (subStep.id === currentStepId && !step.subSteps![subIndex + 1]) {
          // no more sub steps break out into main steps
          if (steps[index + 1]) {
            nextStep = steps[index + 1];
          }
          return true;
        }
        return false;
      });
      if (nextSubStep) {
        nextStep = nextSubStep;
        return true;
      }
    }
    return false;
  });
  return { nextStep, parentId };
}
