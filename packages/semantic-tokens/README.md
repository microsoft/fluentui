# @fluentui/semantic-tokens

**Fluent UI Theme semantic-tokens**

The semantic tokens package provides finely tuneable theme control via generic and component level CSSVars with fallbacks.

This package extends upon the core @fluentui/tokens set in a tree-shakeable and backwards compatible manner.

Control tokens are targeted to specific components with a generic set fallback, as well as their original Fluent 2 theme token as the final fallback if no semantic tokens are set.

**Token generation method**
The token definition data is provided under scripts/tokens.json exported from Figma token definitions.

Semantic tokens are generated via the tokenGen script (`yarn generate-tokens`) under scripts/tokenGen.ts

Legacy tokens are statically generated via `yarn generate-legacy-tokens` - this ensures legacy tokens are flat exported so they remain tree-shakeable

Legacy token overrides are mapped 1:1 with their component use case via scripts/fluentOverrides.ts for backwards compatibility
