import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { VerticalBarChart, VerticalBarChartDataPoint } from '@fluentui/react-charts';
import { Checkbox, CheckboxOnChangeData, CheckboxProps } from '@fluentui/react-components';

export const VerticalBarStyled = (): JSXElement => {
  const [isChecked, setIsChecked] = React.useState<CheckboxProps['checked']>(true);
  const [useSingleColor, setUseSingleColor] = React.useState<boolean>(true);

  const _onChange = (ev: React.ChangeEvent<HTMLElement>, checked: CheckboxOnChangeData) => {
    setIsChecked(checked.checked);
  };
  const _onCheckChange = (ev: React.ChangeEvent<HTMLElement>, checked: CheckboxOnChangeData) => {
    setUseSingleColor(checked.checked as boolean);
  };

  const points: VerticalBarChartDataPoint[] = [
    { x: 'One', y: 20, ...(isChecked && { lineData: { y: 10, yAxisCalloutData: '12%' } }) },
    { x: 'Two', y: 48, ...(isChecked && { lineData: { y: 28 } }) },
    { x: 'Three', y: 30, ...(isChecked && { lineData: { y: 4 } }) },
    { x: 'Four', y: 40, ...(isChecked && { lineData: { y: 28 } }) },
    { x: 'Five', y: 13, ...(isChecked && { lineData: { y: 8, yAxisCalloutData: '45%' } }) },
    { x: 'Six', y: 60 },
    { x: 'Seven', y: 60 },
    { x: 'Eight', y: 57, ...(isChecked && { lineData: { y: 48 } }) },
    { x: 'Nine', y: 14 },
    { x: 'Ten', y: 35 },
    { x: 'Eleven', y: 20, ...(isChecked && { lineData: { y: 1 } }) },
    { x: 'Twelve', y: 44, ...(isChecked && { lineData: { y: 10 } }) },
    { x: 'Thirteen', y: 33 },
  ];

  const customColors = ['green', 'lightgreen', 'darkgreen'];

  return (
    <>
      <Checkbox label="show  line(This will draw the line)" checked={isChecked} onChange={_onChange} />
      <div style={{ marginTop: '10px' }}>
        <Checkbox
          label="use single color(This will have only one color)"
          checked={useSingleColor}
          onChange={_onCheckChange}
        />
      </div>
      <div style={{ width: '800px', height: '400px' }}>
        <VerticalBarChart
          chartTitle="Vertical bar chart styled example "
          data={points}
          width={800}
          height={400}
          barWidth={20}
          useSingleColor={useSingleColor}
          yAxisTickCount={6}
          colors={customColors}
          lineLegendColor={`rgb(174, 140, 0)`}
          hideLegend={true}
        />
      </div>
    </>
  );
};
VerticalBarStyled.parameters = {
  docs: {
    description: {},
  },
};
