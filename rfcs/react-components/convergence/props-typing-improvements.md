# RFC: Improved type checking for component props

Contributors: @behowell

## Summary

This RFC seeks to improve type checking for slot props and props with default values in converged components. It'll make it easier for component authors to "do the right thing" when definining the State type for the component, which reduces the chances for bugs and makes future maintenance easier.

## Problem statement

1. The slot props for a component are mentioned in several different locations in code, without any explicit link between the names and types, other than that they happen to mention the same props.
2. Some component props are given default values in the `useComponent` hook, but that is not represented in the type system (neither when the default values are provided, nor when they are used in, say `useComponentStyles`).

For example, given a component named `Widget` with slots `icon` and `text`, and a prop `propWithDefaultValue` that is given a default value in `useWidget`:

```typescript
export interface WidgetProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  icon?: ShorthandProps<IconProps>;
  text?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;

  // This prop has a default defined in useWidget:
  propWithDefaultValue?: string;

  // This prop does not have a default value in useWidget (undefined by default)
  anotherProp?: boolean;
}
```

**Problem:** The `WidgetState` type is handwritten, requires repeating the types for slot props and any props that have defaults.

```typescript
export interface WidgetState extends WidgetProps {
  ref: React.Ref<HTMLElement>;
  as?: React.ElementType;
  icon?: ObjectShorthandProps<IconProps>;
  text: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>>;
  propWithDefaultValue: string;
}
```

**Problem:** there's no checking that `widgetShorthandProps` actually references shorthand props (it could include any random HTML prop as well, like `'name'`).

```typescript
export const widgetShorthandProps: (keyof WidgetProps)[] = ['icon', 'text'];
```

**Problem:** there's no type checking for the default values provided to `mergeProps`, and no checking that props that require a default value are provided. _(Can you spot the bug below?)_

```typescript
export const useWidget = (props: WidgetProps, ref: React.Ref<HTMLElement>, defaultProps?: WidgetProps): WidgetState => {
  const state = mergeProps(
    {
      ref,
      as: 'div',
      test: { as: 'span' },
      propWithDefaultValue: 'hello world',
    },
    defaultProps,
    resolveShorthandProps(props, widgetShorthandProps),
  );

  return state;
};
```

**Problem:** in hooks like `useWidgetStyles`, there's either an implicit assumption about default props, or unnecessary checking is performed:

```typescript
// Unchecked assumption that the value is not undefined:
[s => s.propWithDefaultValue!.contains('hello'), {/* ... */}],
// Unnecessary undefined check:
[s => s.propWithDefaultValue && s.propWithDefaultValue.contains('hello'), {/* ... */}],
```

## Detailed Design or Proposal

The fix would be to:

1. Add some helper types
   - `ComponentState`: assists in creating the `State` type from the `Props` type: the dev simply lists the names of the props that are slot props, and the props that have default values.
   - `ComponentShorthandProps`: a list of the shorthand props from the state.
2. Update `mergeProps` (`makeMergeProps`) to require that the first argument is of type `TState`.
   - This will enforce that all props with defaults are provided and are of the correct type.
3. Declare the `widgetShorthandProps` array "`as const`" and put it in the .types.ts file.
   - This allows it to be used to declare the type used for the shorthand prop names.

### Usage example

`Widget.types.ts`:

```typescript
export const widgetShorthandProps = ['icon', 'text'] as const;

export type WidgetState = ComponentState<
  React.Ref<HTMLElement>,
  WidgetProps,
  /* ShorthandProps: */ typeof widgetShorthandProps[number],
  /* DefaultedProps: */ 'text' | 'propWithDefaultValue'
>;
```

`useWidget.ts`:

The types are checked, and the bug is fixed! (there was a typo in the problem statement above: the slot name was `test` instead of `text`)

```typescript
const mergeProps = makeMergeProps<WidgetState>({ deepMerge: widgetShorthandProps });

export const useWidget = (props: WidgetProps, ref: React.Ref<HTMLElement>, defaultProps?: WidgetProps): WidgetState => {
  const state = mergeProps(
    {
      as: 'div',
      text: { as: 'span' },
      propWithDefaultValue: 'hello world',
      ref,
    },
    defaultProps,
    resolveShorthandProps(props, widgetShorthandProps),
  );

  return state;
};
```

### Pros and Cons

- **Pros**
  - Less chance to make mistakes
  - Better dev-time type checking
- **Cons**
  - Helper types can make the resulting `State` type harder to understand for a dev who's unfamiliar with what they're doing

## Discarded Solutions

N/A

## Resolved Issues

### Issue: Defining shorthand props

- _**Resolution**: Use the `as const` array of shorthand props, to avoid repeating the prop names._

What do people think of defining the shorthand props types via the `widgetShorthandProps` array using `as const`.

- Pros:
  - Only write the names of the shorthand props in a single place
  - Avoids creating an extra exported type `WidgetShorthandProps`, which would only be used in one other place (to define the array).
- Cons:
  - Less conventional syntax (`typeof widgetShorthandProps[number]`)

```typescript
export const widgetShorthandProps = ['icon', 'text'] as const;

export type WidgetState = ComponentState<
  WidgetProps,
  /* ShorthandProps: */ typeof widgetShorthandProps[number],
  /* DefaultedProps: */ 'text' | 'propWithDefaultValue'
>;
```

The alternative is to manually write the `WidgetShorthandProps` type, and use it as the type of the `widgetShorthandProps` array.

```typescript
export type WidgetShorthandProps = 'icon' | 'text';
export type WidgetState = ComponentState<
  WidgetProps,
  WidgetShorthandProps,
  /* DefaultedProps: */ 'text' | 'propWithDefaultValue'
>;

export const widgetShorthandProps: WidgetShorthandProps[] = ['icon', 'text'];
```
