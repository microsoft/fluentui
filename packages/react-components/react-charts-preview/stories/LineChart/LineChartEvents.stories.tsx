import * as React from 'react';
import {  ILineChartProps, LineChart, IChartProps} from '../../src/LineChart';
import { DataVizPalette } from '../../src/utilities/colors';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import * as d3 from 'd3-format';
import { Switch } from '@fluentui/react-components';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { ColorPicker, IColor } from '@fluentui/react';

const calloutItemStyle = mergeStyles({
  borderBottom: '1px solid #D9D9D9',
  padding: '3px',
});

export const LCEvents = (props: ILineChartProps) => {
  const [width, setWidth] = React.useState<number>(700);
  const [height, setHeight] = React.useState<number>(300);
  const [allowMultipleShapes, setAllowMultipleShapes] = React.useState<boolean>(false);
  const [customEventAnnotationColor, setCustomEventAnnotationColor] = React.useState<string | undefined>(undefined);

  const _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(parseInt(e.target.value, 10));
  };

  const _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(parseInt(e.target.value, 10));
  };

  const _onShapeChange = React.useCallback(
    ev => {
      setAllowMultipleShapes(ev.currentTarget.checked);
    },
    [allowMultipleShapes],
  );
  const _onToggleCustomEventAnnotationColor = (ev: React.FormEvent<HTMLElement>, checked: boolean) => {
    setCustomEventAnnotationColor(checked ? '#111111' : undefined);
  };

  const _onChangeCustomEventAnnotationColor = (ev: React.SyntheticEvent<HTMLElement, Event>, color: IColor) => {
    setCustomEventAnnotationColor(color.str);
  };

  const data: IChartProps = {
    chartTitle: 'Line Chart',
    lineChartData: [
      {
        legend: 'From_Legacy_to_O365',
        data: [
          {
            x: new Date('2020-03-03T00:00:00.000Z'),
            y: 297,
          },
          {
            x: new Date('2020-03-04T00:00:00.000Z'),
            y: 284,
          },
          {
            x: new Date('2020-03-05T00:00:00.000Z'),
            y: 282,
          },
          {
            x: new Date('2020-03-06T00:00:00.000Z'),
            y: 294,
          },
          {
            x: new Date('2020-03-07T00:00:00.000Z'),
            y: 294,
          },
          {
            x: new Date('2020-03-08T00:00:00.000Z'),
            y: 300,
          },
          {
            x: new Date('2020-03-09T00:00:00.000Z'),
            y: 298,
          },
        ],
        color: DataVizPalette.color8,
        lineOptions: {
          lineBorderWidth: '4',
        },
      },
      {
        legend: 'All',
        data: [
          {
            x: new Date('2020-03-03T00:00:00.000Z'),
            y: 292,
          },
          {
            x: new Date('2020-03-04T00:00:00.000Z'),
            y: 287,
          },
          {
            x: new Date('2020-03-05T00:00:00.000Z'),
            y: 287,
          },
          {
            x: new Date('2020-03-06T00:00:00.000Z'),
            y: 292,
          },
          {
            x: new Date('2020-03-07T00:00:00.000Z'),
            y: 287,
          },
          {
            x: new Date('2020-03-08T00:00:00.000Z'),
            y: 297,
          },
          {
            x: new Date('2020-03-09T00:00:00.000Z'),
            y: 292,
          },
        ],
        color: DataVizPalette.color10,
        lineOptions: {
          lineBorderWidth: '4',
        },
      },
    ],
  };

  const rootStyle = {
    width: `${width}px`,
    height: `${height}px`,
  };

  return (
    <>
      <label htmlFor="changeWidth_Events">Change Width:</label>
      <input
        type="range"
        value={width}
        min={200}
        max={1000}
        onChange={_onWidthChange}
        id="changeWidth_Events"
        aria-valuetext={`ChangeWidthSlider${width}`}
      />
      <label htmlFor="changeHeight_Events">Change Height:</label>
      <input
        type="range"
        value={height}
        min={200}
        max={1000}
        id="changeHeight_Events"
        onChange={_onHeightChange}
        aria-valuetext={`ChangeHeightslider${height}`}
      />
       <Switch
        label={allowMultipleShapes ? 'Disable multiple shapes for each line' : 'Enable multiple shapes for each line'}
        onChange={_onShapeChange}
        checked={allowMultipleShapes}
      />
      <Checkbox
        label="Use Custom Color for Event Annotation"
        checked={customEventAnnotationColor !== undefined}
        onChange={_onToggleCustomEventAnnotationColor}
      />
      {customEventAnnotationColor && (
        <ColorPicker onChange={_onChangeCustomEventAnnotationColor} color={customEventAnnotationColor} />
      )}
      <div style={rootStyle}>
        <LineChart
          data={data}
          legendsOverflowText={'Overflow Items'}
          yMinValue={282}
          yMaxValue={301}
          yAxisTickFormat={d3.format('$,')}
          tickFormat={'%m/%d'}
          allowMultipleShapesForPoints={allowMultipleShapes}
          enableReflow={true}
          tickValues={[
            new Date('2020-03-03'),
            new Date('2020-03-04'),
            new Date('2020-03-05'),
            new Date('2020-03-06'),
            new Date('2020-03-07'),
            new Date('2020-03-08'),
            new Date('2020-03-09'),
          ]}
          eventAnnotationProps={{
            events: [
              {
                event: 'event 1',
                date: new Date('2020-03-04T00:00:00.000Z'),
                onRenderCard: () => <div className={calloutItemStyle}>event 1 message</div>,
              },
              {
                event: 'event 2',
                date: new Date('2020-03-04T00:00:00.000Z'),
                onRenderCard: () => <div className={calloutItemStyle}>event 2 message</div>,
              },
              {
                event: 'event 3',
                date: new Date('2020-03-04T00:00:00.000Z'),
                onRenderCard: () => <div className={calloutItemStyle}>event 3 message</div>,
              },
              {
                event: 'event 4',
                date: new Date('2020-03-06T00:00:00.000Z'),
                onRenderCard: () => <div className={calloutItemStyle}>event 4 message</div>,
              },
              {
                event: 'event 5',
                date: new Date('2020-03-08T00:00:00.000Z'),
                onRenderCard: () => <div className={calloutItemStyle}>event 5 message</div>,
              },
            ],
            strokeColor: customEventAnnotationColor,
            labelColor: customEventAnnotationColor,
            labelHeight: 18,
            labelWidth: 50,
            mergedLabel: (count: number) => `${count} events`,
          }}
          height={height}
          width={width}
          enablePerfOptimization={true}
        />
      </div>
    </>
  );
};
LCEvents.parameters = {
  docs: {
    description: {
      story: 'A Calendar Compat can be modified to allow selecting a contiguous (5 day) work week.',
    },
  },
};
