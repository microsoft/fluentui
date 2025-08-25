import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  VerticalStackedChartProps,
  VerticalStackedBarChart,
  AxisCategoryOrder,
  getNextColor,
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

export const VerticalStackedBarAxisCategoryOrder = (): JSXElement => {
  const _getData = (dataSize: number) => {
    const mapXToDataPoints: { [key: string]: VerticalStackedChartProps } = {};
    for (let i = 0; i < dataSize; i++) {
      const data = Math.floor(Math.random() * 200) - 100;
      const xAxisPoint = `Label ${Math.floor(Math.random() * i) + 1}`;
      const legendIdx = Math.floor(Math.random() * i);
      if (!mapXToDataPoints[xAxisPoint]) {
        mapXToDataPoints[xAxisPoint] = {
          xAxisPoint,
          chartData: [],
        };
      }
      mapXToDataPoints[xAxisPoint].chartData.push({
        data: data,
        legend: `Legend ${legendIdx + 1}`,
        color: getNextColor(legendIdx),
      });
    }

    const data = Object.values(mapXToDataPoints);
    const values: number[] = [];
    data.forEach(point => {
      let positiveSum = 0;
      let negativeSum = 0;
      point.chartData.forEach(bar => {
        const value = bar.data as number;
        if (value >= 0) {
          positiveSum += value;
        } else {
          negativeSum += value;
        }
      });
      values.push(positiveSum, negativeSum);
    });

    return {
      data,
      yMinValue: Math.min(...values),
      yMaxValue: Math.max(...values),
    };
  };

  const initialDataSize = 5;
  const initialData = _getData(initialDataSize);

  const [dynamicData, setDynamicData] = React.useState<VerticalStackedChartProps[]>(initialData.data);
  const [statusKey, setStatusKey] = React.useState<number>(0);
  const [statusMessage, setStatusMessage] = React.useState<string>('');
  const [width, setWidth] = React.useState<number>(650);
  const [height, setHeight] = React.useState<number>(350);
  const [dataSize, setDataSize] = React.useState<number>(initialDataSize);
  const [xAxisCategoryOrder, setXAxisCategoryOrder] = React.useState<string>('default');
  const [yMinValue, setYMinValue] = React.useState<number>(initialData.yMinValue);
  const [yMaxValue, setYMaxValue] = React.useState<number>(initialData.yMaxValue);

  const _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(Number(e.target.value));
  };

  const _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(parseInt(e.target.value, 10));
  };

  const _onDataSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDataSize = Number(e.target.value);
    const { data, yMinValue: newYMinValue, yMaxValue: newYMaxValue } = _getData(newDataSize);
    setDataSize(newDataSize);
    setDynamicData(data);
    setYMinValue(newYMinValue);
    setYMaxValue(newYMaxValue);
    setStatusKey(prev => prev + 1);
  };

  const _onXAxisCategoryOrderChange = (event: any, data: any) => {
    setXAxisCategoryOrder(data.optionValue);
  };

  const _changeData = () => {
    const { data, yMinValue: newYMinValue, yMaxValue: newYMaxValue } = _getData(dataSize);
    setDynamicData(data);
    setYMinValue(newYMinValue);
    setYMaxValue(newYMaxValue);
    setStatusKey(prev => prev + 1);
    setStatusMessage('Vertical stacked bar chart with Axis data changed');
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
          <Field label="xAxisCategoryOrder:">
            <Dropdown
              value={xAxisCategoryOrder}
              selectedOptions={[xAxisCategoryOrder]}
              onOptionSelect={_onXAxisCategoryOrderChange}
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
        <VerticalStackedBarChart
          // Force rerender when any of the following states change
          key={statusKey}
          data={dynamicData}
          hideLegend={true}
          width={width}
          height={height}
          barGapMax={2}
          lineOptions={{ lineBorderWidth: '2' }}
          hideTickOverlap={true}
          xAxisCategoryOrder={xAxisCategoryOrder as AxisCategoryOrder}
          yMinValue={yMinValue}
          yMaxValue={yMaxValue}
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

VerticalStackedBarAxisCategoryOrder.parameters = {
  docs: {
    description: {},
  },
};
