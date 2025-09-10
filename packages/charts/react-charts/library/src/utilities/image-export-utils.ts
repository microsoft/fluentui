import { create as d3Create, select as d3Select, Selection } from 'd3-selection';
import { copyStyle, createMeasurementSpan, resolveCSSVariables } from './index';
import { ImageExportOptions } from '../types/index';
import { Legend, LegendContainer } from '../Legends';
import {
  LEGEND_CONTAINER_MARGIN_TOP,
  LEGEND_CONTAINER_MARGIN_START,
  LEGEND_PADDING,
  LEGEND_HEIGHT,
  LEGEND_SHAPE_BORDER,
  LEGEND_SHAPE_SIZE,
  LEGEND_SHAPE_MARGIN_END,
  INACTIVE_LEGEND_TEXT_OPACITY,
} from '../components/Legends/useLegendsStyles.styles';

export function toImage(
  chartContainer: HTMLElement | null | undefined,
  legendsToSvgCallback?: LegendContainer['toSVG'],
  isRTL: boolean = false,
  opts: ImageExportOptions = {},
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!chartContainer) {
      return reject(new Error('Chart container is not defined'));
    }

    try {
      const background =
        typeof opts.background === 'string' ? resolveCSSVariables(chartContainer, opts.background) : 'transparent';

      const svg = toSVG(chartContainer, legendsToSvgCallback, isRTL, background);
      if (!svg.node) {
        return reject(new Error('SVG node is null'));
      }

      let svgData = new XMLSerializer().serializeToString(svg.node);
      // This node is already detached from the DOM, so there's no need to call remove() on it.
      // Just clear the reference.
      svg.node = null;

      let svgDataUrl = 'data:image/svg+xml;base64,' + btoa(unescapePonyfill(encodeURIComponent(svgData)));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      svgData = null as any;

      svgToPng(svgDataUrl, {
        width: opts.width || svg.width,
        height: opts.height || svg.height,
        scale: opts.scale,
      })
        .then(resolve)
        .catch(reject);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      svgDataUrl = null as any;
    } catch (err) {
      return reject(err);
    }
  });
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

function toSVG(
  chartContainer: HTMLElement,
  legendsToSvgCallback: LegendContainer['toSVG'] | undefined,
  isRTL: boolean,
  background: string,
) {
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

  const { width: svgWidth, height: svgHeight } = svg.getBoundingClientRect();
  const legendGroup =
    typeof legendsToSvgCallback === 'function'
      ? legendsToSvgCallback(svgWidth, isRTL)
      : { node: null, width: 0, height: 0 };
  const w1 = Math.max(svgWidth, legendGroup.width);
  const h1 = svgHeight + legendGroup.height;

  if (legendGroup.node) {
    d3Select(legendGroup.node).attr('transform', `translate(0, ${svgHeight})`);
    clonedSvg.append(() => legendGroup.node);
  }
  clonedSvg
    .insert('rect', ':first-child')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', w1)
    .attr('height', h1)
    .attr('fill', background);
  clonedSvg
    .attr('width', w1)
    .attr('height', h1)
    .attr('viewBox', `0 0 ${w1} ${h1}`)
    .attr('direction', isRTL ? 'rtl' : 'ltr');

  const result = {
    node: clonedSvg.node(),
    width: w1,
    height: h1,
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
  legends: Legend[],
  svgWidth: number,
  config: {
    selectedLegends: Record<string, boolean>;
    centerLegends: boolean;
    textClassName: string;
    isRTL: boolean;
  },
  legendContainer?: HTMLElement | null,
): {
  node: SVGGElement | null;
  width: number;
  height: number;
} {
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

  return {
    node: legendGroup.node(),
    width: Math.max(...legendLineWidths),
    height: legendY,
  };
}

function svgToPng(svgDataUrl: string, opts: ImageExportOptions = {}): Promise<string> {
  return new Promise((resolve, reject) => {
    const scale = opts.scale || 1;
    const w0 = opts.width || 300;
    const h0 = opts.height || 150;
    const w1 = scale * w0;
    const h1 = scale * h0;

    const canvas = document.createElement('canvas');
    const img = new Image();

    canvas.width = w1;
    canvas.height = h1;

    img.onload = function () {
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return reject(new Error('Canvas context is null'));
      }

      ctx.clearRect(0, 0, w1, h1);
      ctx.drawImage(img, 0, 0, w1, h1);

      const imgData = canvas.toDataURL('image/png');
      resolve(imgData);
    };

    img.onerror = function (err) {
      reject(err);
    };

    img.src = svgDataUrl;
  });
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
