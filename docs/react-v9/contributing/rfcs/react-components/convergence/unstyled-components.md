# RFC: Unstyled Components & Base Hooks

## Contributors

- @dmytrokirpa

## Summary

This RFC proposes a layered component architecture for Fluent UI v9 that introduces:

- Base hooks per component (behavior-only, zero styling opinions)
- Unstyled component variants built on top of the base hooks
- Continued support for the existing styled components and hooks

The approach removes default style implementations when desired and enables per-component choice without requiring bundler configuration.

Key goals:

- Clean separation of behavior/accessibility from visual design
- Per-component mixing: choose styled, unstyled, or base hook as needed
- No extra packages or entrypoints required; exports come from the main component package

Performance and bundle size improvements follow naturally when default styles and Griffel runtime are omitted for chosen components.

## Quick Start

The simplest way to use unstyled components:

```tsx
import { ButtonUnstyled } from '@fluentui/react-components';
import './button.css';

function App() {
  return (
    <ButtonUnstyled className="custom-button" icon={{ className: 'custom-button__icon' }}>
      Click me
    </ButtonUnstyled>
  );
}
```

```css
.custom-button {
  /* custom button styles */
}

.custom-button:hover {
  /* hover styles */
}

.custom-button:disabled {
  /* disabled styles */
}

.custom-button__icon {
  /* custom icon styles */
}
```

That's it! Unstyled components provide Fluent's accessible behavior and structure, but no default styles or base class names. You provide all styling via CSS, CSS Modules, Tailwind, or any other solution using your own class names.

## When to Use What

Understanding when to use each variant:

| Use Case                               | Solution                              | Example                             |
| -------------------------------------- | ------------------------------------- | ----------------------------------- |
| **Default Fluent UI styling**          | Styled component (`Button`)           | Standard Fluent UI apps             |
| **Custom styling, no default styling** | Unstyled component (`ButtonUnstyled`) | Brand-specific design systems       |
| **Completely custom component**        | Base hook (`useButtonBase_unstable`)  | Building your own component library |

**Base hooks** (`useButtonBase_unstable`):

- For building completely custom components from scratch
- Provides only behavior/accessibility, no design opinions
- No default implementations for optional slots (icons, etc.)
- No styles or motion-related logic
- Maximum flexibility, minimum assumptions

**Unstyled components** (`ButtonUnstyled`):

- For using Fluent's component structure with your own styling
- No base class names - you provide your own via `className` prop
- Maintains Fluent's component architecture and behavior

**Styled components** (`Button`):

- For using Fluent's default styling
- Includes all Fluent design tokens and styles
- Standard Fluent UI experience

You can mix all three approaches in the same application as needed.

## Problem Statement

Today, teams that want Fluent UI v9’s behavior and structure without Fluent’s default styles are forced to fight the styling layer or re‑implement components, incurring unnecessary code, runtime cost, and fragility.

Partners want to use Fluent UI v9 components as a foundation with alternative styling (not based off Fluent 2) and with other styling solutions than Griffel but currently must:

