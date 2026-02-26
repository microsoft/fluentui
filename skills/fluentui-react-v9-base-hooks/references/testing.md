# Testing Base State Hooks

## What to test

| Category      | Verification                                                                |
| ------------- | --------------------------------------------------------------------------- |
| Structure     | Returns correct state with all required slots and `components` map          |
| Accessibility | ARIA attributes present (`role`, `aria-selected`, `aria-orientation`, etc.) |
| Purity        | No Griffel, design tokens, or motion utilities imported                     |
| Slots         | Optional slots absent when not provided; present when provided              |
| Refs          | Refs forwarded correctly to root element                                    |
| States        | `disabled`, `disabledFocusable`, controlled/uncontrolled selection          |

## Pattern: compound component (TabList + Tab)

The TabList test demonstrates the canonical pattern for compound components with context:

```tsx
// useTabList.test.tsx
import { useTabListBase_unstable } from './useTabList';
import { renderTabList_unstable } from './renderTabList';
import { renderTab_unstable, TabState, useTabBase_unstable } from '../Tab';
import { useTabListContextValues_unstable } from './useTabListContextValues';
import { useTabListContext_unstable } from './TabListContext';

describe('useTabListBase', () => {
  type CustomTabListProps = Parameters<typeof useTabListBase_unstable>[0] & {
    appearance?: 'filled' | 'outline';
  };

  const CustomTabList = React.forwardRef<HTMLDivElement, CustomTabListProps>(
    ({ appearance = 'filled', ...props }, ref) => {
      const state = useTabListBase_unstable(props, ref);
      // Assign custom design props needed by context consumers
      Object.assign(state, { appearance, size: 'medium', reserveSelectedTabSpace: true });
      const contextValues = useTabListContextValues_unstable(state as TabListState);

      state.root.className = `tab-list tab-list--${appearance}`;
      return renderTabList_unstable(state as TabListState, contextValues);
    },
  );

  it('renders with correct ARIA attributes', () => {
    const { getByRole } = render(
      <CustomTabList defaultSelectedValue="1">
        <CustomTab value="1">First</CustomTab>
        <CustomTab value="2">Second</CustomTab>
      </CustomTabList>,
    );

    expect(getByRole('tablist')).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('updates selection on click', async () => {
    const { getByRole } = render(
      <CustomTabList defaultSelectedValue="1">
        <CustomTab value="1">First</CustomTab>
        <CustomTab value="2">Second</CustomTab>
      </CustomTabList>,
    );

    await userEvent.click(getByRole('tab', { name: 'Second' }));
    expect(getByRole('tab', { name: 'Second' })).toHaveAttribute('aria-selected', 'true');
    expect(getByRole('tab', { name: 'First' })).toHaveAttribute('aria-selected', 'false');
  });
});
```

## Pattern: simple component (Button)

```tsx
import { useButtonBase_unstable } from './useButton';
import { renderButton_unstable } from './renderButton';

const TestButton = React.forwardRef<HTMLButtonElement, ButtonBaseProps>((props, ref) => {
  const state = useButtonBase_unstable(props, ref);
  return renderButton_unstable(state as ButtonState);
});

describe('useButtonBase', () => {
  it('renders as button with type="button"', () => {
    const { getByRole } = render(<TestButton>Click me</TestButton>);
    expect(getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('applies aria-disabled when disabledFocusable', () => {
    const { getByRole } = render(<TestButton disabledFocusable>Click me</TestButton>);
    expect(getByRole('button')).toHaveAttribute('aria-disabled', 'true');
    expect(getByRole('button')).not.toBeDisabled();
  });

  it('does not render icon slot when not provided', () => {
    const { container } = render(<TestButton>Click me</TestButton>);
    expect(container.querySelector('span')).toBeNull();
  });
});
```

## Purity check

Add an import-level check to ensure no Griffel or design tokens are used:

```typescript
// In the test file or via lint rule
// Verify no Griffel imports: grep for @griffel/react in the base hook file
// Verify no design tokens: grep for tokens. usage
```
