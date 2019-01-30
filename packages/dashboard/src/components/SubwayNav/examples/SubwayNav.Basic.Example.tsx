import * as React from 'react';
import { generateRandomId } from './SubwayNav.Util';
import { SubwayNav } from '../SubwayNav';
import { ISubwayNavStep, SubwayNavStepState } from '../SubwayNav.types';

export interface ISubwayNavBasicExampleState {
  currStep: ISubwayNavStep;
  steps: ISubwayNavStep[];
}


export class SubwayNavBasicExample extends React.Component<any, ISubwayNavBasicExampleState> {
  private steps: ISubwayNavStep[] = [];

  constructor(props: any) {
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

  componentDidMount() {
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

    let newSteps = this.state.steps;
    let currStep = this.state.currStep;

    newSteps.map((stepObj) => {
      if (stepObj.key === step.key) {
        stepObj.state = SubwayNavStepState.Current;
        currStep = stepObj;
      }

      if (stepObj.key === this.state.currStep.key) {
        stepObj.state = SubwayNavStepState.Completed;
      }
    });

    this.setState({ steps: newSteps, currStep: currStep  });
    /*this.steps.forEach(function(obj) {
      stepIdx++;
      if (obj.key === step.key) {
        step.state = SubwayNavStepState.Current;

        if (step.subSteps !== undefined && step.subSteps.length > 0) {
          step.subSteps.forEach(function(subObj) {
            subStepIdx++;
            if (subObj.key === subStep!.key) {
              subStep!.state = SubwayNavStepState.Current;
              return;
            }
          });
        }
        return;
      }
    });*/

    if (subStep !== undefined) {
      alertStr += ' and ' + subStep.label;
    }

    console.log(alertStr);
  }
}
