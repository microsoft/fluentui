import { ISubwayNavStep, SubwayNavStepState } from '../../SubwayNav/SubwayNav.types';
import { IWizardStepProps } from '../Wizard.types';

export interface ISetupWizardState {
  currStep: IWizardStepProps;
  currSubStep: IWizardStepProps | undefined;
  steps: IWizardStepProps[];
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

// Go to a given parent step -> substep
export function goToStep(
  currentState: ISetupWizardState,
  parentStepToGo: ISubwayNavStep,
  subStepToGo: ISubwayNavStep | undefined
): ISetupWizardState | undefined {
  if (parentStepToGo === undefined) {
    // do nothing
    return;
  }

  if (parentStepToGo.key === currentState.currStep.key) {
    // Already in current step, go to Sub Step
    if (subStepToGo !== undefined) {
      return goToSubStep(currentState, parentStepToGo, subStepToGo);
    }
  } else {
    let newSteps: IWizardStepProps[] = [];
    newSteps = currentState.steps;

    let currStep = currentState.currStep;
    let currSubStep = currentState.currSubStep;

    let foundStepToGo: boolean = false;

    newSteps.map((stepObj: IWizardStepProps) => {
      if (stepObj.key === currentState.currStep.key) {
        stepObj.state = SubwayNavStepState.Completed; /// Only for testing (get state from wizard content state?)

        if (stepObj.subSteps !== undefined && stepObj.subSteps.length > 0) {
          stepObj.subSteps.forEach((obj: IWizardStepProps) => {
            obj.state = SubwayNavStepState.Completed; /// Only for testing (get state from wizard content state?)
          });

          // Since current step is completed, reset current sub step
          currSubStep = undefined;
        }
      } else if (stepObj.key === parentStepToGo.key) {
        stepObj.state = SubwayNavStepState.Current;
        currStep = stepObj;

        if (stepObj.subSteps !== undefined && stepObj.subSteps.length > 0) {
          stepObj.subSteps[0].state = SubwayNavStepState.Current;
          currSubStep = stepObj.subSteps[0];
        }
        foundStepToGo = true;
      } else if (!foundStepToGo && stepObj.state === SubwayNavStepState.NotStarted) {
        stepObj.state = SubwayNavStepState.Skipped;
      }
    });

    if (foundStepToGo) {
      // this.setState({ steps: newSteps, currStep: currStep, currSubStep: currSubStep });
      return { steps: newSteps, currStep: currStep, currSubStep: currSubStep };
    }
  }
}

export function goToSubStep(
  currentState: ISetupWizardState,
  parentStepToGo: ISubwayNavStep,
  subStepToGo: ISubwayNavStep
): ISetupWizardState | undefined {
  if (
    currentState.currStep.key === parentStepToGo.key &&
    currentState.currSubStep !== undefined &&
    currentState.currSubStep.key === subStepToGo.key
  ) {
    // Already in the step
    return;
  }

  let newSteps: IWizardStepProps[];
  let foundClickedSubStep: boolean = false;
  let currSubStep: IWizardStepProps | undefined = currentState.currSubStep;
  let currStep: IWizardStepProps = currentState.currStep;

  newSteps = currentState.steps;
  newSteps.map((stepObj: IWizardStepProps) => {
    if (stepObj.key === parentStepToGo.key) {
      // Found the parent step
      if (stepObj.subSteps !== undefined && stepObj.subSteps.length > 0) {
        stepObj.subSteps.map((subStepObj: IWizardStepProps) => {
          if (subStepObj.key === currentState!.currSubStep!.key) {
            subStepObj.state = SubwayNavStepState.Completed; //// Only for testing (Update from wizard content state?)
          } else if (subStepObj.key === subStepToGo.key) {
            stepObj.state = SubwayNavStepState.Current;
            subStepObj.state = SubwayNavStepState.Current;

            // Update curr substep
            currStep = stepObj;
            currSubStep = subStepObj;
            foundClickedSubStep = true;
          } else if (!foundClickedSubStep && subStepObj.state === SubwayNavStepState.NotStarted) {
            subStepObj.state = SubwayNavStepState.Skipped;
          }
        });
      }
    }
  });

  if (foundClickedSubStep) {
    // this.setState({ steps: newSteps, currStep: currStep, currSubStep: currSubStep });
    return { steps: newSteps, currStep: currStep, currSubStep: currSubStep };
  }
}

/**
 * Go to the next step and return updated state
 * @param currentState
 */
export function goToNextStep(currentState: ISetupWizardState): ISetupWizardState | undefined {
  if (currentState.currSubStep !== undefined) {
    return goToNextSubStep(currentState);
  }

  const currIndex = currentState.steps.findIndex((stepObj: IWizardStepProps) => {
    return stepObj.key === currentState.currStep.key;
  });

  if (currentState.steps.length - 1 === currIndex) {
    // Last step reached.
    return;
  }

  let { currStep } = currentState;

  let foundNextStep: boolean = false;
  let foundCurrStep: boolean = false;

  let newSteps: IWizardStepProps[] = [];
  newSteps = currentState.steps;

  newSteps.map((stepObj: IWizardStepProps) => {
    if (!foundNextStep) {
      if (foundCurrStep) {
        currStep = stepObj;
        foundNextStep = true;
      } else if (stepObj.key === currStep.key) {
        foundCurrStep = true;
      }
    }
  });

  if (foundNextStep) {
    return goToStep(currentState, currStep, undefined);
  }
}

/**
 * Go the the next sub step
 * @param currentState
 */
export function goToNextSubStep(currentState: ISetupWizardState): ISetupWizardState | undefined {
  let { currSubStep, currStep } = currentState;

  if (currSubStep === undefined) {
    return;
  }

  let foundNextStep: boolean = false;
  let foundCurrStep: boolean = false;

  let newSteps: IWizardStepProps[] = [];
  newSteps = currentState.steps;

  const currIndex = newSteps.findIndex((stepObj: IWizardStepProps) => {
    return stepObj.key === currentState.currStep.key;
  });

  if (newSteps[currIndex].subSteps !== undefined) {
    newSteps[currIndex].subSteps!.map((subStepObj: IWizardStepProps) => {
      if (!foundNextStep) {
        if (foundCurrStep) {
          currSubStep = subStepObj;
          foundNextStep = true;
        } else if (subStepObj.key === currSubStep!.key) {
          foundCurrStep = true;
        }
      }
    });

    if (foundCurrStep && !foundNextStep) {
      // last substep reached.  So go to next main step
      if (newSteps.length - 1 === currIndex) {
        // Last step reached, cannot go next
        return;
      }

      foundNextStep = true;
      currStep = newSteps[currIndex + 1];

      if (newSteps[currIndex + 1]!.subSteps !== undefined && newSteps[currIndex + 1]!.subSteps!.length > 0) {
        currSubStep = newSteps[currIndex + 1]!.subSteps![0];
      }
    }
  }

  if (foundNextStep) {
    return goToStep(currentState, currStep, currSubStep);
  }
}
