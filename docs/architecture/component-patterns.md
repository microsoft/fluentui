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
│   ├── use<Name>Styles.styles.ts         # Griffel styling
│   ├── render<Name>.tsx                  # JSX rendering
│   └── index.ts                          # Component barrel export
├── contexts/                             # Optional: context definitions
├── utils/                                # Optional: shared utilities
├── testing/
│   └── isConformant.ts                   # Conformance tests
├── <Name>.ts                             # Root barrel per component
└── index.ts                              # Package export
```

## Hook-Based Architecture

Components use three core hooks:

1. **`use<Name>(props, ref)`** — Processes props and slots into normalized state.
   Use `.ts` if pure logic, `.tsx` if the hook body contains JSX.

2. **`use<Name>Styles(state)`** — Creates Griffel CSS-in-JS styling using design tokens.
   Always ends in `.styles.ts`.

3. **`render<Name>(state)`** — Pure JSX rendering from state.
   Always `.tsx`.

### Where to Fix Bugs

| Bug type | Fix location |
|----------|-------------|
| State / behavior | `use<Name>.ts` |
| Styling | `use<Name>Styles.styles.ts` |
| Rendering / JSX | `render<Name>.tsx` |
| Types / props | `<Name>.types.ts` |

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

## Griffel Styling

Use `makeStyles` with design tokens — never hardcode values:

```tsx
import { makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

export const useButtonStyles = makeStyles({
  root: {
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
});
```

Always use `mergeClasses()` and preserve user className as the **last** argument:

```tsx
state.root.className = mergeClasses(
  classes.root,
  props.size === 'small' && classes.small,
  state.root.className, // Always last
);
```

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
