/** @jest-environment node */ // eslint-disable-line jsdoc/check-tag-names -- Jest environment pragma.

import webpack from 'webpack';

import { inlineRuntimeStyles } from './inlineStyles';

function createCompilation(cssText: string, publicPath = 'auto') {
  const files: Record<string, string | Buffer> = {
    'styles/runtime.css': cssText,
    'assets/test font.woff2': Buffer.from('test font'),
    'assets/icon.png': Buffer.from('test image'),
    'assets/icon.webp': Buffer.from('another image'),
    'assets/script.js': 'alert("not a font or image")',
  };
  const assets = new Map(
    Object.entries(files).map(([name, content]) => [
      name,
      { name, source: new webpack.sources.RawSource(content), info: {} },
    ]),
  );
  return { getAsset: (name: string) => assets.get(name), outputOptions: { publicPath } };
}

describe('inlineRuntimeStyles', () => {
  it('resolves emitted relative font/image URLs and preserves the original assets for Storybook', () => {
    const css = `@font-face { font-family: Fixture; src: local(Fixture), url("../assets/test%20font.woff2?v=1#font") format("woff2"); }
.icon { background-image: URL(../assets/icon.png); }
.literal { content: "url(private.json)"; } /* url(private.json) */`;
    const compilation = createCompilation(css);
    const [style] = inlineRuntimeStyles(compilation, ['styles/runtime.css']);

    expect(style.href).toBe('styles/runtime.css');
    expect(style.cssText).toContain(`data:font/woff2;base64,${Buffer.from('test font').toString('base64')}#font`);
    expect(style.cssText).toContain(`data:image/png;base64,${Buffer.from('test image').toString('base64')}`);
    expect(style.cssText).toContain('local(Fixture)');
    expect(style.cssText).toContain('"url(private.json)"');
    expect(style.cssText).toContain('/* url(private.json) */');
    expect(compilation.getAsset('styles/runtime.css')?.source.source()).toBe(css);
  });

  it.each(['/nested/storybook/', 'https://cdn.example.com/build/'])(
    'resolves emitted absolute URLs against a static publicPath: %s',
    publicPath => {
      const compilation = createCompilation(`.icon { background: url("${publicPath}assets/icon.png") }`, publicPath);
      expect(inlineRuntimeStyles(compilation, ['styles/runtime.css'])[0].cssText).toContain('data:image/png;base64,');
    },
  );

  it('understands CSS escapes, image-set string URLs, data URLs and local fragments', () => {
    const compilation = createCompilation(
      String.raw`@font-face { src: url("../assets/test\20 font.woff2") }
.icon { background: image-set("../assets/icon.png" 1x, url("../assets/icon.webp") 2x); }
.inline { background: url(data:image/png;base64,AA==); filter: url(#local); }`,
    );
    const css = inlineRuntimeStyles(compilation, ['styles/runtime.css'])[0].cssText;

    expect(css).toContain('data:font/woff2;base64,');
    expect(css).toContain('data:image/png;base64,');
    expect(css).toContain('data:image/webp;base64,');
    expect(css).toContain('data:image/png;base64,AA==');
    expect(css).toContain('#local');
  });

  it.each([
    '../../private.woff2',
    '/private.woff2',
    'https://example.com/private.woff2',
    '//example.com/private.woff2',
    '..%2f..%2fprivate.woff2',
    '../assets/%2e%2e/private.woff2',
    '../assets/%252e%252e/private.woff2',
    '../assets/missing.woff2',
    '../assets/script.js',
  ])('fails rather than leaving an unresolved or non-build resource URL: %s', url => {
    const compilation = createCompilation(`@font-face { src: url("${url}") }`);
    expect(() => inlineRuntimeStyles(compilation, ['styles/runtime.css'])).toThrow('Playground inlineStyles');
  });

  it('rejects unresolved CSS imports, invalid url() arguments and missing stylesheets', () => {
    expect(() =>
      inlineRuntimeStyles(createCompilation('@import "../unresolved.css";'), ['styles/runtime.css']),
    ).toThrow('unresolved @import');
    expect(() => inlineRuntimeStyles(createCompilation('.icon { background: url() }'), ['styles/runtime.css'])).toThrow(
      'invalid url()',
    );
    expect(() => inlineRuntimeStyles(createCompilation(''), ['missing.css'])).toThrow('emitted stylesheet');
  });

  it('removes stylesheet source-map references only from the inlined copy', () => {
    const css = '.icon { color: inherit } /*# sourceMappingURL=runtime.css.map */';
    const compilation = createCompilation(css);
    expect(inlineRuntimeStyles(compilation, ['styles/runtime.css'])[0].cssText).not.toContain('sourceMappingURL');
    expect(compilation.getAsset('styles/runtime.css')?.source.source()).toBe(css);
  });
});
