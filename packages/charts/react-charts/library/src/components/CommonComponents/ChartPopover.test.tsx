import * as React from 'react';
import { render } from '@testing-library/react';
import { Popover } from '@fluentui/react-popover';
import { ChartPopover } from './ChartPopover';

// jsdom cannot position a popover. The mock records the positioning that ChartPopover passes to Popover.
// PopoverSurface is mocked too: without a real Popover around it, it has no context and loops.
jest.mock('@fluentui/react-popover', () => ({
  ...jest.requireActual('@fluentui/react-popover'),
  Popover: jest.fn(props => props.children),
  PopoverSurface: jest.fn(props => props.children),
}));

const positioningPassedToPopover = () => (Popover as jest.Mock).mock.calls[0][0].positioning;

describe('ChartPopover positioning', () => {
  beforeEach(() => {
    (Popover as jest.Mock).mockClear();
  });

  it('keeps the default positioning and the caller target', () => {
    const target = document.createElement('div');
    render(<ChartPopover isPopoverOpen={true} positioning={{ target }} />);
    expect(positioningPassedToPopover()).toMatchObject({ autoSize: 'always', offset: 20, coverTarget: false });
    expect(positioningPassedToPopover().target).toBe(target);
  });

  it('applies caller positioning over the defaults', () => {
    render(
      <ChartPopover
        isPopoverOpen={true}
        clickPosition={{ x: 1, y: 2 }}
        positioning={{ position: 'below', autoSize: false, offset: 4 }}
      />,
    );
    expect(positioningPassedToPopover()).toMatchObject({ position: 'below', autoSize: false, offset: 4 });
  });

  it('resolves a positioning shorthand string', () => {
    render(<ChartPopover isPopoverOpen={true} clickPosition={{ x: 1, y: 2 }} positioning="above-start" />);
    expect(positioningPassedToPopover()).toMatchObject({ position: 'above', align: 'start' });
  });

  it('applies customCalloutProps positioning and keeps the chart target', () => {
    const target = document.createElement('div');
    render(
      <ChartPopover
        isPopoverOpen={true}
        positioning={{ target }}
        customCallout={{ customCalloutProps: { positioning: { position: 'after' } } }}
      />,
    );
    expect(positioningPassedToPopover()).toMatchObject({ position: 'after' });
    expect(positioningPassedToPopover().target).toBe(target);
  });
});
