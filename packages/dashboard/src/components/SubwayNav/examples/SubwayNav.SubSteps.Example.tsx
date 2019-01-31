import * as React from 'react';
import { generateRandomId } from './SubwayNav.Util';
import { SubwayNav } from '../SubwayNav';
import { ISubwayNavStep, SubwayNavStepState } from '../SubwayNav.types';

export interface ISubwayNavSubStepsExampleState {
  currStep: ISubwayNavStep;
  currSubStep: ISubwayNavStep | undefined;
  steps: ISubwayNavStep[];
}

export class SubwayNavSubStepsExample extends React.Component<any, ISubwayNavSubStepsExampleState> {
  private steps: ISubwayNavStep[] = [];

  constructor(props: any) {
    super(props);
  
    this._handleClickStep = this._handleClickStep.bind(this);
  
    this.steps = [];
    let subSteps: ISubwayNavStep[] = [];

    const substep0: ISubwayNavStep = {
      key: generateRandomId(),
      label: 'Sub Step 0',
      state: SubwayNavStepState.NotStarted,
      isSubStep: true,
      onClickStep: this._handleClickStep
    };
    const substep1: ISubwayNavStep = {
      key: generateRandomId(),
      label: 'Sub Step 1',
      state: SubwayNavStepState.NotStarted,
      isSubStep: true,
      onClickStep: this._handleClickStep
    };
    const substep2: ISubwayNavStep = {
      key: generateRandomId(),
      label: 'Sub Step 2',
      state: SubwayNavStepState.NotStarted,
      isSubStep: true,
      onClickStep: this._handleClickStep
    };

    subSteps.push(substep0);
    subSteps.push(substep1);
    subSteps.push(substep2);

    const data0: ISubwayNavStep = {
      key: generateRandomId(),
      label: 'Step 0',
      state: SubwayNavStepState.Current,
      onClickStep: this._handleClickStep
    };
    const data1: ISubwayNavStep = {
      key: generateRandomId(),
      label: 'Step 1',
      state: SubwayNavStepState.NotStarted,
      onClickStep: this._handleClickStep,
      subSteps: subSteps
    };
    const data2: ISubwayNavStep = {
      key: generateRandomId(),
      label: 'Step 2',
      state: SubwayNavStepState.NotStarted,
      onClickStep: this._handleClickStep
    };
    const data3: ISubwayNavStep = {
      key: generateRandomId(),
      label: 'Step 3',
      state: SubwayNavStepState.NotStarted,
      onClickStep: this._handleClickStep
    };

    this.steps.push(data0);
    this.steps.push(data1);
    this.steps.push(data2);
    this.steps.push(data3);
  }
  
  componentDidMount() {
    let currSubStep: ISubwayNavStep | undefined = undefined;
    let currStep = this.steps[0];
    if (currStep.subSteps && currStep.subSteps.length > 0) {
      currSubStep = currStep.subSteps[0];
    }

    this.setState({
      steps: this.steps,
      currStep: this.steps[0],
      currSubStep: currSubStep
    });
  }

  public render(): JSX.Element {
    

    return (
      <div>
        <SubwayNav steps={this.steps} />
      </div>
    );
  }

  private _handleClickStep(clickedStep: ISubwayNavStep, clickedSubStep: ISubwayNavStep | undefined): void {

    if (clickedSubStep === undefined) {
      this._handleParentClickStep(clickedStep);
      return;
    }

    let alertStr = 'Clicked ' + clickedStep.label;
    if (clickedSubStep !== undefined) {
      alertStr += ' and ' + clickedSubStep.label;
    }

    console.log(alertStr);

    if (clickedSubStep.key === this.state!.currSubStep!.key) {
      // clicked same substep
      return;
    }

    let newSteps = this.state.steps;
    let currSubStep = this.state.currSubStep;
    
    let foundClickedSubStep: boolean = false;

    newSteps.map(stepObj => {
      if (stepObj.key === clickedStep.key) {        
        if (stepObj.subSteps !== undefined && stepObj.subSteps.length > 0) {

          stepObj.subSteps.map(subStepObj => {

            if (subStepObj.key === this.state!.currSubStep!.key) {
              subStepObj.state = SubwayNavStepState.Completed;
            }      
            else if (subStepObj.key === clickedSubStep!.key) {
              subStepObj.state = SubwayNavStepState.Current;
              currSubStep = subStepObj;
              foundClickedSubStep = true;
            }
            else if (!foundClickedSubStep && subStepObj.state === SubwayNavStepState.NotStarted) {
              subStepObj.state = SubwayNavStepState.Skipped;
            }
          });

        }
      }
      else if (!foundClickedSubStep && stepObj.state === SubwayNavStepState.NotStarted) {
        stepObj.state = SubwayNavStepState.Skipped;
      }
    });

    this.setState({ steps: newSteps, currSubStep: currSubStep });


  }

  private _handleParentClickStep(step: ISubwayNavStep): void {
    let alertStr = 'Clicked ' + step.label;

    if (this.state.currStep.key === step.key) {
      // Clicked same current step
      return;
    }

    let newSteps = this.state.steps;
    let currStep = this.state.currStep;
    let currSubStep = this.state.currSubStep

    let foundClickedStep: boolean = false;

    newSteps.map(stepObj => {
      if (stepObj.key === this.state.currStep.key) {
        stepObj.state = SubwayNavStepState.Completed;
      }      
      else if (stepObj.key === step.key) {
        stepObj.state = SubwayNavStepState.Current;
        currStep = stepObj;
        foundClickedStep = true;

        if (stepObj.subSteps !== undefined && stepObj.subSteps.length > 0) {
          stepObj.subSteps[0].state = SubwayNavStepState.Current;
          currSubStep = stepObj.subSteps[0];
        }
      }
      else if (!foundClickedStep && stepObj.state === SubwayNavStepState.NotStarted) {
        stepObj.state = SubwayNavStepState.Skipped;
      }
    });

    this.setState({ steps: newSteps, currStep: currStep, currSubStep: currSubStep });

    console.log(alertStr);
  }
}
