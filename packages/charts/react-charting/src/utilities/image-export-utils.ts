import { create as d3Create, select as d3Select, Selection } from 'd3-selection';
import { copyStyle, createMeasurementSpan } from './index';
import { IImageExportOptions } from '../types/index';
import { ILegend, ILegendContainer } from '../Legends';
import {
  LEGEND_CONTAINER_MARGIN_TOP,
  LEGEND_CONTAINER_MARGIN_START,
  LEGEND_PADDING,
  LEGEND_HEIGHT,
  LEGEND_SHAPE_BORDER,
  LEGEND_SHAPE_SIZE,
  LEGEND_SHAPE_MARGIN_END,
  INACTIVE_LEGEND_TEXT_OPACITY,
} from '../components/Legends/Legends.styles';

export type GridChart = {
  container: HTMLElement | null | undefined;
  row?: number;
  col?: number;
};

type SvgImage = {
  dataUrl: string;
  width: number;
  height: number;
};

export async function exportChartsAsImage(
  charts: GridChart[],
  legendsToSvg?: ILegendContainer['toSVG'],
  isRTL: boolean = false,
  opts: IImageExportOptions = {},
): Promise<string> {
  if (charts.length === 0 && !legendsToSvg) {
    throw new Error('No charts or legends to export');
  }

  const chartImages = await Promise.all(
    charts.map(chart => {
      return new Promise<SvgImage>(resolve => {
        const svg = cloneStyledSVG(chart.container, isRTL);
        const svgDataUrl = svgToBase64(svg.node);
        resolve({ dataUrl: svgDataUrl, width: svg.width, height: svg.height });
      });
    }),
  );

  const grid: SvgImage[][] = []; // Sparse 2D array
  charts.forEach((chart, i) => {
    const row = chart.row || 0;
    const col = chart.col || 0;
    if (!grid[row]) {
      grid[row] = [];
    }
    grid[row][col] = chartImages[i];
  });

  if (legendsToSvg) {
    let totalWidth = 0;
    grid.forEach(row => {
      let rowWidth = 0;
      row.forEach(item => {
        rowWidth += item.width;
      });
      totalWidth = Math.max(totalWidth, rowWidth);
    });

    const svg = legendsToSvg(totalWidth, isRTL);
    if (svg.node) {
      const svgDataUrl = svgToBase64(svg.node);
      grid.push([{ dataUrl: svgDataUrl, width: svg.width, height: svg.height }]);
    }
  }

  return svgToPng(grid, opts);
}

const SVG_STYLE_PROPERTIES = [
  'display',
  'fill',
  'fill-opacity',
  'opacity',
  'stroke',
  'stroke-width',
  'transform',
  'border-collapse',
];
const SVG_TEXT_STYLE_PROPERTIES = [
  'font-family',
  'font-size',
  'font-weight',
  'text-anchor',
  'background-color',
  'color',
  'padding',
  'text-align',
  'border',
];
const ANNOTATION_HTML_STYLE_PROPERTIES = [
  'align-items',
  'background',
  'background-color',
  'border',
  'border-radius',
  'box-shadow',
  'box-sizing',
  'color',
  'column-gap',
  'display',
  'flex',
  'flex-direction',
  'font-family',
  'font-size',
  'font-style',
  'font-weight',
  'gap',
  'height',
  'justify-content',
  'letter-spacing',
  'line-height',
  'margin',
  'max-height',
  'max-width',
  'min-height',
  'min-width',
  'opacity',
  'overflow',
  'padding',
  'pointer-events',
  'position',
  'row-gap',
  'text-align',
  'text-decoration',
  'text-transform',
  'top',
  'right',
  'bottom',
  'left',
  'visibility',
  'white-space',
  'width',
  'z-index',
];
const ANNOTATION_FOREIGN_OBJECT_STYLE_PROPERTIES = ['overflow', 'pointer-events'];

