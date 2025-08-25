import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  HorizontalBarChartWithAxis,
  HorizontalBarChartWithAxisDataPoint,
  AxisCategoryOrder,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charts';
import { Button, Dropdown, Option, Field } from '@fluentui/react-components';

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
  getColorFromToken(DataVizPalette.color4),
  getColorFromToken(DataVizPalette.color5),
];

const axisCategoryOrderOptions = [
  'default',
  'data',
  'category ascending',
  'category descending',
  'total ascending',
  'total descending',
  'min ascending',
  'min descending',
  'max ascending',
  'max descending',
  'sum ascending',
  'sum descending',
  'mean ascending',
  'mean descending',
  'median ascending',
  'median descending',
];

export const HorizontalBarWithAxisCategoryOrder = (): JSXElement => {
  const _getData = (dataSize: number): HorizontalBarChartWithAxisDataPoint[] => {
    const data: HorizontalBarChartWithAxisDataPoint[] = [];
    for (let i = 0; i < dataSize; i++) {
      const x = Math.floor(Math.random() * 200) - 100;
      const yIdx = Math.floor(Math.random() * i);
      const legendIdx = Math.floor(Math.random() * i);
      data.push({
        x,
        y: `Label ${yIdx + 1}`,
        legend: `Legend ${legendIdx + 1}`,
        color: _colors[legendIdx % _colors.length],
      });
    }
    return data;
  };

  const initialDataSize = 5;

  const [dynamicData, setDynamicData] = React.useState<HorizontalBarChartWithAxisDataPoint[]>(
    _getData(initialDataSize),
  );
  const [statusKey, setStatusKey] = React.useState<number>(0);
  const [statusMessage, setStatusMessage] = React.useState<string>('');
  const [width, setWidth] = React.useState<number>(650);
  const [height, setHeight] = React.useState<number>(350);
  const [dataSize, setDataSize] = React.useState<number>(initialDataSize);
  const [yAxisCategoryOrder, setYAxisCategoryOrder] = React.useState<string>('default');

  const _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(Number(e.target.value));
  };

  const _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(parseInt(e.target.value, 10));
  };

  const _onDataSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDataSize = Number(e.target.value);
    setDataSize(newDataSize);
    setDynamicData(_getData(newDataSize));
    setStatusKey(prev => prev + 1);
  };

  const _onYAxisCategoryOrderChange = (event: any, data: any) => {
    setYAxisCategoryOrder(data.optionValue);
  };

  const _changeData = () => {
    setDynamicData(_getData(dataSize));
    setStatusKey(prev => prev + 1);
    setStatusMessage('Horizontal bar chart with Axis data changed');
  };

  return (
    <div className="containerDiv">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px 30px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label htmlFor="input-width" style={{ fontWeight: 400 }}>
            Width:&nbsp;
          </label>
          <input type="range" id="input-width" value={width} min={200} max={1000} onChange={_onWidthChange} />
          <span style={{ marginLeft: '8px' }}>{width}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label htmlFor="input-height" style={{ fontWeight: 400 }}>
            Height:&nbsp;
          </label>
          <input type="range" id="input-height" value={height} min={200} max={1000} onChange={_onHeightChange} />
          <span style={{ marginLeft: '8px' }}>{height}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label htmlFor="input-datasize" style={{ fontWeight: 400 }}>
            Data Size:&nbsp;
          </label>
          <input type="range" id="input-datasize" value={dataSize} min={0} max={50} onChange={_onDataSizeChange} />
          <span style={{ marginLeft: '8px' }}>{dataSize}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Field label="yAxisCategoryOrder:">
            <Dropdown
              value={yAxisCategoryOrder}
              selectedOptions={[yAxisCategoryOrder]}
              onOptionSelect={_onYAxisCategoryOrderChange}
            >
              {axisCategoryOrderOptions.map(option => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Dropdown>
          </Field>
        </div>
      </div>

      <div style={{ width: `${width}px`, height: `${height}px`, marginTop: '20px' }}>
        <HorizontalBarChartWithAxis
          // Force rerender when any of the following states change
          key={statusKey}
          data={dynamicData}
          hideLegend={true}
          width={width}
          height={height}
          hideTickOverlap={true}
          yAxisCategoryOrder={yAxisCategoryOrder as AxisCategoryOrder}
          showYAxisLables={true}
          colors={_colors}
        />
      </div>
      <div style={{ marginTop: '20px' }}>
        <Button onClick={_changeData}>Change data</Button>
        <div aria-live="polite" aria-atomic="true">
          {/* Change the key so that React treats it as an update even if the message is same */}
          <p key={statusKey} style={screenReaderOnlyStyle}>
            {statusMessage}
          </p>
        </div>
      </div>
    </div>
  );
};

HorizontalBarWithAxisCategoryOrder.parameters = {
  docs: {
    description: {},
  },
};
