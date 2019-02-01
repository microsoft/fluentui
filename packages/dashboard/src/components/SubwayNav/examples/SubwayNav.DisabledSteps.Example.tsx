import * as React from 'react';
import { generateRandomId } from '@uifabric/dashboard/lib/components/SubwayNav/examples/SubwayNav.Util';
import { SubwayNav } from '@uifabric/dashboard/lib/components/SubwayNav/SubwayNav';
import { ISubwayNavStep, SubwayNavStepState } from '@uifabric/dashboard/lib/components/SubwayNav/SubwayNav.types';

export class SubwayNavDisabledStepsExample extends React.Component<any, any> {
  public render(): JSX.Element {
    let steps: ISubwayNavStep[] = [];
    let subSteps: ISubwayNavStep[] = [];

    const substep0: ISubwayNavStep = {
      key: generateRandomId(),
      label: 'Sub Step 0',
      state: SubwayNavStepState.Current,
      isSubStep: true,
      onClickStep: this._handleClickStep
    };
    const substep1: ISubwayNavStep = {
      key: generateRandomId(),
      label: 'Sub Step 1',
      state: SubwayNavStepState.NotStarted,
      disabled: true,
      isSubStep: true,
      onClickStep: this._handleClickStep
    };
    const substep2: ISubwayNavStep = {
      key: generateRandomId(),
      label: 'Sub Step 2',
      state: SubwayNavStepState.NotStarted,
      disabled: true,
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
      onClickStep: this._handleClickStep,
      subSteps: subSteps
    };
    const data1: ISubwayNavStep = {
      key: generateRandomId(),
      label: 'Step 1',
      state: SubwayNavStepState.NotStarted,
      disabled: true,
      onClickStep: this._handleClickStep
    };
    const data2: ISubwayNavStep = {
      key: generateRandomId(),

      label: 'Step 2',
      state: SubwayNavStepState.NotStarted,
      disabled: true,
      onClickStep: this._handleClickStep
    };
    const data3: ISubwayNavStep = {
      key: generateRandomId(),
      label: 'Step 3',
      state: SubwayNavStepState.NotStarted,
      disabled: true,
      onClickStep: this._handleClickStep
    };
    const data4: ISubwayNavStep = {
      key: generateRandomId(),
      label: 'Step 4',
      state: SubwayNavStepState.NotStarted,
      disabled: true,
      onClickStep: this._handleClickStep
    };

    const data5: ISubwayNavStep = {
      key: generateRandomId(),
      label: 'Step 5',
      state: SubwayNavStepState.NotStarted,
      disabled: true,
      onClickStep: this._handleClickStep
    };

    const data6: ISubwayNavStep = {
      key: generateRandomId(),
      label: 'Step 6',
      state: SubwayNavStepState.NotStarted,
      disabled: true,
      onClickStep: this._handleClickStep
    };

    const data7: ISubwayNavStep = {
      key: generateRandomId(),
      label: 'Step 7',
      state: SubwayNavStepState.NotStarted,
      disabled: true,
      onClickStep: this._handleClickStep
    };

    const data8: ISubwayNavStep = {
      key: generateRandomId(),
      label: 'Step 8',
      state: SubwayNavStepState.NotStarted,
      disabled: true,
      onClickStep: this._handleClickStep
    };

    const data9: ISubwayNavStep = {
      key: generateRandomId(),
      label: 'Step 9',
      state: SubwayNavStepState.NotStarted,
      disabled: true,
      onClickStep: this._handleClickStep
    };

    steps.push(data0);
    steps.push(data1);
    steps.push(data2);
    steps.push(data3);
    steps.push(data4);
    steps.push(data5);
    steps.push(data6);
    steps.push(data7);
    steps.push(data8);
    steps.push(data9);

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
