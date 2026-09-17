# @fluentui/style-spec-compilers

Deterministic compilers that turn `@fluentui/style-spec` IR into:

- Griffel `makeStyles` / `makeResetStyles` modules
- Web Components CSS (+ FAST `css` wrapper)
- CSS Modules (+ `getClassNames` helper for styled headless wrappers)

Target mapping (selectors, attributes, class prefixes) lives in **adapter configs** in this package — never in the spec.

```ts
import { BadgeSpec } from '@fluentui/component-style-specs/Badge';
import { compileStyleSpec } from '@fluentui/style-spec-compilers';

const files = compileStyleSpec(BadgeSpec, { target: 'griffel' });
```

CLI: `style-spec-compile --target griffel --spec ./Badge.js --out ./generated --check`
