import { create as d3Create, select as d3Select, Selection } from 'd3-selection';

// const DOM_URL = window.URL || window.webkitURL;

export function downloadImage(container: HTMLElement | null | undefined, background: string) {
  if (!container) {
    return;
  }

  const result = toSvg(container, background);
  if (!result) {
    return;
  }

  svgToPng(result.svg, result.width, result.height).then((imgData: string) => {
    const newWindow = window.open();
    newWindow.document.body.innerHTML = `<img src="${imgData}" />`;

    // fileSaver(result);
  });
}

export function toSvg(container: HTMLElement, background: string) {
  const svg = container.querySelector<SVGSVGElement>('svg');
  if (!svg) {
    return;
  }

  const { width, height } = svg.getBoundingClientRect();
  const classNames = new Set<string>();
  const {
    legendGroup,
    width: legendGroupWidth,
    height: legendGroupHeight,
  } = cloneLegendsToSvg(container, width, height, classNames);
  const clonedSvg = d3Select(svg.cloneNode(true) as SVGSVGElement)
    .attr('width', null)
    .attr('height', null)
    .attr('viewBox', null);
  const w1 = Math.max(width, legendGroupWidth);
  const h1 = height + legendGroupHeight;

  clonedSvg.append(() => legendGroup.node());
  clonedSvg
    .insert('rect', ':first-child')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', w1)
    .attr('height', h1)
    .attr('fill', background);

  const svgElements = svg.getElementsByTagName('*');
  const styleSheets = document.styleSheets;
  const styleRules: string[] = [];

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
          styleRules.push(rules[j].cssText);
        }
      }
    }
  }

  const xmlDocument = new DOMParser().parseFromString('<svg></svg>', 'image/svg+xml');
  const styleNode = xmlDocument.createCDATASection(styleRules.join(' '));
  clonedSvg.insert('defs', ':first-child').append('style').attr('type', 'text/css').node()!.appendChild(styleNode);

  clonedSvg.attr('width', w1).attr('height', h1).attr('viewBox', `0 0 ${w1} ${h1}`);

  let s = new XMLSerializer().serializeToString(clonedSvg.node()!);
  s = btoa(unescape(encodeURIComponent(s)));

  return {
    svg: s,
    width: w1,
    height: h1,
  };
}

function cloneLegendsToSvg(container: HTMLElement, width: number, height: number, classNames: Set<string>) {
  const legendButtons = container.querySelectorAll<HTMLElement>(`
    button[class^="legend-"],
    [class^="legendContainer-"] div[class^="overflowIndicationTextStyle-"],
    [class^="legendsContainer-"] div[class^="overflowIndicationTextStyle-"]
  `);

  const legendGroup = d3Create<SVGGElement>('svg:g');
  let legendX = 0;
  let legendY = height + 8;
  let legendLine: Selection<SVGGElement, unknown, null, undefined>[] = [];
  const legendLines: (typeof legendLine)[] = [];
  const legendLineWidths: number[] = [];

  for (let i = 0; i < legendButtons.length; i++) {
    const { width: legendWidth } = legendButtons[i].getBoundingClientRect();
    const legendItem = legendGroup.append('g');

    legendLine.push(legendItem);
    if (legendX + legendWidth > width && legendLine.length > 1) {
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
        .attr('y', legendY + 8)
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

    legendItem
      .append('text')
      .attr('x', legendX + textOffset)
      .attr('y', legendY + 8)
      .attr('dominant-baseline', 'hanging')
      .attr('class', legendText!.getAttribute('class'))
      .text(legendText!.textContent);
    legendX += legendWidth;
  }

  legendLines.push(legendLine);
  legendLineWidths.push(legendX);
  legendY += 32;

  const centerLegends = true;
  if (centerLegends) {
    legendLines.forEach((ln, idx) => {
      const offsetX = Math.max((width - legendLineWidths[idx]) / 2, 0);
      ln.forEach(item => {
        item.attr('transform', `translate(${offsetX}, 0)`);
      });
    });
  }

  return {
    legendGroup,
    width: Math.max(...legendLineWidths),
    height: legendY - height,
  };
}

export function svgToPng(svg: string, width: number, height: number, scale: number = 1) {
  return new Promise((resolve, reject) => {
    const w1 = scale * width;
    const h1 = scale * height;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const img = new Image();

    // let svgBlob: Blob | null = new window.Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    // const url = DOM_URL.createObjectURL(svgBlob);
    const url = 'data:image/svg+xml;base64,' + svg;

    canvas.width = w1;
    canvas.height = h1;

    img.onload = function () {
      // svgBlob = null;
      // DOM_URL.revokeObjectURL(url);

      if (!ctx) {
        return reject(new Error('Canvas context is null'));
      }

      ctx.clearRect(0, 0, w1, h1);
      ctx.drawImage(img, 0, 0, w1, h1);

      const imgData = canvas.toDataURL('image/png');
      resolve(imgData);
    };

    img.onerror = function (err) {
      // svgBlob = null;
      // DOM_URL.revokeObjectURL(url);

      reject(err);
    };

    img.src = url;
  });
}

export function fileSaver(url: string) {
  const saveLink = document.createElement('a');

  // const binary = fixBinary(window.atob(url));
  // let blob: Blob | null = new window.Blob([binary], { type: 'image/png' });
  // const objectUrl = DOM_URL.createObjectURL(blob);

  // saveLink.href = objectUrl;
  saveLink.href = url;
  saveLink.download = 'converted-image.png';
  document.body.appendChild(saveLink);
  saveLink.click();

  document.body.removeChild(saveLink);
  // DOM_URL.revokeObjectURL(objectUrl);
  // blob = null;
}

// function fixBinary(b: string) {
//   const len = b.length;
//   const buf = new ArrayBuffer(len);
//   const arr = new Uint8Array(buf);
//   for (let i = 0; i < len; i++) {
//     arr[i] = b.charCodeAt(i);
//   }
//   return buf;
// }
