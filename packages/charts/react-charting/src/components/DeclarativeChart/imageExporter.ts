import { create as d3Create, select as d3Select, Selection } from 'd3-selection';
import { resolveCSSVariables } from '../../utilities/index';

/**
 * {@docCategory DeclarativeChart}
 */
export interface IImageExportOptions {
  width?: number;
  height?: number;
  scale?: number;
  background?: string;
}

export function toImage(chartContainer?: HTMLElement | null, opts: IImageExportOptions = {}): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!chartContainer) {
      return reject(new Error('Chart container is not defined'));
    }

    try {
      const background =
        typeof opts.background === 'string' ? resolveCSSVariables(chartContainer, opts.background) : 'transparent';
      const svg = toSVG(chartContainer, background);

      const svgData = new XMLSerializer().serializeToString(svg.node);
      const svgDataUrl = 'data:image/svg+xml;base64,' + btoa(unescapePonyfill(encodeURIComponent(svgData)));

      svgToPng(svgDataUrl, {
        width: opts.width || svg.width,
        height: opts.height || svg.height,
        scale: opts.scale,
      })
        .then(resolve)
        .catch(reject);
    } catch (err) {
      return reject(err);
    }
  });
}

function toSVG(chartContainer: HTMLElement, background: string) {
  const svg = chartContainer.querySelector<SVGSVGElement>('svg');
  if (!svg) {
    throw new Error('SVG not found');
  }

  const { width: svgWidth, height: svgHeight } = svg.getBoundingClientRect();
  const classNames = new Set<string>();
  const legendGroup = cloneLegendsToSVG(chartContainer, svgWidth, svgHeight, classNames);
  const w1 = Math.max(svgWidth, legendGroup.width);
  const h1 = svgHeight + legendGroup.height;
  const clonedSvg = d3Select(svg.cloneNode(true) as SVGSVGElement)
    .attr('width', null)
    .attr('height', null)
    .attr('viewBox', null);

  if (legendGroup.node) {
    clonedSvg.append(() => legendGroup.node);
  }
  clonedSvg
    .insert('rect', ':first-child')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', w1)
    .attr('height', h1)
    .attr('fill', background);

  const svgElements = svg.getElementsByTagName('*');
  const styleSheets = document.styleSheets;
  let styleRules: string = '';

  for (let i = svgElements.length - 1; i--; ) {
    svgElements[i].classList.forEach(className => {
      classNames.add(`.${className}`);
    });
  }

  for (let i = 0; i < styleSheets.length; i++) {
    const rules = styleSheets[i].cssRules;
    for (let j = 0; j < rules.length; j++) {
      if (rules[j].constructor.name === 'CSSStyleRule') {
        const selectorText = (rules[j] as CSSStyleRule).selectorText;
        const hasClassName = selectorText.split(' ').some(word => classNames.has(word));

        if (hasClassName) {
          styleRules += rules[j].cssText + ' ';
        }
      }
    }
  }
  styleRules = resolveCSSVariables(chartContainer, styleRules);

  const xmlDocument = new DOMParser().parseFromString('<svg></svg>', 'image/svg+xml');
  const styleNode = xmlDocument.createCDATASection(styleRules);
  clonedSvg.insert('defs', ':first-child').append('style').attr('type', 'text/css').node()!.appendChild(styleNode);

  clonedSvg.attr('width', w1).attr('height', h1).attr('viewBox', `0 0 ${w1} ${h1}`);

  return {
    node: clonedSvg.node()!,
    width: w1,
    height: h1,
  };
}

function cloneLegendsToSVG(chartContainer: HTMLElement, svgWidth: number, svgHeight: number, classNames: Set<string>) {
  const legendButtons = chartContainer.querySelectorAll<HTMLElement>(`
    button[class^="legend-"],
    [class^="legendContainer-"] div[class^="overflowIndicationTextStyle-"],
    [class^="legendsContainer-"] div[class^="overflowIndicationTextStyle-"]
  `);
  if (legendButtons.length === 0) {
    return {
      node: null,
      width: 0,
      height: 0,
    };
  }

  const legendGroup = d3Create<SVGGElement>('svg:g');
  let legendX = 0;
  let legendY = 8;
  let legendLine: Selection<SVGGElement, unknown, null, undefined>[] = [];
  const legendLines: (typeof legendLine)[] = [];
  const legendLineWidths: number[] = [];

  for (let i = 0; i < legendButtons.length; i++) {
    const { width: legendWidth } = legendButtons[i].getBoundingClientRect();
    const legendItem = legendGroup.append('g');

    legendLine.push(legendItem);
    if (legendX + legendWidth > svgWidth && legendLine.length > 1) {
      legendLine.pop();
      legendLines.push(legendLine);
      legendLineWidths.push(legendX);

      legendLine = [legendItem];
      legendX = 0;
      legendY += 32;
    }

    let legendText: HTMLDivElement | null;
    let textOffset = 0;

    if (legendButtons[i].tagName.toLowerCase() === 'button') {
      const legendRect = legendButtons[i].querySelector<HTMLDivElement>('[class^="rect"]');
      const { backgroundColor: legendColor, borderColor: legendBorderColor } = getComputedStyle(legendRect!);

      legendText = legendButtons[i].querySelector<HTMLDivElement>('[class^="text"]');
      legendText!.classList.forEach(className => classNames.add(`.${className}`));
      legendItem
        .append('rect')
        .attr('x', legendX + 8)
        .attr('y', svgHeight + legendY + 8)
        .attr('width', 12)
        .attr('height', 12)
        .attr('fill', legendColor)
        .attr('stroke-width', 1)
        .attr('stroke', legendBorderColor);
      textOffset = 28;
    } else {
      legendText = legendButtons[i] as HTMLDivElement;
      legendText.classList.forEach(className => classNames.add(`.${className}`));
      textOffset = 8;
    }

    const { color: textColor } = getComputedStyle(legendText!);
    legendItem
      .append('text')
      .attr('x', legendX + textOffset)
      .attr('y', svgHeight + legendY + 8)
      .attr('dominant-baseline', 'hanging')
      .attr('class', legendText!.getAttribute('class'))
      .attr('fill', textColor)
      .text(legendText!.textContent);
    legendX += legendWidth;
  }

  legendLines.push(legendLine);
  legendLineWidths.push(legendX);
  legendY += 32;

  const centerLegends = true;
  if (centerLegends) {
    legendLines.forEach((ln, idx) => {
      const offsetX = Math.max((svgWidth - legendLineWidths[idx]) / 2, 0);
      ln.forEach(item => {
        item.attr('transform', `translate(${offsetX}, 0)`);
      });
    });
  }

  return {
    node: legendGroup.node(),
    width: Math.max(...legendLineWidths),
    height: legendY,
  };
}

function svgToPng(svgDataUrl: string, opts: IImageExportOptions = {}): Promise<string> {
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
