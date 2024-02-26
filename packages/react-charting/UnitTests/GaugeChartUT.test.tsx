import * as React from 'react';
import { GaugeChart, GaugeChartVariant, GaugeValueFormat, IGaugeChartProps } from '../src/components/GaugeChart/index';
import { render } from '@testing-library/react';
import { GaugeChartBase } from '../src/components/GaugeChart/GaugeChart.base';
import { DataVizPalette } from '../src/utilities/colors';
import { DarkTheme } from '@fluentui/theme-samples';
import { IFontStyles, IScheme } from '@fluentui/theme';

const env = require('../config/tests');

const runTest = env === 'TEST' ? describe : describe.skip;

const segments = [
  { size: 33, color: DataVizPalette.success, legend: 'Low Risk' },
  { size: 34, color: DataVizPalette.warning, legend: 'Medium Risk' },
  { size: 33, color: DataVizPalette.error, legend: 'High Risk' },
];

const data: IGaugeChartProps = { segments: segments, chartValue: 100, theme: DarkTheme };
runTest('_processProps', () => {
  test('Should return proper legends data', () => {
    const instance = new GaugeChartBase(data);
    expect(instance).toBeDefined();
    const result = instance._processProps();
    expect(result.arcs).toHaveLength(3);
  });
});
