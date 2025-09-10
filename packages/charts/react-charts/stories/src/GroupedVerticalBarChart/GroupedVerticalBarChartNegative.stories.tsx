import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { GroupedVerticalBarChart, DataVizPalette, getColorFromToken } from '@fluentui/react-charts';
import {
  Switch,
  Checkbox,
  CheckboxOnChangeData,
  Field,
  Radio,
  RadioGroup,
  RadioGroupOnChangeData,
} from '@fluentui/react-components';

export const GroupedVerticalBarNegative = (): JSXElement => {
  const [width, setWidth] = React.useState<number>(700);
  const [height, setHeight] = React.useState<number>(400);
  const [barWidth, setBarWidth] = React.useState<number>(16);
  const [selectedCallout, setSelectedCallout] = React.useState<string>('singleCallout');
  const [hideLabels, setHideLabels] = React.useState<boolean>(false);
  const [roundCorners, setRoundCorners] = React.useState<boolean>(false);
  const [selectMultipleLegends, setSelectMultipleLegends] = React.useState<boolean>(false);

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

  const _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(parseInt(e.target.value, 10));
  };
  const _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(parseInt(e.target.value, 10));
  };
  const _onBarwidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBarWidth(parseInt(e.target.value, 10));
  };
  const _onChange = (ev: React.FormEvent<HTMLDivElement>, data: RadioGroupOnChangeData): void => {
    if (selectedCallout) {
      setSelectedCallout('stackedCallout');
    } else {
      setSelectedCallout('singleCallout');
    }
  };
  const _onHideLabelsCheckChange = (ev: React.ChangeEvent<HTMLElement>, checked: CheckboxOnChangeData) => {
    setHideLabels(checked.checked as boolean);
  };

  const _onRoundCornersChange = React.useCallback((ev: any) => {
    setRoundCorners(ev.currentTarget.checked);
  }, []);

  const _onSwitchLegendMultiSelect = React.useCallback((ev: any) => {
    setSelectMultipleLegends(ev.currentTarget.checked);
  }, []);

  const data = [
    {
      name: 'Jan - Mar',
      series: [
        {
          key: 'series1',
          data: 33000,
          color: getColorFromToken(DataVizPalette.color3),
          legend: '2022',
          xAxisCalloutData: '2022/04/30',
          yAxisCalloutData: '33000',
          callOutAccessibilityData: {
            ariaLabel: 'Group Jan - Mar 1 of 4, Bar series 1 of 2 2022, x value 2022/04/30, y value 29%',
          },
        },
        {
          key: 'series2',
          data: -44000,
          color: getColorFromToken(DataVizPalette.color4),
          legend: '2023',
          xAxisCalloutData: '2023/04/30',
          yAxisCalloutData: '-44000',
          callOutAccessibilityData: {
            ariaLabel: 'Group Jan - Mar 1 of 4, Bar series 2 of 2 2023, x value 2023/04/30, y value 44%',
          },
        },
        {
          key: 'series3',
          data: -54000,
          color: getColorFromToken(DataVizPalette.color5),
          legend: '2024',
          xAxisCalloutData: '2024/04/30',
          yAxisCalloutData: '-54000',
          callOutAccessibilityData: {
            ariaLabel: 'Group Jan - Mar 1 of 4, Bar series 3 of 4 2022, x value 2024/04/30, y value 44%',
          },
        },
        {
          key: 'series4',
          data: 24000,
          color: getColorFromToken(DataVizPalette.color6),
          legend: '2021',
          xAxisCalloutData: '2021/04/30',
          yAxisCalloutData: '24000',
          callOutAccessibilityData: {
            ariaLabel: 'Group Jan - Mar 1 of 4, Bar series 4 of 4 2021, x value 2021/04/30, y value 44%',
          },
        },
      ],
    },
    {
      name: 'Apr - Jun',
      series: [
        {
          key: 'series1',
          data: 33000,
          color: getColorFromToken(DataVizPalette.color3),
          legend: '2022',
          xAxisCalloutData: '2022/05/30',
          yAxisCalloutData: '33000',
          callOutAccessibilityData: {
            ariaLabel: 'Group Apr - Jun 2 of 4, Bar series 1 of 2 2022, x value 2022/05/30, y value 29%',
          },
        },
        {
          key: 'series2',
          data: -3000,
          color: getColorFromToken(DataVizPalette.color4),
          legend: '2023',
          xAxisCalloutData: '2023/05/30',
          yAxisCalloutData: '-3000',
          callOutAccessibilityData: {
            ariaLabel: 'Group Apr - Jun 2 of 4, Bar series 2 of 2 2023, x value 2023/05/30, y value 3%',
          },
        },
        {
          key: 'series3',
          data: 9000,
          color: getColorFromToken(DataVizPalette.color5),
          legend: '2024',
          xAxisCalloutData: '2024/05/30',
          yAxisCalloutData: '9000',
          callOutAccessibilityData: {
            ariaLabel: 'Group Apr - Jun 2 of 4, Bar series 3 of 4 2024, x value 2024/05/30, y value 3%',
          },
        },
        {
          key: 'series4',
          data: -12000,
          color: getColorFromToken(DataVizPalette.color6),
          legend: '2021',
          xAxisCalloutData: '2021/05/30',
          yAxisCalloutData: '-12000',
          callOutAccessibilityData: {
            ariaLabel: 'Group Apr - Jun 2 of 4, Bar series 4 of 4 2021, x value 2021/05/30, y value 3%',
          },
        },
      ],
    },

    {
      name: 'Jul - Sep',
      series: [
        {
          key: 'series1',
          data: 14000,
          color: getColorFromToken(DataVizPalette.color3),
          legend: '2022',
          xAxisCalloutData: '2022/06/30',
          yAxisCalloutData: '14000',
          callOutAccessibilityData: {
            ariaLabel: 'Group Jul - Sep 3 of 4, Bar series 1 of 2 2022, x value 2022/06/30, y value 13%',
          },
        },
        {
          key: 'series2',
          data: 50000,
          color: getColorFromToken(DataVizPalette.color4),
          legend: '2023',
          xAxisCalloutData: '2023/06/30',
          yAxisCalloutData: '50000',
          callOutAccessibilityData: {
            ariaLabel: 'Group Jul - Sep 3 of 4, Bar series 2 of 2 2023, x value 2023/06/30, y value 50%',
          },
        },
        {
          key: 'series3',
          data: -60000,
          color: getColorFromToken(DataVizPalette.color5),
          legend: '2024',
          xAxisCalloutData: '2024/06/30',
          yAxisCalloutData: '-60000',
          callOutAccessibilityData: {
            ariaLabel: 'Group Jul - Sep 3 of 4, Bar series 3 of 4 2024, x value 2024/06/30, y value 50%',
          },
        },
        {
          key: 'series4',
          data: -10000,
          color: getColorFromToken(DataVizPalette.color6),
          legend: '2021',
          xAxisCalloutData: '2021/06/30',
          yAxisCalloutData: '-10000',
          callOutAccessibilityData: {
            ariaLabel: 'Group Jul - Sep 3 of 4, Bar series 4 of 4 2021, x value 2021/06/30, y value 50%',
          },
        },
      ],
    },
    {
      name: 'Oct - Dec',
      series: [
        {
          key: 'series1',
          data: -33000,
          color: getColorFromToken(DataVizPalette.color3),
          legend: '2022',
          xAxisCalloutData: '2022/07/30',
          yAxisCalloutData: '-33000',
          callOutAccessibilityData: {
            ariaLabel: 'Group Oct - Dec 4 of 4, Bar series 1 of 2 2022, x value 2022/07/30, y value 29%',
          },
        },
        {
          key: 'series2',
          data: 3000,
          color: getColorFromToken(DataVizPalette.color4),
          legend: '2023',
          xAxisCalloutData: '2023/07/30',
          yAxisCalloutData: '3000',
          callOutAccessibilityData: {
            ariaLabel: 'Group Oct - Dec 4 of 4, Bar series 2 of 2 2023, x value 2023/07/30, y value 3%',
          },
        },
        {
          key: 'series3',
          data: -6000,
          color: getColorFromToken(DataVizPalette.color5),
          legend: '2024',
          xAxisCalloutData: '2024/07/30',
          yAxisCalloutData: '-6000',
          callOutAccessibilityData: {
            ariaLabel: 'Group Oct - Dec 4 of 4, Bar series 3 of 4 2024, x value 2024/07/30, y value 3%',
          },
        },
        {
          key: 'series4',
          data: -15000,
          color: getColorFromToken(DataVizPalette.color6),
          legend: '2021',
          xAxisCalloutData: '2021/07/30',
          yAxisCalloutData: '-15000',
          callOutAccessibilityData: {
            ariaLabel: 'Group Oct - Dec 4 of 4, Bar series 4 of 4 2021, x value 2021/07/30, y value 3%',
          },
        },
      ],
    },
  ];
  const rootStyle = { width: `${width}px`, height: `${height}px` };
  return (
    <div className="containerDiv">
      <div>
        In this example the <code>xAxisCalloutData</code> property overrides the x value that is shown on the callout.
        So instead of a numeric value, the callout will show the date that is passed in the{' '}
        <code>xAxisCalloutData</code> property.
      </div>
      <label htmlFor="changeWidth_Basic">Change Width:</label>
      <input
        type="range"
        value={width}
        min={200}
        max={1000}
        id="changeWidth_Basic"
        onChange={_onWidthChange}
        aria-valuetext={`ChangeWidthSlider${width}`}
      />
      <label htmlFor="changeHeight_Basic">Change Height:</label>
      <input
        type="range"
        value={height}
        min={200}
        max={1000}
        id="changeHeight_Basic"
        onChange={_onHeightChange}
        aria-valuetext={`ChangeHeightslider${height}`}
      />
      <br />
      <label htmlFor="changeBarwidth">Change Barwidth:</label>
      <input
        type="range"
        value={barWidth}
        min={1}
        max={50}
        id="changeBarwidth"
        onChange={_onBarwidthChange}
        aria-valuetext={`ChangeBarwidthslider${barWidth}`}
      />
      <label>{barWidth}</label>
      <Field label="Pick one">
        <RadioGroup defaultValue="basicExample" onChange={_onChange}>
          <Radio value="singleCallout" label="Single Callout" />
          <Radio value="stackedCallout" label="Stacked callout" />
        </RadioGroup>
      </Field>
      <div style={{ marginTop: '20px' }}>
        <Checkbox label="Hide labels" checked={hideLabels} onChange={_onHideLabelsCheckChange} />
      </div>
      <div style={{ display: 'flex' }}>
        <Switch label={roundCorners ? 'Rounded corners ON' : 'Rounded corners OFF'} onChange={_onRoundCornersChange} />
        &nbsp;&nbsp;
        <Switch
          label={selectMultipleLegends ? 'legendmultiselect ON' : 'legendmultiselect OFF'}
          onChange={_onSwitchLegendMultiSelect}
        />
      </div>
      <div style={rootStyle}>
        <GroupedVerticalBarChart
          culture={window.navigator.language}
          chartTitle="Grouped Vertical Bar chart basic example"
          data={data}
          height={height}
          width={width}
          isCalloutForStack={selectedCallout === 'StackCallout'}
          barWidth={barWidth}
          hideLabels={hideLabels}
          reflowProps={{ mode: 'min-width' }}
          roundCorners={roundCorners}
          legendProps={{
            canSelectMultipleLegends: selectMultipleLegends,
          }}
        />
      </div>
    </div>
  );
};
GroupedVerticalBarNegative.parameters = {
  docs: {
    description: {},
  },
};
