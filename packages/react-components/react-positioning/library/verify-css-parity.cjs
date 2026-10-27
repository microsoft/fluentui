/* Isolated style-hook fixtures; not a substitute for component VRT, SSR, Firefox, or consumer bundler tests. */
/* Run from the repository root with: yarn nx run react-positioning:format --skipSync --command="node packages/react-components/react-positioning/library/verify-css-parity.cjs" */
const fs = require('fs');
const path = require('path');
const Module = require('module');
const ts = require('typescript');
const postcss = require('postcss');
const modules = require('postcss-modules');
const { chromium } = require('playwright');
const core = require('@griffel/core');
const root = process.cwd();
const packages = [
  'react-tooltip',
  'react-list',
  'react-rating',
  'react-color-picker',
  'react-swatch-picker',
  'react-breadcrumb',
  'react-tags',
];
const components = path.join(root, 'packages/react-components');
const theme = require(path.join(components, 'react-theme/library/lib-commonjs/index.cjs'));
const cssMaps = {};
const cssOutput = {};
let cssOrder = new Set();
let direction = 'ltr';
let renderer = core.createDOMRenderer();
function files(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap(entry => (entry.isDirectory() ? files(path.join(dir, entry.name)) : [path.join(dir, entry.name)]));
}
function loader() {
  const cache = {};
  return function load(file) {
    file = path.resolve(file);
    if (cache[file]) return cache[file].exports;
    if (file.endsWith('.module.css')) {
      cssOrder.add(file);
      return { default: cssMaps[file] };
    }
    const mod = new Module(file, module);
    cache[file] = mod;
    mod.filename = file;
    mod.paths = module.paths;
    mod.require = name => {
      if (name === '@fluentui/react-theme') return theme;
      if (name === '@griffel/react')
        return {
          ...core,
          makeStyles: styles => {
            const use = core.makeStyles(styles);
            return () => use({ dir: direction, renderer });
          },
          makeResetStyles: styles => {
            const use = core.makeResetStyles(styles);
            return () => use({ dir: direction, renderer });
          },
        };
      if (name === '@fluentui/react-tabster')
        return {
          ...load(path.join(components, 'react-tabster/src/focus/createCustomFocusIndicatorStyle.ts')),
          ...load(path.join(components, 'react-tabster/src/focus/createFocusOutlineStyle.ts')),
        };
      if (name === '@fluentui/react-positioning')
        return load(path.join(components, 'react-positioning/library/src/createArrowStyles.ts'));
      if (name === '@fluentui/react-positioning/arrow.module.css') {
        const arrow = path.join(components, 'react-positioning/library/src/Arrow.module.css');
        cssOrder.add(arrow);
        return { default: cssMaps[arrow] };
      }
      if (name === '@fluentui/react-icons')
        return { iconFilledClassName: 'fui-Icon-filled', iconRegularClassName: 'fui-Icon-regular' };
      if (name.startsWith('.')) {
        let resolved = path.resolve(path.dirname(file), name);
        if (!fs.existsSync(resolved)) resolved += '.ts';
        return load(resolved);
      }
      return require(name);
    };
    mod._compile(
      ts.transpileModule(fs.readFileSync(file, 'utf8'), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
      }).outputText,
      file,
    );
    return mod.exports;
  };
}
function styleText() {
  return Object.values(renderer.stylesheets)
    .sort((a, b) => core.styleBucketOrdering.indexOf(a.bucketName) - core.styleBucketOrdering.indexOf(b.bucketName))
    .flatMap(sheet => sheet.cssRules())
    .join('\n');
}
const escape = s =>
  String(s || '')
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;');
function markup(state, component, id) {
  const owner = component === 'Tooltip' ? 'content' : 'root';
  const children = Object.keys(state).filter(
    key => state[key] && typeof state[key] === 'object' && 'className' in state[key] && key !== owner,
  );
  const content =
    children
      .map(key => {
        const input = /input/i.test(key);
        const tag = input ? 'input' : 'span';
        return `<${tag} data-slot="${key}" class="${escape(state[key].className)}" ${input ? 'type="range"' : ''}>${
          input ? '' : 'Text' + `</${tag}>`
        }`;
      })
      .join('') +
    (state.arrowClassName ? `<span data-slot="arrow" class="${escape(state.arrowClassName)}"></span>` : '');
  return `<div style="position:relative;display:flow-root;margin:20px"><div tabindex="0" style="--fui-Slider--direction:to right;--fui-Slider--progress:30%;--fui-Slider__thumb--color:hsl(100 50% 50%);--fui-Slider__rail--color:hsl(100 50% 50%);--fui-Slider__rail--color-low:hsl(100 0% 50%);--fui-AlphaSlider--direction:to right;--fui-AlphaSlider--progress:30%;--fui-AlphaSlider__rail--color:hsl(100 50% 50%);--fui-AlphaSlider__thumb--color:hsl(100 50% 50%);--fui-Area--main-color:hsl(100 50% 50%);--fui-Area__thumb--color:hsl(100 50% 50%);--fui-AreaX--progress:30%;--fui-AreaY--progress:30%;--fui-ColorSwatch--color:hsl(100 50% 50%)" data-case="${id}" data-slot="${owner}" data-popper-placement="${
    state.placement || 'top'
  }" class="${escape(state[owner].className)}">${content || 'Text'}</div></div>`;
}
const properties = [
  'display',
  'position',
  'boxSizing',
  'color',
  'backgroundColor',
  'backgroundImage',
  'borderTopWidth',
  'borderRightWidth',
  'borderBottomWidth',
  'borderLeftWidth',
  'borderTopStyle',
  'borderTopColor',
  'borderRightColor',
  'borderBottomColor',
  'borderLeftColor',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'fontSize',
  'fontWeight',
  'fontFamily',
  'lineHeight',
  'height',
  'width',
  'minWidth',
  'minHeight',
  'maxWidth',
  'gap',
  'columnGap',
  'cursor',
  'opacity',
  'visibility',
  'pointerEvents',
  'transform',
  'fill',
  'stroke',
  'boxShadow',
  'filter',
  'outlineStyle',
  'outlineWidth',
  'outlineColor',
  'gridArea',
];
async function snapshot(page, id) {
  return page.evaluate(
    ({ properties, id }) =>
      [...document.querySelectorAll(id === undefined ? '[data-case]' : `[data-case="${id}"]`)].map(root =>
        [root, ...root.querySelectorAll('[data-slot]')].map(el =>
          Object.fromEntries(
            ['', '::before', '::after'].flatMap(pseudo =>
              properties.map(p => [
                p + pseudo,
                /* Normalize an exact CSS Color 4 alias, without tolerance or numeric rounding. */ getComputedStyle(
                  el,
                  pseudo || null,
                )[p].replaceAll('color(srgb 0 0 0)', 'rgb(0, 0, 0)'),
              ]),
            ),
          ),
        ),
      ),
    { properties, id },
  );
}
(async () => {
  for (const pkg of [...packages, 'react-positioning']) {
    for (const file of files(path.join(components, pkg, 'library/src')).filter(file => file.endsWith('.module.css'))) {
      const output = await postcss([
        modules({
          generateScopedName: (name, filename) => path.basename(filename).replace(/\W/g, '_') + '_' + name,
          getJSON: (_, map) => {
            cssMaps[file] = map;
          },
        }),
      ]).process(
        fs
          .readFileSync(file, 'utf8')
          .replace(
            "@import url('@fluentui/react-icons/headless/styles.css') layer(fluentui);",
            '@layer fluentui {' +
              fs.readFileSync(require.resolve('@fluentui/react-icons/headless/styles.css'), 'utf8') +
              '}',
          ),
        { from: file },
      );
      cssOutput[file] = output.css;
    }
  }
  const browser = await chromium.launch({ headless: true });
  const baseline = await browser.newPage();
  const alternate = await browser.newPage();
  let assertions = 0;
  const failures = [];
  for (const reverse of [false, true])
    for (const dark of [false, true])
      for (const dir of ['ltr', 'rtl'])
        for (const forcedColors of ['none', 'active']) {
          direction = dir;
          renderer = core.createDOMRenderer();
          cssOrder = new Set();
          const load = loader();
          const fixtures = [];
          let originalHTML = '',
            alternateHTML = '';
          for (const pkg of packages)
            for (const file of files(path.join(components, pkg, 'library/src/components'))
              .filter(file => /use\w+Styles\.styles\.css\.ts$/.test(file))
              .sort((a, b) => (reverse ? b.localeCompare(a) : a.localeCompare(b)))) {
              const c = path.basename(path.dirname(file));
              const source = file.replace('.styles.css.ts', '.styles.ts');
              const hook = 'use' + c + 'Styles_unstable';
              const slots = [...fs.readFileSync(source, 'utf8').matchAll(/(\w+): 'fui-/g)].map(match => match[1]);
              const variants = [
                {},
                ...['small', 'extra-small', 'large', 'extra-large'].map(size => ({ size })),
                { disabled: true },
                { selected: true },
                { selected: true, disabled: true },
                { appearance: 'outline' },
                { appearance: 'brand' },
                { shape: 'circular' },
                { shape: 'square' },
                { vertical: true },
                { iconFillWidth: 0.5 },
                { color: 'brand', appearance: 'filled' },
                { color: 'marigold', appearance: 'filled' },
                { hasSecondaryAction: true },
                { visible: true, appearance: 'inverted' },
                { size: 'small', selected: true },
                { size: 'extra-small', selected: true },
                { size: 'small', selected: true, disabled: true },
                { shape: 'circular', hasSecondaryAction: true },
                { absent: ['media', 'icon', 'secondaryText', 'dismissIcon'] },
                { absent: ['halfValueInput'] },
                ...['right', 'bottom', 'left'].map(placement => ({ placement })),
              ];
              for (const variant of variants) {
                // Limit variants to the finite values the original hook accepts.
                if (
                  variant.appearance === 'brand' &&
                  !['Tag', 'InteractionTagPrimary', 'InteractionTagSecondary'].includes(c)
                )
                  continue;
                if (
                  variant.shape === 'square' &&
                  !['ColorArea', 'ColorSwatch', 'ImageSwatch', 'EmptySwatch'].includes(c)
                )
                  continue;
                if (variant.size && c.includes('Swatch') && variant.size === 'extra-large') continue;
                if (
                  variant.size &&
                  ['Tag', 'TagGroup', 'InteractionTag', 'InteractionTagPrimary', 'InteractionTagSecondary'].includes(
                    c,
                  ) &&
                  ['large', 'extra-large'].includes(variant.size)
                )
                  continue;
                const state = {
                  size: 'medium',
                  shape: 'rounded',
                  appearance: c === 'Tooltip' ? 'normal' : 'filled',
                  color: 'neutral',
                  spacing: 'medium',
                  vertical: false,
                  channel: 'hue',
                  selected: false,
                  disabled: false,
                  iconFillWidth: 1,
                  visible: true,
                  ...variant,
                };
                for (const slot of slots) if (!variant.absent?.includes(slot)) state[slot] = { className: '' };
                let original, alternative;
                original = load(source)[hook](structuredClone(state));
                alternative = load(file)[hook](structuredClone(state));
                const id = fixtures.length;
                fixtures.push({ c, variant, slots });
                originalHTML += markup(original, c, id);
                alternateHTML += markup(alternative, c, id);
              }
            }
          const vars = Object.entries(dark ? theme.webDarkTheme : theme.webLightTheme)
            .map(([k, v]) => `--${k}:${v}`)
            .join(';');
          await Promise.all([baseline.emulateMedia({ forcedColors }), alternate.emulateMedia({ forcedColors })]);
          await Promise.all([
            baseline.setContent(
              `<html dir="${dir}"><style>:root{${vars}}</style><style>${styleText()}</style>${originalHTML}</html>`,
            ),
            alternate.setContent(
              `<html dir="${dir}"><style>:root{${vars}}</style><style>${[...cssOrder]
                .map(file => cssOutput[file])
                .join('\n')}</style>${alternateHTML}</html>`,
            ),
          ]);
          const [a, b] = await Promise.all([snapshot(baseline), snapshot(alternate)]);
          for (let i = 0; i < a.length; i++)
            for (let j = 0; j < a[i].length; j++)
              for (const property of Object.keys(a[i][j])) {
                assertions++;
                if (a[i][j][property] !== b[i]?.[j]?.[property])
                  failures.push({
                    theme: dark ? 'dark' : 'light',
                    dir,
                    forcedColors,
                    ...fixtures[i],
                    slot: j,
                    property,
                    griffel: a[i][j][property],
                    css: b[i]?.[j]?.[property],
                  });
              }
          for (const [i, fixture] of fixtures.entries()) {
            if (
              Object.keys(fixture.variant).length &&
              !(
                ['ColorSwatch', 'ImageSwatch', 'Tag', 'InteractionTagPrimary', 'InteractionTagSecondary'].includes(
                  fixture.c,
                ) && fixture.variant.selected
              )
            )
              continue;
            for (const interaction of ['hover', 'active', 'focus']) {
              for (const page of [baseline, alternate]) {
                const element = page.locator(`[data-case="${i}"]`);
                if (interaction === 'focus')
                  await element.evaluate(el => {
                    el.setAttribute('data-fui-focus-visible', '');
                    el.setAttribute('data-fui-focus-within', '');
                    el.focus();
                  });
                else {
                  await element.scrollIntoViewIfNeeded();
                  await element.hover({ force: true });
                  if (interaction === 'active') await page.mouse.down();
                }
              }
              const [left, right] = await Promise.all([snapshot(baseline, i), snapshot(alternate, i)]);
              for (let j = 0; j < left[0].length; j++)
                for (const property of Object.keys(left[0][j])) {
                  assertions++;
                  if (left[0][j][property] !== right[0]?.[j]?.[property])
                    failures.push({
                      theme: dark ? 'dark' : 'light',
                      dir,
                      forcedColors,
                      ...fixture,
                      interaction,
                      slot: j,
                      property,
                      griffel: left[0][j][property],
                      css: right[0]?.[j]?.[property],
                    });
                }
              for (const page of [baseline, alternate]) {
                if (interaction === 'active') await page.mouse.up();
                if (interaction === 'focus')
                  await page.locator(`[data-case="${i}"]`).evaluate(el => {
                    el.removeAttribute('data-fui-focus-visible');
                    el.removeAttribute('data-fui-focus-within');
                    el.blur();
                  });
              }
            }
          }
          await Promise.all([baseline.mouse.move(0, 0), alternate.mouse.move(0, 0)]);
          const [imageA, imageB] = await Promise.all([baseline.screenshot(), alternate.screenshot()]);
          assertions++;
          if (!imageA.equals(imageB))
            failures.push({
              theme: dark ? 'dark' : 'light',
              dir,
              forcedColors,
              c: 'viewport screenshot',
              variant: {},
              property: 'pixels',
            });
        }
  await browser.close();
  const grouped = {};
  for (const f of failures) {
    const key = f.c + ':' + JSON.stringify(f.variant) + ':' + f.property;
    grouped[key] = (grouped[key] || 0) + 1;
  }
  console.log(
    JSON.stringify({ assertions, failures: failures.length, grouped, examples: failures.slice(0, 12) }, null, 2),
  );
  if (failures.length) process.exitCode = 1;
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
