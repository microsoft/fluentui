import * as React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { VegaLiteCenteredArea } from './VegaLiteCenteredArea';
import { VegaLiteRangedChart } from './VegaLiteRangedChart';
import { groupedOffsetSpec } from '../../testing/fixtures/ranged';
import type { VegaLiteSpec } from './VegaLiteTypes';

// Match the reviewed Week 5 endpoint without importing Storybook or changing its fixture.
const spec: VegaLiteSpec = {
  width: 640,
  height: 340,
  mark: 'area',
  data: {
    values: [
      { week: 1, service: 'Search', load: 12 },
      { week: 1, service: 'Storage', load: 8 },
      { week: 2, service: 'Search', load: 16 },
      { week: 2, service: 'Storage', load: 12 },
      { week: 3, service: 'Search', load: 10 },
      { week: 3, service: 'Storage', load: 18 },
      { week: 4, service: 'Search', load: 18 },
      { week: 4, service: 'Storage', load: 14 },
      { week: 5, service: 'Search', load: 14 },
      { week: 5, service: 'Storage', load: 10 },
    ],
  },
  encoding: {
    x: { field: 'week', type: 'quantitative', axis: { title: 'Week', values: [1, 2, 3, 4, 5] } },
    y: { field: 'load', type: 'quantitative', stack: 'center', title: 'Centered load (requests/s)' },
    color: { field: 'service', type: 'nominal', scale: { domain: ['Search', 'Storage'] } },
    tooltip: [
      { field: 'week', title: 'Week' },
      { field: 'service', title: 'Service' },
      { field: 'load', title: 'Raw load (requests/s)' },
    ],
  },
};
const endpointLabel = 'Week: 5; Service: Storage; Raw load (requests/s): 10';

describe('centered-area navigation overlay', () => {
  it('keeps the actual rightmost circle and its focus outline outside the series clip', () => {
    const { container } = render(<VegaLiteCenteredArea spec={spec} />);
    const endpoint = screen.getByRole('img', { name: endpointLabel });
    expect(endpoint.tagName).toBe('circle');
    expect(endpoint).toHaveAttribute('cx', '568');
    expect(endpoint).toHaveAttribute('cy', '192.625');
    expect(endpoint).toHaveAttribute('r', '5');
    expect(endpoint).toHaveAttribute('tabindex', '0');
    expect(endpoint.closest('[clip-path]')).toBeNull();

    const svg = endpoint.closest('svg')!;
    expect(svg).toHaveAttribute('width', '640');
    expect(svg).toHaveAttribute('height', '340');
    expect(svg).toHaveAttribute('viewBox', '-56 -24 640 340');
    const clippedSeries = container.querySelector('[data-centered-series]')!.parentElement!;
    const points = Array.from(container.querySelectorAll('[data-centered-point]'));
    expect(points).toHaveLength(10);
    for (const point of points) {
      expect(point.closest('[clip-path]')).toBeNull();
      expect(point.closest('svg')).toBe(svg);
      expect(clippedSeries.compareDocumentPosition(point)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    }
    expect(svg.closest('[data-centered-navigation]')).not.toBeNull();
    expect(container.querySelector('[navigationOverlay]')).toBeNull();
  });

  it('leaves both filled series under the same exact, unexpanded plot clip', () => {
    const { container } = render(<VegaLiteCenteredArea spec={spec} />);
    const paths = Array.from(container.querySelectorAll('[data-centered-series]'));
    expect(paths.map(path => path.getAttribute('d'))).toEqual([
      'M113.6,50.25L227.2,16.75L340.8,16.75L454.4,0L568,33.5L568,150.75L454.4,150.75L340.8,100.5L227.2,150.75L113.6,150.75Z',
      'M113.6,150.75L227.2,150.75L340.8,100.5L454.4,150.75L568,150.75L568,234.5L454.4,268L340.8,251.25L227.2,251.25L113.6,217.75Z',
    ]);
    const clip = container.querySelector('clipPath')!;
    expect(clip.firstElementChild).toHaveAttribute('width', '568');
    expect(clip.firstElementChild).toHaveAttribute('height', '268');
    expect(clip.firstElementChild).not.toHaveAttribute('x');
    expect(clip.firstElementChild).not.toHaveAttribute('y');
    for (const path of paths) {
      expect(path.closest('[clip-path]')).toHaveAttribute('clip-path', `url(#${clip.id})`);
      expect(path).toHaveAttribute('aria-hidden', 'true');
    }
  });

  it.each([
    [320, 200],
    [880, 400],
  ])('retains the boundary coordinate and strict clip after resizing to %s by %s', (width, height) => {
    const { container, rerender } = render(<VegaLiteCenteredArea spec={spec} />);
    rerender(<VegaLiteCenteredArea spec={spec} width={width} height={height} />);
    const endpoint = screen.getByRole('img', { name: endpointLabel });
    const rect = container.querySelector('clipPath rect')!;
    expect(endpoint).toHaveAttribute('cx', `${width - 72}`);
    expect(endpoint).toHaveAttribute('r', '5');
    expect(endpoint.closest('[clip-path]')).toBeNull();
    expect(rect).toHaveAttribute('width', `${width - 72}`);
    expect(rect).toHaveAttribute('height', `${height - 72}`);
    expect(endpoint.closest('svg')).toHaveAttribute('height', `${height}`);
  });

  it('preserves endpoint focus/hover tooltip content, ARIA linkage and the existing portal', () => {
    const { container } = render(
      <FluentProvider theme={webLightTheme}>
        <VegaLiteCenteredArea spec={spec} />
      </FluentProvider>,
    );
    const endpoint = screen.getByRole('img', { name: endpointLabel });
    for (const activate of [fireEvent.focus, fireEvent.mouseEnter]) {
      activate(endpoint);
      const tooltip = screen.getByRole('tooltip');
      for (const value of ['Week', '5', 'Service', 'Storage', 'Raw load (requests/s)', '10']) {
        expect(within(tooltip).getByText(value, { exact: true })).toBeInTheDocument();
      }
      expect(endpoint).toHaveAttribute('aria-label', endpointLabel);
      const description = endpoint.ownerDocument.getElementById(endpoint.getAttribute('aria-describedby')!);
      expect(description?.contains(tooltip)).toBe(true);
      expect(container.contains(tooltip)).toBe(false);
      expect(tooltip.closest('[data-portal-node]')).not.toBeNull();
      fireEvent.keyDown(endpoint, { key: 'Escape' });
      expect(screen.queryByRole('tooltip')).toBeNull();
    }
  });

  it('does not unclip ranged bars, whose interactive paths are also their filled geometry', () => {
    const { container } = render(<VegaLiteRangedChart spec={groupedOffsetSpec} width={640} height={340} />);
    const marks = Array.from(container.querySelectorAll('[data-ranged-mark]'));
    expect(marks.length).toBeGreaterThan(0);
    const clip = container.querySelector('clipPath')!;
    for (const mark of marks) {
      expect(mark.tagName).toBe('path');
      expect(mark.closest('[clip-path]')).toHaveAttribute('clip-path', `url(#${clip.id})`);
    }
    expect(clip.firstElementChild).toHaveAttribute('width', '568');
    expect(clip.firstElementChild).toHaveAttribute('height', '268');
  });
});
