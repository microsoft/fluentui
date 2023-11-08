import * as React from 'react';
import { queryAllByAttribute, render, waitFor } from '@testing-library/react';
import { emptySparklinePoints, sparkline1Points } from './Sparkline.test';
import { Sparkline } from './index';

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
