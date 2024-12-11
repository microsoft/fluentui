const DOM_URL = window.URL || window.webkitURL;

export function svgToPng(svg: SVGSVGElement, width: number, height: number) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const img = new Image();

    let s = new window.XMLSerializer().serializeToString(svg);
    s = window.btoa(window.unescape(window.encodeURIComponent(s)));
    // let svgBlob: Blob | null = new window.Blob([s], { type: 'image/svg+xml;charset=utf-8' });
    // const url = DOM_URL.createObjectURL(svgBlob);
    const url = 'data:image/svg+xml;base64,' + s;

    canvas.width = width;
    canvas.height = height;

    img.onload = function () {
      // svgBlob = null;
      // DOM_URL.revokeObjectURL(url);

      if (!ctx) {
        return reject(new Error('Canvas context is null'));
      }

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

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
