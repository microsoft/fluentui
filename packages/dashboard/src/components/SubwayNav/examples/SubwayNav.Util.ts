import { ISubwayNavNodeProps, SubwayNavNodeState } from '@uifabric/dashboard';

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

/**
 * Handle a selection change and set the right state
 *
 */
export function setSubwayState(
  selectedStep: ISubwayNavNodeProps,
  steps: ISubwayNavNodeProps[],
  currentStepId: string
): { steps: ISubwayNavNodeProps[]; currentStepId: string } {
  let foundCurrentStep = false;
  // map through the steps and return a new array to re-render
  const newSteps = steps.map((stepObj: ISubwayNavNodeProps) => {
    if (stepObj.id === currentStepId) {
      return { ...stepObj, state: SubwayNavNodeState.Completed };
    } else if (stepObj.id === selectedStep.id || stepObj.id === selectedStep.parentId) {
      foundCurrentStep = true;
      // if id or parentId matches we know we have the correct nodes
      // shallow clone step
      const newStep: ISubwayNavNodeProps = { ...stepObj };
      if (newStep.subSteps) {
        newStep.state = SubwayNavNodeState.CurrentWithSubSteps;
        let foundCurrentSubStep = false;
        // we can map to self since we aren't inserting or removing
        newStep.subSteps = newStep.subSteps.map((subStep, index) => {
          // if we have sub steps, set the first item to current if the substep isn't the originator
          if (subStep.id === selectedStep.id || (index === 0 && stepObj.id === selectedStep.id)) {
            foundCurrentSubStep = true;
            return { ...subStep, state: SubwayNavNodeState.Current };
          } else if (!foundCurrentSubStep && subStep.state === SubwayNavNodeState.NotStarted) {
            // if a previous sub step was not started
            // and the current hasn't been found, mark as skipped
            return { ...subStep, state: SubwayNavNodeState.Skipped };
          }
          // if neither of the conditions above are true simply return an unmodified subStep
          return subStep;
        });
      } else {
        newStep.state = SubwayNavNodeState.Current;
      }
      return newStep;
    } else if (!foundCurrentStep && stepObj.state === SubwayNavNodeState.NotStarted) {
      return { ...stepObj, state: SubwayNavNodeState.Skipped };
    }

    return stepObj;
  });

  return { steps: newSteps, currentStepId: selectedStep.id };
}
