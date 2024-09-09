import * as React from 'react';
import {
  DonutChart,
  IChartProps,
  IChartDataPoint,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charts-preview';
import { getGradientFromToken, DataVizGradientPalette } from '@fluentui/react-charting';

import { Button, Checkbox, CheckboxOnChangeData, CheckboxProps } from '@fluentui/react-components';

/** This style is commonly used to visually hide text that is still available for the screen reader to announce. */
const screenReaderOnlyStyle: React.CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0,0,0,0)',
  border: 0,
};

export const DonutDynamic = () => {
  const _colors = [
    [DataVizPalette.color3, DataVizPalette.color4, DataVizPalette.color5, DataVizPalette.color6, DataVizPalette.color7],
    [DataVizPalette.color8, DataVizPalette.color9, DataVizPalette.color10, DataVizPalette.color11],
    [DataVizPalette.color12, DataVizPalette.color13, DataVizPalette.color14, DataVizPalette.color15],
    [DataVizPalette.color16, DataVizPalette.color17, DataVizPalette.color18],
  ];
  const _gradientColors = [
    [
      getGradientFromToken(DataVizGradientPalette.gradient1),
      getGradientFromToken(DataVizGradientPalette.gradient3),
      getGradientFromToken(DataVizGradientPalette.gradient9),
    ],
    [getGradientFromToken(DataVizGradientPalette.gradient2), getGradientFromToken(DataVizGradientPalette.gradient4)],
    [
      getGradientFromToken(DataVizGradientPalette.gradient5),
      getGradientFromToken(DataVizGradientPalette.gradient6),
      getGradientFromToken(DataVizGradientPalette.gradient10),
    ],
    [getGradientFromToken(DataVizGradientPalette.gradient7), getGradientFromToken(DataVizGradientPalette.gradient8)],
  ];

  const [dynamicData, setDynamicData] = React.useState<IChartDataPoint[]>([
    { legend: 'first', data: 40, color: getColorFromToken(DataVizPalette.color1) },
    { legend: 'second', data: 20, color: getColorFromToken(DataVizPalette.color2) },
    { legend: 'third', data: 30, color: getColorFromToken(DataVizPalette.color3) },
    { legend: 'fourth', data: 10, color: getColorFromToken(DataVizPalette.color4) },
  ]);
  const [hideLabels, setHideLabels] = React.useState<CheckboxProps['checked'] | boolean>(false);
  const [showLabelsInPercent, setShowLabelsInPercent] = React.useState<CheckboxProps['checked'] | boolean>(false);
  const [innerRadius, setInnerRadius] = React.useState<number>(35);
  const [statusKey, setStatusKey] = React.useState<number>(0);
  const [statusMessage, setStatusMessage] = React.useState<string>('');

  const _changeData = (): void => {
    setDynamicData([
      { legend: 'first', data: _randomY(), color: getColorFromToken(DataVizPalette.color1) },
      { legend: 'second', data: _randomY(), color: getColorFromToken(DataVizPalette.color2) },
      { legend: 'third', data: _randomY(), color: getColorFromToken(DataVizPalette.color3) },
      { legend: 'fourth', data: _randomY(), color: getColorFromToken(DataVizPalette.color4) },
    ]),
      setStatusKey(statusKey + 1);
    setStatusMessage('Donut chart data changed');
  };

  const _changeColors = (): void => {
    setDynamicData([
      { legend: 'first', data: 40, color: _randomColor(0), gradient: _randomGradient(0) },
      { legend: 'second', data: 20, color: _randomColor(1), gradient: _randomGradient(1) },
      { legend: 'third', data: 30, color: _randomColor(2), gradient: _randomGradient(2) },
      { legend: 'fourth', data: 10, color: _randomColor(3), gradient: _randomGradient(3) },
    ]);
    setStatusKey(statusKey + 1);
    setStatusMessage('Donut chart colors changed');
  };

  const _randomY = (max = 300): number => {
    return Math.floor(Math.random() * max + 5);
  };

  const _randomColor = (index: number): string => {
    return getColorFromToken(_colors[index][Math.floor(Math.random() * _colors[index].length)]);
  };

  const _randomGradient = (index: number): [string, string] => {
    return _gradientColors[index][Math.floor(Math.random() * _gradientColors[index].length)];
  };

  const _onHideLabelsCheckChange = (ev: React.ChangeEvent<HTMLInputElement>, checked: CheckboxOnChangeData) => {
    let _innerRadius: number;
    if (checked) {
      _innerRadius = 55;
    } else {
      _innerRadius = 35;
    }
    setHideLabels(checked.checked);
    setInnerRadius(_innerRadius);
  };

  const _onShowPercentCheckChange = (ev: React.ChangeEvent<HTMLInputElement>, checked: CheckboxOnChangeData) => {
    setShowLabelsInPercent(checked.checked);
  };

  const data: IChartProps = {
    chartTitle: 'Donut chart dynamic example',
    chartData: dynamicData,
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <Checkbox
          label="Hide labels (Note: The inner radius is changed along with this to keep the arc width same)"
          checked={hideLabels}
          onChange={_onHideLabelsCheckChange}
        />
      </div>
      <div>
        <Checkbox
          label="Show labels in percentage format"
          checked={showLabelsInPercent}
          onChange={_onShowPercentCheckChange}
        />
      </div>

      <DonutChart
        data={data}
        innerRadius={innerRadius}
        legendProps={{
          allowFocusOnLegends: true,
        }}
        hideLabels={hideLabels}
        showLabelsInPercent={showLabelsInPercent}
      />
      <Button onClick={_changeData}> Change data </Button>
      <Button onClick={_changeColors}> Change colors </Button>
      <div aria-live="polite" aria-atomic="true">
        {/* Change the key so that React treats it as an update even if the message is same */}
        <p key={statusKey} style={screenReaderOnlyStyle}>
          {statusMessage}
        </p>
      </div>
    </div>
  );
};
DonutDynamic.parameters = {
  docs: {
    description: {
      story: 'Donut Chart Story.',
    },
  },
};
