import * as React from 'react';
import { HorizontalBarChart, getColorFromToken, DataVizPalette } from '@fluentui/react-charts';

import { ChevronDown20Regular } from '@fluentui/react-icons';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-popover';
import { Persona } from '@fluentui/react-persona';

export const HorizontalBarStackedAnnotatedInlineLegend = () => {
  const annotationPopover = (names: string[]) => (
    <Popover>
      <PopoverTrigger disableButtonEnhancement>
        <button /* styling here */
          style={{
            background: 'transparent',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            height: '16px', // smaller height
            width: '16px', // smaller width
          }}
        >
          <ChevronDown20Regular />
        </button>
      </PopoverTrigger>
      <PopoverSurface>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            flex: '0 1 auto',
            margin: '4px',
          }}
        >
          {names.map(name => (
            <Persona key={name} name={name} />
          ))}
        </div>
      </PopoverSurface>
    </Popover>
  );

  const data = [
    {
      chartTitle: 'one',
      chartData: [
        {
          legend: 'One.One',
          horizontalBarChartdata: { x: 1543 },
          color: getColorFromToken(DataVizPalette.color1),
          annotation: () => annotationPopover(['Person 1', 'Person 2']),
        },
        {
          legend: 'One.Two',
          horizontalBarChartdata: { x: 1000 },
          color: getColorFromToken(DataVizPalette.color2),
          annotation: () => annotationPopover(['Person 3']),
        },
        {
          legend: 'One.Three',
          horizontalBarChartdata: { x: 547 },
          color: getColorFromToken(DataVizPalette.color3),
          annotation: () => annotationPopover(['Person 4', 'Person 5', 'Person 6']),
        },
        {
          legend: 'One.One',
          horizontalBarChartdata: { x: 1543 },
          color: getColorFromToken(DataVizPalette.color4),
          annotation: () => annotationPopover(['Person 1', 'Person 2']),
        },
        {
          legend: 'One.Two',
          horizontalBarChartdata: { x: 1000 },
          color: getColorFromToken(DataVizPalette.color5),
          annotation: () => annotationPopover(['Person 3']),
        },
      ],
    },
    {
      chartTitle: 'two',
      chartData: [
        {
          legend: 'Two.One',
          horizontalBarChartdata: { x: 987 },
          color: getColorFromToken(DataVizPalette.color7),
          annotation: () => annotationPopover(['Person 7']),
        },
        {
          legend: 'Two.Two',
          horizontalBarChartdata: { x: 1987 },
          color: getColorFromToken(DataVizPalette.color8),
          annotation: () => annotationPopover(['Person 8', 'Person 9']),
        },
        {
          legend: 'Two.One',
          horizontalBarChartdata: { x: 987 },
          color: getColorFromToken(DataVizPalette.color9),
          annotation: () => annotationPopover(['Person 7']),
        },
        {
          legend: 'Two.Two',
          horizontalBarChartdata: { x: 1987 },
          color: getColorFromToken(DataVizPalette.color10),
          annotation: () => annotationPopover(['Person 8', 'Person 9']),
        },
      ],
    },
    {
      chartTitle: 'three',
      chartData: [
        {
          legend: 'Three.One',
          horizontalBarChartdata: { x: 872 },
          color: getColorFromToken(DataVizPalette.color13),
          annotation: () => annotationPopover(['Person 10']),
        },
        {
          legend: 'Three.Two',
          horizontalBarChartdata: { x: 128 },
          color: getColorFromToken(DataVizPalette.color14),
          annotation: () => annotationPopover(['Person 11', 'Person 12']),
        },
        {
          legend: 'Three.One',
          horizontalBarChartdata: { x: 872 },
          color: getColorFromToken(DataVizPalette.color13),
          annotation: () => annotationPopover(['Person 10']),
        },
        {
          legend: 'Three.Two',
          horizontalBarChartdata: { x: 128 },
          color: getColorFromToken(DataVizPalette.color15),
          annotation: () => annotationPopover(['Person 11', 'Person 12']),
        },
        {
          legend: 'Three.One',
          horizontalBarChartdata: { x: 872 },
          color: getColorFromToken(DataVizPalette.color16),
          annotation: () => annotationPopover(['Person 10']),
        },
        {
          legend: 'Three.Two',
          horizontalBarChartdata: { x: 128 },
          color: getColorFromToken(DataVizPalette.color17),
          annotation: () => annotationPopover(['Person 11', 'Person 12']),
        },
        {
          legend: 'Three.Two',
          horizontalBarChartdata: { x: 128 },
          color: getColorFromToken(DataVizPalette.color18),
          annotation: () => annotationPopover(['Person 11', 'Person 12']),
        },
      ],
    },
  ];

  return (
    <div style={{ maxWidth: 600 }}>
      <HorizontalBarChart
        data={data}
        chartDataMode={'legendInline'}
        className={'hbcstacked'}
        hideTooltip={true}
        legendProps={{ enabledWrapLines: true }}
      />
    </div>
  );
};

HorizontalBarStackedAnnotatedInlineLegend.parameters = {
  docs: {
    description: {},
  },
};
