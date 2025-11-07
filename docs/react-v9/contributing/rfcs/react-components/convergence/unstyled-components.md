# RFC: Unstyled Components

## Contributors

- @dmytrokirpa

## Summary

This RFC proposes **unstyled style hook variants** that omit Griffel CSS implementations while preserving base class names (`.fui-[Component]`). This enables partners to use alternative styling solutions (CSS Modules, Tailwind, vanilla CSS) without recomposing components.

Unstyled variants are opt-in via bundler extension resolution (similar to [raw modules](https://storybooks.fluentui.dev/react/?path=/docs/concepts-developer-unprocessed-styles--docs#how-to-use-raw-modules), ensuring zero breaking changes.

**Performance Impact:** Internal testing shows **~25% JavaScript bundle size reduction** when using unstyled variants, as Griffel runtime and style implementations are excluded from the bundle.

## Problem Statement

Partners want to use Fluent UI v9 with alternative styling solutions but currently must:

1. Recompose every component manually (high maintenance)
2. Override styles via `className` props (fragile, specificity issues)
3. Use custom style hooks (still depends on Griffel runtime and default styles)

**Use cases:**

- Teams using CSS Modules, Tailwind CSS, or vanilla CSS
- Complete design system replacement while keeping Fluent behavior/accessibility
- Bundle size optimization: **~25% JS bundle size reduction** (tested on a few components) by removing Griffel runtime and style implementations

## Solution

Ship unstyled style hook variants with `.styles.unstyled.ts` extension, resolved via bundler configuration. The unstyled variant:

- ✅ Removes all Griffel `makeStyles`/`makeResetStyles` calls
- ✅ Preserves base class names (`.fui-Button`, `.fui-Button__icon`, etc.)
- ✅ Maintains identical hook signature
- ✅ Component files unchanged (still supports `useCustomStyleHook_unstable`)
- ✅ **~25% JS bundle size reduction** (tested) by excluding Griffel runtime

**Note:** To completely eliminate Griffel from an application, unstyled variants are needed for **all components that use Griffel**, including infrastructure components like `FluentProvider`. This ensures no Griffel runtime is bundled.

### Example

**Standard style hook** (`useButtonStyles.styles.ts`):

```tsx
import { makeStyles, mergeClasses } from '@griffel/react';

export const buttonClassNames = { root: 'fui-Button', icon: 'fui-Button__icon' };

const useStyles = makeStyles({
  root: {
    /* extensive Griffel styles */
  },
  icon: {
    /* icon styles */
  },
});

export const useButtonStyles_unstable = (state: ButtonState) => {
  const styles = useStyles();
  state.root.className = mergeClasses(buttonClassNames.root, styles.root, state.root.className);
  return state;
};
```

**Unstyled style hook** (`useButtonStyles.styles.unstyled.ts`):

```tsx
import { mergeClasses } from '@fluentui/react-utilities';

export const buttonClassNames = { root: 'fui-Button', icon: 'fui-Button__icon' };

export const useButtonStyles_unstable = (state: ButtonState) => {
  // Only apply base class names, no styles
  state.root.className = mergeClasses(buttonClassNames.root, state.root.className);
  return state;
};
```

**Component unchanged:**

```tsx
import { useButtonStyles_unstable } from './useButtonStyles.styles'; // ← Resolves to .unstyled.ts when configured

export const Button = React.forwardRef((props, ref) => {
  const state = useButton_unstable(props, ref);
  useButtonStyles_unstable(state); // ← Uses unstyled variant when configured
  useCustomStyleHook_unstable('useButtonStyles_unstable')(state); // ← Still available
  return renderButton_unstable(state);
});
```

### Bundler Configuration

**Webpack:**

```js
module.exports = {
  resolve: { extensions: ['.unstyled.js', '...'] },
};
```

**Vite:**

```js
export default {
  resolve: { extensions: ['.unstyled.js', '...'] },
};
```

**Next.js:**

```js
module.exports = {
  webpack: config => {
    config.resolve.extensions = ['.unstyled.js', ...config.resolve.extensions];
    return config;
  },
};
```

## Implementation

### Option A: Statically Generated Files (Recommended)

Generate `.styles.unstyled.ts` files and check them into the repository.

**Pros:** Simple, visible in codebase, easy to verify
**Cons:** Duplicate files to maintain

**Process:**

1. Scan for `use*Styles.styles.ts` files (including infrastructure components like `FluentProvider`)
2. Generate `use*Styles.styles.unstyled.ts` by:
   - Keeping class name exports (`*ClassNames`)
   - Keeping CSS variable exports (for reference)
   - Removing all `makeStyles`/`makeResetStyles` calls
   - Removing Griffel imports
   - Simplifying hook to only apply base class names

### Option B: Build-Time Transform

Transform imports at build time via bundler plugin.

**Pros:** Single source of truth, automatic
**Cons:** Complex build config, harder to debug

## Usage Examples

### CSS Modules

```css
/* Button.module.css */
:global(.fui-Button) {
  padding: 8px 16px;
  background-color: var(--primary-color);
  color: white;
}
```

### Tailwind CSS

```css
/* Global CSS */
.fui-Button {
  @apply px-4 py-2 bg-blue-500 text-white rounded;
}
```

### Custom Style Hook

```tsx
<FluentProvider
  customStyleHooks_unstable={{
    useButtonStyles_unstable: useCustomButtonStyles,
  }}
>
  <Button>Click me</Button>
</FluentProvider>
```

## Options Considered

### Option A: Unstyled Style Hooks via Extension Resolution (Chosen)

✅ Opt-in, zero breaking changes, follows raw modules pattern, component API unchanged
👎 Requires bundler configuration

### Option B: Separate Package

✅ Clear separation, no bundler config
👎 Another package to maintain, partners must change imports

### Option C: Runtime Flag

✅ No bundler config, can toggle dynamically
👎 Runtime overhead, Griffel still bundled

## Migration

**For standard users:** No changes required.

**For unstyled users:**

1. Configure bundler to resolve `.unstyled.js` extensions
2. Verify base class names (`.fui-*`) are applied
3. Apply custom CSS targeting `.fui-*` classes
4. Optionally use custom style hooks via `FluentProvider`

## Open Questions

1. **Preserve CSS variable exports?**
2. **Use `mergeClasses` in unstyled hooks?**
3. **Handle nested component styles?**
4. **Generate for styling utility hooks?**
5. **Keep unstyled variants in sync?** Automated tests + build-time validation?
6. **Keep `useCustomStyleHook_unstable`?**

## Testing Strategy

- Behavioral tests (excluding style assertions)
- Class name verification (`.fui-*` applied correctly)
- Snapshot tests (structure identical)
- Bundler integration tests (Webpack, Vite, Next.js)
- Accessibility tests (ARIA, keyboard navigation)
- Custom style hook tests

## Implementation Plan

### Phase 1: Proof of Concept

- [ ] Generate unstyled variants for 10 core components
- [ ] Test with Webpack and Vite
- [ ] Verify class names and custom hooks

### Phase 2: Build System

- [ ] Implement generation script
- [ ] Add sync validation
- [ ] Update CI

### Phase 3: Full Rollout

- [ ] Generate for all components (including infrastructure components like `FluentProvider`)
- [ ] Update documentation
- [ ] Add examples

### Phase 4: Maintenance

- [ ] Monitor issues
- [ ] Gather feedback

## References

- [Unprocessed Styles Documentation](https://react.fluentui.dev/?path=/docs/concepts-developer-unprocessed-styles--docs)
