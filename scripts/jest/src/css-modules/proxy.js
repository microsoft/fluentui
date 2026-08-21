/**
 * Jest `moduleNameMapper` target for `*.module.css` imports.
 *
 * Jest never runs webpack, so `import styles from './X.module.css'` has to resolve to
 * something. This returns a deterministic name for any property read, in the same
 * lowercase-kebab, `fuicm-`-prefixed shape the two real pipelines emit
 * (`fuicm-<component>-<local>-<hex6>` — see scripts/css-modules/ident.js). The snapshot
 * serializer in ./serializer.js strips every `fuicm-…` token, so component snapshots stay
 * free of generated class names — the role Griffel's jest serializer played for Griffel
 * atomics (migration/griffel-to-tailwind/reports/DECISIONS.md D9).
 *
 * WHY THE NAME IS SHORTER HERE: `moduleNameMapper` maps every `*.module.css` in the repo to
 * this ONE module and gives it no way to learn which file was imported, so the component and
 * hash segments cannot be computed. They are dropped rather than faked — `fuicm-root` is
 * honestly "the `root` local of some module", and everything the toolchain actually keys on
 * (the `fuicm-` prefix, the lowercase-kebab alphabet) is identical. `generateTestIdent` owns
 * that decision so the shape stays defined in one place.
 *
 * `__esModule: false` makes SWC/babel interop wrap this as the default export, which is
 * what `import styles from ...` reads.
 */

const { generateTestIdent } = require('../../../css-modules/ident');

module.exports = new Proxy(
  {},
  {
    get(_target, key) {
      if (typeof key !== 'string') {
        return undefined;
      }

      // Keep module-system and promise probing intact. NOTE: `default` is deliberately
      // NOT excluded — it is a legitimate CSS class name (Divider's default appearance)
      // and CJS interop only ever reads `__esModule` off this object.
      if (key === '__esModule' || key === 'then') {
        return undefined;
      }

      return generateTestIdent(key);
    },
  },
);
