import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { DataVizPalette, GanttChart, GanttChartDataPoint } from '@fluentui/react-charts';
import { Switch } from '@fluentui/react-components';

const data: GanttChartDataPoint[] = [
  {
    x: {
      start: new Date('2009-01-01'),
      end: new Date('2009-02-28'),
    },
    y: 'Job A',
    legend: 'Alex',
    color: DataVizPalette.color1,
    gradient: ['#4760D5', '#637CEF'],
  },
  {
    x: {
      start: new Date('2009-03-05'),
      end: new Date('2009-04-15'),
    },
    y: 'Job B',
    legend: 'Alex',
    color: DataVizPalette.color1,
    gradient: ['#4760D5', '#637CEF'],
  },
  {
    x: {
      start: new Date('2009-02-20'),
      end: new Date('2009-05-30'),
    },
    y: 'Job C',
    legend: 'Max',
    color: DataVizPalette.color2,
    gradient: ['#E61C99', '#EE5FB7'],
  },
];

export const GanttChartBasic = (): JSXElement => {
  const [width, setWidth] = React.useState(600);
  const [height, setHeight] = React.useState(350);
  const [enableGradient, setEnableGradient] = React.useState(false);
  const [roundedCorners, setRoundedCorners] = React.useState(false);

  React.useEffect(() => {
    const style = document.createElement('style');
    const focusStylingCSS = `
      .containerDiv [contentEditable=true]:focus,
      .containerDiv [tabindex]:focus,
      .containerDiv area[href]:focus,
      .containerDiv button:focus,
      .containerDiv iframe:focus,
      .containerDiv input:focus,
      .containerDiv select:focus,
      .containerDiv textarea:focus {
        outline: -webkit-focus-ring-color auto 5px;
      }
    `;
    style.appendChild(document.createTextNode(focusStylingCSS));
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="containerDiv">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <label htmlFor="width-slider">Width:</label>
          <input
            type="range"
            value={width}
            min={0}
            max={1000}
            id="width-slider"
            onChange={e => setWidth(parseInt(e.target.value, 10))}
            aria-valuetext={`Width: ${width}`}
          />
          <span>{width}</span>
        </div>
        <div>
          <label htmlFor="height-slider">Height:</label>
          <input
            type="range"
            value={height}
            min={0}
            max={1000}
            id="height-slider"
            onChange={e => setHeight(parseInt(e.target.value, 10))}
            aria-valuetext={`Height: ${height}`}
          />
          <span>{height}</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 10 }}>
        <div>
          <Switch
            checked={enableGradient}
            onChange={(_, val) => setEnableGradient(val.checked)}
            label="Enable Gradient"
          />
        </div>
        <div>
          <Switch
            checked={roundedCorners}
            onChange={(_, val) => setRoundedCorners(val.checked)}
            label="Rounded Corners"
          />
        </div>
      </div>
      <div style={{ width, height, marginTop: 10 }}>
        <GanttChart
          data={data}
          showYAxisLables
          width={width}
          height={height}
          enableGradient={enableGradient}
          roundCorners={roundedCorners}
        />
      </div>
    </div>
  );
};
GanttChartBasic.parameters = {
  docs: {
    description: {},
  },
};
