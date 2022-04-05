import * as React from 'react';
import * as _ from 'lodash';
import {
  DecorativeAxis,
  DiscreteColorLegend,
  FlexibleXYPlot,
  HorizontalGridLines,
  LabelSeries,
  LineSeries,
  XAxis,
  YAxis,
} from 'react-vis';
import { PerfData } from './PerfDataContext';

export type ChartDataSeries = {
  name: string;
  data: string;
  color: string;
  props?: object;
};

export type ChartProps = {
  perfData: PerfData;
  group: 'performance';
  yAxisLabel?: string;
  Tooltip;
  dataSeries: ChartDataSeries[];
};

const sampleToXAxis = sample => {
  return new Date(sample.ts).getTime();
};

const formatXAxis = val => {
  const date = new Date(val);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

const Chart: React.FC<ChartProps> = ({ perfData, yAxisLabel, group, Tooltip, dataSeries }) => {
  const availableCharts: string[] = perfData
    .reduce((acc, next) => {
      return Array.from(new Set([...acc, ...Object.keys(next[group])]));
    }, [] as string[])
    .sort();

  const [nearestX, setNearestX] = React.useState<number>();

  const tagColor = '#888888';

  const lineSeries = (key, data = 'actualTime.median', props) =>
    availableCharts.map((chartName, index) => (
      <LineSeries
        {...props}
        key={chartName + key}
        data={_.filter(
          perfData.map(sample => {
            const y = _.get(sample, `performance.${chartName}.${data}`);
            if (_.isUndefined(y)) {
              return undefined;
            }
            return {
              x: sampleToXAxis(sample),
              y,
            };
          }),
        )}
      />
    ));

  return (
    <FlexibleXYPlot
      onMouseLeave={() => {
        setNearestX(undefined);
      }}
    >
      <DiscreteColorLegend
        colors={dataSeries.map(d => d.color)}
        items={dataSeries.map(d => d.name)}
        orientation="horizontal"
        style={{ position: 'absolute', top: 0, right: 0, background: 'white' }}
      />
      {yAxisLabel && <YAxis title={yAxisLabel} />}
      <XAxis tickFormat={formatXAxis} tickLabelAngle={-30} />

      <HorizontalGridLines />

      {/* git tags */}
      {perfData
        .filter(sample => sample.tag)
        .map(sample => {
          const data = [
            { x: sampleToXAxis(sample), y: 0 },
            { x: sampleToXAxis(sample), y: 1000 },
          ];
          return (
            <DecorativeAxis
              key={sample.build}
              style={{
                ticks: { display: 'none' },
                text: { display: 'none' },
                line: { stroke: tagColor },
              }}
              axisStart={data[0]}
              axisEnd={data[1]}
              axisDomain={[data[0].y, data[1].y]}
            />
          );
        })}

      <LabelSeries
        allowOffsetToBeReversed
        data={perfData
          .filter(sample => sample.tag)
          .map(sample => ({
            x: sampleToXAxis(sample),
            y: 0,
            label: sample.tag,
            style: {
              fontSize: 10,
              fill: tagColor,
            },
            labelAnchorX: 'end',
            yOffset: 0,
            xOffset: 0,
          }))}
      />

      {dataSeries.map(d => lineSeries(`curve-${d.name}`, d.data, { stroke: d.color, ...d.props }))}

      <LineSeries
        opacity={0}
        key="vertical-axis-hack"
        data={perfData.map(sample => ({
          x: sampleToXAxis(sample),
          y: 0,
        }))}
        onNearestX={(d: { x: number }) => {
          setNearestX(d.x);
        }}
      />

      {nearestX && <Tooltip x={nearestX} data={perfData.find(sample => sampleToXAxis(sample) === nearestX)} />}
    </FlexibleXYPlot>
  );
};

export default Chart;
