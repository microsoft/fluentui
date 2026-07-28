import { compileCssModuleSource, GENERATED_CLASS_PREFIX } from './css-modules';

/**
 * Guardrail for the two halves of the generated-class-name contract
 * (migration/griffel-to-tailwind/reports/DECISIONS.md D9 + D15).
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

      // The literal the JSX writes — `clsx('group/fui-switch', …)` — escaped the way
      // Tailwind emits it in a selector.
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
});
