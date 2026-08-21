import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import postcss, { type AtRule, type Rule } from 'postcss';

import {
  CANONICAL_LAYER_STATEMENT,
  compileCssModules,
  compileCssModuleSource,
  GENERATED_CLASS_PREFIX,
} from './css-modules';
import { type NormalizedOptions } from './shared';

/**
 * Required by relative path, same as css-modules.ts's own import of it — see that file's
 * header for why (it lives outside this project's `rootDir`).
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { globalizeSelector } = require('../../../../../../scripts/css-modules/globalize-group-markers.js');

/**
 * Guardrail for the two halves of the generated-class-name contract.
 *
 * Both failures these cover are SILENT — the CSS stays well-formed, nothing warns, and the
 * visual-regression suite passes because nothing changed visually:
 *
 *  - a hashed `group/…` marker produces selectors the DOM never matches, so every
 *    cross-component rule quietly stops applying;
 *  - a generated name that drifts off `fuicm-…` stops being stripped by the jest snapshot
 *    serializer and floods every committed snapshot instead.
 */
const PACKAGE_NAME = '@fluentui/react-switch';
const RELATIVE_PATH = 'components/Switch/Switch.module.css';
const ABSOLUTE_PATH = `/repo/packages/react-components/react-switch/library/src/${RELATIVE_PATH}`;

const SOURCE = `
@custom-variant checked (&:where([data-checked], :checked));

.root {
  color: blue;
}

.thumb {
  @variant group-checked/fui-switch {
    color: red;
  }
}

.nonZeroDeterminate {
  width: 50%;
}
`;

function compile() {
  return compileCssModuleSource({
    source: SOURCE,
    absolutePath: ABSOLUTE_PATH,
    packageName: PACKAGE_NAME,
    relativePath: RELATIVE_PATH,
  });
}

describe('compileCssModuleSource', () => {
  describe('named-group markers (D15)', () => {
    it('leaves the compiled marker unhashed and globally addressable', async () => {
      const { css } = await compile();

      // The literal the JSX writes — `clsx(switchClassNames.root, 'group/fui-switch', …)` —
      // escaped the way Tailwind emits it in a selector.
      expect(css).toContain('.group\\/fui-switch');
    });

    it('does not scope the marker into a generated class name', async () => {
      const { css } = await compile();

      expect(css).not.toMatch(new RegExp(`${GENERATED_CLASS_PREFIX}[a-z0-9-]*group`));
    });

    it('keeps the marker out of the exported class map', async () => {
      const { classMap } = await compile();

      expect(Object.keys(classMap).sort()).toEqual(['nonZeroDeterminate', 'root', 'thumb']);
    });

    it('still scopes the module locals around it', async () => {
      const { css, classMap } = await compile();

      expect(css).toContain(`.${classMap.thumb}:is(:where(.group\\/fui-switch)`);
    });
  });

  describe('generated class names', () => {
    it('emits fuicm-<component>-<local>-<hex6>', async () => {
      const { classMap } = await compile();

      expect(classMap.root).toMatch(/^fuicm-switch-root-[0-9a-f]{6}$/);
    });

    it('kebab-cases the local so the whole name stays lowercase', async () => {
      const { classMap } = await compile();

      expect(classMap.nonZeroDeterminate).toMatch(/^fuicm-switch-non-zero-determinate-[0-9a-f]{6}$/);
    });

    it('never emits an uppercase character', async () => {
      const { classMap } = await compile();

      for (const generated of Object.values(classMap)) {
        expect(generated).toEqual(generated.toLowerCase());
      }
    });

    it('is stable across runs and unique per package', async () => {
      const first = await compile();
      const second = await compile();
      const otherPackage = await compileCssModuleSource({
        source: SOURCE,
        absolutePath: ABSOLUTE_PATH,
        packageName: '@fluentui/react-radio',
        relativePath: RELATIVE_PATH,
      });

      expect(first.classMap.root).toEqual(second.classMap.root);
      expect(first.classMap.root).not.toEqual(otherPackage.classMap.root);
    });
  });

  describe('fui-globalize-group-markers plugin', () => {
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

    it('renames nothing when a peer marker is compiled through the real chain', async () => {
      const source = `
        @custom-variant disabled (&:where([disabled], [data-disabled]));

        .sib {
          @variant peer-disabled/fui-input { opacity: 0.5; }
        }
      `;
      const { css, classMap } = await compileCssModuleSource({
        source,
        absolutePath: ABSOLUTE_PATH,
        packageName: PACKAGE_NAME,
        relativePath: RELATIVE_PATH,
      });

      expect(css).toContain('.peer\\/fui-input');
      expect(Object.keys(classMap)).not.toContain('peer/fui-input');
    });
  });
});

