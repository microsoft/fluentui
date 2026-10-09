---
name: fluentui-windmod
description: Use when styling, theming or overriding Fluent UI components from @fluentui/react-windmod-preview or @fluentui/react-tailwind-theme-preview, when authoring or verifying component styles inside those packages, or when users say "style this Fluent component", "override the button styles", "theme this app", "switch to dark theme", "restyle windmod", "fui-button", "group variant", "cascade layer", or when working with .module.css files in a windmod project or migrating an app off @fluentui/react-components and Griffel. Provides the override model (cascade layers, not props), the public class and data-attribute surface, the variant catalog, theme class names, the base-scale density knob, and the authoring and verification conventions used inside the library itself.
license: MIT
---

# Fluent windmod

The full skill is vendored with the package it documents, so that the copy published to consumers
and the copy used in this repository can never drift apart.

**Read it here — start with `SKILL.md`, then follow its routing:**

```
packages/react-components/react-windmod-preview/library/skills/fluentui-windmod/
  SKILL.md                            the agent contract — read this first
  references/setup.md                 installing, the two stylesheets, wiring your own Tailwind
  references/overriding.md            restyling a component from an app
  references/variant-catalog.md       the two catalogs and the group-variant vocabulary
  references/tokens-and-scale.md      token namespaces, --base-scale, density
  references/griffel-deltas.md        the deliberate differences from @fluentui/react-components
  references/css-var-values.md        reading a resolved token value in JavaScript
  references/authoring-conventions.md CONTRIBUTORS: authoring rules + the verification protocol
  references/troubleshooting.md       a style that will not apply
  assets/                             a worked override example
```

**Changing anything inside `packages/react-components/react-windmod-preview`** — a `*.module.css`, a
styles hook, a VR scene, a mutation table, a pixel allowance — means loading
`references/authoring-conventions.md` completely first. Those rules are strict and violations are
rejected.

Consumer-facing install and adoption notes live in the same directory's `README.md`.
