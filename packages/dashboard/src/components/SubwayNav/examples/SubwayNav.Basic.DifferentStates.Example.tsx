import * as React from 'react';
import { generateRandomId } from '@uifabric/dashboard/lib/components/SubwayNav/examples/SubwayNav.Util';
import { SubwayNav } from '@uifabric/dashboard/lib/components/SubwayNav/SubwayNav';
import { ISubwayNavStep, SubwayNavStepState } from '@uifabric/dashboard/lib/components/SubwayNav/SubwayNavStep.types';

export class SubwayNavBasicDifferentStatesExample extends React.Component<any, any> {
  public render(): JSX.Element {
    let steps: ISubwayNavStep[] = [];

    const data0: ISubwayNavStep = {
      key: generateRandomId(),
      label: 'Step 0',
      state: SubwayNavStepState.Current,
      /*isCurrentStep: true,
      formError: true,
      formViewed: true,*/
      onClickStep: this._handleClickStep
    };
    const data1: ISubwayNavStep = {
      key: generateRandomId(),
      label: 'Step 1',
      state: SubwayNavStepState.Error,
      onClickStep: this._handleClickStep
    };
    const data2: ISubwayNavStep = {
      key: generateRandomId(),
      label: 'Step 2',
      state: SubwayNavStepState.Completed,
      onClickStep: this._handleClickStep
    };
    const data3: ISubwayNavStep = {
      key: generateRandomId(),
      label: 'Step 3',
      state: SubwayNavStepState.Skipped,
      onClickStep: this._handleClickStep
    };
    const data4: ISubwayNavStep = {
      key: generateRandomId(),
      label: 'Step 4',
      state: SubwayNavStepState.ViewedNotCompleted,
      onClickStep: this._handleClickStep
    };
    const data5: ISubwayNavStep = {
      key: generateRandomId(),
      label: 'Step 5',
      state: SubwayNavStepState.Completed,
      onClickStep: this._handleClickStep
    };

    steps.push(data0);
    steps.push(data1);
    steps.push(data2);
    steps.push(data3);
    steps.push(data4);
    steps.push(data5);

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
