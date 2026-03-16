import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { VerticalBarChart, VerticalBarChartDataPoint } from '@fluentui/react-charts';
import { Checkbox, CheckboxOnChangeData, CheckboxProps } from '@fluentui/react-components';

export const VerticalBarCustomAccessibility = (): JSXElement => {
  const [isChecked, setIsChecked] = React.useState<CheckboxProps['checked']>(true);
  const [useSingleColor, setUseSingleColor] = React.useState<boolean>(true);

  const _onChange = (ev: React.ChangeEvent<HTMLElement>, checked: CheckboxOnChangeData) => {
    setIsChecked(checked.checked);
  };
  const _onCheckChange = (ev: React.ChangeEvent<HTMLElement>, checked: CheckboxOnChangeData) => {
    setUseSingleColor(checked.checked as boolean);
  };

  const points: VerticalBarChartDataPoint[] = [
    {
      x: 'One',
      y: 20,
      ...(isChecked && { lineData: { y: 10, yAxisCalloutData: '12%' } }),
      callOutAccessibilityData: { ariaLabel: `Bar series 1 of 4 ${isChecked ? 'one 12% 20' : 'one 20'}` },
    },
    {
      x: 'Two',
      y: 48,
      ...(isChecked && { lineData: { y: 28 } }),
      callOutAccessibilityData: { ariaLabel: `Bar series 2 of 4 ${isChecked ? 'Two 28 48' : 'Two 48'}` },
    },
    {
      x: 'Three',
      y: 30,
      ...(isChecked && { lineData: { y: 4 } }),
      callOutAccessibilityData: { ariaLabel: `Bar series 3 of 4 ${isChecked ? 'Three 4 30' : 'Three 30'}` },
    },
    {
      x: 'Four',
      y: 40,
      ...(isChecked && { lineData: { y: 28 } }),
      callOutAccessibilityData: { ariaLabel: `Bar series 4 of 4 ${isChecked ? 'Four 28 40' : 'Four 40'}` },
    },
  ];

  const customColors = ['lightgreen', 'green', 'darkgreen'];

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
          chartTitle="Vertical bar chart custom accessibility example "
          data={points}
          width={800}
          height={400}
          barWidth={20}
          useSingleColor={useSingleColor}
          yAxisTickCount={6}
          colors={customColors}
          hideLegend={true}
          lineLegendColor={`rgb(174, 140, 0)`}
        />
      </div>
    </>
  );
};
VerticalBarCustomAccessibility.parameters = {
  docs: {
    description: {},
  },
};
