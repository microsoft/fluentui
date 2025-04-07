import * as React from 'react';
import {
  VSChartDataPoint,
  VerticalStackedChartProps,
  VerticalStackedBarChart,
  LineChartLineOptions,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charts';
import { Checkbox, CheckboxOnChangeData, Switch } from '@fluentui/react-components';

export const VerticalStackedBarDefault = () => {
  const [width, setWidth] = React.useState(650);
  const [height, setHeight] = React.useState(350);
  const [showLine, setShowLine] = React.useState(true);
  const [barGapMax, setBarGapMax] = React.useState(2);
  const [hideLabels, setHideLabels] = React.useState(false);
  const [showAxisTitles, setShowAxisTitles] = React.useState(true);
  const [margins, setMargins] = React.useState({
    top: 20,
    bottom: 55,
    right: 40,
    left: 60,
  });
  const [roundCorners, setRoundCorners] = React.useState(false);
  const [legendMultiSelect, setLegendMultiSelect] = React.useState(false);

  const _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(parseInt(e.target.value, 10));
  };
  const _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(parseInt(e.target.value, 10));
  };

  const _onShowLineChange = (ev: React.ChangeEvent<HTMLElement>, checked: CheckboxOnChangeData): void => {
    setShowLine(checked.checked as boolean);
  };
  const _onHideLabelsCheckChange = (ev: React.ChangeEvent<HTMLElement>, checked: CheckboxOnChangeData) => {
    setHideLabels(checked.checked as boolean);
  };

  const _onSwitchAxisTitlesCheckChange = React.useCallback(ev => {
    setShowAxisTitles(ev.currentTarget.checked);
    if (ev.currentTarget.checked) {
      setMargins({
        top: 20,
        bottom: 55,
        right: 40,
        left: 60,
      });
    } else {
      setMargins({
        top: 20,
        bottom: 35,
        right: 20,
        left: 40,
      });
    }
  }, []);
  const _onRoundCornersChange = React.useCallback(ev => {
    setRoundCorners(ev.currentTarget.checked);
  }, []);

  const _onSwitchLegendMultiSelect = React.useCallback(ev => {
    setLegendMultiSelect(ev.currentTarget.checked);
  }, []);

  const firstChartPoints: VSChartDataPoint[] = [
    {
      legend: 'Metadata1',
      data: 40,
      color: getColorFromToken(DataVizPalette.color11),
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '61%',
    },
    {
      legend: 'Metadata2',
      data: 5,
      color: 'darkblue',
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '8%',
    },
    {
      legend: 'Metadata3',
      data: 20,
      color: getColorFromToken(DataVizPalette.color6),
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '31%',
    },
  ];

  const secondChartPoints: VSChartDataPoint[] = [
    {
      legend: 'Metadata1',
      data: 30,
      color: getColorFromToken(DataVizPalette.color11),
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '33%',
    },
    {
      legend: 'Metadata2',
      data: 20,
      color: 'darkblue',
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '22%',
    },
    {
      legend: 'Metadata3',
      data: 40,
      color: getColorFromToken(DataVizPalette.color6),
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '45%',
    },
  ];

  const thirdChartPoints: VSChartDataPoint[] = [
    {
      legend: 'Metadata1',
      data: 44,
      color: getColorFromToken(DataVizPalette.color11),
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '43%',
    },
    {
      legend: 'Metadata2',
      data: 28,
      color: 'darkblue',
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '27%',
    },
    {
      legend: 'Metadata3',
      data: 30,
      color: getColorFromToken(DataVizPalette.color6),
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '30%',
    },
  ];

  const fourthChartPoints: VSChartDataPoint[] = [
    {
      legend: 'Metadata1',
      data: 88,
      color: getColorFromToken(DataVizPalette.color11),
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '63%',
    },
    {
      legend: 'Metadata2',
      data: 22,
      color: 'darkblue',
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '16%',
    },
    {
      legend: 'Metadata3',
      data: 30,
      color: getColorFromToken(DataVizPalette.color6),
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '21%',
    },
  ];

  const data: VerticalStackedChartProps[] = [
    {
      chartData: firstChartPoints,
      xAxisPoint: 0,

      ...(showLine && {
        lineData: [
          { y: 42, legend: 'Supported Builds', color: getColorFromToken(DataVizPalette.color2) },
          { y: 10, legend: 'Recommended Builds', color: getColorFromToken(DataVizPalette.color17) },
        ],
      }),
    },
    {
      chartData: secondChartPoints,
      xAxisPoint: 20,
      ...(showLine && {
        lineData: [{ y: 33, legend: 'Supported Builds', color: getColorFromToken(DataVizPalette.color2) }],
      }),
    },
    {
      chartData: thirdChartPoints,
      xAxisPoint: 40,
      ...(showLine && {
        lineData: [
          { y: 60, legend: 'Supported Builds', color: getColorFromToken(DataVizPalette.color2) },
          { y: 20, legend: 'Recommended Builds', color: getColorFromToken(DataVizPalette.color17) },
        ],
      }),
    },
    {
      chartData: firstChartPoints,
      xAxisPoint: 60,
      ...(showLine && {
        lineData: [
          { y: 41, legend: 'Supported Builds', color: getColorFromToken(DataVizPalette.color2) },
          { y: 10, legend: 'Recommended Builds', color: getColorFromToken(DataVizPalette.color17) },
        ],
      }),
    },
    {
      chartData: fourthChartPoints,
      xAxisPoint: 80,
      ...(showLine && {
        lineData: [
          { y: 100, legend: 'Supported Builds', color: getColorFromToken(DataVizPalette.color2) },
          { y: 70, legend: 'Recommended Builds', color: getColorFromToken(DataVizPalette.color17) },
        ],
      }),
    },
    {
      chartData: firstChartPoints,
      xAxisPoint: 100,
    },
  ];

  const lineOptions: LineChartLineOptions = { lineBorderWidth: '2' };

  const rootStyle = { width: `${width}px`, height: `${height}px` };

  return (
    <>
      <label htmlFor="changeWidth_Basic">Change Width:</label>
      <input
        type="range"
        value={width}
        min={200}
        max={1000}
        id="changeWidth_Basic"
        onChange={_onWidthChange}
        aria-valuetext={`ChangeWidthSlider${width}`}
      />
      <label htmlFor="changeHeight_Basic">Change Height:</label>
      <input
        type="range"
        value={height}
        min={200}
        max={1000}
        id="changeHeight_Basic"
        onChange={_onHeightChange}
        aria-valuetext={`ChangeHeightslider${height}`}
      />
      <label htmlFor="changeBarGapMax_Basic">BarGapMax:</label>
      <input
        type="range"
        value={barGapMax}
        min={0}
        max={10}
        id="changeBarGapMax_Basic"
        onChange={e => setBarGapMax(+e.target.value)}
        aria-valuetext={`ChangebarGapMaxSlider${barGapMax}`}
      />
      <div style={{ marginTop: '10px' }}>
        <Checkbox label="show the lines (hide or show the lines)" checked={showLine} onChange={_onShowLineChange} />
      </div>
      <div style={{ marginTop: '20px' }}>
        <Checkbox label="Hide labels" checked={hideLabels} onChange={_onHideLabelsCheckChange} />
      </div>
      <div style={{ display: 'flex' }}>
        <Switch
          label={showAxisTitles ? 'Show axis titles' : 'Hide axis titles'}
          checked={showAxisTitles}
          onChange={_onSwitchAxisTitlesCheckChange}
        />
        &nbsp;&nbsp;
        <Switch label={roundCorners ? 'Rounded corners ON' : 'Rounded corners OFF'} onChange={_onRoundCornersChange} />
        &nbsp;&nbsp;
        <Switch
          label={legendMultiSelect ? 'legendmultiselect ON' : 'legendmultiselect OFF'}
          onChange={_onSwitchLegendMultiSelect}
        />
      </div>
      {showAxisTitles && (
        <div style={rootStyle}>
          <VerticalStackedBarChart
            culture={window.navigator.language}
            chartTitle="Vertical stacked bar chart basic example"
            barGapMax={barGapMax}
            data={data}
            height={height}
            width={width}
            margins={margins}
            lineOptions={lineOptions}
            legendProps={{
              allowFocusOnLegends: true,
              canSelectMultipleLegends: legendMultiSelect,
            }}
            hideLabels={hideLabels}
            yAxisTitle={showAxisTitles ? 'Variation of number of sales' : undefined}
            xAxisTitle={showAxisTitles ? 'Number of days' : undefined}
            roundCorners={roundCorners}
          />
        </div>
      )}
      {!showAxisTitles && (
        <div style={rootStyle}>
          <VerticalStackedBarChart
            culture={window.navigator.language}
            chartTitle="Vertical stacked bar chart basic example"
            barGapMax={barGapMax}
            data={data}
            height={height}
            width={width}
            margins={margins}
            lineOptions={lineOptions}
            legendProps={{
              allowFocusOnLegends: true,
              canSelectMultipleLegends: legendMultiSelect,
            }}
            hideLabels={hideLabels}
            roundCorners={roundCorners}
          />
        </div>
      )}
    </>
  );
};
VerticalStackedBarDefault.parameters = {
  docs: {
    description: {},
  },
};
