# V9 Component Patterns

## File Structure

Every v9 component package follows this exact layout:

```
packages/react-components/react-<name>/library/src/
├── components/<Name>/
│   ├── <Name>.tsx                        # ForwardRefComponent
│   ├── <Name>.types.ts                   # Props, State, Slots types
│   ├── <Name>.test.tsx                   # Unit tests (adjacent)
│   ├── use<Name>.ts or .tsx              # State management hook
│   ├── <Name>.module.css                 # Tailwind-flavored CSS Module (authored styles)
│   ├── use<Name>Styles.styles.ts         # Class-name composition (clsx) + identity class
│   ├── render<Name>.tsx                  # JSX rendering
│   └── index.ts                          # Component barrel export
├── contexts/                             # Optional: context definitions
├── utils/                                # Optional: shared utilities
├── testing/
│   └── isConformant.ts                   # Conformance tests
├── stories/src/<Name>/
│   ├── <Name>Accessibility.md            # Optional: concise accessibility guidance
│   └── <Name>AccessibilitySpec.mdx       # Optional: full component accessibility spec
├── <Name>.ts                             # Root barrel per component
└── index.ts                              # Package export
```

## Hook-Based Architecture

Components use three core hooks:

1. **`use<Name>(props, ref)`** — Processes props and slots into normalized state.
   Use `.ts` if pure logic, `.tsx` if the hook body contains JSX.

2. **`use<Name>Styles(state)`** — Composes the component's CSS-Module class names onto the state
   and **returns the new state**; it must not mutate its argument. Always ends in `.styles.ts`.

3. **`render<Name>(state)`** — Pure JSX rendering from state.
   Always `.tsx`.

### Where to Fix Bugs

| Bug type                           | Fix location                |
| ---------------------------------- | --------------------------- |
| State / behavior                   | `use<Name>.ts`              |
| Styling (rules)                    | `<Name>.module.css`         |
| Styling (which class applies when) | `use<Name>Styles.styles.ts` |
| Rendering / JSX                    | `render<Name>.tsx`          |
| Types / props                      | `<Name>.types.ts`           |

## Slot System

All v9 components use slots for extensibility:

```tsx
// Types
type ButtonSlots = {
  root: Slot<'button'>;
  icon?: Slot<'span'>;
};

// Hook — create slots
const state: ButtonState = {
  root: slot.always(props.root, { elementType: 'button' }),
  icon: slot.optional(props.icon, { elementType: 'span' }),
};

// Render — use assertSlots for type safety
export const renderButton_unstable = (state: ButtonState) => {
  assertSlots<ButtonSlots>(state);
  return (
    <state.root>
      {state.icon && <state.icon />}
      {state.root.children}
    </state.root>
  );
};
```

## Styling — Tailwind-flavored CSS Modules

Styles are authored in a `*.module.css` co-located with the component and compiled at build time
into the package's `dist/styles.css`. There is no runtime style engine.

Every module opens the same way — a reference to the shared theme, then the cascade layer order:

```css
/* Button.module.css */
@reference '#theme';

@layer fui.theme, fui.base, fui.components, fui.components.l1, fui.components.l2, fui.components.l3, fui.components.l4, fui.components.l5, fui.utilities;

@layer fui.components.l1 {
  .root {
    @apply flex items-center;

    /* Tokens are CSS custom properties — never hardcode values. */
    color: var(--colorNeutralForeground1);
    background-color: var(--colorNeutralBackground1);
    padding: var(--spacingVerticalS) var(--spacingHorizontalM);
  }

  .root:hover {
    background-color: var(--colorNeutralBackground1Hover);
  }
}
```

`@reference` makes the theme's tokens, utilities and variants available to `@apply` and `@variant`
without emitting a byte of CSS — which is exactly why the `@layer` statement is repeated in every
module. With nothing emitted, the order in which the layers first _appear_ would decide their
ranking, and that order changes with load order. Re-declaring the identical order is a no-op.

### Layer altitudes

| Layer               | Who authors it                                                |
| ------------------- | ------------------------------------------------------------- |
| `fui.components.l1` | the library — one component's own cascade                     |
| `fui.components.l2` | the library — a component styling another component's output  |
| `fui.components.l3` | consumers — an application-wide design layer on top of Fluent |
| `fui.components.l4` | consumers — page- and feature-specific styling                |
| `fui.components.l5` | consumers — headroom for one-off depth                        |

Library code authors into `l1`, or `l2` when it deliberately styles another component's output.
`l3`–`l5` are consumer space and must stay empty in library modules. Unlayered author CSS beats
every layer, which is how a consumer's own stylesheet wins by default.

### Composing class names

Compose with `clsx`, return a new state object, and put the consumer's `className` last:

```tsx
import { clsx } from 'clsx';
import styles from './Button.module.css';

export const buttonClassNames: { root: string } = {
  // The public identity class is the named group marker, not a BEM static.
  root: 'group/fui-button',
};

export const useButtonStyles_unstable = (state: ButtonState): ButtonState => ({
  ...state,
  root: {
    ...state.root,
    className: clsx(styles.root, 'group/fui-button', state.size === 'small' && styles.small, state.root.className),
  },
});
```

Two rules that are easy to get wrong:

- **Argument order carries no cascade meaning.** `clsx` is a plain string join — no merge, no
  de-duplication. Which rule wins is decided by layer first, then specificity, then source order.
  Record the intended winners in the module's layer assignment, not in the call.
- **The marker must never be `classList[0]`.** Lead with the unconditional module class; jsdom's
  `:scope` polyfill throws on a first class token containing `/`.

### Variants: class or `data-*`?

Use a class when the variation is purely a look. Use a `data-*` attribute when it is a piece of
_state_ another element may need to react to — `<Text size={400} />` renders `data-size="400"` on
its root, and named `@custom-variant` entries in `@fluentui/react-tailwind-theme` select it.

## TypeScript Patterns

```tsx
// Component.types.ts
export type ComponentProps = ComponentPropsWithRef<'div'> & {
  appearance?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
};

export type ComponentState = Required<Pick<ComponentProps, 'appearance' | 'size'>> & {
  components: ComponentSlots;
  root: SlotProps<'div'>;
};

// Main component — always ForwardRefComponent, never React.FC
export const Component: ForwardRefComponent<ComponentProps> = React.forwardRef((props, ref) => {
  const state = useComponent_unstable(props, ref);
  useComponentStyles_unstable(state);
  return renderComponent_unstable(state);
});
```

## Accessibility patterns

Refer to `<Name>Accessibility.md` or `<Name>BestPractices.md` for high-importance accessibility requirements.

Check `<Name>AccessibilitySpec.mdx` for the full description of accessibility behaviors, including keyboard interaction, assistive tech behaviors, high contrast and reduced motion styles, content restrictions, and guidance on extending the control without breaking accessibility.

Most packages only have one `<Name>AccessibilitySpec.mdx` covering all components in the package -- for example, `MenuAccessibilitySpec.mdx` covers `Menu`, `MenuList`, `MenuItem`, `MenuItemCheckbox`, `MenuItemLink`, `MenuItemRadio`, `MenuItemSwitch`, etc.
