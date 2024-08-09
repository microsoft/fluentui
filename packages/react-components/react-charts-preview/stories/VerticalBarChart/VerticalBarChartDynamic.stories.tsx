import * as React from 'react';
import { VerticalBarChart, IVerticalBarChartProps, IVerticalBarChartDataPoint } from '../../src/VerticalBarChart';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { Checkbox, ChoiceGroup, IChoiceGroupOption, Label, Stack, TextField } from '@fluentui/react';

export const VCDynamic = () => {
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

  const xAxisTypeOptions: IChoiceGroupOption[] = [
    { key: 'number', text: 'Number' },
    { key: 'date', text: 'Date' },
    { key: 'string', text: 'String' },
  ];

  const _colors = [
    [DefaultPalette.blueLight, DefaultPalette.blue, DefaultPalette.blueDark],
    [DefaultPalette.orangeLighter, DefaultPalette.orangeLight, DefaultPalette.orange],
    [DefaultPalette.greenLight, DefaultPalette.green, DefaultPalette.greenDark],
    [DefaultPalette.magentaLight, DefaultPalette.magenta, DefaultPalette.magentaDark],
  ];
  let _colorIndex = 0;
  let _prevBarWidth = 16;
  const initialXAxisType = xAxisTypeOptions[0].key;
  const initialDataSize = 5;

  let _changeData = (): void => {
    setDynamicData(_getData(dataSize, xAxisType));
    setStatusKey(statusKey + 1);
    setStatusMessage('Vertical bar chart data changed');
  };

  let _changeColors = (): void => {
    _colorIndex = (_colorIndex + 1) % _colors.length;
    setColors(_colors[_colorIndex]);
    setStatusKey(statusKey + 1);
    setStatusMessage('Vertical bar chart colors changed');
  };

  const _randomY = (): number => {
    return Math.floor(Math.random() * 90) + 1;
  };

  const _onBarWidthCheckChange = (e: React.FormEvent<HTMLInputElement>, checked: boolean) => {
    if (typeof barWidth === 'undefined') {
      setBarWidth('auto');
    } else if (barWidth === 'auto') {
      setBarWidth(_prevBarWidth);
    } else {
      _prevBarWidth = barWidth as number;
      setBarWidth(undefined);
    }
  };
  const _onBarWidthChange = (e: React.FormEvent<HTMLInputElement>, newValue: string) => {
    setBarWidth(Number(newValue));
  };
  const _onMaxBarWidthChange = (e: React.FormEvent<HTMLInputElement>, newValue: string) => {
    setMaxBarWidth(Number(newValue));
  };
  const _onInnerPaddingCheckChange = (e: React.FormEvent<HTMLInputElement>, checked: boolean) => {
    setXAxisInnerPaddingEnabled(checked);
  };
  const _onInnerPaddingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setXAxisInnerPadding(Number(e.target.value));
  };
  const _onOuterPaddingCheckChange = (e: React.FormEvent<HTMLInputElement>, checked: boolean) => {
    setXAxisOuterPaddingEnabled(checked);
  };
  const _onOuterPaddingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setXAxisOuterPadding(Number(e.target.value));
  };
  const _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(Number(e.target.value));
  };
  const _onAxisTypeChange = (e: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption) => {
    setXAxisType(option.key);
    setDynamicData(_getData(dataSize, option.key));
  };
  const _onEnableReflowCheckChange = (e: React.FormEvent<HTMLInputElement>, checked: boolean) => {
    setEnableReflow(checked);
  };
  const _onDataSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dataSize = Number(e.target.value);
    setDataSize(dataSize);
    setDynamicData(_getData(dataSize, xAxisType));
    setDynamicData(_getData(dataSize, xAxisType));
  };

  const _getData = (dataSize: number, xAxisType: string) => {
    const data: IVerticalBarChartDataPoint[] = [];
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

  const [dynamicData, setDynamicData] = React.useState<IVerticalBarChartDataPoint[]>(
    _getData(initialDataSize, initialXAxisType),
  );
  const [colors, setColors] = React.useState<string[]>(_colors[0]);
  const [statusKey, setStatusKey] = React.useState<number>(0);
  const [statusMessage, setStatusMessage] = React.useState<string>('');
  const [xAxisInnerPaddingEnabled, setXAxisInnerPaddingEnabled] = React.useState<boolean>(false);
  const [xAxisOuterPaddingEnabled, setXAxisOuterPaddingEnabled] = React.useState<boolean>(false);
  const [barWidth, setBarWidth] = React.useState<number | 'auto' | undefined>(undefined);
  const [maxBarWidth, setMaxBarWidth] = React.useState<number>(24);
  const [xAxisInnerPadding, setXAxisInnerPadding] = React.useState<number>(0.67);
  const [xAxisOuterPadding, setXAxisOuterPadding] = React.useState<number>(0);
  const [width, setWidth] = React.useState<number>(650);
  const [xAxisType, setXAxisType] = React.useState<string>(initialXAxisType);
  const [enableReflow, setEnableReflow] = React.useState<boolean>(false);
  const [dataSize, setDataSize] = React.useState<number>(initialDataSize);

  _changeData = _changeData.bind(this);
  _changeColors = _changeColors.bind(this);

  return (
    <>
      <Stack horizontal wrap tokens={{ childrenGap: '15 30' }}>
        <Stack horizontal verticalAlign="center">
          <Label htmlFor="input-width" style={{ fontWeight: 400 }}>
            width:&nbsp;
          </Label>
          <input type="range" value={width} min={200} max={1000} onChange={_onWidthChange} id="input-width" />
        </Stack>
        <Stack horizontal verticalAlign="center">
          <Checkbox
            label="barWidth:&nbsp;"
            checked={typeof barWidth === 'number'}
            onChange={_onBarWidthCheckChange}
            indeterminate={barWidth === 'auto'}
          />
          {typeof barWidth === 'number' ? (
            <TextField type="number" value={barWidth.toString()} min={1} max={300} onChange={_onBarWidthChange} />
          ) : (
            <code>{`${barWidth}`}</code>
          )}
        </Stack>
        <Stack horizontal verticalAlign="center">
          <Label htmlFor="input-maxbarwidth" style={{ fontWeight: 400 }}>
            maxBarWidth:&nbsp;
          </Label>
          <TextField
            type="number"
            value={maxBarWidth.toString()}
            min={1}
            max={300}
            id="input-maxbarwidth"
            onChange={_onMaxBarWidthChange}
          />
        </Stack>
        <Stack horizontal verticalAlign="center">
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
        </Stack>
        <Stack horizontal verticalAlign="center">
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
        </Stack>
        <Stack horizontal verticalAlign="center">
          <Checkbox label="enableReflow" checked={enableReflow} onChange={_onEnableReflowCheckChange} />
        </Stack>
        <Stack horizontal verticalAlign="center">
          <Label htmlFor="input-datasize" style={{ fontWeight: 400 }}>
            Data Size:&nbsp;
          </Label>
          <input type="range" value={dataSize} min={0} max={50} onChange={_onDataSizeChange} id="input-datasize" />
        </Stack>
      </Stack>
      <div style={{ marginTop: '20px' }}>
        <ChoiceGroup
          options={xAxisTypeOptions}
          selectedKey={xAxisType}
          onChange={_onAxisTypeChange}
          label="X-Axis type:"
        />
      </div>
      <div style={{ width: `${width}px`, height: '350px' }}>
        <VerticalBarChart
          // Force rerender when any of the following states change
          key={`${xAxisType}-${enableReflow}`}
          chartTitle="Vertical bar chart dynamic example"
          data={dynamicData}
          colors={colors}
          hideLegend={true}
          yMaxValue={100}
          width={width}
          enableReflow={enableReflow}
          barWidth={barWidth}
          maxBarWidth={maxBarWidth}
          xAxisInnerPadding={xAxisInnerPaddingEnabled ? xAxisInnerPadding : undefined}
          xAxisOuterPadding={xAxisOuterPaddingEnabled ? xAxisOuterPadding : undefined}
        />
      </div>
      <div>
        <DefaultButton text="Change data" onClick={_changeData} />
        <DefaultButton text="Change colors" onClick={_changeColors} />
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
VCDynamic.parameters = {
  docs: {
    description: {
      story: 'A Calendar Compat can be modified to allow selecting a contiguous (5 day) work week.',
    },
  },
};
