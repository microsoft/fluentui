## Unprocessed Styles (Raw Modules)

### Overview

Fluent UI v9 components now ship with **raw module alternatives** to solve CSS style conflicts in multi-bundle applications. This feature addresses critical issues where Griffel-processed styles clash when multiple application bundles are loaded simultaneously.

### The Problem: Style Clashes in Multi-Bundle Apps

Modern applications often split code into multiple bundles (main app bundle, CDN bundles, micro-frontends, etc.). When each bundle contains pre-processed Griffel styles, CSS class conflicts can occur:

### The Solution: Raw Modules with Style Prefixing

Raw modules contain unprocessed Griffel styles that can be configured with unique prefixes at build time, preventing CSS conflicts:

### How to Use Raw Modules

Configure your bundler to prioritize `.raw.js` extension resolution:

**Webpack Configuration:**

**Vite Configuration:**

### Package Support Status

| Package                      | Ships Processed Styles | Raw Modules Available | Version                                                                                                                                                                                                                                                                                                                       |
| ---------------------------- | ---------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@fluentui/react-components` | ⚠️ Yes                 | ✅ Available          | [v9.67.0+](https://www.npmjs.com/package/@fluentui/react-components/v/9.67.0)                                                                                                                                                                                                                                                 |
| `@fluentui-contrib/*`        | ✅ No                  | ✅ Not needed         | N/A                                                                                                                                                                                                                                                                                                                           |
| `@fluentui-copilot/*`        | ⚠️ Yes                 | ✅ Available          | [v0.28.4+](https://www.npmjs.com/package/@fluentui-copilot/react-copilot/v/0.28.4), Older major version back-ports / [v0.26.2-hotfix.1](https://www.npmjs.com/package/@fluentui-copilot/react-copilot/v/0.26.2-hotfix.1), [v0.25.3-hotfix.1](https://www.npmjs.com/package/@fluentui-copilot/react-copilot/v/0.25.3-hotfix.1) |
| `@fluentui/react-icons`      | ⚠️ Yes                 | ✅ Available          | [v2.0.307+](https://www.npmjs.com/package/@fluentui/react-icons/v/2.0.307)                                                                                                                                                                                                                                                    |
| `@fluentui/react-charts`     | ⚠️ Yes                 | ✅ Available          | [v9.2.0+](https://www.npmjs.com/package/@fluentui/react-charts/v/9.2.0)                                                                                                                                                                                                                                                       |
| MSFT Design react-icons      | ⚠️ Yes                 | ❌ Not planned        | -                                                                                                                                                                                                                                                                                                                             |

### Benefits

- **✅ Backward Compatible**: Existing apps continue to work without changes
- **✅ Zero Breaking Changes**: Raw modules are opt-in via bundler configuration
- **✅ Performance**: Avoids CSS specificity hacks and runtime overhead
- **✅ Future-Proof**: Enables style prefixing and better multi-bundle support

### Learn More

- 📖 [RFC: Stop pre-processing styles with Griffel](https://github.com/microsoft/fluentui/blob/master/docs/react-v9/contributing/rfcs/shared/build-system/stop-styles-transforms.md)
- 🐛 [Griffel Issue #453](https://github.com/microsoft/griffel/issues/453)
- 🐛 [Griffel Issue #526](https://github.com/microsoft/griffel/issues/526)
