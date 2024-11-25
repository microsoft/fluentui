import * as React from 'react';
import { DonutChart } from '../DonutChart/index';
import { VerticalStackedBarChart } from '../VerticalStackedBarChart/index';
import { transformPlotlyJsonToDonutProps, transformPlotlyJsonToColumnProps } from './PlotlySchemaAdapter';

export interface DeclarativeChartProps extends React.RefAttributes<HTMLDivElement> {
    /**
     * The schema representing the chart
     */
    chartSchema: any;
  }

  export const DeclarativeChart: React.FunctionComponent<DeclarativeChartProps> = React.forwardRef<HTMLDivElement, DeclarativeChartProps>(
    (props, forwardedRef) => {
        switch (props.chartSchema.data[0].type) {
            case 'pie':
              return <DonutChart {...transformPlotlyJsonToDonutProps(props.chartSchema)} />;
            case 'bar':
              return <VerticalStackedBarChart {...transformPlotlyJsonToColumnProps(props.chartSchema)} />;
            default:
              return <div>Unsupported Schema</div>;
          }
    },
  );
  DeclarativeChart.displayName = 'DeclarativeChart';