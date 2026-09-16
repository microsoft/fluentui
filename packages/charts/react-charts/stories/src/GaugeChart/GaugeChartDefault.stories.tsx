import * as React from 'react';
import type { JSXElement, CheckboxOnChangeData } from '@fluentui/react-components';
import { Checkbox, makeStyles, Switch, tokens } from '@fluentui/react-components';
import type { GaugeChartCalloutData } from '@fluentui/react-charts';
import { DataVizPalette, GaugeChart, getColorFromToken } from '@fluentui/react-charts';

const useStyles = makeStyles({
  callout: {
    display: 'grid',
    gap: tokens.spacingVerticalXS,
    padding: tokens.spacingVerticalS,
  },
  calloutValue: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
  },
  calloutTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
  },
  calloutDescription: {
    color: tokens.colorNeutralForeground2,
  },
});

export const GaugeChartBasic = (): JSXElement => {
  const styles = useStyles();
  const [width, setWidth] = React.useState<number>(252);
  const [height, setHeight] = React.useState<number>(128);
  const [chartValue, setChartValue] = React.useState<number>(50);
  const [hideMinMax, setHideMinMax] = React.useState<boolean>(false);
  const [enableGradient, setEnableGradient] = React.useState<boolean>(false);
  const [roundedCorners, setRoundedCorners] = React.useState<boolean>(false);
  const [legendMultiSelect, setLegendMultiSelect] = React.useState<boolean>(false);
  const [useCustomCallout, setUseCustomCallout] = React.useState<boolean>(false);

  const _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(parseInt(e.target.value, 10));
  };
  const _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(parseInt(e.target.value, 10));
  };
  const _onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChartValue(parseInt(e.target.value, 10));
  };
  const _onHideMinMaxCheckChange = (ev: React.ChangeEvent<HTMLElement>, checked: CheckboxOnChangeData) => {
    setHideMinMax(checked.checked as boolean);
  };

  const _onSwitchGradient = React.useCallback((ev: any) => {
    setEnableGradient(ev.currentTarget.checked);
  }, []);

  const _onSwitchRoundedCorners = React.useCallback((ev: any) => {
    setRoundedCorners(ev.currentTarget.checked);
  }, []);

  const _onSwitchLegendMultiSelect = React.useCallback((ev: any) => {
    setLegendMultiSelect(ev.currentTarget.checked);
  }, []);

  const _onSwitchCustomCallout = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    setUseCustomCallout(ev.currentTarget.checked);
  }, []);

  const _renderCallout = (data?: GaugeChartCalloutData): JSXElement | null => {
    if (!data) {
      return null;
    }

    return (
      <div className={styles.callout}>
        <span className={styles.calloutTitle}>{data.chartTitle}</span>
        <span className={styles.calloutDescription}>Average time required to process one server tick.</span>
        <span className={styles.calloutValue}>Current value: {data.chartValueLabel}</span>
        {data.segments?.map((segment, index) => (
          <span key={segment.legend}>
            {segment.legend}: {segment.start}
            {index === data.segments.length - 1 ? '+' : `-${segment.end}`} ms
          </span>
        ))}
      </div>
    );
  };

  return (
    <>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ display: 'flex' }}>
          <label htmlFor="width-slider">Width:</label>
          <input
            type="range"
            value={width}
            min={0}
            max={1000}
            id="width-slider"
            onChange={_onWidthChange}
            aria-label="Change Width"
            aria-valuetext={`current value ${width}', Minimum 0 and Maximum 1000`}
          />
          <span>{width}</span>
        </div>
        <div style={{ display: 'flex' }}>
          <label htmlFor="height-slider">Height:</label>
          <input
            type="range"
            value={height}
            min={0}
            max={1000}
            id="height-slider"
            onChange={_onHeightChange}
            aria-label="Change Height"
            aria-valuetext={`current value ${height}', Minimum 0 and Maximum 1000`}
          />
          <span>{height}</span>
        </div>
        <div style={{ display: 'flex' }}>
          <label htmlFor="value-slider">Current value:</label>
          <input
            type="range"
            value={chartValue}
            min={0}
            max={200}
            id="value-slider"
            onChange={_onValueChange}
            aria-label="Change Current Value"
            aria-valuetext={`current value ${chartValue}, Minimum 0 and Maximum 200`}
          />
          <span>{chartValue}</span>
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <Checkbox label="Hide min and max values" checked={hideMinMax} onChange={_onHideMinMaxCheckChange} />
      </div>
      <div style={{ display: 'flex' }}>
        <Switch
          label={enableGradient ? 'Enable Gradient' : 'Disable Gradient'}
          checked={enableGradient}
          onChange={_onSwitchGradient}
        />
        &nbsp;&nbsp;
        <Switch
          label={roundedCorners ? 'Rounded Corners ON' : 'Rounded Corners OFF'}
          checked={roundedCorners}
          onChange={_onSwitchRoundedCorners}
        />
        &nbsp;&nbsp;
        <Switch
          label={legendMultiSelect ? 'legendMultiSelect ON' : 'legendMultiSelect OFF'}
          checked={legendMultiSelect}
          onChange={_onSwitchLegendMultiSelect}
        />
        &nbsp;&nbsp;
        <Switch
          label={useCustomCallout ? 'Custom callout ON' : 'Custom callout OFF'}
          checked={useCustomCallout}
          onChange={_onSwitchCustomCallout}
        />
      </div>

      <GaugeChart
        width={width}
        height={height}
        segments={[
          {
            size: 50,
            color: getColorFromToken(DataVizPalette.success),
            legend: 'Healthy',
          },
          {
            size: 100,
            color: getColorFromToken(DataVizPalette.warning),
            legend: 'Elevated',
          },
          {
            size: 50,
            color: getColorFromToken(DataVizPalette.error),
            legend: 'Critical',
          },
        ]}
        chartTitle="Server tick time"
        chartValue={chartValue}
        chartValueFormat={useCustomCallout ? ([value]) => (value === 0 ? 'offline' : `${value}ms`) : 'percentage'}
        hideMinMax={hideMinMax}
        variant={'multiple-segments'}
        enableGradient={enableGradient}
        roundCorners={roundedCorners}
        legendProps={{
          canSelectMultipleLegends: legendMultiSelect,
        }}
        onRenderCallout={useCustomCallout ? _renderCallout : undefined}
      />
    </>
  );
};
GaugeChartBasic.parameters = {
  docs: {
    description: {},
  },
};
