# Type Patterns for Base State Hooks

## Table of Contents

- [Type Patterns for Base State Hooks](#type-patterns-for-base-state-hooks)
  - [Table of Contents](#table-of-contents)
  - [Derivation strategies](#derivation-strategies)
  - [Button — DistributiveOmit pattern](#button--distributiveomit-pattern)
  - [TabList — Omit pattern](#tablist--omit-pattern)
  - [Design props hierarchy](#design-props-hierarchy)

---

## Derivation strategies

**Option A: `DistributiveOmit`** — preferred when base props are a clean subset of full props:

```typescript
type ButtonBaseProps = DistributiveOmit<ButtonProps, 'appearance' | 'size' | 'shape'>;
type ButtonBaseState = DistributiveOmit<ButtonState, 'appearance' | 'size' | 'shape'>;
```

**Option B: `Omit`** — works for non-union types:

```typescript
type TabListBaseProps = Omit<TabListProps, 'appearance' | 'size' | 'reserveSelectedTabSpace'>;
type TabListBaseState = Omit<TabListState, 'appearance' | 'size' | 'reserveSelectedTabSpace'>;
```

**Option C: Explicit composition** — when the base type diverges significantly from the full type:

```typescript
type ButtonBaseProps = ComponentProps<ButtonSlots> & {
  disabled?: boolean;
  disabledFocusable?: boolean;
  iconPosition?: 'before' | 'after';
};
type ButtonBaseState = ComponentState<ButtonSlots> & {
  disabled: boolean;
  disabledFocusable: boolean;
  iconPosition: 'before' | 'after';
  iconOnly: boolean;
};
```

## Button — DistributiveOmit pattern

```typescript
// Button.types.ts

export type ButtonSlots = {
  root: NonNullable<Slot<ARIAButtonSlotProps<'a'>>>;
  icon?: Slot<'span'>;
};

export type ButtonProps = ComponentProps<ButtonSlots> & {
  appearance?: 'primary' | 'secondary' | 'outline' | 'subtle' | 'transparent';
  disabled?: boolean;
  disabledFocusable?: boolean;
  iconPosition?: 'before' | 'after';
  shape?: 'rounded' | 'circular' | 'square';
  size?: 'small' | 'medium' | 'large';
};

export type ButtonBaseProps = DistributiveOmit<ButtonProps, 'appearance' | 'size' | 'shape'>;

export type ButtonState = ComponentState<ButtonSlots> & {
  appearance: NonNullable<ButtonProps['appearance']>;
  disabled: boolean;
  disabledFocusable: boolean;
  iconOnly: boolean;
  iconPosition: NonNullable<ButtonProps['iconPosition']>;
  shape: NonNullable<ButtonProps['shape']>;
  size: NonNullable<ButtonProps['size']>;
};

export type ButtonBaseState = DistributiveOmit<ButtonState, 'appearance' | 'size' | 'shape'>;
```

## TabList — Omit pattern

```typescript
// TabList.types.ts

export type TabListSlots = { root: Slot<'div'> };

export type TabListProps = ComponentProps<TabListSlots> & {
  appearance?: 'transparent' | 'subtle';
  disabled?: boolean;
  defaultSelectedValue?: TabValue;
  onTabSelect?: EventHandler<SelectTabData>;
  reserveSelectedTabSpace?: boolean;
  selectTabOnFocus?: boolean;
  selectedValue?: TabValue;
  size?: 'small' | 'medium' | 'large';
  vertical?: boolean;
};

// Base props: omit all design/layout props that don't affect ARIA/structure
export type TabListBaseProps = Omit<TabListProps, 'appearance' | 'size' | 'reserveSelectedTabSpace'>;

export type TabListState = ComponentState<Required<TabListSlots>> &
  TabListContextValue & {
    appearance: NonNullable<TabListProps['appearance']>;
    reserveSelectedTabSpace: boolean;
    size: NonNullable<TabListProps['size']>;
  };

export type TabListBaseState = Omit<TabListState, 'appearance' | 'size' | 'reserveSelectedTabSpace'>;
```

## Design props hierarchy

Base props/state can retain props that affect **slot structure or ARIA behavior**, even if they sound layout-related:

- `iconPosition` — affects slot order AND ARIA description → **keep in base**
- `vertical` — affects `aria-orientation` → **keep in base**
- `appearance` — purely visual → **omit from base**
- `size` — purely visual → **omit from base**
- `shape` — purely visual → **omit from base**
- `reserveSelectedTabSpace` — visual layout only → **omit from base**
