import * as _ from 'lodash';
import * as React from 'react';
import { Crosshair } from 'react-vis';
import { PerfSample } from './PerfDataContext';

const PerfChartTooltip = ({ x, data, ...rest }: { x: number; data: PerfSample }) => {
  return (
    <Crosshair {...rest} values={[{ x, y: 20 }]}>
      <div style={{ background: '#555', color: 'white', padding: '.5em' }}>
        <div>Build:&nbsp;{data.build}</div>
        <div>Date:&nbsp;{data.ts}</div>
        <table className="tooltip">
          <thead>
            <tr>
              <th>Example</th>
              <th>Min</th>
              <th>Median</th>
              <th>Max</th>
              <th>TPI</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data.performance)
              .sort()
              .map(chartName => (
                <tr key={chartName}>
                  <td>{chartName}</td>
                  <td>{_.get(data, `performance.${chartName}.actualTime.min`, '-')}</td>
                  <td>{_.get(data, `performance.${chartName}.actualTime.median`, '-')}</td>
                  <td>{_.get(data, `performance.${chartName}.actualTime.max`, '-')}</td>
                  <td>{_.get(data, `performance.${chartName}.flamegrill.extended.tpi`, '-')}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Crosshair>
  );
};

export default PerfChartTooltip;
