const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const { createRequire } = require('node:module');
const { tmpdir } = require('node:os');
const path = require('node:path');

const postcss = require('postcss');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Package bytes come from tarballs. Unchanged runtime dependencies reuse the workspace install;
// fixture resolution and the bundle/SSR guards forbid consumer compiler dependencies.
const root = path.resolve(__dirname, '../..');
const packageRoot = path.join(root, 'packages/react-components');
const windmodName = '@fluentui/react-windmod-preview';
const themeName = '@fluentui/react-tailwind-theme-preview';
const markerName = '@fluentui/postcss-tailwind-css-modules';
const compilerPackage = /^(?:tailwindcss(?:\/|$)|@tailwindcss\/|postcss(?:-|\/|$))/;
const fixture = fs.mkdtempSync(path.join(tmpdir(), 'windmod-consumers-'));
const installed = path.join(fixture, 'node_modules');
const consumerRequire = createRequire(path.join(fixture, 'package.json'));
const read = file => fs.readFileSync(file, 'utf8');
const write = (name, contents) => fs.writeFileSync(path.join(fixture, name), contents);

async function pack(name, relativeRoot) {
  const archive = path.join(fixture, `${name.split('/')[1]}.tgz`);
  const yarnPath = read(path.join(root, '.yarnrc.yml'))
    .match(/^yarnPath:\s*(.+)$/m)[1]
    .trim();
  execFileSync(process.execPath, [path.join(root, yarnPath), 'pack', '--out', archive], {
    cwd: path.join(packageRoot, relativeRoot),
    stdio: 'pipe',
    env: { ...process.env, YARN_ENABLE_NETWORK: 'false' },
  });
  const destination = path.join(installed, name);
  fs.mkdirSync(destination, { recursive: true });
  execFileSync('tar', ['-xzf', archive, '-C', destination, '--strip-components=1'], { stdio: 'pipe' });
  return JSON.parse(read(path.join(destination, 'package.json')));
}

function linkDependency(name) {
  const destination = path.join(installed, name);
  if (fs.existsSync(destination)) {
    return;
  }
  const source = path.join(root, 'node_modules', name);
  if (!fs.existsSync(source)) {
    return;
  }
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.symlinkSync(fs.realpathSync(source), destination, process.platform === 'win32' ? 'junction' : 'dir');
}

function assertPlainCss(css) {
  postcss.parse(css).walkAtRules(rule => {
    assert(
      !/^(?:apply|reference|theme|utility|custom-variant|variant|tailwind|source)$/.test(rule.name),
      `Uncompiled @${rule.name} in published CSS`,
    );
    assert.notEqual(rule.name, 'import', 'Published CSS must not depend on unresolved source imports');
  });
}

function filesBelow(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? filesBelow(file) : [file];
  });
}

async function bundle(entry, outputName) {
  return new Promise((resolve, reject) => {
    const compiler = webpack({
      mode: 'production',
      context: fixture,
      entry: path.join(fixture, entry),
      output: { path: path.join(fixture, outputName), filename: 'app.js' },
      optimization: { minimize: false },
      module: { rules: [{ test: /\.css$/, use: [MiniCssExtractPlugin.loader, require.resolve('css-loader')] }] },
      plugins: [
        new MiniCssExtractPlugin({ filename: 'app.css' }),
        {
          apply(compiler) {
            compiler.hooks.normalModuleFactory.tap('NoConsumerCompiler', factory => {
              factory.hooks.beforeResolve.tap('NoConsumerCompiler', data => {
                assert(!compilerPackage.test(data.request), `Runtime compiler dependency: ${data.request}`);
              });
            });
          },
        },
      ],
    });
    compiler.run((error, stats) => {
      compiler.close(closeError => {
        if (error || closeError || stats?.hasErrors()) {
          reject(error || closeError || new Error(stats.toString({ all: false, errors: true })));
        } else {
          resolve(read(path.join(fixture, outputName, 'app.css')));
        }
      });
    });
  });
}

