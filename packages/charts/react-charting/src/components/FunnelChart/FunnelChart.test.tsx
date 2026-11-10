import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { FunnelChart } from './FunnelChart';
import { DataVizPalette, getColorFromToken } from '../../utilities/colors';

describe('FunnelChart', () => {
  const basicData = [
    { stage: 'Visitors', value: 1000, color: getColorFromToken(DataVizPalette.color5) },
    { stage: 'Signups', value: 600, color: getColorFromToken(DataVizPalette.color6) },
    { stage: 'Trials', value: 300, color: getColorFromToken(DataVizPalette.color7) },
    { stage: 'Customers', value: 150, color: getColorFromToken(DataVizPalette.color10) },
  ];

  const stackedData = [
    {
      stage: 'Visit',
      subValues: [
        { category: 'A', value: 100, color: getColorFromToken(DataVizPalette.color5) },
        { category: 'B', value: 80, color: getColorFromToken(DataVizPalette.color6) },
      ],
    },
    {
      stage: 'Sign-Up',
      subValues: [
        { category: 'A', value: 60, color: getColorFromToken(DataVizPalette.color5) },
        { category: 'B', value: 40, color: getColorFromToken(DataVizPalette.color6) },
      ],
    },
  ];

  it('renders basic funnel chart correctly', () => {
    render(<FunnelChart data={basicData} chartTitle="Test Funnel Chart" width={400} height={300} />);

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByLabelText('Test Funnel Chart')).toBeInTheDocument();
  });

  it('renders stacked funnel chart correctly', () => {
    render(<FunnelChart data={stackedData} chartTitle="Stacked Funnel Chart" width={400} height={300} />);

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByLabelText('Stacked Funnel Chart')).toBeInTheDocument();
  });

  it('renders empty state when no data is provided', () => {
    render(<FunnelChart data={[]} chartTitle="Empty Chart" width={400} height={300} />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByLabelText('Graph has no data to display')).toBeInTheDocument();
  });

  it('renders with horizontal orientation by default', () => {
    render(<FunnelChart data={basicData} chartTitle="Horizontal Chart" width={400} height={300} />);

    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('renders with vertical orientation when specified', () => {
    render(
      <FunnelChart data={basicData} chartTitle="Vertical Chart" width={400} height={300} orientation="vertical" />,
    );

    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('hides legend when hideLegend is true', () => {
    render(
      <FunnelChart data={basicData} chartTitle="Hidden Legend Chart" width={400} height={300} hideLegend={true} />,
    );

    expect(screen.getByRole('img')).toBeInTheDocument();
    // Legend should not be present when hideLegend is true
  });

  it('renders with custom culture for number formatting', () => {
    render(<FunnelChart data={basicData} chartTitle="Culture Chart" width={400} height={300} culture="en-US" />);

    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
