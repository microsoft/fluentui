import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Popover, type PopoverProps, type PopoverSurfaceProps } from '@fluentui/react-popover';
import { resolvePositioningShorthand } from '@fluentui/react-positioning';
import { DonutChart } from './DonutChart';
import { chartPointsDC } from '../../utilities/test-data';

jest.mock('@fluentui/react-popover', () => ({
  ...jest.requireActual('@fluentui/react-popover'),
  Popover: jest.fn((props: PopoverProps) => <>{props.children}</>),
  PopoverSurface: jest.fn((props: PopoverSurfaceProps) => <>{props.children}</>),
}));

const getPositioning = () => resolvePositioningShorthand(jest.mocked(Popover).mock.lastCall?.[0].positioning);
const interactions = [
  ['hover', fireEvent.mouseOver],
  ['focus', fireEvent.focus],
] as const;

describe.each(interactions)('DonutChart callout on %s', (_name, interact) => {
  it('forwards shorthand positioning and other callout props', () => {
    const { getAllByRole, getByText } = render(
      <DonutChart
        data={chartPointsDC}
        innerRadius={55}
        calloutProps={{ positioning: 'before-top', descriptionMessage: 'Caller description' }}
      />,
    );
    const arc = getAllByRole('option')[0];
    interact(arc);

    expect(getPositioning()).toMatchObject({ position: 'before', align: 'top' });
    expect(getPositioning().target).toBe(arc);
    expect(getByText('Caller description')).toBeDefined();
  });

  it.each([null, undefined])('preserves the arc target with a %s per-point target', target => {
    const { getAllByRole } = render(
      <DonutChart
        data={chartPointsDC}
        innerRadius={55}
        calloutProps={{ positioning: { position: 'before', offset: 0, autoSize: false } }}
        calloutPropsPerDataPoint={() => ({ positioning: { position: 'below', target } })}
      />,
    );
    const arc = getAllByRole('option')[0];
    interact(arc);

    expect(getPositioning()).toMatchObject({ position: 'below', offset: 0, autoSize: false });
    expect(getPositioning().target).toBe(arc);
  });

  it('honors an explicit caller target', () => {
    const target = render(<div data-testid="target" />).getByTestId('target');
    const { getAllByRole } = render(
      <DonutChart data={chartPointsDC} innerRadius={55} calloutProps={{ positioning: { target } }} />,
    );
    interact(getAllByRole('option')[0]);

    expect(getPositioning().target).toBe(target);
  });

  it('lets a concrete per-point target override the caller target', () => {
    const { getByTestId } = render(
      <>
        <div data-testid="chart-target" />
        <div data-testid="point-target" />
      </>,
    );
    const pointTarget = getByTestId('point-target');
    const { getAllByRole } = render(
      <DonutChart
        data={chartPointsDC}
        innerRadius={55}
        calloutProps={{ positioning: { target: getByTestId('chart-target'), position: 'before' } }}
        calloutPropsPerDataPoint={() => ({ positioning: { target: pointTarget } })}
      />,
    );
    interact(getAllByRole('option')[0]);

    expect(getPositioning()).toMatchObject({ position: 'before' });
    expect(getPositioning().target).toBe(pointTarget);
  });
});
