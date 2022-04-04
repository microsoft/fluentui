# @fluentui/react-toolbar Spec

## Background

### Definition

`Toolbar` is a surface that houses commands that operate on the content of the window, panel, or parent region it resides above. `Toolbar` is one of the most visible and recognizable way to surface commands, and can be an intuitive method for interacting with content on the page; however, if overloaded or poorly organized, they can be difficult to use and hide valuable commands from your user. `Toolbar` can also display a search box for finding content, hold simple commands as well as menus, or display the status of ongoing actions.

## Prior Art

As a part of the spec definitions in Fluent UI, a research effort has been made through [Open UI](https://open-ui.org/). The current research proposal is available as an open source contribution undergoing review ([research proposal](https://github.com/openui/open-ui/pull/452))

## Comparison of `@fluentui/react` and `@fluentui/react-northstar`

- All mentions of v7 or v8 == `@fluentui/react` ([docsite](https://developer.microsoft.com/en-us/fluentui#/))
- All mentions of v0 == `@fluentui/react-northstar` ([docsite](https://fluentsite.z22.web.core.windows.net/))

The main difference between `@fluentui/react`'s `CommandBar` and `@fluentui/react-northstar`'s `Toolbar` is the right group of commands present in `CommandBar`.

v0 `Toolbar` has support to children API with static components in `Toolbar` as `Toolbar.Button` etc...

## Variants

The only layout variation is size differences, there are 2 sizes `medium` which is the default and `small`.

## API

The `Toolbar` will implement a `children` based API and will leverage the use of `context` in the interaction and data flows of child components. To achieve `overflow` items once used inside `CommandBar` the component will leavarage from [priority-overflow](https://github.com/ling1726/priority-overflow)

### Toolbar

The root level component serves as a simple container for all possible ToolbarComponents

```typescript
type ToolbarProps = {
  /**
   * Defines toolbar size
   * @default medium
   */
  size?: 'small' | 'medium';
};
```

### ToolbarButton

It serves as an override on top of `Button` limiting the possible props only to `size`, `appearance`, `disabled` and `disabledFocusable`

```typescript
type type ToolbarButtonProps = ComponentProps<ButtonSlots> &
  Partial<Pick<ButtonProps, 'disabled' | 'disabledFocusable'>> & {

  /**
   * A button can have its content and borders styled for greater emphasis or to be subtle.
   * - 'primary': Emphasizes the button as a primary action.
   * - 'subtle': Minimizes emphasis to blend into the background until hovered or focused.
   */
  appearance?: 'primary' | 'subtle';
;
```

### ToolbarDivider

It's based on the `Divider` containing few styles overrides

```typescript
type ToolbarDividerProps = ComponentProps<Partial<DividerSlots>>;
```

### ToolbarToggleButton

It serves as an override on top of `ToggleButton` limiting the possible props only to `size`, `appearance`, `disabled` and `disabledFocusable`

```typescript
type ToolbarToggleButtonProps = ComponentProps<Partial<ToggleButtonSlots>>;
```

### ToolbarCheckbox

It's based on the `Checkbox` containing few styles overrides

```typescript
type ToolbarCheckboxProps = ComponentProps<Partial<CheckboxSlots>>;
```

### ToolbarItemGroup

It serves as general container for `ToolbarCheckbox` or `ToolbarRadio` hosting events for controls, when regarding `ToolbarCheckbox` the usage of `ToolbarItemGroup` is optional but if used should contain only checkboxes that has the same `name` attribute and share the `onChange` callback.

```typescript
type ToolbarItemGroupProps = {
  onChange?: (itemName: string, value: boolean) => void;
  value?: boolean;
  disabled?: boolean;
};
```

## Structure

- _**Public**_

```jsx
<Toolbar>
  <ToolbarButton />
  <ToolbarDivider />
  <ToolbarButton />
  <ToolbarButton />
  <ToolbarCheckbox />
  <ToolbarItemGroup>
    <ToolbarRadio value="A" label="Option A" />
    <ToolbarRadio value="B" label="Option B" />
    <ToolbarRadio value="C" label="Option C" />
    <ToolbarRadio value="D" label="Option D" />
  </ToolbarItemGroup>
  <ToolbarItemGroup>
    <ToolbarCheckbox name="typo" />
    <ToolbarCheckbox name="typo" />
  </ToolbarItemGroup>
</Toolbar>
```

- _**DOM**_

```html
<div role="toolbar">
  <button />
  <div />
  <button />
  <button />
</div>
```

## Behaviors

#### **Keyboard**

The `Toolbar` will support the prescribed [ARIA keyboard interaction](https://www.w3.org/TR/wai-aria-practices/examples/toolbar/toolbar.html).

## Accessibility

- [Toolbar](https://www.w3.org/TR/wai-aria-1.1/#Toolbar): A collection of commonly used function buttons or controls represented in compact visual form.
