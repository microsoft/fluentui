import * as React from 'react';
import type { CheckboxOnChangeData, JSXElement } from '@fluentui/react-components';
import { Button, Checkbox, makeStyles, Switch, tokens } from '@fluentui/react-components';
import type { GaugeChartCalloutData, GaugeChartProps } from '@fluentui/react-charts';
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

const colorPalettes = [
  [DataVizPalette.success, DataVizPalette.warning, DataVizPalette.error],
  [DataVizPalette.color1, DataVizPalette.color2, DataVizPalette.color3],
  [DataVizPalette.color4, DataVizPalette.color5, DataVizPalette.color6],
].map(palette => palette.map(color => getColorFromToken(color)));

const createSegments = (colors: string[]): GaugeChartProps['segments'] => {
  const firstSize = Math.floor(Math.random() * 30) + 20;
  const secondSize = Math.floor(Math.random() * 30) + 20;

  return [
    { size: firstSize, color: colors[0], legend: 'Low risk' },
    { size: secondSize, color: colors[1], legend: 'Medium risk' },
    { size: 100 - firstSize - secondSize, color: colors[2], legend: 'High risk' },
  ];
};

export const GaugeChartDynamic = (): JSXElement => {
  const styles = useStyles();
  const chartContainerRef = React.useRef<HTMLDivElement>(null);
  const lastFocusedChartElementId = React.useRef<string | undefined>(undefined);
  const focusedChartElementId = React.useRef<string | undefined>(undefined);
  const colorIndex = React.useRef(0);
  const [segments, setSegments] = React.useState(() => createSegments(colorPalettes[0]));
  const [width, setWidth] = React.useState(400);
  const [height, setHeight] = React.useState(240);
  const [chartValue, setChartValue] = React.useState(50);
  const [hideMinMax, setHideMinMax] = React.useState(false);
  const [enableGradient, setEnableGradient] = React.useState(false);
  const [roundedCorners, setRoundedCorners] = React.useState(false);
  const [legendMultiSelect, setLegendMultiSelect] = React.useState(false);
  const [useCustomCallout, setUseCustomCallout] = React.useState(false);
  const [statusKey, setStatusKey] = React.useState(0);
  const [statusMessage, setStatusMessage] = React.useState('');

  React.useEffect(() => {
    const container = chartContainerRef.current;
    const elementId = focusedChartElementId.current;
    if (!container || !elementId) {
      return;
    }

    const targetWindow = container.ownerDocument.defaultView;
    const restoreFocus = () => {
      const element = container.ownerDocument.getElementById(elementId);
      if (element && container.contains(element)) {
        element.focus();
      }
      focusedChartElementId.current = undefined;
    };
    const animationFrame = targetWindow?.requestAnimationFrame(restoreFocus);
    if (animationFrame === undefined) {
      restoreFocus();
    }

    return () => {
      if (animationFrame !== undefined) {
        targetWindow?.cancelAnimationFrame(animationFrame);
      }
    };
  }, [segments]);

  const queueFocusRestore = () => {
    focusedChartElementId.current = lastFocusedChartElementId.current;
  };

  const announceChange = (message: string) => {
    setStatusKey(currentKey => currentKey + 1);
    setStatusMessage(message);
  };

  const changeData = () => {
    queueFocusRestore();
    setSegments(createSegments(colorPalettes[colorIndex.current]));
    setChartValue(Math.floor(Math.random() * 101));
    announceChange('Gauge chart data changed');
  };

  const changeColors = () => {
    queueFocusRestore();
    colorIndex.current = (colorIndex.current + 1) % colorPalettes.length;
    const nextColors = colorPalettes[colorIndex.current];
    setSegments(currentSegments =>
      currentSegments.map((segment, index) => ({
        ...segment,
        color: nextColors[index],
      })),
    );
    announceChange('Gauge chart colors changed');
  };

  const renderCallout = (data?: GaugeChartCalloutData): JSXElement | null => {
    if (!data) {
      return null;
    }
    const calloutSegments = data.segments ?? [];

    return (
      <div className={styles.callout}>
        <span className={styles.calloutTitle}>{data.chartTitle}</span>
        <span className={styles.calloutDescription}>Current dynamic gauge distribution.</span>
        <span className={styles.calloutValue}>Current value: {data.chartValueLabel}</span>
        {calloutSegments.map((segment, index) => (
          <span key={segment.legend}>
            {segment.legend}: {segment.start}
            {index === calloutSegments.length - 1 ? '+' : `-${segment.end}`}
          </span>
        ))}
      </div>
    );
  };

  return (
    <>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex' }}>
          <label htmlFor="dynamic-gauge-width">Width:</label>
          <input
            type="range"
            value={width}
            min={0}
            max={1000}
            id="dynamic-gauge-width"
            onChange={event => setWidth(Number(event.target.value))}
            aria-valuetext={`Current value ${width}, minimum 0 and maximum 1000`}
          />
          <span>{width}</span>
        </div>
        <div style={{ display: 'flex' }}>
          <label htmlFor="dynamic-gauge-height">Height:</label>
          <input
            type="range"
            value={height}
            min={0}
            max={1000}
            id="dynamic-gauge-height"
            onChange={event => setHeight(Number(event.target.value))}
            aria-valuetext={`Current value ${height}, minimum 0 and maximum 1000`}
          />
          <span>{height}</span>
        </div>
        <div style={{ display: 'flex' }}>
          <label htmlFor="dynamic-gauge-value">Current value:</label>
          <input
            type="range"
            value={chartValue}
            min={0}
            max={100}
            id="dynamic-gauge-value"
            onChange={event => setChartValue(Number(event.target.value))}
            aria-valuetext={`Current value ${chartValue}, minimum 0 and maximum 100`}
          />
          <span>{chartValue}</span>
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <Checkbox
          label="Hide min and max values"
          checked={hideMinMax}
          onChange={(_event: React.ChangeEvent<HTMLElement>, data: CheckboxOnChangeData) =>
            setHideMinMax(data.checked === true)
          }
        />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Switch
          label={enableGradient ? 'Enable Gradient' : 'Disable Gradient'}
          checked={enableGradient}
          onChange={event => setEnableGradient(event.currentTarget.checked)}
        />
        &nbsp;&nbsp;
        <Switch
          label={roundedCorners ? 'Rounded Corners ON' : 'Rounded Corners OFF'}
          checked={roundedCorners}
          onChange={event => setRoundedCorners(event.currentTarget.checked)}
        />
        &nbsp;&nbsp;
        <Switch
          label={legendMultiSelect ? 'legendMultiSelect ON' : 'legendMultiSelect OFF'}
          checked={legendMultiSelect}
          onChange={event => setLegendMultiSelect(event.currentTarget.checked)}
        />
        &nbsp;&nbsp;
        <Switch
          label={useCustomCallout ? 'Callout: custom' : 'Callout: default'}
          checked={useCustomCallout}
          onChange={event => setUseCustomCallout(event.currentTarget.checked)}
        />
      </div>
      <div
        ref={chartContainerRef}
        style={{ width: `${width}px`, height: `${height}px` }}
        onFocusCapture={event => {
          lastFocusedChartElementId.current = event.target.id || undefined;
        }}
      >
        <GaugeChart
          width={width}
          height={height}
          segments={segments}
          chartTitle="Gauge chart dynamic example"
          chartValue={chartValue}
          chartValueFormat={useCustomCallout ? ([value]) => `${value}%` : 'percentage'}
          hideMinMax={hideMinMax}
          variant="multiple-segments"
          enableGradient={enableGradient}
          roundCorners={roundedCorners}
          legendProps={{ canSelectMultipleLegends: legendMultiSelect }}
          onRenderCallout={useCustomCallout ? renderCallout : undefined}
        />
      </div>
      <div>
        <Button onClick={changeData}>Change Data</Button>
        <Button onClick={changeColors}>Change Color</Button>
        <div aria-live="polite" aria-atomic="true">
          <p
            key={statusKey}
            style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}
          >
            {statusMessage}
          </p>
        </div>
      </div>
    </>
  );
};

GaugeChartDynamic.parameters = {
  docs: {
    description: {},
  },
};
