import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  VerticalBarChart,
  VerticalBarChartDataPoint,
  LineChartLineOptions,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charts';
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

export const VerticalBarNegative = (): JSXElement => {
  const classes = useStyles();
  const [width, setWidth] = React.useState<number>(650);
  const [height, setHeight] = React.useState<number>(350);
  const [isCalloutSelected, setIsCalloutSelected] = React.useState<boolean>(false);
  const [useSingleColor, setUseSingleColor] = React.useState<boolean>(false);
  const [hideLabels, setHideLabels] = React.useState<boolean>(false);
  const [showAxisTitles, setShowAxisTitles] = React.useState<boolean>(true);
  const [enableGradient, setEnableGradient] = React.useState<boolean>(false);
  const [roundCorners, setRoundCorners] = React.useState<boolean>(false);

  const _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(parseInt(e.target.value, 10));
  };
  const _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(parseInt(e.target.value, 10));
  };

  const _onChange = (ev: React.FormEvent<HTMLDivElement>, data: RadioGroupOnChangeData): void => {
    if (isCalloutSelected) {
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
  const _onSwitchAxisTitlesCheckChange = React.useCallback((ev: any) => {
    setShowAxisTitles(ev.currentTarget.checked);
  }, []);
  const _onSwitchGradient = React.useCallback((ev: any) => {
    setEnableGradient(ev.currentTarget.checked);
  }, []);
  const _onSwitchRoundCorners = React.useCallback((ev: any) => {
    setRoundCorners(ev.currentTarget.checked);
  }, []);

  const negativePoints: VerticalBarChartDataPoint[] = [
    {
      x: 0,
      y: 10000,
      legend: 'Oranges',
      color: getColorFromToken(DataVizPalette.color1),
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '4%',
      lineData: {
        y: 7000,
        yAxisCalloutData: '3%',
      },
    },
    {
      x: 10000,
      y: -50000,
      legend: 'Dogs',
      color: getColorFromToken(DataVizPalette.color2),
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '-21%',
      lineData: {
        y: -30000,
        yAxisCalloutData: '-12%',
      },
    },
    {
      x: 25000,
      y: 30000,
      legend: 'Apples',
      color: getColorFromToken(DataVizPalette.color3),
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '12%',
      lineData: {
        y: 3000,
        yAxisCalloutData: '1%',
      },
    },

    {
      x: 40000,
      y: -13000,
      legend: 'Bananas',
      color: getColorFromToken(DataVizPalette.color6),
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '-5%',
    },
    {
      x: 52000,
      y: 43000,
      legend: 'Giraffes',
      color: getColorFromToken(DataVizPalette.color11),
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '18%',
      lineData: {
        y: 30000,
        yAxisCalloutData: '12%',
      },
    },
    {
      x: 68000,
      y: -30000,
      legend: 'Cats',
      color: getColorFromToken(DataVizPalette.color2),
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '-12%',
      lineData: {
        y: -5000,
        yAxisCalloutData: '-2%',
      },
    },
    {
      x: 80000,
      y: 20000,
      legend: 'Elephants',
      color: getColorFromToken(DataVizPalette.color11),
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '8%',
      lineData: {
        y: 16000,
        yAxisCalloutData: '7%',
      },
    },
    {
      x: 92000,
      y: -45000,
      legend: 'Monkeys',
      color: getColorFromToken(DataVizPalette.color6),
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '-19%',
      lineData: {
        y: -40000,
        yAxisCalloutData: '-16%',
      },
    },
  ];

  const lineOptions: LineChartLineOptions = { lineBorderWidth: '2' };

  const rootStyle = { width: `${width}px`, height: `${height}px` };

  return (
    <>
      <label>
        In this example the supportNegativeData property is enabled and some positive and some negative y points are
        passed to the data. As a result chart with negative y axis data is rendered.
      </label>
      <br />
      <label htmlFor="changeWidth">Change Width:</label>
      <div style={{ display: 'flex' }}>
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
      <div style={{ marginTop: '20px' }}>
        <Checkbox
          label="use single color(This will have only one color)"
          checked={useSingleColor}
          onChange={_onCheckChange}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <Checkbox label="Hide labels" checked={hideLabels} onChange={_onHideLabelsCheckChange} />
      </div>
      <div style={{ marginTop: '10px' }}>
        <Switch
          label={showAxisTitles ? 'Switch Axis titles' : 'Hide Axis titles'}
          checked={showAxisTitles}
          onChange={_onSwitchAxisTitlesCheckChange}
        />
      </div>
      <div style={{ display: 'flex' }}>
        <Switch
          label={enableGradient ? 'Enable Gradient ON' : 'Enable Gradient OFF'}
          checked={enableGradient}
          onChange={_onSwitchGradient}
        />
        &nbsp;&nbsp;
        <Switch
          label={roundCorners ? 'Rounded Corners ON' : 'Rounded Corners OFF'}
          checked={roundCorners}
          onChange={_onSwitchRoundCorners}
        />
      </div>
      {showAxisTitles && (
        <div style={rootStyle}>
          <VerticalBarChart
            culture={window.navigator.language}
            chartTitle="Vertical bar chart basic example "
            data={negativePoints}
            width={width}
            useSingleColor={useSingleColor}
            height={height}
            lineLegendText={'just line'}
            lineLegendColor={'brown'}
            lineOptions={lineOptions}
            hideLabels={hideLabels}
            yAxisTitle={showAxisTitles ? 'Different categories of animals and fruits' : undefined}
            xAxisTitle={showAxisTitles ? 'Values of each category' : undefined}
            enableGradient={enableGradient}
            roundCorners={roundCorners}
            styles={{ svgTooltip: classes.svgTooltip }}
          />
        </div>
      )}
      {!showAxisTitles && (
        <div style={rootStyle}>
          <VerticalBarChart
            culture={window.navigator.language}
            chartTitle="Vertical bar chart basic example "
            data={negativePoints}
            width={width}
            useSingleColor={useSingleColor}
            height={height}
            lineLegendText={'just line'}
            lineLegendColor={'brown'}
            lineOptions={lineOptions}
            hideLabels={hideLabels}
            enableGradient={enableGradient}
            roundCorners={roundCorners}
            styles={{ svgTooltip: classes.svgTooltip }}
          />
        </div>
      )}
    </>
  );
};
VerticalBarNegative.parameters = {
  docs: {
    description: {},
  },
};
