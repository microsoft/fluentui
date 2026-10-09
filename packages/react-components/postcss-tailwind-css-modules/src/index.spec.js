// @ts-check

const postcss = require('postcss');

const plugin = require('./index.js');
const { globalizeSelector, GROUP_OR_PEER_MARKER, postcssPlugin } = require('./index.js');

/**
 * @param {string} css
 * @param {{ from?: string, include?: import('./index.js').Options['include'], onRewrite?: import('./index.js').Options['onRewrite'] }} [options]
 */
function run(css, options = {}) {
  const { from, include, onRewrite } = options;
  return postcss([plugin({ include, onRewrite })]).process(css, { from, map: false });
}

describe('@fluentui/postcss-tailwind-css-modules', () => {
  describe('plugin metadata', () => {
    it('sets postcss = true', () => {
      expect(plugin.postcss).toBe(true);
    });

    it('names the plugin @fluentui/postcss-tailwind-css-modules', () => {
      expect(postcssPlugin).toBe('@fluentui/postcss-tailwind-css-modules');
      expect(plugin().postcssPlugin).toBe('@fluentui/postcss-tailwind-css-modules');
    });
  });

  describe('globalizeSelector', () => {
    it('wraps a group marker in :global() without altering its name', () => {
      const { selector, rewrites } = globalizeSelector('.group\\/fui-switch');

      expect(rewrites).toBe(1);
      expect(selector).toBe(':global(.group\\/fui-switch)');
    });

    it('wraps a peer marker the same way as a group marker', () => {
      const { selector, rewrites } = globalizeSelector('.peer\\/fui-input');

      expect(rewrites).toBe(1);
      expect(selector).toBe(':global(.peer\\/fui-input)');
    });

    it('is idempotent: a marker already inside :global() is left untouched', () => {
      const { selector, rewrites } = globalizeSelector(':global(.group\\/fui-switch)');

      expect(rewrites).toBe(0);
      expect(selector).toBe(':global(.group\\/fui-switch)');
    });

    it('running the wrap twice in sequence produces the same result as once', () => {
      const once = globalizeSelector('.group\\/fui-switch');
      const twice = globalizeSelector(once.selector);

      expect(twice.rewrites).toBe(0);
      expect(twice.selector).toBe(once.selector);
    });

    it('handles multiple markers in one selector', () => {
      const { selector, rewrites } = globalizeSelector('.group\\/header.group\\/nav');

      expect(rewrites).toBe(2);
      expect(selector).toBe(':global(.group\\/header):global(.group\\/nav)');
    });
  });

  describe('compiled through the real PostCSS chain (a .module.css file)', () => {
    const MODULE_FROM = 'components/Thing.module.css';

    it('wraps a marker inside :where()', async () => {
      const { css } = await run('.root:is(:where(.group\\/fui-switch)) { color: red; }', { from: MODULE_FROM });

      expect(css).toContain(':global(.group\\/fui-switch)');
    });

    it('wraps a marker inside :is()', async () => {
      const { css } = await run(':is(.group\\/fui-switch, .other) { color: red; }', { from: MODULE_FROM });

      expect(css).toContain(':global(.group\\/fui-switch)');
    });

    it('wraps a marker followed by a pseudo-class', async () => {
      const { css } = await run('.group\\/sidebar:hover { color: red; }', { from: MODULE_FROM });

      expect(css).toContain(':global(.group\\/sidebar):hover');
    });

    it('wraps a marker followed by a pseudo-element', async () => {
      const { css } = await run('.group\\/sidebar::before { content: ""; }', { from: MODULE_FROM });

      expect(css).toContain(':global(.group\\/sidebar)::before');
    });

    it('wraps a marker inside @media', async () => {
      const { css } = await run('@media (min-width: 768px) { .group\\/sidebar { color: red; } }', {
        from: MODULE_FROM,
      });

      expect(css).toContain(':global(.group\\/sidebar)');
    });

    it('wraps every marker in a comma-separated selector list', async () => {
      const { css } = await run('.group\\/sidebar, .group\\/header { color: red; }', { from: MODULE_FROM });

      expect(css).toContain(':global(.group\\/sidebar)');
      expect(css).toContain(':global(.group\\/header)');
    });

    it('leaves non-marker classes untouched', async () => {
      const source = '.group { color: red; } .peer { color: blue; } .not-group\\/x { color: green; }';
      const { css } = await run(source, { from: MODULE_FROM });

      expect(css).toBe(source);
    });
  });

  describe('file filtering (the `include` option)', () => {
    const INPUT = '.group\\/sidebar { color: red; }';

    it('rewrites a .module.css file by default', async () => {
      const { css } = await run(INPUT, { from: 'a.module.css' });

      expect(css).toContain(':global(.group\\/sidebar)');
    });

    it('leaves a plain .css file untouched by default', async () => {
      const { css } = await run(INPUT, { from: 'a.css' });

      expect(css).toBe(INPUT);
    });

    it('rewrites regardless of filename when include: true', async () => {
      const { css } = await run(INPUT, { from: 'a.css', include: true });

      expect(css).toContain(':global(.group\\/sidebar)');
    });

    it('accepts a custom RegExp for include', async () => {
      const { css } = await run(INPUT, { from: 'a.scoped.css', include: /\.scoped\.css$/ });

      expect(css).toContain(':global(.group\\/sidebar)');
    });

    it('accepts a function for include', async () => {
      const { css } = await run(INPUT, { from: 'a.custom', include: file => file.endsWith('.custom') });

      expect(css).toContain(':global(.group\\/sidebar)');
    });

    it('leaves the file untouched when `from` is undefined, unless include: true', async () => {
      const { css } = await run(INPUT);

      expect(css).toBe(INPUT);
    });

    it('rewrites when `from` is undefined and include: true', async () => {
      const { css } = await run(INPUT, { include: true });

      expect(css).toContain(':global(.group\\/sidebar)');
    });
  });

  it('is idempotent across a second full pass', async () => {
    const once = await run('.group\\/sidebar { color: red; }', { from: 'a.module.css' });
    const twice = await run(once.css, { from: 'a.module.css' });

    expect(twice.css).toBe(once.css);
  });

  it('invokes onRewrite once per rewritten rule, with the rewrite count', async () => {
    const onRewrite = jest.fn();

    await run('.group\\/a { } .group\\/b.group\\/c { } .plain { }', { from: 'a.module.css', onRewrite });

    expect(onRewrite).toHaveBeenCalledTimes(2);
    expect(onRewrite).toHaveBeenNthCalledWith(1, expect.objectContaining({ count: 1 }));
    expect(onRewrite).toHaveBeenNthCalledWith(2, expect.objectContaining({ count: 2 }));
  });

  it('exposes GROUP_OR_PEER_MARKER matching the escaped-slash marker form', () => {
    // `.test()` mutates `lastIndex` on a global regex — reset it before and after so this
    // check does not depend on, or leak into, any other use of the shared exported regex.
    GROUP_OR_PEER_MARKER.lastIndex = 0;
    expect(GROUP_OR_PEER_MARKER.test('.group\\/fui-switch')).toBe(true);
    GROUP_OR_PEER_MARKER.lastIndex = 0;
  });
});
