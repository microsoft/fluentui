import * as React from 'react';
import { VerticalBarChart, IVerticalBarChartProps, IVerticalBarChartDataPoint } from '../../src/VerticalBarChart';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { Checkbox } from '@fluentui/react/lib/Checkbox';

export const VCStyled = () => {
  const [isChecked, setIsChecked] = React.useState<boolean>(true);
  const [useSingleColor, setUseSingleColor] = React.useState<boolean>(true);

  const _onChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    setIsChecked(checked);
  };
  const _onCheckChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    setUseSingleColor(checked);
  };

  const points: IVerticalBarChartDataPoint[] = [
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

  const customColors = [DefaultPalette.greenLight, DefaultPalette.green, DefaultPalette.greenDark];

  return (
    <>
      <Checkbox label="show  line(This will draw the line)" checked={isChecked} onChange={_onChange} />
      <Checkbox
        label="use single color(This will have only one color)"
        checked={useSingleColor}
        onChange={_onCheckChange}
        styles={{ root: { marginTop: '20px' } }}
      />
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
          enableReflow={true}
        />
      </div>
    </>
  );
};
VCStyled.parameters = {
  docs: {
    description: {
      story: 'A Calendar Compat can be modified to allow selecting a contiguous (5 day) work week.',
    },
  },
};
