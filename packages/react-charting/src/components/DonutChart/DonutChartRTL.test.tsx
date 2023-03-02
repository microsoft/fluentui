import { render, screen, queryAllByAttribute, fireEvent } from '@testing-library/react';
import { chartPoints } from './DonutChart.test';
import { DonutChart } from './index';
import * as React from 'react';

test('Should hide callout on mouse leave', () => {
  // Arrange
  const { container } = render(<DonutChart data={chartPoints} innerRadius={55} calloutProps={{ doNotLayer: true }} />);

  // Act
  const getById = queryAllByAttribute.bind(null, 'id');
  fireEvent.mouseOver(getById(container, /Pie/i)[0]);
  expect(getById(container, /callout/i)[0]).toBeDefined();
  fireEvent.mouseLeave(getById(container, /Pie/i)[0]);

  // Assert
  expect(getById(container, /callout/i)[0]).toHaveStyle('opacity: 0');
});

test('Should show callout on focus', () => {
  // Arrange
  const { container } = render(<DonutChart data={chartPoints} innerRadius={55} calloutProps={{ doNotLayer: true }} />);

  // Act
  const getById = queryAllByAttribute.bind(null, 'id');
  fireEvent.focus(getById(container, /Pie/i)[0]);

  // Assert
  expect(getById(container, /focusRing/i)).toBeDefined();
});

test('Should remove focus on blur', () => {
  // Arrange
  const { container } = render(<DonutChart data={chartPoints} innerRadius={55} calloutProps={{ doNotLayer: true }} />);

  // Act
  const getById = queryAllByAttribute.bind(null, 'id');
  fireEvent.blur(getById(container, /Pie/i)[0]);

  // Assert
  const value = getById(container, /Pie/i)[0].getAttribute('id');
  expect(value).not.toContain('focusRing');
});

test('Should highlight the corresponding Pie on mouse over on legends', () => {
  // Arrange
  const { container } = render(<DonutChart data={chartPoints} innerRadius={55} hideLegend={false} />);

  // Act
  const legend = screen.queryByText('first');
  fireEvent.mouseOver(legend!);

  // Assert
  const getById = queryAllByAttribute.bind(null, 'id');
  expect(getById(container, /Pie.*?second/i)[0]).toHaveAttribute('opacity', '0.1');
});

test('Should select legend on single mouse click on legends', () => {
  // Arrange
  const { container } = render(<DonutChart data={chartPoints} innerRadius={55} hideLegend={false} />);

  // Act
  const legend = screen.queryByText('first');
  fireEvent.click(legend!);

  // Assert
  const getById = queryAllByAttribute.bind(null, 'id');
  expect(getById(container, /Pie.*?second/i)[0]).toHaveAttribute('opacity', '0.1');
  const firstLegend = screen.queryByText('first')?.closest('button');
  expect(firstLegend).toHaveAttribute('aria-selected', 'true');
  expect(firstLegend).toHaveAttribute('tabIndex', '0');
});

test('Should deselect legend on double mouse click on legends', () => {
  // Arrange
  const { container } = render(<DonutChart data={chartPoints} innerRadius={55} hideLegend={false} />);

  // Act
  const legend = screen.queryByText('first');
  //single click on first legend
  fireEvent.click(legend!);
  const getById = queryAllByAttribute.bind(null, 'id');
  expect(getById(container, /Pie.*?second/i)[0]).toHaveAttribute('opacity', '0.1');
  const firstLegend = screen.queryByText('first')?.closest('button');
  expect(firstLegend).toHaveAttribute('aria-selected', 'true');
  expect(firstLegend).toHaveAttribute('tabIndex', '0');
  // double click on same first legend
  fireEvent.click(legend!);

  // Assert
  expect(firstLegend).toHaveAttribute('aria-selected', 'false');
});

test('Should show Pies with same opacity on mouse out of legends', () => {
  // Arrange
  const { container } = render(<DonutChart data={chartPoints} innerRadius={55} hideLegend={false} />);

  // Act
  const legend = screen.queryByText('first');
  fireEvent.mouseOver(legend!);
  const getById = queryAllByAttribute.bind(null, 'id');
  expect(getById(container, /Pie.*?second/i)[0]).toHaveAttribute('opacity', '0.1');
  fireEvent.mouseOut(legend!);

  // Assert
  expect(getById(container, /Pie.*?first/i)[0]).toHaveAttribute('opacity', '1');
  expect(getById(container, /Pie.*?second/i)[0]).toHaveAttribute('opacity', '1');
});
