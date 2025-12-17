import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { PolarChart, PolarChartProps } from '@fluentui/react-charts';
import { Switch } from '@fluentui/react-components';

const data: PolarChartProps['data'] = [
  {
    type: 'scatter',
    legend: 'Mike',
    color: 'red',
    data: [
      { x: 120, y: 'Math' },
      { x: 98, y: 'Chinese' },
      { x: 86, y: 'English' },
      { x: 99, y: 'Geography' },
      { x: 85, y: 'Physics' },
      { x: 65, y: 'History' },
    ],
  },
  {
    type: 'scatter',
    legend: 'Lily',
    color: 'blue',
    data: [
      { x: 110, y: 'Math' },
      { x: 130, y: 'Chinese' },
      { x: 130, y: 'English' },
      { x: 100, y: 'Geography' },
      { x: 90, y: 'Physics' },
      { x: 85, y: 'History' },
    ],
  },
];

export const PolarChartBasic = (): JSXElement => {
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
        <PolarChart
          data={data}
          // showYAxisLables
          width={width}
          height={height}
          shape="polygon"
          // enableGradient={enableGradient}
          // roundCorners={roundedCorners}
        />
      </div>
    </div>
  );
};
PolarChartBasic.parameters = {
  docs: {
    description: {},
  },
};
