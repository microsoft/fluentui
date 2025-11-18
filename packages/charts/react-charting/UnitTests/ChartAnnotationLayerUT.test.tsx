import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { createTheme } from '@fluentui/react';
import { ChartAnnotationLayer } from '../src/components/CommonComponents/Annotations/ChartAnnotationLayer';
import { IChartAnnotationContext } from '../src/components/CommonComponents/Annotations/ChartAnnotationLayer.types';

const theme = createTheme();

const baseContext: IChartAnnotationContext = {
  plotRect: { x: 20, y: 10, width: 200, height: 120 },
  svgRect: { width: 300, height: 240 },
  isRtl: false,
  xScale: (value: unknown) => 20 + Number(value) * 10,
  yScalePrimary: (value: unknown) => 180 - Number(value) * 20,
};

const getVisibleAnnotation = (text: string) => {
  const matches = screen.getAllByText(text);
  const visible = matches.find(match => match.getAttribute('aria-hidden') !== 'true');
  if (!visible) {
    throw new Error(`Visible annotation "${text}" not found`);
  }
  return visible as HTMLElement;
};

describe('ChartAnnotationLayer', () => {
  it('returns null when there are no annotations', () => {
    const { container } = render(<ChartAnnotationLayer annotations={[]} context={baseContext} theme={theme} />);
    expect(container.firstChild).toBeNull();
  });

  it('positions a data annotation using the provided scales', () => {
    render(
      <ChartAnnotationLayer
        annotations={[
          {
            id: 'point',
            text: 'Point',
            coordinates: { type: 'data', x: 2, y: 3 },
            layout: { align: 'start', verticalAlign: 'top', clipToBounds: false },
          },
        ]}
        context={baseContext}
        theme={theme}
      />,
    );

    getVisibleAnnotation('Point');

    const measurement = document.querySelector(
      '[data-chart-annotation-measurement="true"][data-annotation-key="point"]',
    ) as HTMLElement | null;
    expect(measurement).not.toBeNull();
    expect(parseFloat(measurement!.style.left)).toBeCloseTo(40);
    expect(parseFloat(measurement!.style.top)).toBeCloseTo(120);
    expect(measurement!.style.transform).toBe('');
  });

  it('positions a relative annotation using the plot dimensions', () => {
    render(
      <ChartAnnotationLayer
        annotations={[
          {
            id: 'relative',
            text: 'Relative',
            coordinates: { type: 'relative', x: 0.25, y: 0.75 },
            layout: { align: 'start', verticalAlign: 'top', clipToBounds: false },
          },
        ]}
        context={baseContext}
        theme={theme}
      />,
    );

    getVisibleAnnotation('Relative');

    const measurement = document.querySelector(
      '[data-chart-annotation-measurement="true"][data-annotation-key="relative"]',
    ) as HTMLElement | null;
    expect(measurement).not.toBeNull();
    expect(parseFloat(measurement!.style.left)).toBeCloseTo(70);
    expect(parseFloat(measurement!.style.top)).toBeCloseTo(100);
  });

  it('positions a pixel annotation relative to the plot origin', () => {
    render(
      <ChartAnnotationLayer
        annotations={[
          {
            id: 'pixel',
            text: 'Pixel',
            coordinates: { type: 'pixel', x: 16, y: 24 },
            layout: { align: 'start', verticalAlign: 'top', clipToBounds: false },
          },
        ]}
        context={baseContext}
        theme={theme}
      />,
    );

    getVisibleAnnotation('Pixel');

    const measurement = document.querySelector(
      '[data-chart-annotation-measurement="true"][data-annotation-key="pixel"]',
    ) as HTMLElement | null;
    expect(measurement).not.toBeNull();
    expect(parseFloat(measurement!.style.left)).toBeCloseTo(36);
    expect(parseFloat(measurement!.style.top)).toBeCloseTo(34);
  });

  it('clamps annotations to the plot bounds when clipToBounds is set', () => {
    render(
      <ChartAnnotationLayer
        annotations={[
          {
            id: 'clamped',
            text: 'Clamped',
            coordinates: { type: 'relative', x: 1.5, y: -0.5 },
            layout: { clipToBounds: true },
          },
        ]}
        context={baseContext}
        theme={theme}
      />,
    );

    getVisibleAnnotation('Clamped');

    const measurement = document.querySelector(
      '[data-chart-annotation-measurement="true"][data-annotation-key="clamped"]',
    ) as HTMLElement | null;
    expect(measurement).not.toBeNull();
    expect(parseFloat(measurement!.style.left)).toBeCloseTo(40);
    expect(parseFloat(measurement!.style.top)).toBeCloseTo(baseContext.plotRect.y);
  });

  it('renders connector arrows when configured', () => {
    render(
      <ChartAnnotationLayer
        annotations={[
          {
            id: 'arrow',
            text: 'Arrow note',
            coordinates: { type: 'data', x: 2, y: 3 },
            layout: { verticalAlign: 'bottom', offsetY: -30 },
            connector: {
              strokeColor: '#ff0000',
              strokeWidth: 3,
              dashArray: '4 2',
              startPadding: 10,
              endPadding: 2,
              arrow: 'both',
            },
          },
        ]}
        context={baseContext}
        theme={theme}
      />,
    );

    const connector = document.querySelector('svg line');
    expect(connector).not.toBeNull();
    expect(connector!.getAttribute('stroke')).toBe('#ff0000');
    expect(connector!.getAttribute('stroke-width')).toBe('3');
    expect(connector!.getAttribute('stroke-dasharray')).toBe('4 2');
    expect(connector!.getAttribute('marker-start')).toContain('url(');
    expect(connector!.getAttribute('marker-end')).toContain('url(');
  });

  it('only renders <b>, <i>, and <br> markup while treating other tags as text', () => {
    render(
      <ChartAnnotationLayer
        annotations={[
          {
            id: 'markup',
            text: 'Start <b>bold</b> <i>italic</i> <br>Next <span>span</span> <u>underline</u> <b>&lt;script&gt;text&lt;/script&gt;</b>',
            coordinates: { type: 'relative', x: 0.5, y: 0.5 },
          },
        ]}
        context={baseContext}
        theme={theme}
      />,
    );

    const annotationContent = document.querySelector(
      'foreignObject [data-chart-annotation="true"][data-annotation-key="markup"]',
    ) as HTMLElement | null;

    expect(annotationContent).not.toBeNull();

    const strong = annotationContent!.querySelector('strong');
    expect(strong).not.toBeNull();
    expect(strong!.textContent).toBe('bold');

    const em = annotationContent!.querySelector('em');
    expect(em).not.toBeNull();
    expect(em!.textContent).toBe('italic');

    expect(annotationContent!.querySelector('br')).not.toBeNull();

    expect(annotationContent!.querySelector('span')).toBeNull();
    expect(annotationContent!.querySelector('u')).toBeNull();
    expect(annotationContent!.querySelector('script')).toBeNull();

    const textContent = annotationContent!.textContent ?? '';
    expect(textContent).toContain('<span>span</span>');
    expect(textContent).toContain('<u>underline</u>');
    expect(textContent).toContain('&lt;script&gt;text&lt;/script&gt;');

    const innerHTML = annotationContent!.innerHTML;
    expect(innerHTML).toContain('&lt;span&gt;span&lt;/span&gt;');
    expect(innerHTML).toContain('&lt;u&gt;underline&lt;/u&gt;');
    expect(innerHTML).toContain('&amp;lt;script&amp;gt;text&amp;lt;/script&amp;gt;');
  });

  it('decodes HTML entities before parsing', () => {
    render(
      <ChartAnnotationLayer
        annotations={[
          {
            id: 'entity',
            text: 'Encoded &#x3C;b&#x3E;bold&#x3C;/b&#x3E; and &#60;i&#62;italic&#60;/i&#62; &#x3C;br&#x3E;After',
            coordinates: { type: 'relative', x: 0.5, y: 0.5 },
          },
        ]}
        context={baseContext}
        theme={theme}
      />,
    );

    const annotationContent = document.querySelector(
      'foreignObject [data-chart-annotation="true"][data-annotation-key="entity"]',
    ) as HTMLElement | null;

    expect(annotationContent).not.toBeNull();

    const strong = annotationContent!.querySelector('strong');
    expect(strong).not.toBeNull();
    expect(strong!.textContent).toBe('bold');

    const em = annotationContent!.querySelector('em');
    expect(em).not.toBeNull();
    expect(em!.textContent).toBe('italic');

    expect(annotationContent!.querySelectorAll('br')).toHaveLength(1);

    const innerHTML = annotationContent!.innerHTML;
    expect(innerHTML).not.toContain('&#x3C;');
    expect(innerHTML).not.toContain('&#60;');
  });
});
