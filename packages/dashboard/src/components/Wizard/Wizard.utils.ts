import { IWizardProps, IWizardStepProps } from './Wizard.types';
import { SubwayNavNodeState, ISubwayNavNodeProps } from '../SubwayNav/index';

// Get current step
export function getCurrentStep(steps: IWizardStepProps[]): IWizardStepProps {
  let currentStep;

  steps.some((wizStep: IWizardStepProps) => {
    if (wizStep.state === SubwayNavNodeState.Current) {
      currentStep = { ...wizStep };
      return true;
    } else if (wizStep.state === SubwayNavNodeState.CurrentWithSubSteps) {
      // throw error if CurrentWithSubSteps is set without subSteps
      if (!wizStep.subSteps) {
        throw new Error('The state "CurrentWithSubSteps" must be used in conjuction with the "subSteps" prop');
      }

      const foundSubStep = wizStep.subSteps.some((wizSubStep: IWizardStepProps, index: number) => {
        if (wizSubStep.state === SubwayNavNodeState.Current) {
          currentStep = { ...wizSubStep };
          currentStep.isSubStep = true;
          currentStep.isFirstSubStep = index === 0;
          return true;
        }
        return false;
      });

      if (!foundSubStep) {
        currentStep = { ...wizStep.subSteps[0] };
        currentStep.isSubStep = true;
        currentStep.isFirstSubStep = true;
      }
      return true;
    }
    return false;
  });

  if (!currentStep) {
    // If no steps is set as "Current", just return the first step
    currentStep = { ...steps[0] };
    if (currentStep.subSteps!.length > 0) {
      currentStep = { ...currentStep.subSteps![0] };
      currentStep.isSubStep = true;
      currentStep.isFirstSubStep = true;
    }
  }

  return currentStep;
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

/* Get the previous step */
export function getPrevStep(
  steps: IWizardStepProps[],
  currentStepId: string
): { prevStep: IWizardStepProps | undefined; parentId: string | undefined } {
  let prevStep: IWizardStepProps | undefined;
  let prevSubStep: IWizardStepProps | undefined;
  let parentId: string | undefined;

  let prevStepIter: IWizardStepProps | undefined;

  // iterate through steps, find substep if exists, assign parentId if necessary
  steps.some((step: IWizardStepProps, index: number) => {
    if (step.id === currentStepId && index === 0) {
      // already on first step, no more prev step
      return true;
    }

    if (step.id === currentStepId) {
      prevStep = prevStepIter;
      return true;
    } else if (step.subSteps) {
      step.subSteps.some((subStep: IWizardStepProps, subIndex: number) => {
        if (subStep.id === currentStepId && subIndex === 0) {
          // We are on first sub step of a main step.  Previous main step is the new prev step
          prevStep = prevStepIter;
          return true;
        }

        if (subStep.id === currentStepId) {
          prevStep = prevSubStep;
          parentId = step.id;
          return true;
        }

        prevSubStep = subStep;
        return false;
      });

      if (prevStep) {
        return true;
      }
    }

    prevStepIter = step;
    return false;
  });
  return { prevStep, parentId };
}

export function getParentStep(steps: IWizardStepProps[], stepToGet: IWizardStepProps): IWizardStepProps | undefined {
  let parentStep: IWizardStepProps | undefined = undefined;
  if (stepToGet.isSubStep) {
    parentStep = getStep(steps, stepToGet.parentId!);
  }

  return parentStep;
}

export function getStep(steps: IWizardStepProps[], stepId: string): IWizardStepProps | undefined {
  let returnStep: IWizardStepProps | undefined = undefined;

  steps.some((step: IWizardStepProps, index: number) => {
    if (step.id === stepId) {
      returnStep = step;
      return true;
    } else if (step.subSteps) {
      step.subSteps.some((subStep: IWizardStepProps, subIndex: number) => {
        if (subStep.id === stepId) {
          returnStep = subStep;
          return true;
        }
        return false;
      });
      if (returnStep) {
        return true;
      }
    }
    return false;
  });

  return returnStep;
}

/**
 * Handle a selection change and set the right state
 * If this isn't being called from a click within the map you need to inject parentId into the step
 */
export function setSubwayState(
  selectedStep: ISubwayNavNodeProps | IWizardStepProps,
  steps: (ISubwayNavNodeProps | IWizardStepProps)[],
  currentStepId: string
): { steps: (ISubwayNavNodeProps | IWizardStepProps)[]; currentStepId: string } {
  let foundCurrentStep = false;
  let selectedStepId = selectedStep.id;
  // map through the steps and return a new array to re-render
  const newSteps = (steps as Array<ISubwayNavNodeProps | IWizardStepProps>).map((stepObj: ISubwayNavNodeProps | IWizardStepProps) => {
    if (stepObj.id === selectedStep.id || stepObj.id === selectedStep.parentId) {
      foundCurrentStep = true;
      // if id or parentId matches we know we have the correct nodes
      // shallow clone step
      const newStep: ISubwayNavNodeProps | IWizardStepProps = { ...stepObj };
      if (newStep.subSteps) {
        newStep.state = SubwayNavNodeState.CurrentWithSubSteps;
        let foundCurrentSubStep = false;
        // we can map to self since we aren't inserting or removing
        newStep.subSteps = (newStep.subSteps as Array<ISubwayNavNodeProps | IWizardStepProps>).map(
          (subStep: ISubwayNavNodeProps | IWizardStepProps, index: number) => {
            // if we have sub steps, set the first item to current if the substep isn't the originator
            if (subStep.id === selectedStep.id || (index === 0 && stepObj.id === selectedStep.id)) {
              if (index === 0 && stepObj.id === selectedStep.id) {
                selectedStepId = subStep.id;
              }
              foundCurrentSubStep = true;
              return { ...subStep, state: SubwayNavNodeState.Current };
            } else if (subStep.id === currentStepId) {
              if (subStep.id === selectedStep.id) {
                foundCurrentStep = true;
                return { ...subStep, state: SubwayNavNodeState.Current };
              } else {
                return { ...subStep, state: SubwayNavNodeState.Completed };
              }
            } else if (!foundCurrentSubStep && subStep.state === SubwayNavNodeState.NotStarted) {
              // if a previous sub step was not started
              // and the current hasn't been found, mark as skipped
              return { ...subStep, state: SubwayNavNodeState.Skipped };
            }
            // if neither of the conditions above are true simply return an unmodified subStep
            return subStep;
          }
        );
      } else {
        newStep.state = SubwayNavNodeState.Current;
      }
      return newStep;
    } else if (stepObj.id === currentStepId) {
      if (stepObj.id === selectedStep.id) {
        foundCurrentStep = true;
        return { ...stepObj, state: SubwayNavNodeState.Current };
      } else {
        return { ...stepObj, state: SubwayNavNodeState.Completed };
      }
    } else if (stepObj.state === SubwayNavNodeState.CurrentWithSubSteps) {
      // clean up current sub steps and mark complete
      const cleanSubSteps = markCurrentSubStepsComplete(stepObj);
      if (hasCompletedSubSteps(stepObj)) {
        return { ...stepObj, subSteps: cleanSubSteps, state: SubwayNavNodeState.Completed };
      } else {
        return { ...stepObj, subSteps: cleanSubSteps, state: SubwayNavNodeState.ViewedNotCompleted };
      }
    } else if (!foundCurrentStep && stepObj.state === SubwayNavNodeState.NotStarted) {
      return { ...stepObj, state: SubwayNavNodeState.Skipped };
    }

    return stepObj;
  });

  return { steps: newSteps, currentStepId: selectedStepId };
}

function hasCompletedSubSteps(step: ISubwayNavNodeProps | IWizardStepProps): boolean {
  // if all steps are completed or current, count main as completed
  return !(step.subSteps as Array<ISubwayNavNodeProps | IWizardStepProps>).some(
    (subStep: ISubwayNavNodeProps | IWizardStepProps, index: number) => {
      return !(subStep.state === SubwayNavNodeState.Completed || subStep.state === SubwayNavNodeState.Current);
    }
  );
}

function markCurrentSubStepsComplete(step: ISubwayNavNodeProps | IWizardStepProps): (ISubwayNavNodeProps | IWizardStepProps)[] {
  return (step.subSteps as Array<ISubwayNavNodeProps | IWizardStepProps>).map((subStep: ISubwayNavNodeProps | IWizardStepProps) => {
    if (subStep.state === SubwayNavNodeState.Current) {
      return { ...subStep, state: SubwayNavNodeState.Completed };
    } else {
      return subStep;
    }
  });
}
