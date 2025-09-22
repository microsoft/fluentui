import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { VerticalBarChart, VerticalBarChartDataPoint, DataVizPalette, getColorFromToken } from '@fluentui/react-charts';
import { Button } from '@fluentui/react-components';
import {
  Checkbox,
  CheckboxOnChangeData,
  CheckboxProps,
  Field,
  Radio,
  RadioGroup,
  RadioGroupOnChangeData,
  Input,
  InputProps,
  InputOnChangeData,
} from '@fluentui/react-components';

export const VerticalBarDynamic = (): JSXElement => {
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
    [
      getColorFromToken(DataVizPalette.color1),
      getColorFromToken(DataVizPalette.color2),
      getColorFromToken(DataVizPalette.color3),
    ],
    [
      getColorFromToken(DataVizPalette.color4),
      getColorFromToken(DataVizPalette.color5),
      getColorFromToken(DataVizPalette.color6),
    ],
    [
      getColorFromToken(DataVizPalette.color7),
      getColorFromToken(DataVizPalette.color8),
      getColorFromToken(DataVizPalette.color9),
    ],
    [
      getColorFromToken(DataVizPalette.color10),
      getColorFromToken(DataVizPalette.color11),
      getColorFromToken(DataVizPalette.color12),
    ],
  ];
  const _colorIndex = React.useRef<number>(0);
  let _prevBarWidth = 16;
  const initialXAxisType = 'number';
  const initialDataSize = 5;

  let _changeData = (): void => {
    setDynamicData(_getData(dataSize, xAxisType));
    setStatusKey(statusKey + 1);
    setStatusMessage('Vertical bar chart data changed');
  };

  let _changeColors = (): void => {
    _colorIndex.current = (_colorIndex.current + 1) % _colors.length;
    setColors(_colors[_colorIndex.current]);
    setStatusKey(statusKey + 1);
    setStatusMessage('Vertical bar chart colors changed');
  };

  const _randomY = (): number => {
    return Math.floor(Math.random() * 90) + 1;
  };

  const _onBarWidthCheckChange = (ev: React.ChangeEvent<HTMLInputElement>, data: CheckboxOnChangeData) => {
    if (typeof barWidth === 'undefined') {
      setBarWidth('auto');
    } else if (barWidth === 'auto') {
      setBarWidth(_prevBarWidth);
    } else {
      _prevBarWidth = barWidth as number;
      setBarWidth(undefined);
    }
  };
  const _onBarWidthChange: InputProps['onChange'] = (
    ev: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData,
  ) => {
    setBarWidth(Number(data.value));
  };
  const _onMaxBarWidthChange: InputProps['onChange'] = (
    ev: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData,
  ) => {
    setMaxBarWidth(Number(data.value));
  };
  const _onInnerPaddingCheckChange = (e: React.ChangeEvent<HTMLInputElement>, checked: CheckboxOnChangeData) => {
    setXAxisInnerPaddingEnabled(checked.checked);
  };
  const _onInnerPaddingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setXAxisInnerPadding(Number(e.target.value));
  };
  const _onOuterPaddingCheckChange = (e: React.ChangeEvent<HTMLInputElement>, checked: CheckboxOnChangeData) => {
    setXAxisOuterPaddingEnabled(checked.checked);
  };
  const _onOuterPaddingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setXAxisOuterPadding(Number(e.target.value));
  };
  const _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(Number(e.target.value));
  };
  const _onAxisTypeChange = (ev: React.FormEvent<HTMLDivElement>, data: RadioGroupOnChangeData) => {
    setXAxisType(data.value);
    setDynamicData(_getData(dataSize, data.value));
  };
  const _onDataSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dataSize = Number(e.target.value);
    setDataSize(dataSize);
    setDynamicData(_getData(dataSize, xAxisType));
    setDynamicData(_getData(dataSize, xAxisType));
  };

  const _getData = (dataSize: number, xAxisType: string) => {
    const data: VerticalBarChartDataPoint[] = [];
    if (xAxisType === 'string') {
      for (let i = 0; i < dataSize; i++) {
        data.push({ x: `Label ${i + 1}`, y: _randomY() });
      }
    } else {
      const xPoints = new Set<number>();
      const date = new Date('2020-01-01');
      while (xPoints.size !== dataSize) {
        const x = Math.floor(Math.random() * 75) + 1;
        if (!xPoints.has(x)) {
          xPoints.add(x);
          const newDate = new Date(date);
          newDate.setDate(date.getDate() + x);
          data.push({ x: xAxisType === 'date' ? newDate : x, y: _randomY() });
        }
      }
    }
    return data;
  };

  const [dynamicData, setDynamicData] = React.useState<VerticalBarChartDataPoint[]>(
    _getData(initialDataSize, initialXAxisType),
  );
  const [colors, setColors] = React.useState<string[]>(_colors[0]);
  const [statusKey, setStatusKey] = React.useState<number>(0);
  const [statusMessage, setStatusMessage] = React.useState<string>('');
  const [xAxisInnerPaddingEnabled, setXAxisInnerPaddingEnabled] = React.useState<CheckboxProps['checked']>(false);
  const [xAxisOuterPaddingEnabled, setXAxisOuterPaddingEnabled] = React.useState<CheckboxProps['checked']>(false);
  const [barWidth, setBarWidth] = React.useState<number | 'auto' | undefined>(undefined);
  const [maxBarWidth, setMaxBarWidth] = React.useState<number>(24);
  const [xAxisInnerPadding, setXAxisInnerPadding] = React.useState<number>(0.67);
  const [xAxisOuterPadding, setXAxisOuterPadding] = React.useState<number>(0);
  const [width, setWidth] = React.useState<number>(650);
  const [xAxisType, setXAxisType] = React.useState<string>(initialXAxisType);
  const [dataSize, setDataSize] = React.useState<number>(initialDataSize);

  _changeData = _changeData.bind(this);
  _changeColors = _changeColors.bind(this);

  return (
    <>
      <div style={{ display: 'flex', gap: '15px 30px' }}>
        <div style={{ justifyContent: 'center', verticalAlign: 'center' }}>
          <label htmlFor="input-width" style={{ fontWeight: 400 }}>
            width:&nbsp;
          </label>
          <input type="range" value={width} min={200} max={1000} onChange={_onWidthChange} id="input-width" />
        </div>
        <div style={{ justifyContent: 'center', verticalAlign: 'center' }}>
          <Checkbox
            label="barWidth:&nbsp;"
            checked={typeof barWidth === 'number' ? true : barWidth === 'auto' ? 'mixed' : false}
            onChange={_onBarWidthCheckChange}
          />
          {typeof barWidth === 'number' ? (
            <Input type="number" value={barWidth.toString()} min={1} max={300} onChange={_onBarWidthChange} />
          ) : (
            <code>{`${barWidth}`}</code>
          )}
        </div>
        <div style={{ justifyContent: 'center', verticalAlign: 'center' }}>
          <label htmlFor="input-maxbarwidth" style={{ fontWeight: 400 }}>
            maxBarWidth:&nbsp;
          </label>
          <Input
            type="number"
            value={maxBarWidth.toString()}
            min={1}
            max={300}
            id="input-maxbarwidth"
            onChange={_onMaxBarWidthChange}
          />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <div style={{ justifyContent: 'center', verticalAlign: 'center' }}>
          <Checkbox
            label="xAxisInnerPadding:&nbsp;"
            checked={xAxisInnerPaddingEnabled}
            onChange={_onInnerPaddingCheckChange}
            disabled={xAxisType !== 'string'}
          />
          <input
            type="range"
            value={xAxisInnerPadding}
            min={0}
            max={1}
            step={0.01}
            onChange={_onInnerPaddingChange}
            disabled={!xAxisInnerPaddingEnabled}
          />
          <span>&nbsp;{xAxisInnerPadding}</span>
        </div>
        <div style={{ justifyContent: 'center', verticalAlign: 'center' }}>
          <Checkbox
            label="xAxisOuterPadding:&nbsp;"
            checked={xAxisOuterPaddingEnabled}
            onChange={_onOuterPaddingCheckChange}
            disabled={xAxisType !== 'string'}
          />
          <input
            type="range"
            value={xAxisOuterPadding}
            min={0}
            max={1}
            step={0.01}
            onChange={_onOuterPaddingChange}
            disabled={!xAxisOuterPaddingEnabled}
          />
          <span>&nbsp;{xAxisOuterPadding}</span>
        </div>
      </div>
      <div style={{ display: 'flex', marginTop: '20px' }}>
        <div style={{ justifyContent: 'center', verticalAlign: 'center' }}>
          <label htmlFor="input-datasize" style={{ fontWeight: 400 }}>
            Data Size:&nbsp;
          </label>
          <input type="range" value={dataSize} min={0} max={50} onChange={_onDataSizeChange} id="input-datasize" />
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <Field label="X-Axis type:">
          <RadioGroup onChange={_onAxisTypeChange}>
            <Radio value="number" label="Number" />
            <Radio value="date" label="Date" />
            <Radio value="string" label="String" />
          </RadioGroup>
        </Field>
      </div>
      <div style={{ width: `${width}px`, height: '350px' }}>
        <VerticalBarChart
          // Force rerender when any of the following states change
          key={xAxisType}
          chartTitle="Vertical bar chart dynamic example"
          data={dynamicData}
          colors={colors}
          hideLegend={true}
          yMaxValue={100}
          width={width}
          barWidth={barWidth}
          maxBarWidth={maxBarWidth}
          xAxisInnerPadding={xAxisInnerPaddingEnabled ? xAxisInnerPadding : undefined}
          xAxisOuterPadding={xAxisOuterPaddingEnabled ? xAxisOuterPadding : undefined}
          hideTickOverlap={true}
        />
      </div>
      <div>
        <Button onClick={_changeData}> Change Data </Button>
        <Button onClick={_changeColors}> Change Color </Button>
        <div aria-live="polite" aria-atomic="true">
          {/* Change the key so that React treats it as an update even if the message is same */}
          <p key={statusKey} style={screenReaderOnlyStyle}>
            {statusMessage}
          </p>
        </div>
      </div>
    </>
  );
};
VerticalBarDynamic.parameters = {
  docs: {
    description: {},
  },
};
