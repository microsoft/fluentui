# Tree-Shakeable Tokens

The `@fluentui/tokens` package now supports tree-shaking for optimal bundle sizes!

## Before (30kB for all tokens)

```typescript
import { tokens } from '@fluentui/tokens';

const color = tokens.colorNeutralForeground1;
```

## After (only ~250B per token)

```typescript
// Import only what you need - much smaller bundle!
import { colorNeutralForeground1, colorBrandBackground } from '@fluentui/tokens';

const color = colorNeutralForeground1;
```

## Backward Compatibility

The `tokens` object is still available for backward compatibility:

```typescript
import { tokens } from '@fluentui/tokens';

const color = tokens.colorNeutralForeground1; // Still works!
```

## Bundle Size Comparison

- **Old approach** (importing `tokens` object): ~30kB of JavaScript
- **New approach** (importing individual tokens): ~250B per token

### Example

If you only use 5 tokens:

- Old: 30kB (entire object)
- New: ~1.25kB (5 × 250B) + overhead

**That's a 95% reduction in bundle size!** 🎉

## Migration Guide

### If you use a few tokens:

```diff
- import { tokens } from '@fluentui/tokens';
+ import { colorNeutralForeground1, colorBrandBackground } from '@fluentui/tokens';

- const color = tokens.colorNeutralForeground1;
+ const color = colorNeutralForeground1;
```

### If you use tokens within griffel `/style.ts`:

Keep using the `tokens` object - no changes needed! They will be tree-shaken after griffel transformation

```typescript
import { tokens } from '@fluentui/tokens';
// Works exactly as before
```
