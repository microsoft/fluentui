import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { VegaDeclarativeChart } from '../../index';
import type { VegaLiteSpec } from './VegaLiteTypes';
import { integrationLineSpec, integrationRangedSpec } from '../../testing/fixtures/integration';

const authoredTitle = 'Ad Performance - CTR Analysis';
const authoredSubtitle = 'Authored campaign performance';
const titleForms: NonNullable<VegaLiteSpec['title']>[] = [
  authoredTitle,
  { text: authoredTitle, subtitle: authoredSubtitle },
];
const modes = ['legacy', 'strict'] as const;
const nativeKinds = ['line', 'scatter', 'bar'] as const;
type NativeKind = (typeof nativeKinds)[number];

function nativeSpec(kind: NativeKind): VegaLiteSpec {
  return {
    ...integrationLineSpec,
    mark: kind === 'scatter' ? 'point' : kind,
    ...(kind === 'bar' ? { encoding: { ...integrationLineSpec.encoding, x: { field: 'x', type: 'ordinal' } } } : {}),
  };
}

function geometrySpec(kind: 'ranged' | 'centered'): VegaLiteSpec {
  return kind === 'ranged'
    ? integrationRangedSpec
    : {
        ...integrationLineSpec,
        mark: 'area',
        encoding: { ...integrationLineSpec.encoding, y: { ...integrationLineSpec.encoding!.y, stack: 'center' } },
      };
}

function expectNativeMarks(container: HTMLElement, kind: NativeKind) {
  const svg = container.querySelector('svg.fui-cart__chart')!;
  expect(svg).not.toBeNull();
  const marks = svg.querySelectorAll(
    kind === 'line' ? 'line[id^="lineID"]' : kind === 'bar' ? 'rect[role="option"]' : 'circle[role="option"]',
  );
  expect(marks).toHaveLength(kind === 'line' ? 1 : 2);
  expect(svg.outerHTML).not.toMatch(/NaN|Infinity/);
}

