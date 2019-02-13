import * as React from 'react';
import { generateRandomId } from './SubwayNav.Util';
import { SubwayNav } from '../SubwayNav';
import { ISubwayNavNodeProps, SubwayNavNodeState } from '../SubwayNode.types';

export interface ISubwayNavBasicExampleState {
  currStep: ISubwayNavNodeProps;
  steps: ISubwayNavNodeProps[];
}

export class SubwayNavBasicExample extends React.Component<{}, ISubwayNavBasicExampleState> {
  private steps: ISubwayNavNodeProps[] = [
    {
      id: generateRandomId(),
      label: 'Step 0 with a long label that needs to perform a text overflow with ellipsis in the end.',
      state: SubwayNavNodeState.Current,
      onClickStep: this._handleClickStep
    },
    {
      id: generateRandomId(),
      label: 'Step 1',
      state: SubwayNavNodeState.NotStarted,
      onClickStep: this._handleClickStep
    },
    {
      id: generateRandomId(),
      label: 'Step 2',
      state: SubwayNavNodeState.NotStarted,
      onClickStep: this._handleClickStep
    },
    {
      id: generateRandomId(),
      label: 'Step 3',
      state: SubwayNavNodeState.NotStarted,
      onClickStep: this._handleClickStep
    }
  ];

  constructor(props: {}) {
    super(props);
    this._handleClickStep = this._handleClickStep.bind(this);
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

  private _handleClickStep(step: ISubwayNavNodeProps): void {
    let alertStr = 'Clicked ' + step.label;
    console.log(alertStr);

    if (step.id === this.state.currStep.id) {
      return;
    }

    let newSteps: ISubwayNavNodeProps[] = [];
    newSteps = this.state.steps;

    let currStep = this.state.currStep;

    let foundClickedStep: boolean = false;

    newSteps.map((stepObj: ISubwayNavNodeProps) => {
      if (stepObj.id === this.state.currStep.id) {
        stepObj.state = SubwayNavNodeState.Completed;
      } else if (stepObj.id === step.id) {
        stepObj.state = SubwayNavNodeState.Current;
        currStep = stepObj;
        foundClickedStep = true;
      } else if (!foundClickedStep && stepObj.state === SubwayNavNodeState.NotStarted) {
        stepObj.state = SubwayNavNodeState.Skipped;
      }
    });

    this.setState({ steps: newSteps, currStep: currStep });
  }
}
