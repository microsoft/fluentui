import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  HorizontalBarChartWithAxis,
  HorizontalBarChartWithAxisDataPoint,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charts';
import { Switch, Field, Radio, RadioGroup } from '@fluentui/react-components';

export const HorizontalBarWithAxisStringAxisTooltip = (): JSXElement => {
  const [selectedCallout, setSelectedCallout] = React.useState<string>('showTooltip');
  const [enableGradient, setEnableGradient] = React.useState<boolean>(false);
  const [roundCorners, setRoundCorners] = React.useState<boolean>(false);

  const _onSwitchGradient = React.useCallback((ev: any) => {
    setEnableGradient(ev.currentTarget.checked);
  }, []);

  const _onSwitchRoundedCorners = React.useCallback((ev: any) => {
    setRoundCorners(ev.currentTarget.checked);
  }, []);

  const points: HorizontalBarChartWithAxisDataPoint[] = [
    {
      y: 'String One',
      x: 1000,
      color: getColorFromToken(DataVizPalette.color1),
    },
    {
      y: 'String Two',
      x: 5000,
      color: getColorFromToken(DataVizPalette.color2),
    },
    {
      y: 'String Three',
      x: 3000,
      color: getColorFromToken(DataVizPalette.color3),
    },
    {
      y: 'String Four',
      x: 2000,
      color: getColorFromToken(DataVizPalette.color4),
    },
  ];

  const rootStyle = { width: '650px', height: '350px' };
  return (
    <div className="containerDiv">
      <div>
        <Field label="Pick one">
          <RadioGroup
            defaultValue="basicExample"
            onChange={(_ev, option) => option && setSelectedCallout(option.value)}
          >
            <Radio value="expandYAxisLabels" label="Expand Y Axis Ticks" />
            <Radio value="showTooltip" label="Show Tooltip at Y Axis Ticks" />
          </RadioGroup>
        </Field>
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
            onChange={_onSwitchRoundedCorners}
          />
        </div>
      </div>

      <div style={rootStyle}>
        <HorizontalBarChartWithAxis
          chartTitle="Horizontal bar chart axis tooltip example "
          data={points}
          height={350}
          width={650}
          hideLegend={true}
          hideTooltip={false}
          showYAxisLablesTooltip={selectedCallout === 'showTooltip' ? true : false}
          showYAxisLables={selectedCallout === 'expandYAxisLabels' ? true : false}
          enableGradient={enableGradient}
          roundCorners={roundCorners}
        />
      </div>
    </div>
  );
};
HorizontalBarWithAxisStringAxisTooltip.parameters = {
  docs: {
    description: {},
  },
};
