# RFC: Headless Components

## Contributors

- @dmytrokirpa

## Summary

This RFC proposes **headless style hook variants** that remove all default style implementations from Fluent UI v9 components, while preserving static class names (`.fui-[Component]`).

**Headless mode is opt-in and does not affect existing users.** By default, nothing changes for existing consumers. Teams with custom design requirements can opt in to headless mode.

**The main goal is to provide true flexibility for teams with custom design requirements:**

- You are no longer forced to override or fight default styles—simply provide your own styling from scratch.
- You only pay for what you use: if you don't need the default Fluent styles, they are not included in your bundle at all.
- This approach enables a clean separation of behavior/accessibility from visual design, making Fluent UI a better foundation for custom design systems.

**Performance and bundle size improvements are a natural result:**

- By omitting default styles and their dependencies (like Griffel and tokens), bundle size is reduced (internal testing shows ~25% JS bundle size reduction for Button and Divider components we used for testing with our partners).
- No runtime style engine is included unless you opt in.

Headless variants are opt-in via bundler extension resolution (similar to [raw modules](https://storybooks.fluentui.dev/react/?path=/docs/concepts-developer-unprocessed-styles--docs#how-to-use-raw-modules)), ensuring zero breaking changes.

## Problem Statement

Partners want to use Fluent UI v9 components as a foundation with alternative styling (not based off Fluent 2) and with other styling solutions than Griffel but currently must:

1. Recompose every component manually (high maintenance)
2. Override styles via `className` props (fragile, specificity issues)
3. Use custom style hooks (still depends on Griffel runtime and default styles)

**Use cases:**

- Complete design system replacement while keeping Fluent behavior/accessibility
- Teams using CSS Modules, Tailwind CSS, or vanilla CSS
- Bundle size optimization: **~25% JS bundle size reduction** (tested on Button/Divider components) by removing style implementations

## Solution

Ship headless style hook variants with `.styles.headless.ts` extension, resolved via bundler configuration. The headless variant:

- ✅ Removes all styles implementations `makeStyles`/`makeResetStyles` calls
- ✅ Preserves base class names (`.fui-Button`, `.fui-Button__icon`, etc.)
- ✅ Maintains identical hook signature
- ✅ Component files unchanged (still supports `useCustomStyleHook_unstable`)

### Example

**Standard style hook** (`useButtonStyles.styles.ts`):

```tsx
import { makeStyles, mergeClasses } from '@griffel/react';

export const buttonClassNames = { root: 'fui-Button', icon: 'fui-Button__icon' };

const useStyles = makeStyles({
  root: {
    /* extensive styles */
  },
  icon: {
    /* icon styles */
  },
});

export const useButtonStyles_unstable = (state: ButtonState) => {
  const styles = useStyles();

  state.root.className = mergeClasses(buttonClassNames.root, styles.root, state.root.className);

  if (state.icon) {
    state.icon.className = mergeClasses(buttonClassNames.icon, state.icon.className);
  }

  return state;
};
```

**Headless style hook** (`useButtonStyles.styles.headless.ts`):

```tsx
import { getComponentSlotClassName } from '@fluentui/react-utilities'; // ← applies base className + state-based classes + user className

// About getComponentSlotClassName:
// This utility dynamically generates class names for component slots based on the component’s state, following a standardized convention.
// - For each state property, it generates a class like `.fui[Component]--[stateName]-[stateValue]` (e.g., `fuiButton--appearance-primary`).
// - For boolean state values, it generates `.fui[Component]--[stateName]` if the value is truthy.
// - Example: If a Button has state `{ appearance: "primary", size: "small" }`, the generated classes are:
//   `fuiButton--appearance-primary fuiButton--size-small`
// This makes it easier to target component states in custom CSS and reduces manual maintenance.
// See implementation details: https://github.com/microsoft/fluentui/pull/35548

export const buttonClassNames = { root: 'fui-Button', icon: 'fui-Button__icon' };

export const useButtonStyles_unstable = (state: ButtonState) => {
  // Applies class names (no styles):
  // - component slot classname e.g. `fui-Button`
  // - classes based on the component state `fui-Button-appearance-primary fui-Button--size-small etc`
  // - user provided class name
  state.root.className = getComponentSlotClassName(buttonClassNames.root, state.root, state);

  if (state.icon) {
    // Applies base class name and user provided classnames (no styles):
    state.icon.className = getComponentSlotClassName(buttonClassNames.icon, state.icon);
  }

  return state;
};
```

**Component unchanged:**

```tsx
import { useButtonStyles_unstable } from './useButtonStyles.styles'; // ← Resolves to .headless.ts when configured

export const Button = React.forwardRef((props, ref) => {
  const state = useButton_unstable(props, ref);
  useButtonStyles_unstable(state); // ← Uses headless variant when configured
  useCustomStyleHook_unstable('useButtonStyles_unstable')(state); // ← Still available
  return renderButton_unstable(state);
});
```

### Bundler Configuration

**Webpack:**

```js
module.exports = {
  resolve: { extensions: ['.headless.js', '...'] },
};
```

**Vite:**

```js
export default {
  resolve: { extensions: ['.headless.js', '...'] },
};
```

**Next.js:**

```js
module.exports = {
  webpack: config => {
    config.resolve.extensions = ['.headless.js', ...config.resolve.extensions];
    return config;
  },
};
```

## Implementation

### Option A: Statically Generated Files (Recommended)

Generate `.styles.headless.ts` files and check them into the repository.

**Pros:** Simple, visible in codebase, easy to verify
**Cons:** Duplicate files to maintain

**Process:**

1. Scan for `use[Component]Styles.styles.ts` files
2. Generate `use[Component]Styles.styles.headless.ts` by:
   - Keeping class name exports (`*ClassNames`)
   - Keeping CSS variable exports (for to keep backward compatibility)
   - Removing all `makeStyles`/`makeResetStyles` calls
   - Removing Griffel imports
   - Simplifying hook to only apply base class names and class names based on component state

### Option B: Build-Time Transform

Transform imports at build time via bundler plugin.

**Pros:** Single source of truth, automatic
**Cons:** Complex build config, harder to debug

## Usage Examples

### CSS

```css
/* Button.css */
.fui-Button {
  display: flex;
  align-items: center;
  justify-content: center;
}

.fui-Button--appearance-primary {
  background-color: var(--colorPrimaryBackground);
  color: var(--colorPrimaryForeground);
}
```

### Tailwind CSS

```css
/* Global CSS */
.fui-Button {
  @apply flex items-center justify-center;
}

.fui-Button--appearance-primary {
  @apply bg-primary-background text-primary-foreground;
}
```

### Griffel (CSS-in-JS)

```tsx
import { makeStyles } from '@griffel/react';

const useButtonClasses = makeStaticStyles({
  'root': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    ['&.fui-Button--appearance-primary']: {
      backgroundColor: tokens.colorPrimaryBackground,
      color: tokens.colorPrimaryForeground;
    }
  },
});


function useButtonStyles_unstable(state: ButtonState) {
  const classes = useButtonClasses();

  state.root.className = mergeClasses(
    state.root.className,
    classes.root,
    getSlotClassNameProp(slot.root)
  );
}

<FluentProvider
  customStyleHooks_unstable={{
    useButtonStyles_unstable: useCustomButtonStyles,
  }}
>
  <Button>Click me</Button>
</FluentProvider>;
}
```

## Options Considered

### Option A: Headless Style Hooks via Extension Resolution (Chosen)

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

**For headless users:**

1. Configure bundler to resolve `.headless.js` extensions
2. Verify base class names (`.fui-*`) are applied
3. Apply custom CSS targeting `.fui-*` classes
4. Optionally use custom style hooks via `FluentProvider`

## Open Questions

1. **Preserve CSS variable exports?**
2. **Use `mergeClasses` in headless hooks?** - Use new `getComponentSlotClassName` utility
3. **Keep headless variants in sync?** - We won't be mapping state classes by hand, we'll use util for that.
   The only case is not covered when new slots were added.
4. **Keep `useCustomStyleHook_unstable`?** - Decided to keep it for now

## Testing Strategy

- Custom style hook tests
- Class name verification (`.fui-*` applied correctly)

## Implementation Plan

### Phase 1: Proof of Concept

- [x] Generate headless style hooks for 2 core components (Button, Divider)
- [x] Verify class names and custom hooks
- [x] Validate the approach with partner team(s) and gather feedback.

### Phase 2: Gradual Rollout

- [ ] Generate headless style hooks for more components (probably Popover, Menu, Toolbar, Tabs, etc.)
- [ ] Update documentation
- [ ] Add examples

### Phase 3: Maintenance

- [ ] Monitor issues
- [ ] Gather feedback

## FAQ

**Q: Will this break my existing Fluent UI v9 components?**

A: No. Headless mode is opt-in. If you do not change your bundler configuration, you will continue to get the default Fluent styles.

**Q: Can I use my own CSS, Tailwind, or CSS-in-JS solution?**

A: Yes! Headless mode is designed to let you provide your own styling using any method you prefer.

**Q: How do I switch back to default styles?**

A: Simply remove the headless extension from your bundler configuration and the default styles will be restored.

**Q: What if a new slot is added to a component?**

A: The headless variant will need to be updated to ensure all slots receive the correct class names. Tooling or automation may be provided to help keep these in sync.

**Q: Is there any runtime cost if I use headless mode?**

A: No. If you opt in to headless mode, no style engine or default style code is included in your bundle unless you explicitly add it.

**Q: Is headless mode a replacement for Fluent UI?**

A: No. Headless mode is a complementary solution that expands Fluent UI's reach by supporting additional use cases. It allows teams to build custom design systems on top of Fluent UI's robust behavior, accessibility, and component architecture, while providing complete control over visual design. This makes Fluent UI a better foundation for organizations with unique design requirements.

## References

- [Unprocessed Styles Documentation](https://react.fluentui.dev/?path=/docs/concepts-developer-unprocessed-styles--docs)