function cloneStyledSVG(chartContainer: HTMLElement | null | undefined, isRTL: boolean) {
  if (!chartContainer) {
    throw new Error('Chart container is not defined');
  }

  const svg = chartContainer.querySelector<SVGSVGElement>('svg');
  if (!svg) {
    throw new Error('SVG not found');
  }

  let clonedSvg = d3Select(svg.cloneNode(true) as SVGSVGElement)
    .attr('width', null)
    .attr('height', null)
    .attr('viewBox', null);
  let svgElements = svg.getElementsByTagName('*');
  let clonedSvgElements = clonedSvg.node()!.getElementsByTagName('*');

  const TEXT_ELEMENTS = ['text'];
  const TABLE_ELEMENTS = ['table', 'thead', 'tbody', 'tr', 'th', 'td'];

  for (let i = 0; i < svgElements.length; i++) {
    const tag = svgElements[i].tagName.toLowerCase();

    if (TEXT_ELEMENTS.includes(tag) || TABLE_ELEMENTS.includes(tag)) {
      copyStyle([...SVG_STYLE_PROPERTIES, ...SVG_TEXT_STYLE_PROPERTIES], svgElements[i], clonedSvgElements[i]);
    } else {
      copyStyle(SVG_STYLE_PROPERTIES, svgElements[i], clonedSvgElements[i]);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  svgElements = null as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clonedSvgElements = null as any;

  const originalForeignObjects = svg.querySelectorAll('foreignObject');
  const clonedForeignObjects = clonedSvg.node()!.querySelectorAll('foreignObject');

  originalForeignObjects.forEach((originalFo, index) => {
    const clonedFo = clonedForeignObjects[index];
    if (!clonedFo) {
      return;
    }

    const originalRoot = originalFo.firstElementChild as HTMLElement | null;
    const clonedRoot = clonedFo.firstElementChild as HTMLElement | null;

    if (originalRoot && clonedRoot) {
      copyStyle(ANNOTATION_HTML_STYLE_PROPERTIES, originalRoot, clonedRoot);
    }

    const originalHtmlElements = originalFo.querySelectorAll<HTMLElement>('*');
    const clonedHtmlElements = clonedFo.querySelectorAll<HTMLElement>('*');

    originalHtmlElements.forEach((originalEl, elementIndex) => {
      const clonedEl = clonedHtmlElements[elementIndex];
      if (clonedEl) {
        copyStyle(ANNOTATION_HTML_STYLE_PROPERTIES, originalEl, clonedEl);
      }
    });
  });

  const annotationSvg = chartContainer.querySelector<SVGSVGElement>('[data-chart-annotation-svg="true"]');
  let annotationClone: SVGSVGElement | null = null;

  if (annotationSvg) {
    annotationClone = annotationSvg.cloneNode(true) as SVGSVGElement;
    copyStyle(SVG_STYLE_PROPERTIES, annotationSvg, annotationClone);

    const annotationElements = annotationSvg.getElementsByTagName('*');
    const clonedAnnotationElements = annotationClone.getElementsByTagName('*');

    for (let i = 0; i < annotationElements.length; i++) {
      const original = annotationElements[i];
      const cloned = clonedAnnotationElements[i];
      const tag = original.tagName.toLowerCase();
      const isSvgElement = original instanceof SVGElement;
      const isTextElement = tag === 'text';
      const isHtmlElement = original instanceof HTMLElement;

      if (isSvgElement) {
        if (isTextElement) {
          copyStyle([...SVG_STYLE_PROPERTIES, ...SVG_TEXT_STYLE_PROPERTIES], original, cloned);
        } else {
          copyStyle(SVG_STYLE_PROPERTIES, original, cloned);
        }
      }

      if (isHtmlElement) {
        copyStyle(ANNOTATION_HTML_STYLE_PROPERTIES, original, cloned);
      }

      if (tag === 'foreignobject') {
        copyStyle(ANNOTATION_FOREIGN_OBJECT_STYLE_PROPERTIES, original, cloned);
      }
    }
  }

  const { width, height } = svg.getBoundingClientRect();

  clonedSvg
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('direction', isRTL ? 'rtl' : 'ltr');

  if (annotationClone) {
    clonedSvg.selectAll('[data-chart-annotation-layer="true"]').remove();
    d3Select(annotationClone).attr('x', 0).attr('y', 0).attr('width', width).attr('height', height);
    clonedSvg.append(() => annotationClone as SVGSVGElement);
  }

  const result = {
    node: clonedSvg.node(),
    width,
    height,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clonedSvg = null as any;

  return result;
}

const LEGEND_TEXT_STYLE_PROPERTIES_MAP = {
  color: 'fill',
  'font-family': 'font-family',
  'font-size': 'font-size',
  'font-weight': 'font-weight',
};

export function cloneLegendsToSVG(
  legends: ILegend[],
  svgWidth: number,
  config: {
    selectedLegends: Record<string, boolean>;
    centerLegends: boolean;
    textClassName: string;
    isRTL: boolean;
  },
  legendContainer?: HTMLElement | null,
): { node: SVGSVGElement | null; width: number; height: number } {
  if (legends.length === 0) {
    return {
      node: null,
      width: 0,
      height: 0,
    };
  }

  const { selectedLegends, centerLegends, textClassName, isRTL } = config;
  const legendGroup = d3Create<SVGGElement>('svg:g');
  let legendX = centerLegends ? 0 : LEGEND_CONTAINER_MARGIN_START;
  let legendY = LEGEND_CONTAINER_MARGIN_TOP;
  let legendLine: { elem: Selection<SVGGElement, unknown, null, undefined>; width: number }[] = [];
  const legendLines: (typeof legendLine)[] = [];
  const legendLineWidths: number[] = [];
  const noLegendsSelected = Object.keys(selectedLegends).length === 0;

  for (let i = 0; i < legends.length; i++) {
    const textOffset = LEGEND_PADDING + LEGEND_SHAPE_SIZE + LEGEND_SHAPE_MARGIN_END;
    const legendText = createMeasurementSpan(legends[i].title, textClassName, legendContainer);
    const legendWidth = textOffset + legendText.getBoundingClientRect().width + LEGEND_PADDING;
    const legendItem = legendGroup.append('g');

    legendLine.push({ elem: legendItem, width: legendWidth });
    if (legendX + legendWidth > svgWidth && legendLine.length > 1) {
      legendLine.pop();
      legendLines.push(legendLine);
      legendLineWidths.push(legendX);

      legendLine = [{ elem: legendItem, width: legendWidth }];
      legendX = centerLegends ? 0 : LEGEND_CONTAINER_MARGIN_START;
      legendY += LEGEND_HEIGHT;
    }

    const isLegendActive = selectedLegends[legends[i].title] || noLegendsSelected;

    legendItem
      .append('rect')
      .attr('x', legendX + (isRTL ? legendWidth - LEGEND_PADDING - LEGEND_SHAPE_SIZE : LEGEND_PADDING))
      .attr('y', legendY + LEGEND_PADDING)
      .attr('width', LEGEND_SHAPE_SIZE)
      .attr('height', LEGEND_SHAPE_SIZE)
      .style('fill', isLegendActive ? legends[i].color : 'transparent')
      .style('stroke-width', LEGEND_SHAPE_BORDER)
      .style('stroke', legends[i].color);

    legendItem
      .append('text')
      .attr('x', legendX + (isRTL ? legendWidth - textOffset : textOffset))
      .attr('y', legendY + LEGEND_PADDING)
      .attr('dominant-baseline', 'hanging')
      .style('opacity', isLegendActive ? 1 : INACTIVE_LEGEND_TEXT_OPACITY)
      .text(legends[i].title)
      .call(selection => copyStyle(LEGEND_TEXT_STYLE_PROPERTIES_MAP, legendText, selection.node()!));

    legendX += legendWidth;
  }

  legendLines.push(legendLine);
  legendLineWidths.push(legendX);
  legendY += LEGEND_HEIGHT;

  if (centerLegends) {
    legendLines.forEach((ln, idx) => {
      const lineOffsetX = Math.max((svgWidth - legendLineWidths[idx]) / 2, 0);
      let remLineWidth = legendLineWidths[idx];
      let itemOffsetX = 0;
      ln.forEach(item => {
        const newOffsetX = lineOffsetX + (isRTL ? remLineWidth - item.width - itemOffsetX : 0);
        item.elem.attr('transform', `translate(${newOffsetX}, 0)`);
        remLineWidth -= item.width;
        itemOffsetX += item.width;
      });
    });
  } else if (isRTL) {
    const w1 = Math.max(svgWidth, ...legendLineWidths);
    legendLines.forEach(ln => {
      let remLineWidth = w1 - LEGEND_CONTAINER_MARGIN_START;
      let itemOffsetX = LEGEND_CONTAINER_MARGIN_START;
      ln.forEach(item => {
        const newOffsetX = remLineWidth - item.width - itemOffsetX;
        item.elem.attr('transform', `translate(${newOffsetX}, 0)`);
        remLineWidth -= item.width;
        itemOffsetX += item.width;
      });
    });
  }

  const w1 = Math.max(svgWidth, ...legendLineWidths);
  const h1 = legendY;
  const svg = d3Create<SVGSVGElement>('svg').attr('width', w1).attr('height', h1).attr('viewBox', `0 0 ${w1} ${h1}`);
  svg.append(() => legendGroup.node()!);

  return {
    node: svg.node(),
    width: w1,
    height: h1,
  };
}

type PositionedImage = SvgImage & {
  x: number;
  y: number;
};

async function svgToPng(grid: SvgImage[][], opts: IImageExportOptions = {}): Promise<string> {
  let totalWidth = 0;
  let totalHeight = 0;

  const positionedImages: PositionedImage[] = grid
    .map(row => {
      let rowWidth = 0;
      let rowHeight = 0;

      const items = row.map(item => {
        const positioned = { ...item, x: rowWidth, y: totalHeight };
        rowWidth += item.width;
        rowHeight = Math.max(rowHeight, item.height);
        return positioned;
      });

      totalWidth = Math.max(totalWidth, rowWidth);
      totalHeight += rowHeight;

      return items;
    })
    .flat();

  const scale = opts.scale || 1;
  const w0 = opts.width || totalWidth;
  const h0 = opts.height || totalHeight;
  const scaleX = (scale * w0) / totalWidth;
  const scaleY = (scale * h0) / totalHeight;
  totalWidth = scaleX * totalWidth;
  totalHeight = scaleY * totalHeight;

  const canvas = document.createElement('canvas');
  canvas.width = totalWidth;
  canvas.height = totalHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas context is null');
  }

  ctx.fillStyle = opts.background || 'transparent';
  ctx.fillRect(0, 0, totalWidth, totalHeight);

  await Promise.all(
    positionedImages.map(
      item =>
        new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            ctx.drawImage(img, scaleX * item.x, scaleY * item.y, scaleX * item.width, scaleY * item.height);
            resolve();
          };
          img.onerror = reject;
          img.src = item.dataUrl;
        }),
    ),
  );

  return canvas.toDataURL('image/png');
}