/**
 * StackShim's permanently UNLAYERED descendant rules.
 *
 * `@fluentui/react-migration-v8-v9` exists to render hybrid v8/v9 trees, so a StackShim's
 * children are routinely v8 components styled by merge-styles — which injects UNLAYERED at
 * runtime. Four of StackShim's rules have those children as their subject, and an unlayered
 * declaration beats every `@layer` before specificity is even consulted. Moving them into
 * `fui.components.l1`, adding `:where()`, or dropping the `:global()` around `ms-StackItem`
 * each silently inverts a `flex-shrink` / `text-overflow` tie the shim wins today at 0-2-0.
 *
 * Every one of those failures is invisible: the CSS stays well-formed, nothing warns, no test
 * renders differently, and this package has NO visual-regression baselines at all (a grep of
 * apps/vr-tests-react-components/src for `Shim` returns zero story files). These assertions are
 * the only mechanism that can see them, which is why they read the SHIPPED file rather than a
 * fixture copy of it.
 */
describe('compileCssModuleSource — StackShim unlayered descendant rules (S4)', () => {
  const REPO_ROOT = join(__dirname, '../../../../../..');
  const STACK_SHIM_PACKAGE = '@fluentui/react-migration-v8-v9';
  const STACK_SHIM_RELATIVE_PATH = 'components/Stack/StackShim.module.css';
  const STACK_SHIM_ABSOLUTE_PATH = join(
    REPO_ROOT,
    'packages/react-components/react-migration-v8-v9/library/src',
    STACK_SHIM_RELATIVE_PATH,
  );

  /** The literal StackItemShim.tsx renders; the exclusions match on it verbatim. */
  const STACK_ITEM_STATIC = '.ms-StackItem';

  function compileStackShim() {
    return compileCssModuleSource({
      source: readFileSync(STACK_SHIM_ABSOLUTE_PATH).toString(),
      absolutePath: STACK_SHIM_ABSOLUTE_PATH,
      packageName: STACK_SHIM_PACKAGE,
      relativePath: STACK_SHIM_RELATIVE_PATH,
    });
  }

  /** Every rule in the compiled output that has a consumer child as its subject. */
  function descendantRules(css: string): Rule[] {
    const found: Rule[] = [];

    postcss.parse(css).walkRules(rule => {
      if (rule.selector.includes('> *')) {
        found.push(rule);
      }
    });

    return found;
  }

  function isInsideLayer(rule: Rule): boolean {
    for (let node = rule.parent; node; node = (node as AtRule).parent) {
      if (node.type === 'atrule' && (node as AtRule).name === 'layer') {
        return true;
      }
    }

    return false;
  }

  it('keeps `ms-StackItem` unhashed, so the exclusions still match', async () => {
    const { css, classMap } = await compileStackShim();

    // `:global()` survived: the class is emitted verbatim, not scoped to `fuicm-…`. Left bare
    // in the source, postcss-modules hashes it and the exclusion stops matching — silently
    // (the same failure class D15.4 documented for group markers).
    expect(css).toContain(`:not(${STACK_ITEM_STATIC})`);
    expect(css).not.toMatch(new RegExp(`${GENERATED_CLASS_PREFIX}[a-z0-9-]*ms-stack-item`, 'i'));

    // postcss-modules ignores anything inside `:global()`, so a correctly handled name is
    // absent from the exported map entirely.
    expect(Object.keys(classMap)).not.toContain('ms-StackItem');
  });

  it('emits the four descendant rules OUTSIDE any @layer', async () => {
    const { css } = await compileStackShim();
    const rules = descendantRules(css);

    expect(rules).toHaveLength(4);

    for (const rule of rules) {
      expect({ selector: rule.selector, layered: isInsideLayer(rule) }).toEqual({
        selector: rule.selector,
        layered: false,
      });
    }
  });

  it('never wraps them in :where(), which would zero the specificity they depend on', async () => {
    const { css } = await compileStackShim();

    for (const rule of descendantRules(css)) {
      expect(rule.selector).not.toContain(':where(');
    }
  });

  it('writes `.disable-shrink` LAST, so `flex-shrink: 0` still beats `.root`/`.inner`', async () => {
    const { css, classMap } = await compileStackShim();
    const selectors = descendantRules(css).map(rule => rule.selector);

    // Unlayered rules of equal specificity are ordered by file position and nothing else.
    // StackShim.tsx pushes `styles.root` at :70 and `styles.disableShrink` at :129, so the
    // disableShrink rule has to come after both flex-shrink:1 rules or `disableShrink` silently
    // stops disabling shrink.
    const lastIndexOf = (generated: string) =>
      selectors.reduce((last, selector, index) => (selector.startsWith(`.${generated}`) ? index : last), -1);

    expect(lastIndexOf(classMap['disable-shrink'])).toBe(selectors.length - 1);
    expect(lastIndexOf(classMap['disable-shrink'])).toBeGreaterThan(lastIndexOf(classMap.root));
    expect(lastIndexOf(classMap['disable-shrink'])).toBeGreaterThan(lastIndexOf(classMap.inner));
  });
});

