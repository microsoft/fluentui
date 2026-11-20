import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
// Initialize public chart exports before native responsive factories.
import { VegaDeclarativeChart } from '../../index';
import { ChartPopover } from '../CommonComponents/ChartPopover';
import { VegaLiteRangedChart } from './VegaLiteRangedChart';
import { VegaLiteCenteredArea } from './VegaLiteCenteredArea';
import { groupedOffsetSpec } from '../../testing/fixtures/ranged';
import { centeredAreaSpec } from './testing/fixtures/centered-area';
import type { VegaLiteSpec } from './VegaLiteTypes';

const renderers = [
  { name: 'ranged', Component: VegaLiteRangedChart, spec: groupedOffsetSpec, selector: '[data-ranged-mark]' },
  { name: 'centered', Component: VegaLiteCenteredArea, spec: centeredAreaSpec(), selector: '[data-centered-point]' },
];

describe.each(renderers)('$name shell height ownership', ({ Component, spec, selector }) => {
  it.each([undefined, 'Authored title', { text: 'Authored title', subtitle: 'Authored subtitle' }])(
    'does not turn viewport height into outer CSS height for title %p',
    title => {
      const ref = React.createRef<HTMLDivElement>();
      const { rerender } = render(<Component ref={ref} spec={{ ...spec, title }} width={400} height={200} />);
      expect(ref.current!.style.height).toBe('');
      expect(ref.current!.querySelector('svg')).toHaveAttribute('height', '200');
      expect(screen.getAllByRole('option').length).toBeGreaterThan(0);

      rerender(<Component ref={ref} spec={{ ...spec, title }} hideTitle width={500} height={300} />);
      expect(ref.current!.style.height).toBe('');
      expect(ref.current!.querySelector('svg')).toHaveAttribute('height', '300');
      if (typeof title === 'object') {
        expect(screen.getByText('Authored subtitle')).toBeInTheDocument();
      }
    },
  );

  it.each([600, '75vh'])('preserves authored outer CSS height %p independently of viewport height', cssHeight => {
    const ref = React.createRef<HTMLDivElement>();
    const { rerender } = render(
      <Component ref={ref} spec={spec} width={400} height={200} style={{ height: cssHeight, minHeight: '10em' }} />,
    );
    expect(ref.current!.style.height).toBe(typeof cssHeight === 'number' ? `${cssHeight}px` : cssHeight);
    expect(ref.current!.style.minHeight).toBe('10em');
    expect(ref.current!.querySelector('svg')).toHaveAttribute('height', '200');
    rerender(<Component ref={ref} spec={spec} width={400} height={250} style={{ height: cssHeight }} />);
    expect(ref.current!.style.height).toBe(typeof cssHeight === 'number' ? `${cssHeight}px` : cssHeight);
    expect(ref.current!.querySelector('svg')).toHaveAttribute('height', '250');
  });

  it('portals the real themed callout outside a clipped shell without changing its mark anchor', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container } = render(
      <FluentProvider theme={webLightTheme}>
        <Component ref={ref} spec={spec} width={400} height={200} style={{ overflow: 'hidden' }} />
      </FluentProvider>,
    );
    const mark = ref.current!.querySelector<SVGElement>(selector)!;
    fireEvent.focus(mark);
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip.closest('[data-portal-node]')).not.toBeNull();
    expect(container.contains(tooltip)).toBe(false);
    const description = mark.ownerDocument.getElementById(mark.getAttribute('aria-describedby')!);
    expect(description?.contains(tooltip)).toBe(true);
    fireEvent.keyDown(mark, { key: 'Escape' });
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('gives the public responsive geometry host intrinsic height while retaining the SVG viewport', () => {
    const sizedSpec: VegaLiteSpec = { ...spec, width: 400, height: 200 };
    const { container } = render(
      <FluentProvider theme={webLightTheme}>
        <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: sizedSpec }} semanticMode="strict" />
      </FluentProvider>,
    );
    const mark = container.querySelector(selector)!;
    const svg = mark.closest('svg')!;
    const shell = svg.closest<HTMLElement>('[role="presentation"]')!;
    expect(svg).toHaveAttribute('height', '200');
    expect(shell.style.height).toBe('');
    expect(shell.parentElement!.style.height).toBe('auto');
    expect(screen.getAllByRole('option').length).toBeGreaterThan(0);
  });
});

describe('ChartPopover compatibility', () => {
  it.each([undefined, true, false])('keeps the existing native inline default; explicit inline=%p', inline => {
    const { container } = render(
      <FluentProvider theme={webLightTheme}>
        <ChartPopover isPopoverOpen inline={inline} clickPosition={{ x: 100, y: 100 }} XValue="Native callout" />
      </FluentProvider>,
    );
    const text = screen.getByText('Native callout');
    expect(container.contains(text)).toBe(inline !== false);
    expect(text.closest('[data-portal-node]') !== null).toBe(inline === false);
  });
});
