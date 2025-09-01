import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { DataVizPalette, GanttChart, GanttChartDataPoint } from '@fluentui/react-charts';
import { Switch, makeStyles, shorthands } from '@fluentui/react-components';

const data: GanttChartDataPoint[] = [
  {
    x: {
      start: new Date('2017-01-01'),
      end: new Date('2017-02-02'),
    },
    y: 'Job-1',
    legend: 'Complete',
    color: DataVizPalette.success,
    gradient: ['#0C5E0C', '#107C10'],
  },
  {
    x: {
      start: new Date('2017-01-17'),
      end: new Date('2017-02-17'),
    },
    y: 'Job-2',
    legend: 'Complete',
    color: DataVizPalette.success,
    gradient: ['#0C5E0C', '#107C10'],
  },
  {
    x: {
      start: new Date('2017-01-14'),
      end: new Date('2017-03-14'),
    },
    y: 'Job-4',
    legend: 'Complete',
    color: DataVizPalette.success,
    gradient: ['#0C5E0C', '#107C10'],
  },
  {
    x: {
      start: new Date('2017-02-15'),
      end: new Date('2017-03-15'),
    },
    y: 'Job-1',
    legend: 'Incomplete',
    color: DataVizPalette.warning,
    gradient: ['#DE590B', '#F7630C'],
  },
  {
    x: {
      start: new Date('2017-01-17'),
      end: new Date('2017-02-17'),
    },
    y: 'Job-2',
    legend: 'Not Started',
    color: DataVizPalette.error,
    gradient: ['#B10E1C', '#CC2635'],
  },
  {
    x: {
      start: new Date('2017-03-10'),
      end: new Date('2017-03-20'),
    },
    y: 'Job-3',
    legend: 'Not Started',
    color: DataVizPalette.error,
    gradient: ['#B10E1C', '#CC2635'],
  },
  {
    x: {
      start: new Date('2017-04-01'),
      end: new Date('2017-04-20'),
    },
    y: 'Job-3',
    legend: 'Not Started',
    color: DataVizPalette.error,
    gradient: ['#B10E1C', '#CC2635'],
  },
  {
    x: {
      start: new Date('2017-05-18'),
      end: new Date(new Date('2017-06-18')),
    },
    y: 'Job-3',
    legend: 'Not Started',
    color: DataVizPalette.error,
    gradient: ['#B10E1C', '#CC2635'],
  },
];

const useStyles = makeStyles({
  container: {
    ...shorthands.padding('16px'),
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  sliderGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    minWidth: '180px',
  },
  chartWrapper: {
    marginTop: '10px',
  },
});

export const GanttChartGrouped = (): JSXElement => {
  const styles = useStyles();
  const [width, setWidth] = React.useState(600);
  const [height, setHeight] = React.useState(350);
  const [enableGradient, setEnableGradient] = React.useState(false);
  const [roundedCorners, setRoundedCorners] = React.useState(false);
  const [legendMultiSelect, setLegendMultiSelect] = React.useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.sliderGroup}>
          <label htmlFor="width-slider">Width:</label>
          <input
            type="range"
            value={width}
            min={0}
            max={1000}
            id="width-slider"
            onChange={e => setWidth(parseInt(e.target.value, 10))}
            aria-valuetext={`Width: ${width}`}
          />
          <span>{width}</span>
        </div>
        <div className={styles.sliderGroup}>
          <label htmlFor="height-slider">Height:</label>
          <input
            type="range"
            value={height}
            min={0}
            max={1000}
            id="height-slider"
            onChange={e => setHeight(parseInt(e.target.value, 10))}
            aria-valuetext={`Height: ${height}`}
          />
          <span>{height}</span>
        </div>
      </div>
      <div className={styles.row}>
        <Switch
          label="Enable Gradient"
          checked={enableGradient}
          onChange={(_, val) => setEnableGradient(!!val.checked)}
        />
        <Switch
          label="Rounded Corners"
          checked={roundedCorners}
          onChange={(_, val) => setRoundedCorners(!!val.checked)}
        />
        <Switch
          label="Select Multiple Legends"
          checked={legendMultiSelect}
          onChange={(_, val) => setLegendMultiSelect(!!val.checked)}
        />
      </div>
      <div className={styles.chartWrapper} style={{ width, height }}>
        <GanttChart
          data={data}
          showYAxisLables
          width={width}
          height={height}
          enableGradient={enableGradient}
          roundCorners={roundedCorners}
          legendProps={{
            canSelectMultipleLegends: legendMultiSelect,
          }}
        />
      </div>
    </div>
  );
};
GanttChartGrouped.parameters = {
  docs: {
    description: {},
  },
};
