import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  GroupedVerticalBarChart,
  GroupedVerticalBarChartProps,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charts';
import { Field, Label, Radio, RadioGroup, Slider, Switch, useId } from '@fluentui/react-components';

const chartData: GroupedVerticalBarChartProps['dataV2'] = [
  {
    type: 'bar',
    legend: '2022',
    data: [
      {
        x: 'Jan - Mar',
        y: 33000,
      },
      {
        x: 'Apr - Jun',
        y: 33000,
      },
      {
        x: 'Jul - Sep',
        y: 14000,
      },
      {
        x: 'Oct - Dec',
        y: -33000,
      },
    ],
    color: getColorFromToken(DataVizPalette.color3),
  },
  {
    type: 'bar',
    legend: '2023',
    data: [
      {
        x: 'Jan - Mar',
        y: -44000,
      },
      {
        x: 'Apr - Jun',
        y: -3000,
      },
      {
        x: 'Jul - Sep',
        y: 50000,
      },
      {
        x: 'Oct - Dec',
        y: 3000,
      },
    ],
    color: getColorFromToken(DataVizPalette.color4),
  },
  {
    type: 'bar',
    legend: '2024',
    data: [
      {
        x: 'Jan - Mar',
        y: -54000,
      },
      {
        x: 'Apr - Jun',
        y: 9000,
      },
      {
        x: 'Jul - Sep',
        y: -60000,
      },
      {
        x: 'Oct - Dec',
        y: -6000,
      },
    ],
    color: getColorFromToken(DataVizPalette.color5),
  },
  {
    type: 'bar',
    legend: '2021',
    data: [
      {
        x: 'Jan - Mar',
        y: 24000,
      },
      {
        x: 'Apr - Jun',
        y: -12000,
      },
      {
        x: 'Jul - Sep',
        y: -10000,
      },
      {
        x: 'Oct - Dec',
        y: -15000,
      },
    ],
    color: getColorFromToken(DataVizPalette.color6),
  },
  {
    type: 'line',
    legend: 'From_Legacy_to_O365',
    data: [
      {
        x: 'Jan - Mar',
        y: -21600,
      },
      {
        x: 'Apr - Jun',
        y: 21812,
      },
      {
        x: 'Jul - Sep',
        y: -21712,
      },
      {
        x: 'Oct - Dec',
        y: 24800,
      },
    ],
    color: DataVizPalette.color1,
    lineOptions: {
      lineBorderWidth: 2,
    },
  },
  {
    type: 'line',
    legend: 'All',
    data: [
      {
        x: 'Jan - Mar',
        y: 29700,
      },
      {
        x: 'Apr - Jun',
        y: -28400,
      },
      {
        x: 'Jul - Sep',
        y: 28200,
      },
      {
        x: 'Oct - Dec',
        y: -29400,
      },
    ],
    color: DataVizPalette.color2,
    lineOptions: {
      lineBorderWidth: 2,
    },
  },
];

export const GroupedVerticalBarChartLine = (): JSXElement => {
  const _widthSliderId = useId('width-slider-');
  const _heightSliderId = useId('height-slider-');

  const [width, setWidth] = React.useState(700);
  const [height, setHeight] = React.useState(400);
  const [calloutVariant, setCalloutVariant] = React.useState<string>('SingleCallout');
  const [selectMultipleLegends, setSelectMultipleLegends] = React.useState<boolean>(false);

  return (
    <div className="containerDiv">
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginInlineEnd: 20 }}>
          <Label htmlFor={_widthSliderId}>Change width:</Label>
          <Slider
            value={width}
            min={200}
            max={1000}
            id={_widthSliderId}
            onChange={(_, data) => setWidth(data.value)}
            aria-valuetext={`Width slider: ${width}`}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Label htmlFor={_heightSliderId}>Change height:</Label>
          <Slider
            value={height}
            min={200}
            max={1000}
            id={_heightSliderId}
            onChange={(_, data) => setHeight(data.value)}
            aria-valuetext={`Height slider: ${height}`}
          />
        </div>
      </div>
      <Field label="Pick a callout variant:" style={{ marginTop: 10 }}>
        <RadioGroup layout="horizontal" value={calloutVariant} onChange={(_, data) => setCalloutVariant(data.value)}>
          <Radio value="SingleCallout" label="Single Callout" />
          <Radio value="StackCallout" label="Stack Callout" />
        </RadioGroup>
      </Field>
      <Field label="Select multiple legends:" style={{ marginTop: 10 }}>
        <Switch
          checked={selectMultipleLegends}
          label={selectMultipleLegends ? 'ON' : 'OFF'}
          onChange={ev => setSelectMultipleLegends(ev.currentTarget.checked)}
        />
      </Field>
      <div style={{ width, height }}>
        <GroupedVerticalBarChart
          chartTitle="Grouped Vertical Bar chart line example"
          dataV2={chartData}
          height={height}
          width={width}
          isCalloutForStack={calloutVariant === 'StackCallout'}
          reflowProps={{ mode: 'min-width' }}
          legendProps={{
            canSelectMultipleLegends: selectMultipleLegends,
          }}
        />
      </div>
    </div>
  );
};

GroupedVerticalBarChartLine.parameters = {
  docs: {
    description: {},
  },
};