1. Recompose every component manually (high maintenance, and still need to pay for what they don't use, eg. default styles)
2. Override styles via `className` props (fragile, specificity issues)
3. Use custom style hooks (still depends on Griffel runtime and default styles)

**Use cases:**

- Complete design system replacement while keeping Fluent behavior/accessibility
- Teams using CSS Modules, Tailwind CSS, vanilla CSS, or their own CSS-in-JS solution
- Bundle size optimization: **~25% JS bundle size reduction** (tested on few components in partners codebases) by removing style implementations
- Supporting diverse styling approaches across teams without forcing Fluent 2 design or our styling approach.

**Scope and non-goals:**

- **In scope:** Fluent UI v9 React components, their styling layer (default styles, Griffel runtime), and new behavior/unstyled variants that can be adopted per component.
- **Out of scope:** Redesigning the theming system, changing the public APIs of existing styled components, or mandating a particular alternative styling solution (CSS Modules, Tailwind, etc.).

**Target audience:**

Organizations with custom design systems that need robust, accessible component behavior without being constrained by default Fluent styles. This includes internal teams at Microsoft, enterprise partners, and open-source projects with specific design requirements.

## Solution

Ship base hooks and unstyled components from the main Fluent UI entrypoints (for example `@fluentui/react-components`, and per-component entrypoints where applicable). No bundler configuration is required. The proposed surface per component:

- Styled component (existing): `Button`
- Styled hook (existing): `useButton_unstable`
- Base hook (new): `useButtonBase_unstable`
- Unstyled component (new): `ButtonUnstyled`

Unstyled components:

- ✅ Include no default styles; teams provide styles via CSS/CSS Modules/Tailwind/etc.
- ✅ Include no base class names; teams provide their own via `className` prop
- ✅ Simple wrappers on top of base hooks that render component structure
- ✅ Maintain consistent component behavior props

Base hooks:

- ✅ Provide only core behavior and accessibility
- ✅ No default implementations for optional slots (icons, decorators, etc.)
- ✅ No styles-related logic (no Griffel, no design tokens)
- ✅ No motion-related logic (no animations, transitions)
- ✅ Teams have full control over visual implementation

### Example

**Base hook** (`useButtonBase_unstable`):

```tsx
import * as React from 'react';
import { type ARIAButtonSlotProps, useARIAButtonProps } from '@fluentui/react-aria';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { ButtonBaseProps, ButtonBaseState } from './Button.types';

export const useButtonBase_unstable = (
  props: ButtonBaseProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): ButtonBaseState => {
  const { as = 'button', disabled = false, disabledFocusable = false, icon, iconPosition = 'before' } = props;

  // NOTE: Base hooks do NOT provide default implementations for optional slots
  // Teams using base hooks must explicitly provide icons and other optional elements
  const iconShorthand = slot.optional(icon, { elementType: 'span' });

  return {
    disabled,
    disabledFocusable,
    iconPosition,
    iconOnly: Boolean(iconShorthand?.children && !props.children),
    root: slot.always<ARIAButtonSlotProps<'a'>>(getIntrinsicElementProps(as, useARIAButtonProps(as, props)), {
      elementType: as,
      defaultProps: {
        ref: ref as React.Ref<HTMLButtonElement & HTMLAnchorElement>,
        type: as === 'button' ? 'button' : undefined,
      },
    }),
    icon: iconShorthand,
    components: { root: as, icon: 'span' },
  };
};
```

**Key principles for base hooks:**

- **No default slot implementations**: Optional slots like icons are only defined if explicitly passed by the consumer
- **No styles logic**: No Griffel imports, no `makeStyles`, no design tokens
- **No motion logic**: No animations, transitions, or motion utilities
- **Pure behavior**: Focus only on accessibility (ARIA), keyboard handling, and semantic structure

**Unstyled component** (`ButtonUnstyled`):

```tsx
import { renderButton_unstable } from './renderButton';
import { useButtonBase_unstable } from './useButtonBase';
import type { ButtonBaseProps, ButtonState } from './Button.types';

export const ButtonUnstyled = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonBaseProps>((props, ref) => {
  const state = useButtonBase_unstable(props, ref);

  // No base class names applied - users provide their own via className prop
  // No default styles, no state-based classes

  return renderButton_unstable(state as ButtonState);
});
```

**Note:** `ButtonUnstyled` uses `ButtonBaseProps` (behavior props only, no design props like `appearance`, `size`, `shape`). This keeps unstyled components truly minimal. Teams can use `className` prop to apply styling based on their own logic.

**Styled component unchanged:**

```tsx
import { useButton_unstable } from './useButton';
import { useButtonStyles_unstable } from './useButtonStyles.styles';

export const Button = React.forwardRef((props, ref) => {
  const state = useButton_unstable(props, ref);
  useButtonStyles_unstable(state);
  return renderButton_unstable(state);
});
```

### Export Surface & Naming Conventions

We standardize naming to ensure clarity:

- Base hooks: `use${ComponentName}Base_unstable`
- Unstyled components: `${ComponentName}Unstyled`
- Styled hooks: `use${ComponentName}_unstable` (existing)
- Styled components: `${ComponentName}` (existing)

```tsx
import { Button, ButtonUnstyled, useButton_unstable, useButtonBase_unstable } from '@fluentui/react-components';
```

## Type Definitions

Understanding the type relationships is crucial for implementation:

```tsx
// Base types (behavior only, no design props)
export type ButtonBaseProps = ComponentProps<ButtonSlots> & {
  disabled?: boolean;
  disabledFocusable?: boolean;
  iconPosition?: 'before' | 'after';
  // NO design props (appearance, size, shape)
};

export type ButtonBaseState = ComponentState<ButtonSlots> & {
  disabled: boolean;
  disabledFocusable: boolean;
  iconPosition: 'before' | 'after';
  iconOnly: boolean;
  // NO design state
};

// Full types (includes design props)
export type ButtonProps = ButtonBaseProps & {
  appearance?: 'primary' | 'secondary' | 'outline' | 'subtle' | 'transparent';
  size?: 'small' | 'medium' | 'large';
  shape?: 'rounded' | 'circular' | 'square';
};

export type ButtonState = ButtonBaseState & {
  appearance: 'primary' | 'secondary' | 'outline' | 'subtle' | 'transparent';
  size: 'small' | 'medium' | 'large';
  shape: 'rounded' | 'circular' | 'square';
};
```

**Key points:**

- `ButtonBaseProps` / `ButtonBaseState`: Behavior only, used by base hooks and unstyled components
- `ButtonProps` / `ButtonState`: Includes design props, used by styled components
- Base hooks accept and return base types only
- Unstyled components accept base props only (keeps them minimal)

## Implementation

### Implementation Overview

For each component package:

1. Introduce a base hook that encapsulates behavior/accessibility only (no design props)
2. Implement an unstyled component that wraps the base hook and renders (no default styles, no base class names, no state-based classes)
3. Keep the existing styled hook and styled component unchanged
4. Export all four symbols from the main package entry

### Implementation Checklist

For each component:

- [ ] **Create base types**

  - [ ] Create `{Component}BaseProps` type (behavior props only, no design props)
  - [ ] Create `{Component}BaseState` type (behavior state only)

- [ ] **Create base hook**

  - [ ] Create `use{Component}Base_unstable` hook
  - [ ] Uses `{Component}BaseProps` and returns `{Component}BaseState`
  - [ ] No design props (appearance, size, shape, etc.)
  - [ ] Handles accessibility via appropriate ARIA hooks (e.g., `useARIAButtonProps`)
  - [ ] Returns slots with proper structure
  - [ ] No styling, no Griffel, no tokens
  - [ ] No default implementations for optional slots (icons, decorators, etc.)
  - [ ] No motion logic (animations, transitions)
  - [ ] Pure behavior and accessibility only

- [ ] **Create unstyled component**

  - [ ] Uses `{Component}BaseProps` (not full `{Component}Props`)
  - [ ] Calls `use{Component}Base_unstable`
  - [ ] Does NOT apply base class names - users provide via `className` prop
  - [ ] Uses existing `render{Component}_unstable` function
  - [ ] No default styles, no base class names, no state-based classes

- [ ] **Export and test**
  - [ ] Export from main package entry point
  - [ ] Add tests for base hook (accessibility, behavior)
  - [ ] Add tests for unstyled component (rendering, behavior)
  - [ ] Verify no Griffel styles are included
  - [ ] Verify bundle size reduction

## Developer Workflow

Unstyled components provide flexibility for styling. Teams can choose their preferred styling approach based on their needs:

### CSS Organization

Unstyled components do not apply any class names by default. You provide your own via the `className` prop. Use any styling approach:

- **Pure CSS** - Simple and zero dependencies
- **CSS Modules** - Component-scoped styling
- **Tailwind CSS** - Utility-first approach
- **Griffel** - CSS-in-JS with runtime processing
- **Any other CSS solution** - Complete flexibility

**Note:** Teams can define their own wrapper components that accept appearance/size/other design props and map those to `className` when calling `ButtonUnstyled`.

### Third-party Package Compatibility

With the layered approach, third-party packages remain styled unless they opt into the unstyled component/base hook. Consumers have two options:

1. Use the styled components from dependencies as-is
2. Where control is possible, switch imports to unstyled variants provided by Fluent packages

## Usage Examples

### Pure CSS

```css
/* Button.css */
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Use className-based targeting */
.btn-primary {
  background-color: var(--colorPrimaryBackground);
  color: var(--colorPrimaryForeground);
}

.btn-large {
  padding: 12px 24px;
  font-size: 16px;
}
```

```tsx
// App.tsx
import { ButtonUnstyled } from '@fluentui/react-components';
import './button.css';

function App() {
  return <ButtonUnstyled className="btn btn-primary btn-large">Click me</ButtonUnstyled>;
}
```

### CSS Modules

```css
/* Button.module.css */
.button {
  display: flex;
  align-items: center;
  justify-content: center;
}

.primary {
  background-color: var(--colorPrimaryBackground);
  color: var(--colorPrimaryForeground);
}
```

```tsx
// App.tsx
import { ButtonUnstyled } from '@fluentui/react-components';
import styles from './Button.module.css';

function App() {
  return <ButtonUnstyled className={`${styles.button} ${styles.primary}`}>Click me</ButtonUnstyled>;
}
```

### Tailwind CSS

```tsx
// Use className prop to apply Tailwind classes directly
import { ButtonUnstyled } from '@fluentui/react-components';

function App() {
  const appearance = 'primary'; // or from props/state
  return (
    <ButtonUnstyled
      className={
        appearance === 'primary'
          ? 'flex items-center justify-center bg-blue-600 text-white'
          : 'flex items-center justify-center'
      }
    >
      Click me
    </ButtonUnstyled>
  );
}
```

### Griffel (CSS-in-JS)

You can use Griffel with unstyled components by applying styles via `className`:

```tsx
import { makeStyles, mergeClasses } from '@griffel/react';
import { ButtonUnstyled } from '@fluentui/react-components';

const useButtonClasses = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  primary: {
    backgroundColor: 'blue',
    color: 'white',
  },
});

function App() {
  const classes = useButtonClasses();

  return <ButtonUnstyled className={mergeClasses(classes.root, classes.primary)}>Click me</ButtonUnstyled>;
}
```

**Note:** Custom style hooks (`customStyleHooks_unstable`) work with styled components (`Button`), not unstyled components (`ButtonUnstyled`). For unstyled components, apply styles directly via the `className` prop.

## Options Considered

- Layered architecture with base hooks + unstyled components (Chosen)
  - Pros: No bundler requirement; per-component mixing; clear naming; minimal maintenance
  - Cons: Third-party packages remain styled unless switched
- Bundler-based global flip via extension resolution (discarded)
  - Pros: Global flip across dependencies; no import migration
  - Cons: Requires toolchain config; no per-component mixing

## Migration

**For standard users:** No changes required. Continue using styled components as before.

**For unstyled/headless users:**

### Migration Examples

#### Before (Styled Component)

```tsx
import { Button } from '@fluentui/react-components';

function App() {
  return (
    <Button appearance="primary" size="large">
      Click me
    </Button>
  );
}
```

#### After (Unstyled with CSS)

```tsx
import { ButtonUnstyled } from '@fluentui/react-components';
import './button.css';

function App() {
  return <ButtonUnstyled className="button-primary button-large">Click me</ButtonUnstyled>;
}
```

### Migration Steps

1. **Import unstyled components** from the main Fluent UI entrypoint (for example, `import { ButtonUnstyled } from '@fluentui/react-components'`)
2. **Or import base hooks** to build bespoke components (e.g., `useButtonBase_unstable`)
3. **Choose a styling approach** (CSS, CSS Modules, Tailwind, Griffel, etc.)
4. **Apply custom CSS/styles** via `className` prop with your own class names
5. **Use `className` prop** to apply conditional styling (note: unstyled components don't accept design props)
6. **Use `ThemelessFluentProvider`** instead of `FluentProvider` (optional, for smaller bundle) if you're not using Fluent UI tokens or Griffel

## Design API Rationale

**Q: Why don't unstyled components accept design-related props like `appearance` and `size`?**

A: Unstyled components use `ButtonBaseProps` which excludes design props. This keeps them truly minimal and forces teams to explicitly handle styling.

**Why this approach?**

- **Clear separation:** Base hooks and unstyled components focus purely on behavior/semantic structure and slots
- **Explicit styling:** Teams must consciously apply styling, making it clear where styles come from
- **No hidden defaults:** Base hooks don't include default implementations for optional slots (icons, etc.) or motion logic
- **Flexibility:** Teams can use any prop naming or structure for their design system
- **Simplicity:** No need to maintain design prop logic, motion logic, or default slot implementations in base hooks/unstyled components

**How to handle design variants?**

Use `className` prop with your own logic:

```tsx
<ButtonUnstyled className={`btn-${variant}`}>Click me</ButtonUnstyled>
```

For comparison, truly "headless" libraries like react-aria or Base UI ship components without design opinions from the API itself; Fluent UI's base hooks provide behavior only (no default slot implementations, no styles, no motion), while unstyled components are simple wrappers that render the component structure.

## Bundle Size & CSS Measurements

Internal testing shows **~25% JavaScript bundle size reduction** for `Button` and `Divider` components by removing Griffel runtime and default style implementations when using unstyled variants.

### Measurement Methodology

- **Tool:** Webpack bundle analyzer
- **Included:** Component code, dependencies, Griffel runtime (for styled), style implementations
- **Excluded:** Application code, other dependencies
- **Comparison:** Same component functionality, different styling approaches

### Results

**Griffel + AOT + CSS extraction (current default):**

- JavaScript: 82.432 kB (includes Griffel runtime + style logic)
- CSS: 13 kB (extracted styles)
- Total: ~95.4 kB

**Unstyled + custom CSS:**

- JavaScript: 25.161 kB (no Griffel runtime, no style logic)
- CSS: 2.52 kB (minimal base styles if any)
- Total: ~27.6 kB
- **Reduction: ~71% total bundle size**

In isolated component-level benchmarks we see ~71% total bundle reduction; in real-world partner applications that adopt unstyled variants for selected components, we typically see more modest JS savings around ~25% due to other application code and dependencies.

**When to expect these savings:**

- Using `ButtonUnstyled` instead of `Button`
- Using `ThemelessFluentProvider` instead of `FluentProvider` (additional savings)
- Not importing Griffel or default style hooks
- Providing your own CSS instead of Fluent's default styles

**Note:** Actual savings vary by component complexity and your custom CSS size. Measurements are for Button and Divider components; other components may show different results.

## Slot Structure Stability & API Guarantees

Component slot structures are considered **public API** and follow semantic versioning:

- **Patch versions:** No slot structure changes
- **Minor versions:** May add new slots, but existing slots remain stable
- **Major versions:** May rename or remove slots

This stability guarantee enables teams to safely build styling systems on top of Fluent's component structure. If a component's slot structure must change, it will be communicated as a breaking change with migration guidance.

**Slot structure changes:** If a component's slot structure changes (new slots added, slots renamed), the unstyled component will be updated to reflect the new structure.

## Validation & Testing

- **Slot structure parity:** Verify that unstyled components have the same slot structure as their styled counterparts
- **Bundle analysis:** Ensure no Griffel CSS or default style code is emitted when using unstyled components

## Resolved Questions

During the pilot phase with Button and partner validation, we confirmed:

1. **Unstyled components provide significant value over base hooks alone:**

   - Eliminate boilerplate for common use case (rendering component structure)
   - Provide consistent component structure across the library
   - Lower barrier to entry than using base hooks directly
   - Partner feedback: "Much easier than building from base hooks"

2. **Collocating unstyled components with styled components is the right approach:**
   - No separate package to maintain or version
   - Per-component opt-in without bundler configuration
   - Clearer imports: same package, different variant
   - Simpler mental model for developers

## Breaking Changes

**For standard Fluent UI v9 users:** No breaking changes. Unstyled mode is entirely opt-in. The public API remains unchanged, and existing code continues to work exactly as before.

**For teams adopting unstyled/base hook variants:** This is not considered a breaking change, since teams explicitly opt in to unstyled/base hook usage and can always switch back by using the regular styled components instead, or by replacing custom components built on top of base hooks with the default Fluent UI components.

However, teams adopting unstyled mode should understand the required changes:

- **Must provide complete styling:** Unstyled components have no default styles or class names; your app is responsible for all styling
- **Provider choice:** Use `ThemelessFluentProvider` to avoid bundling unused Fluent tokens (optional but recommended for smaller bundles). Use `FluentProvider` if you need design tokens or Griffel overrides
- **Third-party dependencies:** Dependencies using `@fluentui/react-components` remain styled.
- **Per-component mixing supported:** Choose styled, unstyled, or base hook per component without bundler config

## Testing Strategy

### Testing Checklist

- [ ] Custom `className` preserved
- [ ] Behavior/accessibility works (keyboard, focus, etc.)
- [ ] Slot structure correct
- [ ] Base hook returns correct state structure
- [ ] No Griffel or style-related imports in base hook
- [ ] No default implementations for optional slots in base hook
- [ ] No motion logic in base hook

## Implementation Plan

### Phase 1: Pilot

- [x] Implement `useButtonBase_unstable` and `ButtonUnstyled`
- [x] Verify class names and custom hooks
- [x] Validate the approach with partner team(s)

### Phase 2: Rollout

- [ ] Document type patterns (ButtonBaseProps, ButtonBaseState)
- [ ] Create codegen templates for base hooks
- [ ] Create codegen templates for unstyled components
- [ ] Add ESLint rules to ensure base hooks don't use design props
- [ ] Add ESLint rules to ensure base hooks don't include default slot implementations
- [ ] Add ESLint rules to ensure base hooks don't include motion logic
- [ ] Add tests to ensure unstyled components don't include Griffel
- [ ] Apply pattern to additional components (Divider, Menu, Tabs, etc.)
- [ ] Update Storybook with unstyled component examples
- [ ] Create migration guide with before/after examples
- [ ] Update documentation and examples
- [ ] Evaluate codemods for automated migration (nice-to-have)
- [ ] Add ESLint rules to help identify migration opportunities (nice-to-have)

### Phase 3: Maintenance

- [ ] Monitor adoption and feedback

## FAQ

**Q: Will this break my existing Fluent UI v9 components?**

A: No. Unstyled mode is opt-in. If you do not change your bundler configuration, you will continue to get the default Fluent styles. No public APIs change.

**Q: Can I use my own CSS, Tailwind, or CSS-in-JS solution?**

A: Yes! Unstyled mode is designed to let you provide your own styling using any method you prefer (pure CSS, CSS Modules, Tailwind CSS, Griffel, or any other solution). You provide your own class names via the `className` prop.

**Q: Should I use `FluentProvider` or `ThemelessFluentProvider`?**

A:

- **Use `ThemelessFluentProvider`** if you're providing all styling with your own CSS/design system and don't need Fluent's theme tokens. This results in a smaller bundle by excluding Fluent's design token system.
- **Use `FluentProvider`** if you want to access Fluent's design tokens (as CSS variables) in your custom styles, or if you're mixing styled and unstyled components.

**What's the difference?**

- `FluentProvider`: Includes Fluent's complete theme system (colors, spacing, typography tokens)
- `ThemelessFluentProvider`: Minimal provider without theme tokens (smaller bundle)

Both providers support the same component behavior and functionality.

**Q: How do I discover what slots are available for styling?**

A: Each component has documented slots:

**Common patterns:**

- Button: `root`, `icon`
- Menu: `root`, item slots, icon slots
- Dialog: `root`, `surface`, `title`, `content`

**Discovery methods:**

1. Check component documentation for slot information
2. Review TypeScript types (e.g., `ButtonSlots`) in the component package
3. Refer to the styled component's structure as a guide

All slots in unstyled components have the same structure as their styled counterparts.

**Q: How do I switch back to default styles?**

A: Simply switch to the regular component import instead of unstyled one (eg. `import { Button } from '@fluentui/react-components'` instead of `import { ButtonUnstyled } from '@fluentui/react-components'`)

**Q: What if a new slot is added to a component?**

A: The unstyled variant will be updated to reflect the new slot structure. Tooling or automation may be provided to help keep these in sync. Slot structures follow semantic versioning (see [Slot Structure Stability](#slot-structure-stability--api-guarantees)).

**Q: Is there any runtime cost if I use unstyled mode?**

A: No. If you opt in to unstyled mode, no style engine or default style code is included in your bundle unless you explicitly add it.

**Q: Are design-related props like `appearance` and `size` still available?**

A: No. Unstyled components use `ButtonBaseProps` which excludes design props. This keeps them minimal and forces explicit styling. Use `className` prop to apply styling based on your own logic. See [Design API Rationale](#design-api-rationale) for details.

**Q: What's the difference between base hooks and unstyled components?**

A:

- **Base hooks** (`useButtonBase_unstable`): Provide behavior/accessibility and define the semantic slot structure, but do not apply visual styles, class names, default slot implementations (icons, etc.), or motion logic. Use when building completely custom components.
- **Unstyled components** (`ButtonUnstyled`): Wrappers over base hooks that render the component structure. Use when you want Fluent's structure with your own styling.

**Q: Can I mix styled and unstyled components in the same app?**

A: Yes! You can use `Button`, `ButtonUnstyled`, and `useButtonBase_unstable` all in the same application. Choose the right tool for each use case.

**Q: Do unstyled components work with Fluent's theming system?**

A: Unstyled components don't use Fluent's default styles, but you can still access design tokens via `FluentProvider` (CSS variables) or via token exports from `@fluentui/react-components`. Use `ThemelessFluentProvider` if you don't need Fluent theme tokens and are providing all styling yourself (smaller bundle).

**Q: How do I handle responsive design with unstyled components?**

A: Use standard CSS media queries targeting the base class names (`.fui-Button`), or use responsive utilities from your CSS framework (Tailwind, etc.).

**Q: How do I ensure I haven't broken accessibility with custom styles?**

A: Follow these practices:

1. **Preserve focus indicators:** Always style `:focus` and `:focus-visible` states
2. **Maintain sufficient contrast:** Use contrast checkers for text and interactive elements (WCAG AA: 4.5:1 minimum)
3. **Test with screen readers:** Behavior is preserved, but ensure styles don't interfere (e.g., `display: none` hides from screen readers)
4. **Test keyboard navigation:** Ensure all interactive elements are keyboard accessible
5. **High contrast mode:** Test in Windows High Contrast Mode or use `prefers-contrast` media query
6. **Use browser DevTools:** Lighthouse accessibility audits can catch common issues

The unstyled components preserve all ARIA attributes, keyboard handling, and semantic structure. Your responsibility is to ensure custom styles don't interfere with accessibility (e.g., hiding focus indicators, insufficient contrast).

**Q: How do I migrate a large codebase to unstyled components?**

A: Use an incremental migration strategy:

1. **Start with new features:** Use unstyled components for new development while keeping existing code unchanged
2. **Migrate by feature area:** Convert one feature/page at a time rather than all at once
3. **Create a design system layer:** Build wrapper components that use unstyled components with your design system props
4. **Use search/replace carefully:** Find all imports of specific components (e.g., `import { Button }`) and evaluate each usage
5. **Test thoroughly:** Ensure behavior and accessibility remain intact after migration
6. **Monitor bundle size:** Track bundle size improvements as you migrate components

**Example incremental approach:**

```tsx
// Step 1: Create design system wrapper
export const DSButton = ({ variant, ...props }) => (
  <ButtonUnstyled className={`ds-button ds-button--${variant}`} {...props} />
);

// Step 2: Migrate imports gradually
// Old: import { Button } from '@fluentui/react-components';
// New: import { DSButton as Button } from '@/design-system';

// Step 3: Update implementation over time
```

This allows you to migrate at your own pace while maintaining a working application throughout the process.

**Q: Is unstyled mode a replacement for Fluent UI?**

A: No. Unstyled mode is a complementary solution that expands Fluent UI's reach by supporting additional use cases. It allows teams to build custom design systems on top of Fluent UI's robust behavior, accessibility, and component architecture, while providing complete control over visual design. This makes Fluent UI a better foundation for organizations with unique design requirements.

## Component Comparison

| Feature                      | Styled Component  | Unstyled Component               | Base Hook         |
| ---------------------------- | ----------------- | -------------------------------- | ----------------- |
| Default styles               | ✅ Yes            | ❌ No                            | ❌ No             |
| Base class names             | ✅ Yes            | ❌ No                            | ❌ No             |
| Design props                 | ✅ Yes            | ❌ No (uses ButtonBaseProps)     | ❌ No             |
| Default slot implementations | ✅ Yes            | ❌ No                            | ❌ No             |
| Motion logic                 | ✅ Yes            | ❌ No                            | ❌ No             |
| Behavior/Accessibility       | ✅ Yes            | ✅ Yes                           | ✅ Yes            |
| Bundle size                  | Larger            | Smaller                          | Smallest          |
| Use case                     | Default Fluent UI | Custom styling, Fluent structure | Completely custom |

## Architecture Diagram

```text
┌─────────────────────────────────────────┐
│         ButtonProps (Full API)          │
│    (includes design props)              │
└─────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
┌───────▼────────┐    ┌─────────▼─────────┐
│  Button        │    │  ButtonUnstyled   │
│  (Styled)      │    │  (Unstyled)       │
│                │    │  ButtonBaseProps  │
└───────┬────────┘    └─────────┬─────────┘
        │                       │
        │              ┌────────▼─────────┐
        │              │ useButtonBase    │
        │              │ _unstable        │
        │              │ ButtonBaseProps  │
        │              └──────────────────┘
        │
┌───────▼────────┐
│ useButton_     │
│ unstable       │
│ (adds design)  │
└───────┬────────┘
        │
┌───────▼────────┐
│ useButtonStyles│
│ _unstable      │
│ (Griffel)      │
└────────────────┘
```

## Real-World Use Cases

### Use Case 1: Brand-Specific Design System

A company wants to use Fluent's accessible button behavior but with their brand colors and styling.

**Solution:** Use `ButtonUnstyled` with custom CSS via `className` prop.

```tsx
import { ButtonUnstyled } from '@fluentui/react-components';
import './brand-button.css'; // Your brand styles

<ButtonUnstyled className="brand-button brand-primary">Click me</ButtonUnstyled>;
```

### Use Case 2: Tailwind-First Team

A team using Tailwind CSS wants Fluent's behavior without Fluent's styles.

**Solution:** Use `ButtonUnstyled` and apply Tailwind classes via `className`.

```tsx
import { ButtonUnstyled } from '@fluentui/react-components';

<ButtonUnstyled className="flex items-center justify-center bg-blue-600 text-white px-4 py-2">Click me</ButtonUnstyled>;
```

### Use Case 3: Custom Component Library

A team wants to build their own component library on top of Fluent's behavior.

**Solution:** Use `useButtonBase_unstable` to build completely custom components.

```tsx
import * as React from 'react';
import { useButtonBase_unstable, renderButton_unstable } from '@fluentui/react-components';
import type { ButtonBaseProps } from '@fluentui/react-components';

type CustomButtonProps = ButtonBaseProps & {
  appearance?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'link';
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'huge';
};

const MyCustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ appearance = 'primary', size = 'medium', ...props }, ref) => {
    // Used as a headless hook to build a custom component
    const state = useButtonBase_unstable(props, ref);

    state.root.className = ['btn', `btn-${appearance}`, `btn-${size}`, state.root.className].join(' ');

    if (state.components.root === 'a') {
      return <a {...state.root}>{state.root.children}</a>;
    }

    return <button {...state.root}>{state.root.children}</button>;
  },
);
```

## Troubleshooting

### My unstyled component doesn't have any styling

- Unstyled components do not apply any class names by default
- You must provide your own class names via the `className` prop
- Ensure you've defined CSS for the classes you're applying

### Can I use design props with unstyled components?

- Currently, `ButtonUnstyled` uses `ButtonBaseProps` which doesn't include design props
- Use `className` prop to apply styles based on your own logic

### How do I style based on component state?

- Use `className` prop with conditional logic
- Use CSS attribute selectors if you add data attributes
- Note: Unstyled components don't have design state, only behavior state

## References

- [Mantine UI Unstyled components](https://mantine.dev/styles/unstyled/)
