import * as React from 'react';
import { Sparkline, ISparklineProps } from '@fluentui/react-charting';

interface ISparklineState {}

export class SparklineChartBasicExample extends React.Component<{}, ISparklineState> {
  constructor(props: ISparklineProps) {
    super(props);
  }
  public render(): JSX.Element {
    return <div>{this._createSparklineTable()}</div>;
  }

  private _createSparklineTable(): JSX.Element {
    return (
      <>
        <tr>
          <td>Row 1</td>
          <td>
            <Sparkline
              inpData={`xVal,close
              1,58.13
              2,140.98
              3,20.00
              4,89.70
              5,99.00
              6,13.28`}
            ></Sparkline>
          </td>
        </tr>
        <tr>
          <td>Row 2</td>
          <td>
            <Sparkline
              inpData={`xVal,close
              1,29.13
              2,70.98
              3,10.00
              4,46.70
              5,55.00
              6,45.28`}
            ></Sparkline>
          </td>
        </tr>
        <tr>
          <td>Row 3</td>
          <td>
            <Sparkline
              inpData={`xVal,close
              1,86.21
              2,101.98
              3,10.00
              4,87.70
              5,3.00
              6,42.28`}
            ></Sparkline>
          </td>
        </tr>
        <tr>
          <td>Row 4</td>
          <td>
            <Sparkline
              inpData={`xVal,close
              1,12.13
              2,340.98
              3,25.00
              4,68.70
              5,54.00
              6,22.28`}
            ></Sparkline>
          </td>
        </tr>
        <tr>
          <td>Row 5</td>
          <td>
            <Sparkline
              inpData={`xVal,close
              1,87.13
              2,24.98
              3,63.00
              4,6.70
              5,14.00
              6,103.28`}
            ></Sparkline>
          </td>
        </tr>
        <tr>
          <td>Row 6</td>
          <td>
            <Sparkline
              inpData={`xVal,close
              1,73.13
              2,125.98
              3,86.00
              4,49.70
              5,252.00
              6,23.28`}
            ></Sparkline>
          </td>
        </tr>
        <tr>
          <td>Row 7</td>
          <td>
            <Sparkline
              inpData={`xVal,close
              1,10.13
              2,51.98
              3,210.00
              4,46.70
              5,305.00
              6,12.28`}
            ></Sparkline>
          </td>
        </tr>
      </>
    );
  }
}
