import * as React from 'react';
import { renderChartFromPlotlyJson } from '@fluentui/react-charting';

const plotlyJson = {
  data: [
    {
      uid: 'c3086e',
      name: 'Very interested (5)',
      type: 'bar',
      x: ['Dinosaurs', 'Conservation', 'Fish and reptiles', 'Fossils', 'Birds', 'Insects'],
      y: [107, 14, 27, 18, 27, 19],
      hoverinfo: 'y+name',
    },
    {
      uid: '772abd',
      name: 'Slightly interested (4)',
      type: 'bar',
      x: ['Dinosaurs', 'Conservation', 'Fish and reptiles', 'Fossils', 'Birds', 'Insects'],
      y: [113, 30, 45, 25, 32, 27],
      hoverinfo: 'y+name',
    },
    {
      uid: 'f9fdc4',
      name: 'No opinion (3)',
      type: 'bar',
      x: ['Dinosaurs', 'Conservation', 'Fish and reptiles', 'Fossils', 'Birds', 'Insects'],
      y: [27, 7, 28, 15, 18, 18],
      hoverinfo: 'y+name',
    },
    {
      uid: '25937d',
      name: 'Not particularly interested (2)',
      type: 'bar',
      x: ['Dinosaurs', 'Conservation', 'Fish and reptiles', 'Fossils', 'Birds', 'Insects'],
      y: [1, 2, 5, 1, 8, 2],
      hoverinfo: 'y+name',
    },
    {
      uid: 'd92300',
      name: 'Not at all interested (1)',
      type: 'bar',
      x: ['Dinosaurs', 'Conservation', 'Fish and reptiles', 'Fossils', 'Birds', 'Insects'],
      y: [10, 3, 6, 6, 9, 13],
      marker: {
        color: 'rgb(49, 44, 53)',
      },
      hoverinfo: 'y+name',
    },
  ],
  layout: {
    title: 'Column Clustered',
    width: 1620,
    xaxis: {
      type: 'category',
      range: [-0.5250841834579578, 6.803332365503061],
      autorange: false,
    },
    yaxis: {
      type: 'linear',
      range: [-35.418056222479095, 296.289219151546],
      autorange: false,
    },
    height: 781,
    legend: {
      x: -0.12,
      y: 1,
      xanchor: 'center',
      yanchor: 'bottom',
    },
    shapes: [],
    barmode: 'stack',
    autosize: true,
    hovermode: 'x',
  },
  frames: [],
};

export class VerticalStackedBarChartPlotlyExample extends React.Component<{}, {}> {
  public render(): React.ReactNode {
    return renderChartFromPlotlyJson(plotlyJson);
  }
}
