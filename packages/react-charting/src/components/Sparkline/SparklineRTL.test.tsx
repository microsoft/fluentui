import * as React from 'react';
import { queryAllByAttribute, render, waitFor } from '@testing-library/react';
import { emptySparklinePoints, sparkline1Points } from './Sparkline.test';
import { Sparkline } from './index';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Sparkline chart rendering', () => {
  test('Should re-render the Sparkline chart with data', async () => {
    // Arrange
    const { container, rerender } = render(<Sparkline data={emptySparklinePoints} />);
    const getById = queryAllByAttribute.bind(null, 'id');
    // Assert
    expect(container).toMatchSnapshot();
    expect(getById(container, /_SparklineChart_empty/i)).toHaveLength(1);
    // Act
    rerender(<Sparkline data={sparkline1Points} />);
    await waitFor(() => {
      // Assert
      expect(container).toMatchSnapshot();
      expect(getById(container, /_SparklineChart_empty/i)).toHaveLength(0);
    });
  });
});

describe('Sparkline Chart - axe-core', () => {
  test('Should pass accessibility tests', async () => {
    const { container } = render(<Sparkline data={sparkline1Points} />);
    const axeResults = await axe(container);
    expect(axeResults).toHaveNoViolations();
  }, 10000);
});
