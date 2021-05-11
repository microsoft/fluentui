import * as React from 'react';
import * as _ from 'lodash';
import { DecorativeAxis, FlexibleXYPlot, HorizontalGridLines, LabelSeries, LineSeries, XAxis } from 'react-vis';
import BundleSizeChartTooltip from './BundleSizeChartTooltip';
import { PerfData } from './PerfDataContext';

export type BundleSizeChartProps = { perfData: PerfData };

const sampleToXAxis = sample => {
  return new Date(sample.ts).getTime();
};

const formatXAxis = val => {
  const date = new Date(val);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

/**
 * Draws a bundle size chart for all items in perfData.bundleSize.
 * Shows tooltip with details for selected build on mouse hover.
 * x-axis is a build number
 * y-axis is a bundle size
 */
const BundleSizeChart: React.FC<BundleSizeChartProps> = ({ perfData }) => {
  const availableCharts: string[] = perfData
    .reduce((acc, next) => {
      return Array.from(new Set([...acc, ...Object.keys(next.bundleSize)]));
    }, [] as string[])
    .sort();

  const [nearestX, setNearestX] = React.useState<number>();

  const sizeColor = '#555555';
  const tagColor = '#888888';

  const lineSeries = (key, data = 'size', props) =>
    availableCharts.map((chartName, index) => (
      <LineSeries
        {...props}
        key={chartName + key}
        data={_.filter(
          perfData.map(sample => {
            const y = _.get(sample, `bundleSize.${chartName}.${data}`);
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

      {lineSeries('curve-size', 'size', {
        opacity: 0.8,
        stroke: sizeColor,
        strokeWidth: '2px',
      })}

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

      {nearestX && (
        <BundleSizeChartTooltip x={nearestX} data={perfData.find(sample => sampleToXAxis(sample) === nearestX)} />
      )}
    </FlexibleXYPlot>
  );
};

export default BundleSizeChart;
