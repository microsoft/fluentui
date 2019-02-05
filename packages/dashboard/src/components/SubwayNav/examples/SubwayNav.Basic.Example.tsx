import * as React from 'react';
import { generateRandomId } from './SubwayNav.Util';
import { SubwayNav } from '../SubwayNav';
import { ISubwayNavStep, SubwayNavStepState } from '../SubwayNav.types';

export interface ISubwayNavBasicExampleState {
  currStep: ISubwayNavStep;
  steps: ISubwayNavStep[];
}

export class SubwayNavBasicExample extends React.Component<{}, ISubwayNavBasicExampleState> {
  private steps: ISubwayNavStep[] = [];

  constructor(props: {}) {
    super(props);

    this._handleClickStep = this._handleClickStep.bind(this);

    const data0: ISubwayNavStep = {
      key: generateRandomId(),
      label: 'Step 0 with a long label that needs to perform a text overflow with ellipsis in the end.',
      state: SubwayNavStepState.Current,
      onClickStep: this._handleClickStep
    };
    const data1: ISubwayNavStep = {
      key: generateRandomId(),
      label: 'Step 1',
      state: SubwayNavStepState.NotStarted,
      onClickStep: this._handleClickStep
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

  public componentDidMount(): void {
    this.setState({
      steps: this.steps,
      currStep: this.steps[0]
    });
  }

  public render(): JSX.Element {
    return (
      <div>
        <SubwayNav steps={this.steps} />
      </div>
    );
  }

  private _handleClickStep(step: ISubwayNavStep, subStep: ISubwayNavStep | undefined): void {
    let alertStr = 'Clicked ' + step.label;

    if (subStep !== undefined) {
      alertStr += ' and ' + subStep.label;
    }

    console.log(alertStr);

    if (step.key === this.state.currStep.key) {
      return;
    }

    let newSteps: ISubwayNavStep[] = [];
    newSteps = this.state.steps;

    let currStep = this.state.currStep;

    let foundClickedStep: boolean = false;

    newSteps.map((stepObj: ISubwayNavStep) => {
      if (stepObj.key === this.state.currStep.key) {
        stepObj.state = SubwayNavStepState.Completed;
      } else if (stepObj.key === step.key) {
        stepObj.state = SubwayNavStepState.Current;
        currStep = stepObj;
        foundClickedStep = true;
      } else if (!foundClickedStep && stepObj.state === SubwayNavStepState.NotStarted) {
        stepObj.state = SubwayNavStepState.Skipped;
      }
    });

    this.setState({ steps: newSteps, currStep: currStep });
  }
}
