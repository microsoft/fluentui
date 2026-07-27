/**
 * Jest `moduleNameMapper` target for `*.module.css` imports.
 *
 * Jest never runs webpack, so `import styles from './X.module.css'` has to resolve to
 * something. This returns a deterministic `fuicm-<key>` for any property read, matching
 * the prefix of the webpack `localIdentName`
 * (`fuicm-[name]__[local]--[hash:base64:4]`, see
 * apps/vr-tests-react-components/.storybook/main.js). The snapshot serializer in
 * ./serializer.js strips both shapes, so component snapshots stay free of generated
 * class names — the role `@griffel/jest-serializer` plays for Griffel atomics
 * (migration/griffel-to-tailwind/reports/DECISIONS.md D9).
 *
 * `__esModule: false` makes SWC/babel interop wrap this as the default export, which is
 * what `import styles from ...` reads.
 */
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

      return `fuicm-${key}`;
    },
  },
);
