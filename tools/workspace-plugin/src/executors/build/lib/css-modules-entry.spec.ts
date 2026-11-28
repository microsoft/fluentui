import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

import { logger } from '@nx/devkit';

import { emitCssModulesEntry, emitCssModulesTypes } from './css-modules-entry';
import { type NormalizedOptions } from './shared';

const cssModulesExport = {
  './css-modules': {
    import: { types: './dist/css-modules.d.ts', default: './lib/css-modules/index.js' },
    require: { types: './dist/css-modules.d.cts', default: './lib-commonjs/css-modules/index.cjs' },
  },
};

/**
 * Compiled output shaped like SWC's (ESM `lib`, `.cjs` CommonJS `lib-commonjs`) of a package where:
 * - `Card` uses its own style hook (with a CSS Modules style hook),
 * - `Toolbar` uses a style hook of a dependency shipping `./css-modules`,
 * - `Plain` has no style hook (shared with the root entry),
 * - `contexts`/`useCard` don't depend on styles (shared with the root entry).
 */
const esmFiles: Record<string, string> = {
  'index.js': [
    `export { Card, useCardStyles_unstable } from "./components/Card/index.js";`,
    `export { Toolbar } from "./components/Toolbar.js";`,
    `export { Plain } from "./components/Plain.js";`,
    `export { CardContext } from "./contexts/cardContext.js";`,
  ].join('\n'),
  'components/Card/index.js': [
    `export { Card } from "./Card.js";`,
    `export { useCardStyles_unstable } from "./useCardStyles.styles.js";`,
  ].join('\n'),
  'components/Card/Card.js': [
    `'use client';`,
    `// import { Card } from "@fluentui/dep";`,
    `import { useCard_unstable } from "./useCard.js";`,
    `import { useCardStyles_unstable } from "./useCardStyles.styles.js";`,
    `const Lazy = () => import("./useCard.js");`,
    `export const Card = (props) => useCardStyles_unstable(useCard_unstable(props));`,
  ].join('\n'),
  'components/Card/useCard.js': `import { CardContext } from "../../contexts/cardContext.js";\nexport const useCard_unstable = p => p;`,
  'components/Card/useCardStyles.styles.js': `import { makeStyles } from "@griffel/react";\nexport const useCardStyles_unstable = s => s;`,
  'components/Card/useCardStyles.styles.css.js': `import styles from "./Card.module.css";\nexport const useCardStyles_unstable = s => s;`,
  'components/Card/useCardStyles.styles.raw.js': `export const raw = 1;`,
  'components/Toolbar.js': `import { useButtonStyles_unstable } from "@fluentui/dep";\nimport { jsx } from "@fluentui/dep/jsx-runtime";\nexport const Toolbar = () => null;`,
  'components/Plain.js': `export const Plain = () => null;`,
  'contexts/cardContext.js': `import * as React from "react";\nexport const CardContext = React.createContext(undefined);`,
};

function toCjs(code: string) {
  return code.replace(/import (.+?) from "(.+?)";/g, (_m, _what, from: string) => {
    const spec = from.startsWith('.') ? from.replace(/\.js$/, '.cjs') : from;
    return `const _x = require("${spec}");`;
  });
}

