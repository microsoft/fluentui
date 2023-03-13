import * as React from 'react';
import { GaugeChart } from '@fluentui/react-charting';

export class GaugeChartBasicExample extends React.Component {
  public render(): React.ReactNode {
    return (
      <GaugeChart
        segments={[
          { size: 33, color: '#C50F1F' },
          { size: 34, color: '#F2610C' },
          { size: 33, color: '#107C10' },
        ]}
        currentValue={50}
      />
    );
  }
}
