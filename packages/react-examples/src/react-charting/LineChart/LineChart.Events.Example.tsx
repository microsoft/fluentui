import * as React from 'react';
import { IChartProps, ILineChartProps, LineChart, DataVizPalette } from '@fluentui/react-charting';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import * as d3 from 'd3-format';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { ColorPicker, IColor } from '@fluentui/react';

const calloutItemStyle = mergeStyles({
  borderBottom: '1px solid #D9D9D9',
  padding: '3px',
});

interface ILineChartEventsExampleState {
  width: number;
  height: number;
  allowMultipleShapes: boolean;
  customEventAnnotationColor: string | undefined;
}

export class LineChartEventsExample extends React.Component<{}, ILineChartEventsExampleState> {
  constructor(props: ILineChartProps) {
    super(props);
    this.state = {
      width: 700,
      height: 330,
      allowMultipleShapes: false,
      customEventAnnotationColor: undefined,
    };
  }

  public render(): JSX.Element {
    return (
      <>
        <label htmlFor="changeWidth_Events">Change Width:</label>
        <input
          type="range"
          value={this.state.width}
          min={200}
          max={1000}
          onChange={this._onWidthChange}
          id="changeWidth_Events"
          aria-valuetext={`ChangeWidthSlider${this.state.width}`}
        />
        <label htmlFor="changeHeight_Events">Change Height:</label>
        <input
          type="range"
          value={this.state.height}
          min={200}
          max={1000}
          id="changeHeight_Events"
          onChange={this._onHeightChange}
          aria-valuetext={`ChangeHeightslider${this.state.height}`}
        />
        <Toggle
          label="Enabled  multiple shapes for each line"
          onText="On"
          offText="Off"
          onChange={this._onShapeChange}
          checked={this.state.allowMultipleShapes}
        />
        <Checkbox
          label="Use Custom Color for Event Annotation"
          checked={this.state.customEventAnnotationColor !== undefined}
          onChange={this._onToggleCustomEventAnnotationColor}
        />
        {this.state.customEventAnnotationColor && (
          <ColorPicker
            onChange={this._onChangeCustomEventAnnotationColor}
            color={this.state.customEventAnnotationColor}
          />
        )}
        <div>{this._basicExample()}</div>
      </>
    );
  }

  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: parseInt(e.target.value, 10) });
  };
  private _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ height: parseInt(e.target.value, 10) });
  };
  private _onShapeChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ allowMultipleShapes: checked });
  };
  private _onToggleCustomEventAnnotationColor = (ev: React.FormEvent<HTMLElement>, checked: boolean) => {
    this.setState({ customEventAnnotationColor: checked ? '#111111' : undefined });
  };
  private _onChangeCustomEventAnnotationColor = (ev: React.SyntheticEvent<HTMLElement, Event>, color: IColor) => {
    this.setState({ customEventAnnotationColor: color.str });
  };

  private _basicExample(): JSX.Element {
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
      width: `${this.state.width}px`,
      height: `${this.state.height}px`,
    };

    return (
      <div style={rootStyle}>
        <LineChart
          data={data}
          legendsOverflowText={'Overflow Items'}
          yMinValue={282}
          yMaxValue={301}
          yAxisTickFormat={d3.format('$,')}
          tickFormat={'%m/%d'}
          allowMultipleShapesForPoints={this.state.allowMultipleShapes}
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
            strokeColor: this.state.customEventAnnotationColor,
            labelColor: this.state.customEventAnnotationColor,
            labelHeight: 18,
            labelWidth: 50,
            mergedLabel: (count: number) => `${count} events`,
          }}
          height={this.state.height}
          width={this.state.width}
          enablePerfOptimization={true}
        />
      </div>
    );
  }
}
