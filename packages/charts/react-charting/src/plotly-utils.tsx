import { IChartProps } from './index';
import { ILineChartProps } from './LineChart';

interface IPlotlySchema {
  data: Array<{
    type: string;
    mode: string;
    name: string;
    x: Array<number | string | Date>;
    y: Array<number>;
    line: {
      color: string;
      width: number;
      dash: string;
    };
    marker: {
      opacity: number;
    };
    connectgaps: boolean;
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

export function convertPlotlyToILineChartProps(plotlySchema: IPlotlySchema): ILineChartProps {
  const { data, layout } = plotlySchema;

  const lineChartData = data.map(d => ({
    legend: d.name,
    color: d.line.color,
    data: d.x
      .filter((x): x is number | Date => typeof x !== 'string')
      .map((x, index) => ({
        x,
        y: d.y[index],
      })),
    styles: {
      legend: d.name,
      color: d.line.color,
      width: d.line.width,
      dash: d.line.dash,
      opacity: d.marker.opacity,
    },
  }));

  return {
    data: {
      chartTitle: layout.title,
      lineChartData,
    },
  };
}

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
