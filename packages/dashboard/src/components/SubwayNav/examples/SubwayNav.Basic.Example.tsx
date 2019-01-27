import * as React from 'react';
import { generateRandomId } from './SubwayNav.Util';
import { SubwayNav } from '../SubwayNav';
import { ISubwayNavStep, SubwayNavStepState } from '../SubwayNav.types';

export class SubwayNavBasicExample extends React.Component<any, any> {
  public render(): JSX.Element {
    let steps: ISubwayNavStep[] = [];

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

    steps.push(data0);
    steps.push(data1);
    steps.push(data2);
    steps.push(data3);

    return (
      <div>
        <SubwayNav steps={steps} />
      </div>
    );
  }

  private _handleClickStep(step: ISubwayNavStep, subStep: ISubwayNavStep | undefined): void {
    let alertStr = 'Clicked ' + step.label;
    if (subStep !== undefined) {
      alertStr += ' and ' + subStep.label;
    }

    console.log(alertStr);
  }
}