function svgToBase64(svgNode: SVGSVGElement | null) {
  if (!svgNode) {
    throw new Error('SVG node is null');
  }

  const svgData = new XMLSerializer().serializeToString(svgNode);
  const svgDataUrl = 'data:image/svg+xml;base64,' + btoa(unescapePonyfill(encodeURIComponent(svgData)));
  return svgDataUrl;
}

const hex2 = /^[\da-f]{2}$/i;
const hex4 = /^[\da-f]{4}$/i;

/**
 * A ponyfill for the deprecated `unescape` method, taken from the `core-js` library.
 *
 * Source: {@link https://github.com/zloirock/core-js/blob/167136f479d3b8519953f2e4c534ecdd1031d3cf/packages/core-js/modules/es.unescape.js core-js/packages/core-js/modules/es.unescape.js}
 */
function unescapePonyfill(str: string) {
  let result = '';
  const length = str.length;
  let index = 0;
  let chr;
  let part;
  while (index < length) {
    chr = str.charAt(index++);
    if (chr === '%') {
      if (str.charAt(index) === 'u') {
        part = str.slice(index + 1, index + 5);
        if (hex4.exec(part)) {
          result += String.fromCharCode(parseInt(part, 16));
          index += 5;
          continue;
        }
      } else {
        part = str.slice(index, index + 2);
        if (hex2.exec(part)) {
          result += String.fromCharCode(parseInt(part, 16));
          index += 2;
          continue;
        }
      }
    }
    result += chr;
  }
  return result;
}
