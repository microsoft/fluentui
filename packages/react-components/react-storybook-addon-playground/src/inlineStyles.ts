import * as path from 'node:path';
import postcss from 'postcss';
import valueParser from 'postcss-value-parser';
import type { Compilation } from 'webpack';

const ASSET_MIME_TYPES: Record<string, string> = {
  '.avif': 'image/avif',
  '.eot': 'application/vnd.ms-fontobject',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.otf': 'font/otf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function unescapeCss(value: string): string {
  return value.replace(/\\([0-9a-f]{1,6}\s?|[^\r\n\f])/gi, (_, escaped: string) => {
    if (/^[0-9a-f]/i.test(escaped)) {
      const codePoint = parseInt(escaped.trim(), 16);
      if (!codePoint || codePoint > 0x10ffff || (codePoint >= 0xd800 && codePoint <= 0xdfff)) {
        throw new Error('Playground inlineStyles encountered an invalid CSS escape.');
      }
      return String.fromCodePoint(codePoint);
    }
    return escaped;
  });
}

/**
 * Reads only compilation assets, never the filesystem or a URL. Existing CSS assets are left intact for Storybook.
 */
export function inlineRuntimeStyles(
  compilation: Pick<Compilation, 'getAsset'> & {
    outputOptions: Pick<Compilation['outputOptions'], 'publicPath'>;
  },
  cssFiles: string[],
): Array<{ href: string; cssText: string }> {
  const publicPath = compilation.outputOptions.publicPath;
  if (typeof publicPath !== 'string') {
    throw new Error('Playground inlineStyles requires a static or automatic Webpack publicPath.');
  }
  const assetRoot = new URL(
    publicPath && publicPath !== 'auto' ? publicPath : '/__playground_build__/',
    'https://playground.invalid/',
  );
  if (!assetRoot.pathname.endsWith('/') || assetRoot.search || assetRoot.hash) {
    throw new Error('Playground inlineStyles requires a publicPath ending in "/".');
  }
  const dataUrls = new Map<string, string>();
  const inlineUrl = (rawUrl: string, stylesheet: string) => {
    const request = unescapeCss(rawUrl);
    if (/^data:/i.test(request) || request.startsWith('#')) {
      return request;
    }
    const resolved = new URL(request, new URL(stylesheet, assetRoot));
    if (
      /[\\\u0000-\u001f\u007f]|%(?:2e|2f|5c|25|00|3f|23)/i.test(request) ||
      resolved.origin !== assetRoot.origin ||
      resolved.username ||
      resolved.password ||
      !resolved.pathname.startsWith(assetRoot.pathname)
    ) {
      throw new Error(`Playground inlineStyles cannot inline an out-of-build URL in "${stylesheet}": ${rawUrl}`);
    }
    const file = decodeURIComponent(resolved.pathname.slice(assetRoot.pathname.length));
    let dataUrl = dataUrls.get(file);
    if (!dataUrl) {
      const asset = compilation.getAsset(file);
      const mimeType = ASSET_MIME_TYPES[path.posix.extname(file).toLowerCase()];
      if (!asset || !mimeType) {
        throw new Error(
          `Playground inlineStyles requires an emitted font/image asset for "${rawUrl}" in "${stylesheet}".`,
        );
      }
      dataUrl = `data:${mimeType};base64,${asset.source.buffer().toString('base64')}`;
      dataUrls.set(file, dataUrl);
    }
    return dataUrl + resolved.hash;
  };

  return cssFiles.map(href => {
    const asset = compilation.getAsset(href);
    if (!asset) {
      throw new Error(`Playground inlineStyles could not find the emitted stylesheet "${href}".`);
    }
    const css = postcss.parse(asset.source.source().toString(), { from: href });
    css.walkAtRules(rule => {
      if (unescapeCss(rule.name).toLowerCase() === 'import') {
        throw new Error(
          `Playground inlineStyles cannot inline an unresolved @import in "${href}". ` +
            'Configure your CSS loader to resolve imports before extraction.',
        );
      }
    });
    css.walkDecls(declaration => {
      const parsed = valueParser(declaration.value);
      parsed.walk(node => {
        if (node.type !== 'function') {
          return;
        }
        const name = unescapeCss(node.value).toLowerCase();
        if (name === 'url' || name === 'src') {
          const args = node.nodes.filter(arg => arg.type !== 'space' && arg.type !== 'comment');
          const arg = args[0];
          // The value parser treats uppercase URL() as a generic function, splitting unquoted paths at slashes.
          const request =
            args.length === 1 && (arg.type === 'word' || arg.type === 'string')
              ? arg.value
              : args.length > 0 && args.every(part => part.type === 'word' || part.type === 'div')
              ? valueParser.stringify(args)
              : undefined;
          if (node.unclosed || !request) {
            throw new Error(`Playground inlineStyles encountered an invalid url() in "${href}".`);
          }
          node.value = 'url';
          node.nodes = valueParser(JSON.stringify(inlineUrl(request, href))).nodes;
          return false;
        }
        // image-set() also accepts bare strings as image URLs, unlike most other CSS functions.
        if (name === 'image-set' || name === '-webkit-image-set' || name === 'image') {
          node.nodes.forEach(arg => {
            if (arg.type === 'string') {
              arg.value = inlineUrl(arg.value, href);
            }
          });
        }
      });
      declaration.value = parsed.toString();
    });
    css.walkComments(comment => {
      if (/^#\s*sourceMappingURL=/.test(comment.text)) {
        comment.remove();
      }
    });
    return { href, cssText: css.toString() };
  });
}