/**
 * `cleanOutput` does not clear `dist/` (api-extractor owns it), so deleting a package's last
 * `*.module.css` used to leave `dist/styles.css` behind forever on incremental local builds —
 * a stale stylesheet that nothing imports but that `"./styles.css"` still resolves for
 * consumers.
 */
describe('compileCssModules — orphaned dist/styles.css', () => {
  let projectRoot: string;

  function options(): NormalizedOptions {
    // compileCssModules' zero-source-file path reads only these two fields.
    return {
      absoluteProjectRoot: projectRoot,
      absoluteSourceRoot: join(projectRoot, 'src'),
    } as unknown as NormalizedOptions;
  }

  beforeEach(async () => {
    projectRoot = await mkdtemp(join(tmpdir(), 'fui-css-modules-'));
    mkdirSync(join(projectRoot, 'src'), { recursive: true });
    mkdirSync(join(projectRoot, 'dist'), { recursive: true });
  });

  afterEach(async () => {
    await rm(projectRoot, { recursive: true, force: true });
  });

  /** Shape of a stylesheet a previous run of this executor wrote — carries the provenance banner. */
  const GENERATED = [
    CANONICAL_LAYER_STATEMENT,
    '',
    '/*',
    ' * @fluentui/react-thing — compiled component styles.',
    ' *',
    ' * Generated by @fluentui/workspace-plugin:build from this package\'s "src" CSS Modules.',
    ' */',
    '',
    '.fuicm-thing-root-abc123 { color: red; }',
  ].join('\n');

  it('deletes the stylesheet when the package no longer owns any *.module.css', async () => {
    writeFileSync(join(projectRoot, 'dist', 'styles.css'), GENERATED);

    await expect(compileCssModules(options())).resolves.toBe(true);

    expect(existsSync(join(projectRoot, 'dist', 'styles.css'))).toBe(false);
  });

  it('leaves the rest of dist/ alone — api-extractor owns that directory', async () => {
    writeFileSync(join(projectRoot, 'dist', 'styles.css'), GENERATED);
    writeFileSync(join(projectRoot, 'dist', 'index.d.ts'), 'export {};');

    await compileCssModules(options());

    expect(existsSync(join(projectRoot, 'dist', 'index.d.ts'))).toBe(true);
    expect(existsSync(join(projectRoot, 'dist'))).toBe(true);
  });

  /**
   * `react-storybook-addon-export-to-sandbox` copies a hand-authored `src/styles.css` to
   * `dist/styles.css` via the build's `assets` config, declares it in `exports["./styles.css"]`,
   * `files` and `sideEffects` — and owns zero `*.module.css`, so it takes this exact path on every
   * build. Deleting by filename alone would silently unpublish it.
   */
  it('never deletes a stylesheet this executor did not generate', async () => {
    const authored = '/* Remove z-index from "show code" button container */\n.docs-story > div { z-index: auto; }';
    writeFileSync(join(projectRoot, 'dist', 'styles.css'), authored);

    await expect(compileCssModules(options())).resolves.toBe(true);

    expect(existsSync(join(projectRoot, 'dist', 'styles.css'))).toBe(true);
    expect(readFileSync(join(projectRoot, 'dist', 'styles.css'), 'utf8')).toBe(authored);
  });

  it('is a no-op for a package that never had a stylesheet', async () => {
    await expect(compileCssModules(options())).resolves.toBe(true);

    expect(existsSync(join(projectRoot, 'dist', 'styles.css'))).toBe(false);
  });

  it('keeps the stylesheet when the package still owns a *.module.css', async () => {
    mkdirSync(join(projectRoot, 'src', 'components'), { recursive: true });
    writeFileSync(join(projectRoot, 'src', 'components', 'Thing.module.css'), '.root { color: blue; }');
    writeFileSync(join(projectRoot, 'dist', 'styles.css'), '.fuicm-existing-abc123 { color: red; }');

    // Not asserting on the compile result here — only that the early-return cleanup did not fire.
    await compileCssModules(options()).catch(() => undefined);

    expect(existsSync(join(projectRoot, 'dist', 'styles.css'))).toBe(true);
  });
});
