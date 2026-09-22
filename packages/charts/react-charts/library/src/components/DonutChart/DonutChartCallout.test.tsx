import * as React from 'react';
import { render, queryAllByAttribute, fireEvent } from '@testing-library/react';
import { Popover } from '@fluentui/react-popover';
import { DonutChart } from './index';
import { chartPointsDC } from '../../utilities/test-data';

// jsdom cannot position a popover. The mock records the positioning that the chart passes to Popover.
// PopoverSurface is mocked too: without a real Popover around it, it has no context and loops.
jest.mock('@fluentui/react-popover', () => ({
  ...jest.requireActual('@fluentui/react-popover'),
  Popover: jest.fn(props => props.children),
  PopoverSurface: jest.fn(props => props.children),
}));

describe('DonutChart calloutProps', () => {
  it('forwards calloutProps.positioning and keeps the hovered arc as the target', () => {
    const wrapper = render(
      <DonutChart data={chartPointsDC} innerRadius={55} calloutProps={{ positioning: { position: 'below' } }} />,
    );
    const arc = queryAllByAttribute('id', wrapper.container, /Pie/i)[0];
    fireEvent.mouseOver(arc);

    const calls = (Popover as jest.Mock).mock.calls;
    const positioning = calls[calls.length - 1][0].positioning;
    expect(positioning).toMatchObject({ position: 'below' });
    expect(positioning.target).toBe(arc);
  });
});
