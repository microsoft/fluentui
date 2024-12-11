const DOM_URL = window.URL || window.webkitURL;

export function downloadImage(svg: SVGSVGElement | null) {
  if (!svg) {
    return;
  }

  const clonedSvg = cloneSvg(svg);
  let s = new window.XMLSerializer().serializeToString(clonedSvg);
  s = window.btoa(window.unescape(window.encodeURIComponent(s)));

  const { width, height } = svg.getBoundingClientRect();

  svgToPng(s, width, height).then((result: string) => {
    const newWindow = window.open();
    newWindow.document.body.innerHTML = `<img src="${result}" />`;

    // fileSaver(result);
  });
}

export function cloneSvg(svg: SVGSVGElement) {
  const svgElements = svg.getElementsByTagName('*');
  const classNames = new Set<string>();
  const styleSheets = document.styleSheets;
  const styleRules: string[] = [];

  for (let i = svgElements.length - 1; i--; ) {
    svgElements[i].classList.forEach(className => {
      classNames.add(className);
    });
  }

  for (let i = 0; i < styleSheets.length; i++) {
    const rules = styleSheets[i].cssRules;
    for (let j = 0; j < rules.length; j++) {
      if (rules[j].constructor.name === 'CSSStyleRule') {
        const selectorText: string = (rules[j] as CSSStyleRule).selectorText;
        const hasClassName = selectorText.split(' ').some(text => classNames.has(text.replace('.', '')));

        if (hasClassName) {
          styleRules.push(rules[j].cssText);
        }
      }
    }
  }

  const xmlDocument = new DOMParser().parseFromString('<svg></svg>', 'image/svg+xml');
  const styleNode = xmlDocument.createCDATASection(styleRules.join(' '));

  const clonedSvg = svg.cloneNode(true) as SVGSVGElement;
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
  style.setAttribute('type', 'text/css');
  style.appendChild(styleNode);
  defs.appendChild(style);
  clonedSvg.insertBefore(defs, clonedSvg.firstChild);

  return clonedSvg;
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

function fixBinary(b: string) {
  const len = b.length;
  const buf = new ArrayBuffer(len);
  const arr = new Uint8Array(buf);
  for (let i = 0; i < len; i++) {
    arr[i] = b.charCodeAt(i);
  }
  return buf;
}
