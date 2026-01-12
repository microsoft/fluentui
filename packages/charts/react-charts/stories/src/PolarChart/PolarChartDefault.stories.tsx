import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { PolarChart, PolarChartProps } from '@fluentui/react-charts';

const data: PolarChartProps['data'] = [
  {
    type: 'areapolar',
    legend: 'Mike',
    color: '#8884d8',
    data: [
      { r: 120, theta: 'Math' },
      { r: 98, theta: 'Chinese' },
      { r: 86, theta: 'English' },
      { r: 99, theta: 'Geography' },
      { r: 85, theta: 'Physics' },
      { r: 65, theta: 'History' },
    ],
  },
  {
    type: 'areapolar',
    legend: 'Lily',
    color: '#82ca9d',
    data: [
      { r: 110, theta: 'Math' },
      { r: 130, theta: 'Chinese' },
      { r: 130, theta: 'English' },
      { r: 100, theta: 'Geography' },
      { r: 90, theta: 'Physics' },
      { r: 85, theta: 'History' },
    ],
  },
];

export const PolarChartBasic = (): JSXElement => {
  const [width, setWidth] = React.useState(600);
  const [height, setHeight] = React.useState(350);

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
      <div style={{ width, height, marginTop: 10 }}>
        <PolarChart data={data} width={width} height={height} shape="polygon" direction="clockwise" />
      </div>
    </div>
  );
};
PolarChartBasic.parameters = {
  docs: {
    description: {},
  },
};
