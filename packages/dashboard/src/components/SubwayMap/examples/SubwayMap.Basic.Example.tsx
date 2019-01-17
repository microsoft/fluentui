import * as React from 'react';
import { SubwayMap } from '../SubwayMap';
import { ISubwayMapStep } from '../SubwayMap.types';

export class SubwayMapBasicExample extends React.Component<any, any> {
  public render(): JSX.Element {
    let steps: ISubwayMapStep[] = [];

    const data0: ISubwayMapStep = {
      label: 'Step 0',
      contentArea: { content: <div>Step 0 Under construction</div>, formComplete: false, formError: true }
    };
    const data1: ISubwayMapStep = {
      label: 'Step 1',
      contentArea: { content: <div>Step 1 Under construction</div>, formComplete: true }
    };
    const data2: ISubwayMapStep = {
      label: 'Step 2',
      contentArea: { content: <div>Step 2 Under construction</div>, formComplete: false, formError: true }
    };
    const data3: ISubwayMapStep = {
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
}
