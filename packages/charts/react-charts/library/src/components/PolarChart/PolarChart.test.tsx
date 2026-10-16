import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { PolarChart } from './PolarChart';
import type { PolarChartProps } from './PolarChart.types';
import type { PolarDataPoint } from '../../types/DataPoint';

describe('PolarChart custom JSX callout hooks', () => {
  const point: PolarDataPoint = {
    r: 10,
    theta: 45,
    radialAxisCalloutData: 'native radial value',
    angularAxisCalloutData: 'native angular value',
  };
  const otherPoint: PolarDataPoint = { r: 20, theta: 90 };
  const props: PolarChartProps = {
    data: [{ type: 'scatterpolar', legend: 'Series', data: [point, otherPoint] }],
    width: 400,
    height: 400,
    hideLegend: true,
  };

  it.each(['hover', 'focus'])('receives the original polar point on %s and rerenders custom JSX', event => {
    const onRenderCalloutPerDataPoint = jest.fn((data?: PolarDataPoint) => <div>custom {data?.r as number}</div>);
    const { container, rerender } = render(
      <PolarChart {...props} onRenderCalloutPerDataPoint={onRenderCalloutPerDataPoint} />,
    );
    expect(onRenderCalloutPerDataPoint).not.toHaveBeenCalled();
    const markers = container.querySelectorAll('circle[role="img"]');
    const show = event === 'hover' ? fireEvent.mouseOver : fireEvent.focus;
    show(markers[0]);
    expect(onRenderCalloutPerDataPoint.mock.calls.slice(-1)[0][0]).toBe(point);
    expect(container.querySelector('.fui-PopoverSurface')).toHaveTextContent(/^custom 10$/);
    show(markers[1]);
    expect(onRenderCalloutPerDataPoint.mock.calls.slice(-1)[0][0]).toBe(otherPoint);
    expect(screen.getByText('custom 20')).toBeInTheDocument();

    const replacement = jest.fn((data?: PolarDataPoint) => <div>replacement {data?.r as number}</div>);
    rerender(<PolarChart {...props} onRenderCalloutPerDataPoint={replacement} />);
    expect(replacement.mock.calls.slice(-1)[0][0]).toBe(otherPoint);
    expect(screen.getByText('replacement 20')).toBeInTheDocument();
    fireEvent.mouseLeave(container.firstElementChild!);
    expect(container.querySelector('.fui-PopoverSurface')).toBeNull();
  });

  it.each(['hover', 'focus'])('does not mount a surface when the renderer returns null on %s', event => {
    const renderNull = jest.fn(() => null);
    const { container } = render(<PolarChart {...props} onRenderCalloutPerDataPoint={renderNull} />);
    const show = event === 'hover' ? fireEvent.mouseOver : fireEvent.focus;
    show(container.querySelector('circle[role="img"]')!);
    expect(renderNull).toHaveBeenCalledWith(point);
    expect(container.querySelector('.fui-PopoverSurface')).toBeNull();
  });

  it.each(['hover', 'focus'])('falls back to native content when the hook returns undefined on %s', event => {
    const renderDefault = jest.fn().mockReturnValue(undefined);
    const { container } = render(<PolarChart {...props} onRenderCalloutPerDataPoint={renderDefault} />);
    const show = event === 'hover' ? fireEvent.mouseOver : fireEvent.focus;
    show(container.querySelector('circle[role="img"]')!);
    expect(renderDefault).toHaveBeenCalledWith(point);
    expect(container.querySelector('.fui-PopoverSurface')).toHaveTextContent('native radial value');
    expect(container.querySelector('.fui-PopoverSurface')).toHaveTextContent('native angular value');
  });

  it('keeps native callout content when no renderer is supplied', () => {
    const { container } = render(<PolarChart {...props} />);
    fireEvent.focus(container.querySelector('circle[role="img"]')!);
    expect(container.querySelector('.fui-PopoverSurface')).toHaveTextContent('native radial value');
    expect(container.querySelector('.fui-PopoverSurface')).toHaveTextContent('native angular value');
  });

  it('does not invoke the renderer when tooltips are hidden', () => {
    const onRenderCalloutPerDataPoint = jest.fn(() => <div>custom</div>);
    const { container } = render(
      <PolarChart {...props} hideTooltip onRenderCalloutPerDataPoint={onRenderCalloutPerDataPoint} />,
    );
    fireEvent.focus(container.querySelector('circle[role="img"]')!);
    expect(onRenderCalloutPerDataPoint).not.toHaveBeenCalled();
    expect(container.querySelector('.fui-PopoverSurface')).toBeNull();
  });
});
