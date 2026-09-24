import * as React from 'react';
import type { JSXElement, RadioGroupOnChangeData } from '@fluentui/react-components';
import { Button, Field, Radio, RadioGroup } from '@fluentui/react-components';
import type { ChartProps, LineChartDataPoint } from '@fluentui/react-charts';
import { DataVizPalette, getColorFromToken, LineChart } from '@fluentui/react-charts';

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

const colorPalettes = [
  [getColorFromToken(DataVizPalette.color1), getColorFromToken(DataVizPalette.color2)],
  [getColorFromToken(DataVizPalette.color4), getColorFromToken(DataVizPalette.color5)],
  [getColorFromToken(DataVizPalette.color7), getColorFromToken(DataVizPalette.color8)],
  [getColorFromToken(DataVizPalette.color10), getColorFromToken(DataVizPalette.color11)],
];

const randomY = (): number => Math.floor(Math.random() * 90) + 1;

type XAxisType = 'number' | 'date';

const getXValues = (dataSize: number, xAxisType: XAxisType): Array<number | Date> => {
  const date = new Date('2020-01-01');
  return Array.from({ length: dataSize }, (_, index) => {
    const value = index + 1;
    if (xAxisType === 'date') {
      const newDate = new Date(date);
      newDate.setDate(date.getDate() + value);
      return newDate;
    }
    return value;
  });
};

const getData = (dataSize: number, xAxisType: XAxisType, colors: string[]): ChartProps => {
  const xValues = getXValues(dataSize, xAxisType);
  const createPoints = (): LineChartDataPoint[] => xValues.map(x => ({ x, y: randomY() }));

  return {
    chartTitle: 'Line chart dynamic example',
    lineChartData: [
      { legend: 'Series 1', data: createPoints(), color: colors[0] },
      { legend: 'Series 2', data: createPoints(), color: colors[1] },
    ],
  };
};

export const LineChartDynamic = (): JSXElement => {
  const initialXAxisType: XAxisType = 'number';
  const initialDataSize = 5;
  const colorIndex = React.useRef(0);
  const chartContainerRef = React.useRef<HTMLDivElement>(null);
  const lastFocusedChartElementId = React.useRef<string | undefined>(undefined);
  const focusedChartElementId = React.useRef<string | undefined>(undefined);
  const [colors, setColors] = React.useState(colorPalettes[0]);
  const [dynamicData, setDynamicData] = React.useState<ChartProps>(() =>
    getData(initialDataSize, initialXAxisType, colorPalettes[0]),
  );
  const [statusKey, setStatusKey] = React.useState(0);
  const [statusMessage, setStatusMessage] = React.useState('');
  const [width, setWidth] = React.useState(650);
  const [xAxisType, setXAxisType] = React.useState<XAxisType>(initialXAxisType);
  const [dataSize, setDataSize] = React.useState(initialDataSize);

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
  }, [dynamicData]);

  const onChartFocus = (event: React.FocusEvent<HTMLDivElement>) => {
    lastFocusedChartElementId.current = event.target.id || undefined;
  };

  const queueFocusRestore = () => {
    focusedChartElementId.current = lastFocusedChartElementId.current;
  };

  const announceChange = (message: string) => {
    setStatusKey(currentKey => currentKey + 1);
    setStatusMessage(message);
  };

  const changeData = () => {
    queueFocusRestore();
    setDynamicData(getData(dataSize, xAxisType, colors));
    announceChange('Line chart data changed');
  };

  const changeColors = () => {
    queueFocusRestore();
    colorIndex.current = (colorIndex.current + 1) % colorPalettes.length;
    const nextColors = colorPalettes[colorIndex.current];
    setColors(nextColors);
    setDynamicData(currentData => ({
      ...currentData,
      lineChartData: currentData.lineChartData?.map((series, index) => ({
        ...series,
        color: nextColors[index],
      })),
    }));
    announceChange('Line chart colors changed');
  };

  const onAxisTypeChange = (_event: React.FormEvent<HTMLDivElement>, data: RadioGroupOnChangeData) => {
    const nextXAxisType: XAxisType = data.value === 'date' ? 'date' : 'number';
    setXAxisType(nextXAxisType);
    setDynamicData(getData(dataSize, nextXAxisType, colors));
  };

  const onDataSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextDataSize = Number(event.target.value);
    setDataSize(nextDataSize);
    setDynamicData(getData(nextDataSize, xAxisType, colors));
  };

  return (
    <>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div>
          <label htmlFor="line-chart-width">Width:&nbsp;</label>
          <input
            id="line-chart-width"
            type="range"
            value={width}
            min={200}
            max={1000}
            onChange={event => setWidth(Number(event.target.value))}
            aria-valuetext={`Current value ${width}, minimum 200 and maximum 1000`}
          />
        </div>
        <div>
          <label htmlFor="line-chart-data-size">Data Size:&nbsp;</label>
          <input
            id="line-chart-data-size"
            type="range"
            value={dataSize}
            min={0}
            max={50}
            onChange={onDataSizeChange}
            aria-valuetext={`Current value ${dataSize}, minimum 0 and maximum 50`}
          />
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <Field label="X-Axis type:">
          <RadioGroup defaultValue={initialXAxisType} onChange={onAxisTypeChange}>
            <Radio value="number" label="Number" />
            <Radio value="date" label="Date" />
          </RadioGroup>
        </Field>
      </div>
      <div ref={chartContainerRef} style={{ width: `${width}px`, height: '350px' }} onFocusCapture={onChartFocus}>
        <LineChart
          key={xAxisType}
          data={dynamicData}
          width={width}
          height={350}
          yMinValue={0}
          yMaxValue={100}
          hideTickOverlap={true}
        />
      </div>
      <div>
        <Button onClick={changeData}>Change Data</Button>
        <Button onClick={changeColors}>Change Color</Button>
        <div aria-live="polite" aria-atomic="true">
          <p key={statusKey} style={screenReaderOnlyStyle}>
            {statusMessage}
          </p>
        </div>
      </div>
    </>
  );
};

LineChartDynamic.parameters = {
  docs: {
    description: {},
  },
};
