import * as React from 'react';
import { SubwayMap } from '../SubwayMap';
import { ISubwayMapStep } from '../SubwayMap.types';

export class SubwayMapSubStepsExample extends React.Component<any, any> {
  public render(): JSX.Element {
    let steps: ISubwayMapStep[] = [];

    let subSteps: ISubwayMapStep[] = [];

    const substep0: ISubwayMapStep = {
      key: this._generateRandomId(),
      label: 'Sub Step 0',
      contentArea: { content: <div>Sub Step 0 Under construction</div>, formComplete: true }
    };
    const substep1: ISubwayMapStep = {
      key: this._generateRandomId(),
      label: 'Sub Step 1',
      contentArea: { content: <div>Sub Step 1 Under construction</div>, formComplete: true }
    };
    const substep2: ISubwayMapStep = {
      key: this._generateRandomId(),
      label: 'Sub Step 2',
      contentArea: { content: <div>Sub Step 2 Under construction</div>, formComplete: false }
    };

    subSteps.push(substep0);
    subSteps.push(substep1);
    subSteps.push(substep2);

    const data0: ISubwayMapStep = {
      key: this._generateRandomId(),
      label: 'Step 0',
      contentArea: { content: <div>Step 0 Under construction</div>, formComplete: false, formError: true }
    };
    const data1: ISubwayMapStep = {
      key: this._generateRandomId(),
      label: 'Step 1',
      contentArea: { content: <div>Step 1 Under construction</div>, formComplete: true },
      subSteps: subSteps
    };
    const data2: ISubwayMapStep = {
      key: this._generateRandomId(),
      label: 'Step 2',
      contentArea: { content: <div>Step 2 Under construction</div>, formComplete: false, formError: true }
    };
    const data3: ISubwayMapStep = {
      key: this._generateRandomId(),
      label: 'Step 3',
      contentArea: { content: <div>Step 3 Under construction</div>, formComplete: false }
    };

    steps.push(data0);
    steps.push(data1);
    steps.push(data2);
    steps.push(data3);

    return (
      <div>
        <SubwayMap steps={steps} allowSkipStep={false} />
      </div>
    );
  }

  /**
   * generate Random id
   */
  private _generateRandomId(): string {
    return (
      Math.random()
        .toString(36)
        .substring(2) + new Date().getTime().toString(36)
    );
  }
}
