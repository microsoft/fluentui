import * as React from 'react';
import { render } from '@testing-library/react';
import { Popover, type PopoverProps, type PopoverSurfaceProps } from '@fluentui/react-popover';
import { resolvePositioningShorthand } from '@fluentui/react-positioning';
import { ChartPopover } from './ChartPopover';

// Record the wrapper's contract without relying on jsdom layout.
jest.mock('@fluentui/react-popover', () => ({
  ...jest.requireActual('@fluentui/react-popover'),
  Popover: jest.fn((props: PopoverProps) => <>{props.children}</>),
  PopoverSurface: jest.fn((props: PopoverSurfaceProps) => <>{props.children}</>),
}));

const getPositioning = () => resolvePositioningShorthand(jest.mocked(Popover).mock.lastCall?.[0].positioning);
const createTarget = () => render(<div data-testid="target" />).getByTestId('target');

describe('ChartPopover positioning', () => {
  it('preserves the defaults and uses the click position as a virtual target', () => {
    render(<ChartPopover clickPosition={{ x: 10, y: 20 }} />);

    expect(getPositioning()).toMatchObject({ autoSize: 'always', offset: 20, coverTarget: false });
    expect(getPositioning().target?.getBoundingClientRect()).toMatchObject({
      x: 10,
      y: 20,
      top: 20,
      left: 10,
      right: 10,
      bottom: 20,
      width: 0,
      height: 0,
    });
  });

  it('honors caller overrides, including falsy values', () => {
    const target = createTarget();
    render(
      <ChartPopover
        positioning={{ target, position: 'before', align: 'top', autoSize: false, offset: 0, coverTarget: true }}
      />,
    );

    expect(getPositioning()).toMatchObject({
      position: 'before',
      align: 'top',
      autoSize: false,
      offset: 0,
      coverTarget: true,
    });
    expect(getPositioning().target).toBe(target);
  });

  it('resolves caller shorthand positioning', () => {
    render(<ChartPopover clickPosition={{ x: 10, y: 20 }} positioning="above-start" />);

    expect(getPositioning()).toMatchObject({ position: 'above', align: 'start' });
  });

  it('merges per-point overrides without dropping other caller options', () => {
    const target = createTarget();
    render(
      <ChartPopover
        positioning={{ target, position: 'before', offset: 0, autoSize: false }}
        customCallout={{ customCalloutProps: { positioning: 'below-end' } }}
      />,
    );

    expect(getPositioning()).toMatchObject({ position: 'below', align: 'end', offset: 0, autoSize: false });
    expect(getPositioning().target).toBe(target);
  });

  it.each([null, undefined])('retains the caller target for a %s per-point target', target => {
    const chartTarget = createTarget();
    render(
      <ChartPopover
        positioning={{ target: chartTarget }}
        customCallout={{ customCalloutProps: { positioning: { position: 'after', target } } }}
      />,
    );

    expect(getPositioning()).toMatchObject({ position: 'after' });
    expect(getPositioning().target).toBe(chartTarget);
  });

  it('lets a concrete per-point target take precedence over the caller target', () => {
    const { getByTestId } = render(
      <>
        <div data-testid="chart-target" />
        <div data-testid="point-target" />
      </>,
    );
    const pointTarget = getByTestId('point-target');
    render(
      <ChartPopover
        positioning={{ target: getByTestId('chart-target'), position: 'above' }}
        customCallout={{ customCalloutProps: { positioning: { target: pointTarget, offset: 0 } } }}
      />,
    );

    expect(getPositioning()).toMatchObject({ position: 'above', offset: 0 });
    expect(getPositioning().target).toBe(pointTarget);
  });

  it('uses the click position when both positioning targets are nullish', () => {
    render(
      <ChartPopover
        clickPosition={{ x: 10, y: 20 }}
        positioning={{ target: null }}
        customCallout={{ customCalloutProps: { positioning: { target: undefined, position: 'below' } } }}
      />,
    );

    expect(getPositioning()).toMatchObject({ position: 'below' });
    expect(getPositioning().target?.getBoundingClientRect()).toMatchObject({ x: 10, y: 20 });
  });
});