async function verifyPlainConsumers(windmod, theme) {
  for (const manifest of [windmod, theme]) {
    for (const [subpath, target] of Object.entries(manifest.exports)) {
      if (typeof target === 'string' && !subpath.includes('*')) {
        const specifier = `${manifest.name}${subpath === '.' ? '' : subpath.slice(1)}`;
        assert(fs.existsSync(consumerRequire.resolve(specifier)), `Missing packed export: ${specifier}`);
      }
    }
    for (const name of Object.keys({ ...manifest.dependencies, ...manifest.peerDependencies })) {
      assert(!compilerPackage.test(name), `Mandatory authoring dependency: ${name}`);
    }
  }
  for (const name of Object.keys({ ...windmod.dependencies, ...windmod.peerDependencies })) {
    linkDependency(name);
  }
  assert.throws(() => consumerRequire.resolve('tailwindcss'), { code: 'MODULE_NOT_FOUND' });
  assert.throws(() => consumerRequire.resolve('postcss'), { code: 'MODULE_NOT_FOUND' });

  for (const name of [windmodName, themeName]) {
    const packageDirectory = path.join(installed, name);
    const sourceDirectory = path.join(
      packageRoot,
      name === windmodName ? 'react-windmod-preview/library' : 'react-tailwind-theme-preview',
    );
    const expectedCss = filesBelow(path.join(sourceDirectory, 'dist')).filter(file => file.endsWith('.css'));
    for (const file of expectedCss) {
      const relative = path.relative(sourceDirectory, file);
      assert(fs.existsSync(path.join(packageDirectory, relative)), `Missing packed CSS: ${name}/${relative}`);
      assert.deepEqual(fs.readFileSync(path.join(packageDirectory, relative)), fs.readFileSync(file));
    }
    for (const file of filesBelow(path.join(installed, name, 'dist')).filter(file => file.endsWith('.css'))) {
      assertPlainCss(read(file));
    }
  }
  const modules = filesBelow(path.join(installed, windmodName, 'lib')).filter(file => file.endsWith('.module.css.js'));
  assert(modules.length > 0, 'No component CSS modules were packed');
  for (const file of modules) {
    const imports = [...read(file).matchAll(/import\s+["']([^"']+\.css)["']/g)];
    assert(imports.length > 0, `Missing component CSS side effect: ${file}`);
    for (const [, cssImport] of imports) {
      const cssFile = path.resolve(path.dirname(file), cssImport);
      assert(fs.existsSync(cssFile), `Missing component CSS chunk: ${cssFile}`);
      const subpath = path
        .relative(path.join(installed, windmodName, 'dist'), cssFile)
        .split(path.sep)
        .join('/');
      assert.equal(consumerRequire.resolve(`${windmodName}/${subpath}`), cssFile);
    }
  }
  for (const [subpath, target] of Object.entries(windmod.exports)) {
    if (typeof target === 'object' && target.require) {
      assert(fs.existsSync(consumerRequire.resolve(`${windmodName}${subpath.slice(1)}`)));
    }
  }

  write(
    'plain.js',
    `
    import '${themeName}/base.css';
    import '${themeName}/themes/web-light.css';
    import '${windmodName}/base.css';
    import { Button } from '${windmodName}/button';
    import { FluentProvider } from '${windmodName}/provider';
    globalThis.windmodConsumer = { Button, FluentProvider };
  `,
  );
  const css = await bundle('plain.js', 'plain-dist');
  assertPlainCss(css);
  assert.match(css, /fuicm-button-root-/);
  assert.match(css, /fui-theme-web-light/);
  assert.match(css, /@property --tw-border-style/);
  assert.doesNotMatch(css, /fuicm-accordion-/);

  write('aggregate.js', `import '${themeName}/styles.css'; import '${windmodName}/styles.css';`);
  const aggregate = await bundle('aggregate.js', 'aggregate-dist');
  assertPlainCss(aggregate);
  assert.match(aggregate, /fuicm-button-root-/);
  assert.match(aggregate, /fuicm-accordion-/);

  const ssr = `
    const Module = require('node:module');
    const originalLoad = Module._load;
    Module._load = function(request, ...args) {
      if (${compilerPackage}.test(request)) throw new Error('Compiler loaded by SSR: ' + request);
      return originalLoad.call(this, request, ...args);
    };
    const React = require('react');
    const { renderToStaticMarkup } = require('react-dom/server');
    const { Button } = require('${windmodName}/button');
    const { FluentProvider, webLightThemeClassName } = require('${windmodName}/provider');
    const markup = renderToStaticMarkup(React.createElement(FluentProvider, { theme: webLightThemeClassName },
      React.createElement(Button, { appearance: 'primary' }, 'Save')));
    require('node:assert/strict').match(markup, /fui-button/);
    require('node:assert/strict').match(markup, /fui-theme-web-light/);
  `;
  write('ssr.cjs', ssr);
  execFileSync(process.execPath, [path.join(fixture, 'ssr.cjs')], {
    cwd: fixture,
    stdio: 'pipe',
    env: { ...process.env, NODE_ENV: 'production' },
  });
  console.log(
    'PASS: packed CSS parses without Tailwind; production ESM bundles retain component CSS; CJS renders without a CSS/compiler loader.',
  );
}

