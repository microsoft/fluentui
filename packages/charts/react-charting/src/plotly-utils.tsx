import { IChartProps } from './index';

export interface IPlotlySchemaHBC {
  data: Array<{
    type: string;
    orientation: string;
    x: number[];
    y: string[];
    hovertext: string[];
    marker: {
      color: string[];
    };
  }>;
  layout: {
    title: string;
    xaxis: {
      title: string;
    };
    yaxis: {
      title: string;
    };
  };
}

export function convertPlotlyToHorizontalBarChartProps(plotlyData: IPlotlySchemaHBC): IChartProps[] {
  return plotlyData.data[0].y.map((title: string, index: number) => {
    const [xAxisCalloutData, yAxisCalloutData] = plotlyData.data[0].hovertext[index].split(', ');

    return {
      chartTitle: title,
      chartData: [
        {
          legend: title,
          horizontalBarChartdata: { x: plotlyData.data[0].x[index], y: 15000 },
          color: plotlyData.data[0].marker.color[index],
          xAxisCalloutData,
          yAxisCalloutData,
        },
      ],
    };
  });
}
