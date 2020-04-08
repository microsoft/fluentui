import * as _ from 'lodash';
import * as React from 'react';
import { Crosshair } from 'react-vis';
import { PerfSample } from './PerfDataContext';
import { ResourcesChartValues } from './ResourcesChartValues';

const values: ResourcesChartValues[] = [
  'Documents',
  'Frames',
  'JSEventListeners',
  'Nodes',
  'LayoutCount',
  'RecalcStyleCount',
  'LayoutDuration',
  'RecalcStyleDuration',
  'ScriptDuration',
  'TaskDuration',
  'JSHeapUsedSize',
  'JSHeapTotalSize',
];

const ResourcesChartTooltip = ({ x, data, ...rest }: { x: number; data: PerfSample }) => {
  return (
    <Crosshair {...rest} values={[{ x, y: 20 }]}>
      <div style={{ background: '#555', color: 'white', padding: '.5em' }}>
        <div>Build:&nbsp;{data.build}</div>
        <div>Date:&nbsp;{data.ts}</div>
        <table className="tooltip">
          <thead>
            <tr>
              <th>Data</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data.performance)
              .sort()
              .map(chartName =>
                values.map(lineName => (
                  <tr key={`${chartName}-${lineName}`}>
                    <td>{lineName}</td>
                    <td>{_.get(data, `performance.${chartName}.flamegrill.profile.metrics.${lineName}`, '-')}</td>
                  </tr>
                )),
              )}
          </tbody>
        </table>
      </div>
    </Crosshair>
  );
};

export default ResourcesChartTooltip;
