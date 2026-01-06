import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  DataVizPalette,
  getColorFromToken,
  HorizontalBarChartWithAxis,
  HorizontalBarChartWithAxisDataPoint,
} from '@fluentui/react-charts';
import {
  Checkbox,
  CheckboxOnChangeData,
  Switch,
  Field,
  Radio,
  RadioGroup,
  RadioGroupOnChangeData,
  Button,
} from '@fluentui/react-components';

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

const _colors = [
  getColorFromToken(DataVizPalette.color1),
  getColorFromToken(DataVizPalette.color2),
  getColorFromToken(DataVizPalette.color3),
];

export const HorizontalBarWithAxisDynamic = (): JSXElement => {
  const _randomX = () => {
    return Math.floor(Math.random() * 90) + 1;
  };

  const _getData = (dataSize: number, yAxisType: string) => {
    const data: HorizontalBarChartWithAxisDataPoint[] = [];
    if (yAxisType === 'string') {
      for (let i = 0; i < dataSize; i++) {
        data.push({
          x: _randomX(),
          y: `Label ${i + 1}`,
          legend: `Label ${i + 1}`,
          color: _colors[i % _colors.length],
        });
      }
    } else {
      const yPoints = new Set<number>();
      while (yPoints.size !== dataSize) {
        const y = Math.floor(Math.random() * 75) + 1;
        if (!yPoints.has(y)) {
          yPoints.add(y);
          data.push({
            x: _randomX(),
            y,
            legend: `Label ${yPoints.size}`,
            color: _colors[y % _colors.length],
          });
        }
      }
    }
    return data;
  };
  const initialyAxisType = 'number';
  const initialDataSize = 5;
  const [dynamicData, setDynamicData] = React.useState<HorizontalBarChartWithAxisDataPoint[]>(
    _getData(initialDataSize, initialyAxisType),
  );
  const [statusKey, setStatusKey] = React.useState<number>(0);
  const [statusMessage, setStatusMessage] = React.useState<string>('');
  const [width, setWidth] = React.useState<number>(650);
  const [yAxisType, setYAxisType] = React.useState<string>(initialyAxisType);
  const [dataSize, setDataSize] = React.useState<number>(initialDataSize);
  const [roundCorners, setRoundCorners] = React.useState<boolean>(false);
  const [yAxisPadding, setYAxisPadding] = React.useState<number | undefined>(0);
  const [yAxisPaddingEnabled, setYAxisPaddingEnabled] = React.useState<boolean | undefined>(false);

  const _changeData = () => {
    setDynamicData(_getData(dataSize, yAxisType));
    setStatusKey(statusKey + 1);
    setStatusMessage('Horizontal bar chart with Axis data changed');
  };
  const _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(parseInt(e.target.value, 10));
  };
  const _onAxisTypeChange = (ev: React.FormEvent<HTMLDivElement>, data: RadioGroupOnChangeData): void => {
    setYAxisType(data.value);
    setDynamicData(_getData(dataSize, data.value));
    setStatusKey(statusKey + 1);
  };
  const _onYAxisPaddingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYAxisPadding(Number(e.target.value));
    setStatusKey(statusKey + 1);
  };

  const _onYAxisPaddingCheckChange = (ev: React.ChangeEvent<HTMLElement>, checked: CheckboxOnChangeData) => {
    setYAxisPaddingEnabled(checked.checked as boolean);
    setStatusKey(statusKey + 1);
  };
  const _onDataSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = Number(e.target.value);
    setDataSize(size);
    setDynamicData(_getData(size, yAxisType));
    setStatusKey(statusKey + 1);
  };

  const _onSwitchRoundCorners = React.useCallback((ev: any) => {
    setRoundCorners(ev.currentTarget.checked);
  }, []);

  return (
    <div className="containerDiv">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px 30px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label htmlFor="input-width" style={{ fontWeight: 400 }}>
            width:&nbsp;
          </label>
          <input type="range" id="input-width" value={width} min={200} max={1000} onChange={_onWidthChange} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label htmlFor="input-datasize" style={{ fontWeight: 400 }}>
            Data Size:&nbsp;
          </label>
          <input type="range" id="input-datasize" value={dataSize} min={0} max={50} onChange={_onDataSizeChange} />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <Checkbox
          label="yAxisPadding:&nbsp;"
          checked={yAxisPaddingEnabled}
          onChange={_onYAxisPaddingCheckChange}
          disabled={yAxisType !== 'string'}
        />
        <input
          type="range"
          value={yAxisPadding}
          min={0}
          max={1}
          step={0.1}
          onChange={_onYAxisPaddingChange}
          disabled={!yAxisPaddingEnabled}
        />
        <span style={{ marginLeft: '8px' }}>{yAxisPadding}</span>
      </div>

      <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
        <div>
          <label>X-Axis type:</label>
          <Field label="Pick one">
            <RadioGroup defaultValue="number" onChange={_onAxisTypeChange}>
              <Radio value="number" label="Number" />
              <Radio value="string" label="String" />
            </RadioGroup>
          </Field>
        </div>
        <div style={{ marginLeft: '20px' }}>
          <Switch
            checked={roundCorners}
            onChange={_onSwitchRoundCorners}
            label={roundCorners ? 'Rounded Corners ON' : 'Rounded Corners OFF'}
          />
        </div>
      </div>

      <div style={{ width: `${width}px`, height: '350px', marginTop: '20px' }}>
        <HorizontalBarChartWithAxis
          key={`${yAxisType}-${statusKey}`}
          chartTitle="Horizontal bar chart dynamic example"
          data={dynamicData}
          colors={_colors}
          hideLegend={true}
          width={width}
          roundCorners={roundCorners}
          hideTickOverlap={true}
          yAxisPadding={yAxisPaddingEnabled ? yAxisPadding : undefined}
        />
      </div>

      <div style={{ marginTop: '16px' }}>
        <Button onClick={_changeData}>Change data</Button>
        <div aria-live="polite" aria-atomic="true">
          <p key={statusKey} style={screenReaderOnlyStyle}>
            {statusMessage}
          </p>
        </div>
      </div>
    </div>
  );
};
HorizontalBarWithAxisDynamic.parameters = {
  docs: {
    description: {},
  },
};
