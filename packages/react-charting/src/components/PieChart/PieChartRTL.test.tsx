import * as React from 'react';
import { queryAllByAttribute, render, waitFor } from '@testing-library/react';
import { PieChart } from './index';
import { chartPoints, colors } from './PieChart.test';
import * as utils from '../../utilities/utilities';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Pie chart rendering', () => {
  test('Should re-render the Pie chart with data', async () => {
    // Arrange
    const { container, rerender } = render(<PieChart data={[]} colors={colors} />);
    const getById = queryAllByAttribute.bind(null, 'id');
    // Assert
    expect(container).toMatchSnapshot();
    expect(getById(container, /_PieChart_empty/i)).toHaveLength(1);

    // Mock the implementation of wrapContent as it internally calls a Browser Function like
    // getComputedTextLength() which will otherwise lead to a crash if mounted
    jest.spyOn(utils, 'wrapContent').mockImplementation(() => false);

    // Act
    rerender(<PieChart data={chartPoints} colors={colors} />);
    await waitFor(() => {
      // Assert
      expect(container).toMatchSnapshot();
      expect(getById(container, /_PieChart_empty/i)).toHaveLength(0);
    });
  });
});

describe('Pie Chart - axe-core', () => {
  test('Should pass accessibility tests', async () => {
    // Mock the implementation of wrapContent as it internally calls a Browser Function like
    // getComputedTextLength() which will otherwise lead to a crash if mounted
    jest.spyOn(utils, 'wrapContent').mockImplementation(() => false);
    const { container } = render(<PieChart data={chartPoints} colors={colors} />);
    const axeResults = await axe(container);
    expect(axeResults).toHaveNoViolations();
  }, 10000);
});
