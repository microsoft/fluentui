//
// Code here is taken mainly from fela-utils to implement to same FontFace interface.
//

export function getFontLocals(localAlias?: string | string[]): string[] {
  if (typeof localAlias === 'string') {
    return [localAlias];
  }

  if (Array.isArray(localAlias)) {
    return localAlias.slice();
  }

  return [];
}

export function toCSSString(value: string): string {
  if (value.charAt(0) === '"') {
    return value;
  }

  return `"${value}"`;
}

function isBase64(property: string): boolean {
  return property.substr(0, 5) === 'data:';
}

function getFontUrl(src: string): string {
  if (isBase64(src)) {
    return src;
  }

  return `'${src}'`;
}

const formats: Record<string, string> = {
  '.woff': 'woff',
  '.woff2': 'woff2',
  '.eot': 'embedded-opentype',
  '.ttf': 'truetype',
  '.otf': 'opentype',
  '.svg': 'svg',
  '.svgz': 'svg',
};

const base64Formats: Record<string, string> = {
  'image/svg+xml': 'svg',
  'application/x-font-woff': 'woff',
  'application/font-woff': 'woff',
  'application/x-font-woff2': 'woff2',
  'application/font-woff2': 'woff2',
  'font/woff2': 'woff2',
  'application/octet-stream': 'truetype',
  'application/x-font-ttf': 'truetype',
  'application/x-font-truetype': 'truetype',
  'application/x-font-opentype': 'opentype',
  'application/vnd.ms-fontobject': 'embedded-opentype',
  'application/font-sfnt': 'sfnt',
};

function getFontFormat(src: string): string {
  if (isBase64(src)) {
    let mime = '';
    for (let i = 5; ; i++) {
      // 'data:'.length === 5
      const c = src.charAt(i);

      if (c === ';' || c === ',') {
        break;
      }

      mime += c;
    }

    const fmt = base64Formats[mime];
    if (fmt) {
      return fmt;
    }

    // eslint-disable-next-line no-console
    console.warn(
      `A invalid base64 font was used. Please use one of the following mime type: ${Object.keys(base64Formats).join(
        ', ',
      )}.`,
    );
  } else {
    let extension = '';
    for (let i = src.length - 1; ; i--) {
      const c = src.charAt(i);

      if (c === '.') {
        extension = c + extension;
        break;
      }

      extension = c + extension;
    }

    const fmt = formats[extension];
    if (fmt) {
      return fmt;
    }

    // eslint-disable-next-line no-console
    console.warn(`A invalid font-format was used in "${src}". Use one of these: ${Object.keys(formats).join(', ')}.`);
  }
  return '';
}

export function generateFontSource(files: string[] = [], fontLocals: string[] = []): string {
  const localSource = fontLocals.reduce((src, local, index) => {
    const prefix = index > 0 ? ',' : '';
    const localUrl = getFontUrl(local);

    return `${src}${prefix}local(${localUrl})`;
  }, '');
  const urlSource = files.reduce((src, fileSource, index) => {
    const prefix = index > 0 ? ',' : '';
    const fileFormat = getFontFormat(fileSource);
    const fileUrl = getFontUrl(fileSource);

    return `${src}${prefix}url(${fileUrl}) format('${fileFormat}')`;
  }, '');
  const delimiter = localSource.length > 0 && urlSource.length > 0 ? ',' : '';

  return `${localSource}${delimiter}${urlSource}`;
}
