import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

import { VerticalStackedBarChartBase } from './VerticalStackedBarChart.base';

describe('VerticalStackedBarChartBase', () => {
  it('renders VerticalStackedBarChartBase correctly', () => {
    const firstChartPoints = [
      { legend: 'redDelicious', data: 23, color: DefaultPalette.accent },
      { legend: 'mcintosh', data: 19, color: DefaultPalette.blueMid },
      { legend: 'oranges', data: 40, color: DefaultPalette.blueLight }
    ];

    const secondChartPoints = [
      { legend: 'redDelicious', data: 10, color: DefaultPalette.accent },
      { legend: 'mcintosh', data: 60, color: DefaultPalette.blueMid },
      { legend: 'oranges', data: 30, color: DefaultPalette.blueLight }
    ];

    const data = [
      { chartData: firstChartPoints, xAxisPoint: 'firstPoint' },
      { chartData: secondChartPoints, xAxisPoint: 'secondPoint' }
    ];

    const component = renderer.create(<VerticalStackedBarChartBase data={data} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
