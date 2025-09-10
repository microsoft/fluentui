import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { AreaChart } from '@fluentui/react-charts';
import { Switch, Field, Radio, RadioGroup, makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  svgTooltip: {
    fill: tokens.colorNeutralBackground2,
  },
});

export const AreaChartBasic = (): JSXElement => {
  const [width, setWidth] = React.useState<number>(700);
  const [height, setHeight] = React.useState<number>(300);
  const [isCalloutSelected, setIsCalloutSelected] = React.useState<boolean>(false);
  const [showAxisTitles, setShowAxisTitles] = React.useState<boolean>(true);
  const [legendMultiSelect, setLegendMultiSelect] = React.useState<boolean>(false);
  const [changeChartMode, setChangeChartMode] = React.useState<boolean>(false);

  const classes = useStyles();

  React.useEffect(() => {
    const style = document.createElement('style');
    const focusStylingCSS = `
      .containerDiv [contentEditable=true]:focus,
      .containerDiv [tabindex]:focus,
      .containerDiv area[href]:focus,
      .containerDiv button:focus,
      .containerDiv iframe:focus,
      .containerDiv input:focus,
      .containerDiv select:focus,
      .containerDiv textarea:focus {
        outline: -webkit-focus-ring-color auto 5px;
      }
    `;
    style.appendChild(document.createTextNode(focusStylingCSS));
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(parseInt(e.target.value, 10));
  };
  const _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(parseInt(e.target.value, 10));
  };

  const _onSwitchAxisTitlesCheckChange = React.useCallback((ev: any) => {
    setShowAxisTitles(ev.currentTarget.checked);
  }, []);

  const _onSwitchLegendMultiSelect = React.useCallback((ev: any) => {
    setLegendMultiSelect(ev.currentTarget.checked);
  }, []);

  const _onSwitchChartMode = React.useCallback((ev: any) => {
    setChangeChartMode(ev.currentTarget.checked);
  }, []);

  const chart1Points = [
    {
      x: 20,
      y: 7000,
      xAxisCalloutData: '2018/01/01',
      yAxisCalloutData: '35%',
    },
    {
      x: 25,
      y: 9000,
      xAxisCalloutData: '2018/01/15',
      yAxisCalloutData: '45%',
    },
    {
      x: 30,
      y: 13000,
      xAxisCalloutData: '2018/01/28',
      yAxisCalloutData: '65%',
    },
    {
      x: 35,
      y: 15000,
      xAxisCalloutData: '2018/02/01',
      yAxisCalloutData: '75%',
    },
    {
      x: 40,
      y: 11000,
      xAxisCalloutData: '2018/03/01',
      yAxisCalloutData: '55%',
    },
    {
      x: 45,
      y: 8760,
      xAxisCalloutData: '2018/03/15',
      yAxisCalloutData: '43%',
    },
    {
      x: 50,
      y: 3500,
      xAxisCalloutData: '2018/03/28',
      yAxisCalloutData: '18%',
    },
    {
      x: 55,
      y: 20000,
      xAxisCalloutData: '2018/04/04',
      yAxisCalloutData: '100%',
    },
    {
      x: 60,
      y: 17000,
      xAxisCalloutData: '2018/04/15',
      yAxisCalloutData: '85%',
    },
    {
      x: 65,
      y: 1000,
      xAxisCalloutData: '2018/05/05',
      yAxisCalloutData: '5%',
    },
    {
      x: 70,
      y: 12000,
      xAxisCalloutData: '2018/06/01',
      yAxisCalloutData: '60%',
    },
    {
      x: 75,
      y: 6876,
      xAxisCalloutData: '2018/01/15',
      yAxisCalloutData: '34%',
    },
    {
      x: 80,
      y: 12000,
      xAxisCalloutData: '2018/04/30',
      yAxisCalloutData: '60%',
    },
    {
      x: 85,
      y: 7000,
      xAxisCalloutData: '2018/05/04',
      yAxisCalloutData: '35%',
    },
    {
      x: 90,
      y: 10000,
      xAxisCalloutData: '2018/06/01',
      yAxisCalloutData: '50%',
    },
  ];

  const chart2Points = chart1Points.map((point, index) => {
    return {
      x: point.x,
      y: point.y + 5000,
      xAxisCalloutData: point.xAxisCalloutData,
      yAxisCalloutData: point.yAxisCalloutData,
    };
  });

  const chart3Points = chart1Points.map((point, index) => {
    return {
      x: point.x,
      y: point.y + 7000,
      xAxisCalloutData: point.xAxisCalloutData,
      yAxisCalloutData: point.yAxisCalloutData,
    };
  });

  const chartPoints = [
    {
      legend: 'legend1',
      data: chart1Points,
    },
    {
      legend: 'legend2',
      data: chart2Points,
    },
    {
      legend: 'legend3',
      data: chart3Points,
    },
  ];

  const chartData = {
    chartTitle: 'Area chart basic example',
    lineChartData: chartPoints,
  };

  const rootStyle = { width: `${width}px`, height: `${height}px` };

  return (
    <>
      <div style={{ display: 'flex' }}>
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
      </div>
      <Field label="Pick one">
        <RadioGroup
          defaultValue="basicExample"
          onChange={(_ev, option) => {
            if (isCalloutSelected) {
              setIsCalloutSelected(true);
            } else {
              setIsCalloutSelected(false);
            }
          }}
        >
          <Radio value="basicExample" label="Basic Example" />
          <Radio value="calloutExample" label="Custom Callout Example" />
        </RadioGroup>
      </Field>
      <div style={{ marginTop: '10px' }}>
        <Switch
          label={showAxisTitles ? 'Show Axis titles' : 'Hide axis titles'}
          checked={showAxisTitles}
          onChange={_onSwitchAxisTitlesCheckChange}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <Switch
          label={legendMultiSelect ? 'Select multiple legends ON' : 'Select multiple legends OFF'}
          checked={legendMultiSelect}
          onChange={_onSwitchLegendMultiSelect}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <Switch
          label={changeChartMode ? 'Change chart mode to toZeroY ON' : 'Change chart mode to toZeroY OFF'}
          checked={changeChartMode}
          onChange={_onSwitchChartMode}
        />
      </div>
      {showAxisTitles && (
        <div style={rootStyle}>
          <AreaChart
            culture={window.navigator.language}
            height={height}
            width={width}
            data={chartData}
            enablePerfOptimization={true}
            yAxisTitle={showAxisTitles ? 'Variation of stock market prices' : undefined}
            xAxisTitle={showAxisTitles ? 'Number of days' : undefined}
            legendProps={{
              canSelectMultipleLegends: legendMultiSelect,
            }}
            mode={changeChartMode ? 'tozeroy' : 'tonexty'}
            styles={{ svgTooltip: classes.svgTooltip }}
          />
        </div>
      )}
      {!showAxisTitles && (
        <div style={rootStyle}>
          <AreaChart
            culture={window.navigator.language}
            height={height}
            width={width}
            data={chartData}
            enablePerfOptimization={true}
            legendProps={{
              canSelectMultipleLegends: legendMultiSelect,
            }}
            mode={changeChartMode ? 'tozeroy' : 'tonexty'}
            styles={{ svgTooltip: classes.svgTooltip }}
          />
        </div>
      )}
    </>
  );
};
AreaChartBasic.parameters = {
  docs: {
    description: {},
  },
};