describe('public standalone authored titles', () => {
  beforeEach(() => {
    resetIdsForTests();
    // Real native charts need measurable layout and numeric legend margins in jsdom.
    jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (this: Element) {
      const text = this.tagName.toLowerCase() === 'text';
      const legend = this.getAttribute('role') === 'listbox' || /legend/i.test(this.getAttribute('class') ?? '');
      const width = text ? Math.max(1, this.textContent?.length ?? 0) * 7 : 640;
      const height = text ? 18 : legend ? 32 : 400;
      return { width, height, top: 0, left: 0, right: width, bottom: height, x: 0, y: 0, toJSON: () => ({}) };
    });
    const computedStyle = globalThis.getComputedStyle;
    jest.spyOn(globalThis, 'getComputedStyle').mockImplementation(element => {
      const style = computedStyle(element);
      return {
        ...style,
        marginTop: '0px',
        marginBottom: '0px',
        getPropertyValue: (property: string) => style.getPropertyValue(property),
      } as CSSStyleDeclaration;
    });
  });

  afterEach(() => jest.restoreAllMocks());

  describe.each(nativeKinds)('native %s', kind => {
    describe.each(modes)('%s mode', semanticMode => {
      const titles: typeof titleForms =
        semanticMode === 'strict' ? [authoredTitle, { text: authoredTitle }] : titleForms;
      it.each(titles)('renders one visible authored heading for %j before the real chart', title => {
        const spec = { ...nativeSpec(kind), title };
        const before = JSON.stringify(spec);
        const { container } = render(
          <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} semanticMode={semanticMode} />,
        );
        expect(screen.getAllByRole('heading')).toHaveLength(1);
        const heading = screen.getByRole('heading', { name: authoredTitle, level: 3 });
        expect(heading).toBeVisible();
        const root = container.firstElementChild!;
        expect(root.firstElementChild).toBe(heading);
        expect(heading.parentElement).toBe(root);
        expectNativeMarks(container, kind);
        const chart = root.lastElementChild!;
        expect(chart.contains(container.querySelector('svg'))).toBe(true);
        if (typeof title === 'object' && title.subtitle) {
          const subtitle = screen.getByText(authoredSubtitle, { exact: true });
          expect(subtitle).toBeVisible();
          expect(subtitle.parentElement).toBe(root);
          expect(heading.nextElementSibling).toBe(subtitle);
          expect(subtitle.nextElementSibling).toBe(chart);
        } else {
          expect(screen.queryByText(authoredSubtitle)).toBeNull();
          expect(heading.nextElementSibling).toBe(chart);
        }
        expect(JSON.stringify(spec)).toBe(before);
      });

      it('leaves the untitled native root DOM unchanged without turning its description into a heading', () => {
        const spec = { ...nativeSpec(kind), description: 'Accessible description only' };
        const { container } = render(
          <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} semanticMode={semanticMode} />,
        );
        expect(screen.queryByRole('heading')).toBeNull();
        const root = container.firstElementChild!;
        expect(root.children).toHaveLength(1);
        expect(root.firstElementChild!.querySelector('svg.fui-cart__chart')).not.toBeNull();
        expect(screen.queryByText(spec.description, { exact: true })).toBeNull();
        expectNativeMarks(container, kind);
      });
    });

    it.each(titleForms)('includes the authored title and subtitle in SSR output for %j', title => {
      const html = renderToString(
        <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: { ...nativeSpec(kind), title } }} />,
      );
      const { container } = render(<div />);
      const serverRoot = container.firstElementChild!;
      serverRoot.innerHTML = html;
      const headings = serverRoot.querySelectorAll('h3');
      expect(headings).toHaveLength(1);
      expect(headings[0]).toHaveTextContent(authoredTitle);
      const root = serverRoot.firstElementChild!;
      expect(root.firstElementChild).toBe(headings[0]);
      expect(root.lastElementChild!.querySelector('svg.fui-cart__chart')).not.toBeNull();
      if (typeof title === 'object') {
        expect(headings[0].nextElementSibling).toHaveTextContent(authoredSubtitle);
      }
    });
  });

  it.each(nativeKinds)('retains the existing strict subtitle diagnostic for native %s', kind => {
    expect(() =>
      renderToString(
        <VegaDeclarativeChart
          chartSchema={{ vegaLiteSpec: { ...nativeSpec(kind), title: titleForms[1] } }}
          semanticMode="strict"
        />,
      ),
    ).toThrow('$.title.subtitle [unsupported-property]');
  });

  it('preserves the root ref, class and style through authored title updates and removal', () => {
    const ref = React.createRef<HTMLDivElement>();
    const spec = nativeSpec('line');
    const { container, rerender } = render(
      <VegaDeclarativeChart
        ref={ref}
        className="host"
        style={{ display: 'block' }}
        chartSchema={{ vegaLiteSpec: { ...spec, title: titleForms[1] } }}
      />,
    );
    const root = ref.current!;
    expect(container.firstElementChild).toBe(root);
    expect(root).toHaveClass('host');
    expect(root.style.display).toBe('block');
    expect(root.children).toHaveLength(3);
    rerender(
      <VegaDeclarativeChart
        ref={ref}
        className="updated"
        style={{ display: 'grid' }}
        chartSchema={{ vegaLiteSpec: { ...spec, title: 'Updated authored title' } }}
      />,
    );
    expect(ref.current).toBe(root);
    expect(root).toHaveClass('updated');
    expect(root.style.display).toBe('grid');
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Updated authored title');
    expect(screen.queryByText(authoredSubtitle)).toBeNull();
    expect(root.children).toHaveLength(2);
    rerender(<VegaDeclarativeChart ref={ref} chartSchema={{ vegaLiteSpec: spec }} />);
    expect(ref.current).toBe(root);
    expect(screen.queryByRole('heading')).toBeNull();
    expect(root.children).toHaveLength(1);
    expectNativeMarks(container, 'line');
  });

  describe.each(['ranged', 'centered'] as const)('%s geometry', kind => {
    it.each(modes)('keeps its existing standalone title and subtitle single-owned in %s mode', semanticMode => {
      const spec = {
        ...geometrySpec(kind),
        title: { text: authoredTitle, ...(semanticMode === 'legacy' ? { subtitle: authoredSubtitle } : {}) },
      };
      const { container } = render(
        <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} semanticMode={semanticMode} />,
      );
      expect(screen.getAllByRole('heading')).toHaveLength(1);
      expect(screen.getByRole('heading', { name: authoredTitle, level: 3 })).toBeVisible();
      expect(screen.queryAllByText(authoredSubtitle, { exact: true })).toHaveLength(semanticMode === 'legacy' ? 1 : 0);
      const shell = container.querySelector('[role="presentation"]')!;
      expect(shell.contains(screen.getByRole('heading'))).toBe(true);
      expect(container.firstElementChild!.children).toHaveLength(1);
      expect(container.querySelector(`[data-${kind === 'ranged' ? 'ranged-mark' : 'centered-series'}]`)).not.toBeNull();
    });
  });

  describe.each(['native', 'ranged', 'centered'] as const)('composed %s', kind => {
    it.each(modes)('preserves one composition heading and one heading per cell in %s mode', semanticMode => {
      const unit = kind === 'native' ? nativeSpec('line') : geometrySpec(kind);
      const spec: VegaLiteSpec = {
        title: 'Authored composition',
        hconcat: [
          {
            ...unit,
            title: { text: authoredTitle, ...(semanticMode === 'legacy' ? { subtitle: authoredSubtitle } : {}) },
          },
          { ...unit, title: 'Second cell' },
        ],
      };
      const { container } = render(
        <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} semanticMode={semanticMode} />,
      );
      expect(screen.getAllByRole('heading')).toHaveLength(3);
      expect(screen.getByRole('heading', { level: 2, name: 'Authored composition' })).toBeVisible();
      const heading = screen.getByRole('heading', { level: 3, name: authoredTitle });
      expect(heading.parentElement).toHaveAttribute('data-vega-view');
      expect(screen.getByRole('heading', { level: 3, name: 'Second cell' })).toBeVisible();
      // Geometry already renders the subtitle while hiding its own h3; native cells do not.
      expect(screen.queryAllByText(authoredSubtitle, { exact: true })).toHaveLength(
        kind === 'native' || semanticMode === 'strict' ? 0 : 1,
      );
      expect(container.querySelectorAll('svg')).toHaveLength(2);
    });
  });
});
