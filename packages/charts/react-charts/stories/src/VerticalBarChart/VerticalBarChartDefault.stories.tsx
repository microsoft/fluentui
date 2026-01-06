import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { VerticalBarChart, VerticalBarChartDataPoint, LineChartLineOptions } from '@fluentui/react-charts';
import {
  Switch,
  Checkbox,
  CheckboxOnChangeData,
  Field,
  Radio,
  RadioGroup,
  RadioGroupOnChangeData,
  makeStyles,
  tokens,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  svgTooltip: {
    fill: tokens.colorNeutralBackground2,
  },
});

export const VerticalBarDefault = (): JSXElement => {
  const classes = useStyles();
  const [width, setWidth] = React.useState<number>(650);
  const [height, setHeight] = React.useState<number>(350);
  const [isCalloutselected, setIsCalloutSelected] = React.useState<boolean>(false);
  const [useSingleColor, setUseSingleColor] = React.useState<boolean>(false);
  const [hideLabels, setHideLabels] = React.useState<boolean>(false);
  const [showAxisTitles, setShowAxisTitles] = React.useState<boolean>(false);
  const [selectMultipleLegends, setSelectMultipleLegends] = React.useState<boolean>(false);

  const _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(parseInt(e.target.value, 10));
  };
  const _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(parseInt(e.target.value, 10));
  };
  const _onChange = (ev: React.FormEvent<HTMLDivElement>, data: RadioGroupOnChangeData): void => {
    if (isCalloutselected) {
      setIsCalloutSelected(false);
    } else {
      setIsCalloutSelected(true);
    }
  };
  const _onCheckChange = (ev: React.ChangeEvent<HTMLElement>, checked: CheckboxOnChangeData) => {
    setUseSingleColor(checked.checked as boolean);
  };
  const _onHideLabelsCheckChange = (ev: React.ChangeEvent<HTMLElement>, checked: CheckboxOnChangeData) => {
    setHideLabels(checked.checked as boolean);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const _onToggleAxisTitlesCheckChange = React.useCallback((ev: any) => {
    setShowAxisTitles(ev.currentTarget.checked);
  }, []);
  const _onToggleMultiLegendSelection = React.useCallback((ev: any) => {
    setSelectMultipleLegends(ev.currentTarget.checked);
  }, []);

  const points: VerticalBarChartDataPoint[] = [
    {
      x: 0,
      y: 10000,
      legend: 'Oranges',
      color: 'dodgerblue',
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '4%',
      lineData: {
        y: 7000,
        yAxisCalloutData: '3%',
      },
    },
    {
      x: 10000,
      y: 50000,
      legend: 'Dogs',
      color: 'midnightblue',
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '21%',
      lineData: {
        y: 30000,
        yAxisCalloutData: '12%',
      },
    },
    {
      x: 25000,
      y: 30000,
      legend: 'Apples',
      color: 'darkblue',
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '12%',
      lineData: {
        y: 3000,
        yAxisCalloutData: '1%',
      },
    },

    {
      x: 40000,
      y: 13000,
      legend: 'Bananas',
      color: 'blue',
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '5%',
    },
    {
      x: 52000,
      y: 43000,
      legend: 'Giraffes',
      color: 'darkslateblue',
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '18%',
      lineData: {
        y: 30000,
        yAxisCalloutData: '12%',
      },
    },
    {
      x: 68000,
      y: 30000,
      legend: 'Cats',
      color: 'royalblue',
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '12%',
      lineData: {
        y: 5000,
        yAxisCalloutData: '2%',
      },
    },
    {
      x: 80000,
      y: 20000,
      legend: 'Elephants',
      color: 'slateblue',
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '8%',
      lineData: {
        y: 16000,
        yAxisCalloutData: '7%',
      },
    },
    {
      x: 92000,
      y: 45000,
      legend: 'Monkeys',
      color: 'steelblue',
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '19%',
      lineData: {
        y: 40000,
        yAxisCalloutData: '16%',
      },
    },
  ];
  const lineOptions: LineChartLineOptions = { lineBorderWidth: '2' };
  const rootStyle = { width: `${width}px`, height: `${height}px` };
  return (
    <>
      <text>
        In this example the <code>xAxisCalloutData</code> property overrides the x value that is shown on the callout.
        So instead of a numeric value, the callout will show the date that is passed in the{' '}
        <code>xAxisCalloutData</code> property.
      </text>
      <br />
      <div style={{ display: 'flex' }}>
        <label htmlFor="changeWidth">Change Width:</label>
        <input
          type="range"
          value={width}
          min={200}
          max={1000}
          onChange={_onWidthChange}
          id="changeWidth"
          aria-valuetext={`ChangeWidthSlider${width}`}
        />
        <label htmlFor="changeHeight">Change Height:</label>
        <input
          type="range"
          value={height}
          min={200}
          max={1000}
          id="changeHeight"
          onChange={_onHeightChange}
          aria-valuetext={`ChangeHeightslider${height}`}
        />
      </div>
      <Field label="Pick one">
        <RadioGroup defaultValue="basicExample" onChange={_onChange}>
          <Radio value="Basic Example" label="Basic Example" />
          <Radio value="Custom Callout Example" label="Custom Callout Example" />
        </RadioGroup>
      </Field>
      <div style={{ marginTop: '10px' }}>
        <Checkbox
          label="use single color(This will have only one color)"
          checked={useSingleColor}
          onChange={_onCheckChange}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <Checkbox label="Hide labels" checked={hideLabels} onChange={_onHideLabelsCheckChange} />
      </div>
      <Switch
        label={showAxisTitles ? 'Show axis titles' : 'Hide axis titles'}
        checked={showAxisTitles}
        onChange={_onToggleAxisTitlesCheckChange}
        style={{ marginTop: '10px' }}
      />
      <Switch
        label="Select Multiple Legends"
        checked={selectMultipleLegends}
        onChange={_onToggleMultiLegendSelection}
      />
      {showAxisTitles && (
        <div style={rootStyle}>
          <VerticalBarChart
            chartTitle="Vertical bar chart basic example "
            culture={typeof window !== 'undefined' ? window.navigator.language : 'en-us'}
            data={points}
            height={height}
            width={width}
            hideLegend={false}
            useSingleColor={useSingleColor}
            hideLabels={hideLabels}
            lineLegendText={'just line'}
            lineLegendColor={'brown'}
            lineOptions={lineOptions}
            /*             {...(isCalloutselected && {
              onRenderCalloutPerDataPoint: (
                props: VerticalBarChartDataPoint,
                defaultRender: IRenderFunction<VerticalBarChartDataPoint>,
              ) => (props ? defaultRender(props) : null),
            })} */
            yAxisTitle={
              showAxisTitles
                ? 'Different categories of animals and fruits and their corresponding count are shown here'
                : undefined
            }
            xAxisTitle={
              showAxisTitles
                ? 'Values of each category are shown in the x-axis of the vertical bar chart whose values range from zero to 100,000. The x-axis is divided into 10 equal parts, each part representing 10,000.'
                : undefined
            }
            styles={{ svgTooltip: classes.svgTooltip }}
          />
        </div>
      )}
      {!showAxisTitles && (
        <div style={rootStyle}>
          <VerticalBarChart
            chartTitle="Vertical bar chart basic example "
            culture={typeof window !== 'undefined' ? window.navigator.language : 'en-us'}
            data={points}
            height={height}
            width={width}
            hideLegend={false}
            useSingleColor={useSingleColor}
            hideLabels={hideLabels}
            lineLegendText={'just line'}
            lineLegendColor={'brown'}
            lineOptions={lineOptions}
            /* {...(isCalloutselected && {
              onRenderCalloutPerDataPoint: (
                props: VerticalBarChartDataPoint,
                defaultRender: IRenderFunction<VerticalBarChartDataPoint>,
              ) => (props ? defaultRender(props) : null),
            })} */
            yAxisTitle={
              showAxisTitles
                ? 'Different categories of animals and fruits and their corresponding count are shown here'
                : undefined
            }
            xAxisTitle={showAxisTitles ? 'Values of each category are shown in the x-axis in this chart' : undefined}
            legendProps={{
              canSelectMultipleLegends: selectMultipleLegends,
            }}
            styles={{ svgTooltip: classes.svgTooltip }}
          />
        </div>
      )}
    </>
  );
};
VerticalBarDefault.parameters = {
  docs: {
    description: {},
  },
};