async function verifyAuthoring() {
  linkDependency('tailwindcss');
  const tailwind = require('@tailwindcss/postcss');
  const globalizeMarkers = consumerRequire(markerName);
  const cssModules = require('postcss-modules');
  const candidates =
    '@source inline("bg-neutral-background-2 rounded-medium group-appearance-primary/fui-button:text-neutral-foreground-1");';
  const entry = `
    @import '${themeName}/base.css';
    @import '${themeName}/themes/web-light.css';
    @import '${windmodName}/base.css';
    @reference '${windmodName}/theme.css';
    @tailwind utilities source(none);
    ${candidates}
  `;
  write('index.css', entry);
  const compiled = await postcss([tailwind({ base: fixture, optimize: false })]).process(entry, {
    from: path.join(fixture, 'index.css'),
  });
  assertPlainCss(compiled.css);
  assert.match(compiled.css, /\.bg-neutral-background-2/);
  assert.match(compiled.css, /var\(--color-neutral-background-2\)/);
  assert.match(compiled.css, /data-appearance/);
  assert.match(compiled.css, /\.group\\\/fui-button/);
  let utilityRules = 0;
  compiled.root.walkRules('.bg-neutral-background-2', rule => {
    utilityRules++;
    for (let parent = rule.parent; parent; parent = parent.parent) {
      assert(parent.type !== 'atrule' || parent.name !== 'layer', 'App utilities must be unlayered');
    }
  });
  assert(utilityRules > 0);

  const raw = `
    @import '${themeName}/css/index.css' source(none);
    @import '${themeName}/css/themes/web-light.css';
    @import '@fluentui/react-icons/headless/styles.css' layer(fui.base);
    @import '${windmodName}/base.css';
    @import '${windmodName}/variants.css';
    ${candidates}
  `;
  const rawResult = await postcss([tailwind({ base: fixture, optimize: false })]).process(raw, {
    from: path.join(fixture, 'raw.css'),
  });
  assertPlainCss(rawResult.css);
  assert.match(rawResult.css, /\.bg-neutral-background-2/);
  assert.match(rawResult.css, /fui-theme-web-light/);
  for (const source of ['index.css', 'tokens.css', 'utilities.css', 'variants.css', 'themes/web-light.css']) {
    assert(fs.existsSync(consumerRequire.resolve(`${themeName}/css/${source}`)));
  }

  let classes;
  const moduleSource = `
    @reference './index.css';
    .panel { @apply rounded-medium bg-neutral-background-2 px-horizontal-m; }
    .child {
      @apply group-disabled/fui-button:line-through peer-disabled/fui-input:line-through;
      @variant group-appearance-primary/fui-button { @apply text-neutral-foreground-1; }
      @variant focus-visible { @apply fui-focus-ring; }
    }
  `;
  const result = await postcss([
    tailwind({ base: fixture, optimize: false }),
    globalizeMarkers(),
    cssModules({
      generateScopedName: 'consumer_[local]',
      getJSON: (_file, json) => {
        classes = json;
      },
    }),
  ]).process(moduleSource, { from: path.join(fixture, 'App.module.css') });
  assertPlainCss(result.css);
  assert.deepEqual(Object.keys(classes).sort(), ['child', 'panel']);
  assert.match(result.css, /\.consumer_child/);
  assert.match(result.css, /\.group\\\/fui-button/);
  assert.match(result.css, /\.peer\\\/fui-input/);
  assert.match(result.css, /text-decoration-line: line-through/);
  assert.match(result.css, /--fui-focus/);
  assert.doesNotMatch(result.css, /:global\(/);

  // Exercise the documented bundler-owned CSS Modules path as well as standalone PostCSS.
  write('App.module.css', moduleSource.replace("'./index.css'", `'${windmodName}/theme.css'`));
  write('module.js', "import classes from './App.module.css'; globalThis.consumerClasses = classes;");
  const { build } = await import('vite');
  await build({
    configFile: false,
    root: fixture,
    logLevel: 'error',
    css: {
      postcss: { plugins: [tailwind({ base: fixture, optimize: false }), globalizeMarkers()] },
      modules: { generateScopedName: 'consumer_[local]' },
    },
    build: {
      outDir: path.join(fixture, 'vite-dist'),
      cssMinify: false,
      minify: false,
      lib: { entry: path.join(fixture, 'module.js'), formats: ['es'], fileName: 'app' },
    },
  });
  const viteCss = filesBelow(path.join(fixture, 'vite-dist'))
    .filter(file => file.endsWith('.css'))
    .map(read)
    .join('\n');
  assertPlainCss(viteCss);
  assert.match(viteCss, /\.consumer_panel/);
  assert.match(viteCss, /\.group\\\/fui-button/);
  assert.match(viteCss, /\.peer\\\/fui-input/);
  assert.match(viteCss, /--fui-focus/);
  assert.doesNotMatch(viteCss, /:global\(|fui-theme-web-light|@property --tw-border-style/);
  console.log(
    'PASS: packed source exports compile unlayered app utilities, both variant catalogs, focus utilities, and standalone/Vite CSS Modules with global group/peer markers.',
  );
}

async function main() {
  write('package.json', JSON.stringify({ name: 'windmod-consumer-fixture', private: true }));
  const windmod = await pack(windmodName, 'react-windmod-preview/library');
  const theme = await pack(themeName, 'react-tailwind-theme-preview');
  await pack(markerName, 'postcss-tailwind-css-modules');
  await verifyPlainConsumers(windmod, theme);
  await verifyAuthoring();
}

main()
  .catch(error => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => {
    if (path.dirname(fixture) !== path.resolve(tmpdir()) || !path.basename(fixture).startsWith('windmod-consumers-')) {
      throw new Error(`Refusing to clean unexpected fixture path: ${fixture}`);
    }
    fs.rmSync(fixture, { recursive: true, force: true, maxRetries: 3 });
  });