describe('css-modules entry', () => {
  let root: string;
  let projectRoot: string;
  let options: NormalizedOptions;

  function write(path: string, content: string) {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, content);
  }

  const read = (path: string) => readFileSync(join(projectRoot, path), 'utf-8');

  beforeEach(() => {
    jest.spyOn(logger, 'log').mockImplementation(() => undefined);
    jest.spyOn(logger, 'error').mockImplementation(() => undefined);

    root = mkdtempSync(join(tmpdir(), 'css-modules-entry-'));
    projectRoot = join(root, 'proj');

    write(
      join(projectRoot, 'package.json'),
      JSON.stringify({ name: '@fluentui/proj', type: 'module', exports: { '.': {}, ...cssModulesExport } }),
    );
    write(
      join(root, 'node_modules/@fluentui/dep/package.json'),
      JSON.stringify({
        name: '@fluentui/dep',
        exports: { '.': {}, ...cssModulesExport, './package.json': './package.json' },
      }),
    );

    for (const [file, code] of Object.entries(esmFiles)) {
      write(join(projectRoot, 'lib', file), code);
      write(join(projectRoot, 'lib-commonjs', file.replace(/\.js$/, '.cjs')), toCjs(code));
    }
    write(join(projectRoot, 'lib/components/Card/Card.js.map'), JSON.stringify({ sources: ['Card.tsx'] }));
    write(join(projectRoot, 'dist/index.d.ts'), 'export {};');

    options = {
      absoluteProjectRoot: projectRoot,
      isEsmPackage: true,
      moduleOutput: [
        { module: 'es6', outputPath: 'lib' },
        { module: 'commonjs', outputPath: 'lib-commonjs' },
      ],
    } as NormalizedOptions;
  });

  afterEach(() => {
    rmSync(root, { recursive: true, force: true });
    jest.restoreAllMocks();
  });

  it('wires the CSS Modules style hook inside the re-emitted component', async () => {
    expect(await emitCssModulesEntry(options)).toBe(true);

    const card = read('lib/css-modules/components/Card/Card.js');
    expect(card).toContain(
      `import { useCardStyles_unstable } from "../../../components/Card/useCardStyles.styles.css.js";`,
    );
    expect(card).not.toMatch(/useCardStyles\.styles\.js/);
    // modules not depending on styles are shared with the root entry
    expect(card).toContain(`import { useCard_unstable } from "../../../components/Card/useCard.js";`);
    expect(card).toContain(`import("../../../components/Card/useCard.js")`);
    expect(card).toContain(`'use client';`);
    // comments are left alone
    expect(card).toContain(`// import { Card } from "@fluentui/dep";`);

    // root entry stays on Griffel
    expect(read('lib/components/Card/Card.js')).toBe(esmFiles['components/Card/Card.js']);
  });

  it('re-exports CSS Modules hooks from barrels and keeps re-emitted modules relative', async () => {
    await emitCssModulesEntry(options);

    expect(read('lib/css-modules/components/Card/index.js')).toBe(
      [
        `export { Card } from "./Card.js";`,
        `export { useCardStyles_unstable } from "../../../components/Card/useCardStyles.styles.css.js";`,
      ].join('\n'),
    );
    expect(read('lib/css-modules/index.js')).toContain(`from "../contexts/cardContext.js"`);
    expect(read('lib/css-modules/index.js')).toContain(`from "./components/Card/index.js"`);
  });

  it('points root imports of dependencies shipping CSS Modules at their css-modules entry', async () => {
    await emitCssModulesEntry(options);

    const toolbar = read('lib/css-modules/components/Toolbar.js');
    expect(toolbar).toContain(`from "@fluentui/dep/css-modules"`);
    expect(toolbar).toContain(`from "@fluentui/dep/jsx-runtime"`);
  });

  it('re-emits only style dependent modules', async () => {
    await emitCssModulesEntry(options);

    const emitted = (file: string) => existsSync(join(projectRoot, 'lib/css-modules', file));
    expect(emitted('components/Card/useCard.js')).toBe(false);
    expect(emitted('contexts/cardContext.js')).toBe(false);
    expect(emitted('components/Card/useCardStyles.styles.js')).toBe(false);
    expect(emitted('components/Card/useCardStyles.styles.raw.js')).toBe(false);
    expect(emitted('components/Plain.js')).toBe(false);
    expect(read('lib/css-modules/index.js')).toContain(`from "../components/Plain.js"`);
  });

  it('applies the same rewrite to CommonJS output', async () => {
    await emitCssModulesEntry(options);

    const card = read('lib-commonjs/css-modules/components/Card/Card.cjs');
    expect(card).toContain(`require("../../../components/Card/useCardStyles.styles.css.cjs")`);
    expect(card).toContain(`require("../../../components/Card/useCard.cjs")`);
    expect(read('lib-commonjs/css-modules/components/Toolbar.cjs')).toContain(`require("@fluentui/dep/css-modules")`);
  });

  it('keeps source maps pointing at the original sources', async () => {
    await emitCssModulesEntry(options);

    expect(JSON.parse(read('lib/css-modules/components/Card/Card.js.map')).sources).toEqual([
      '../../../components/Card/Card.tsx',
    ]);
  });

  it('resolves named imports through barrels to the module defining them', async () => {
    write(
      join(projectRoot, 'lib/components/Card/index.js'),
      [esmFiles['components/Card/index.js'], `export { useCard_unstable as useCardBase } from "./useCard.js";`].join(
        '\n',
      ),
    );
    write(
      join(projectRoot, 'lib/contexts/cardContext.js'),
      `import * as React from "react";\nimport { useCardBase } from "../components/Card/index.js";\nexport const CardContext = React.createContext(useCardBase);`,
    );

    expect(await emitCssModulesEntry(options)).toBe(true);
    expect(existsSync(join(projectRoot, 'lib/css-modules/contexts/cardContext.js'))).toBe(false);
  });

  it('ignores comments inside export clauses', async () => {
    write(
      join(projectRoot, 'lib/components/Card/index.js'),
      [
        `export { Card } from "./Card.js";`,
        `export { /** @deprecated */ useCardStyles_unstable } from "./useCardStyles.styles.js";`,
        `export { useCard_unstable as useCardBase } from "./useCard.js";`,
      ].join('\n'),
    );
    write(
      join(projectRoot, 'lib/contexts/cardContext.js'),
      `import * as React from "react";\nimport { /* base */ useCardBase } from "../components/Card/index.js";\nexport const CardContext = React.createContext(useCardBase);`,
    );

    expect(await emitCssModulesEntry(options)).toBe(true);
    expect(read('lib/css-modules/components/Card/index.js')).toContain(
      `export { /** @deprecated */ useCardStyles_unstable } from "../../../components/Card/useCardStyles.styles.css.js";`,
    );
    expect(existsSync(join(projectRoot, 'lib/css-modules/contexts/cardContext.js'))).toBe(false);
  });

  it('fails instead of duplicating a React context', async () => {
    write(
      join(projectRoot, 'lib/contexts/cardContext.js'),
      `import * as React from "react";\nimport { Card } from "../components/Card/index.js";\nexport const CardContext = React.createContext(Card);`,
    );

    expect(await emitCssModulesEntry(options)).toBe(false);
    expect(logger.error).toHaveBeenCalledWith(expect.stringContaining('contexts/cardContext.js'));
  });

  it('fails when a Griffel style hook has no CSS Modules style hook', async () => {
    rmSync(join(projectRoot, 'lib/components/Card/useCardStyles.styles.css.js'));

    expect(await emitCssModulesEntry(options)).toBe(false);
    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining(
        'components/Card/useCardStyles.styles.js: missing CSS Modules style hook components/Card/useCardStyles.styles.css.js',
      ),
    );
    expect(existsSync(join(projectRoot, 'lib/css-modules'))).toBe(false);
  });

  it('fails when a CSS Modules style hook misses exports of the Griffel one', async () => {
    write(
      join(projectRoot, 'lib/components/Card/useCardStyles.styles.js'),
      `export const cardClassNames = { root: "fui-Card" };\nexport const useCardStyles_unstable = s => s;`,
    );

    expect(await emitCssModulesEntry(options)).toBe(false);
    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining('components/Card/useCardStyles.styles.css.js: missing exports cardClassNames'),
    );
  });

  it('fails when a CSS Modules style hook has no Griffel style hook', async () => {
    write(join(projectRoot, 'lib/components/Orphan.styles.css.js'), `export const useOrphanStyles = s => s;`);

    expect(await emitCssModulesEntry(options)).toBe(false);
    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining('components/Orphan.styles.css.js: no Griffel style hook components/Orphan.styles.js'),
    );
  });

  it('emits declarations re-exporting the root entry', async () => {
    await emitCssModulesTypes(options);

    expect(read('dist/css-modules.d.ts')).toContain(`export * from './index.js';`);
    expect(read('dist/css-modules.d.cts')).toContain(`export * from './index.cjs';`);
  });

  it('does nothing for packages without the entry', async () => {
    write(join(projectRoot, 'package.json'), JSON.stringify({ name: '@fluentui/proj', exports: { '.': {} } }));

    expect(await emitCssModulesEntry(options)).toBe(true);
    expect(await emitCssModulesTypes(options)).toBe(true);
    expect(existsSync(join(projectRoot, 'lib/css-modules'))).toBe(false);
    expect(existsSync(join(projectRoot, 'dist/css-modules.d.ts'))).toBe(false);
  });
});
