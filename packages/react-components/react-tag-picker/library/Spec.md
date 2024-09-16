# Dialog

## Background

This spec defines the default function of a `TagPicker`, the combination of a `Combobox` with `Tag`s components

## Prior Art

- [Github epic](https://github.com/microsoft/fluentui/issues/26652)
- [Fabric](https://developer.microsoft.com/en-us/fluentui#/controls/web/references/tagpicker)

## API

The `TagPicker` should implement a `children` based API. The component will leverage the use of `Context` in the interaction and data flows of child compound components.

Sample usages will be give in the following section of this document [Sample code](#sample-code)

### TagPicker

The root level component serves as an interface for interaction with all possible behaviors exposed. It provides context down the hierarchy to `children` compound components to allow functionality. This component expects to receive as children either a `popover` or a `trigger` and a `popover` (or some component that will eventually render one of those compound components) in this specific order.

```tsx
export type TagPickerSlots = {};

export type TagPickerProps = ComponentProps<TagPickerSlots> &
  Pick<
    ComboboxProps,
    'positioning' | 'disabled' | 'defaultOpen' | 'selectedOptions' | 'defaultSelectedOptions' | 'open' | 'freeform'
  > &
  Pick<Partial<TagPickerContextValue>, 'size' | 'appearance'> & {
    onOpenChange?: EventHandler<TagPickerOnOpenChangeData>;
    onOptionSelect?: EventHandler<TagPickerOnOptionSelectData>;

    /**
     * Can contain two children including a trigger and a popover
     */
    children: [JSX.Element, JSX.Element] | JSX.Element;
  };
```

### TagPickerControl

A visual component to hold all the tags and the text field to be displayed. The `TagPickerControl` is responsible for ensuring consistent layout, it contains `secondaryAction` and `expandIcon`

```typescript
export type TagPickerControlSlots = {
  root: Slot<'div'>;
  /**
   * A secondary action should be a button-like element to be rendered right after
   * the trigger responsible for opening/closing the tag picker popover.
   */
  secondaryAction: Slot<'span'>;
  /**
   * An expandIcon could be any non focusable element (preferably an icon)
   * to be rendered by the end of the control, it is used by default to
   * indicate that this component is expandable
   */
  expandIcon: Slot<'span'>;
};
export type TagPickerControlProps = ComponentProps<Partial<TagPickerControlSlots>>;
```

### TagPickerGroup

The `TagPickerGroup` component is a specialization of the [`TagGroup` component](https://react.fluentui.dev/?path=/docs/components-tag-taggroup--default), a `TagGroup` is a container for multiple controls that are [`Tag`](https://react.fluentui.dev/?path=/docs/components-tag-tag--default) or [`InteractionTag`](https://react.fluentui.dev/?path=/docs/components-tag-interactiontag--default). It is almost equivalent to a `TagGroup` component, differing on styles and `onDismiss` handling. The `TagPickerGroup` ensures that in the case there's no more tags to be dismissed the `trigger` should be focused

```tsx
export type TagPickerGroupSlots = TagGroupSlots;

/**
 * TagPickerGroup Props
 */
export type TagPickerGroupProps = ComponentProps<TagPickerGroupSlots>;
```

### TagPickerInput

Equivalent to the `input` slot in the `Combobox` component, but alternatively the `TagPicker` implementation has opted for a compound component approach instead of slots.

The `TagPickerInput` is a `trigger` and it has 2 functionalities:

1. open/close the `TagPicker` `popover` (`trigger` behavior)
2. provide a text field functionality, allowing the user to write texts to select one of the options available on the `TagPicker`

```tsx
export type TagPickerInputSlots = {
  root: Slot<'input'>;
};

/**
 * TagPickerInput Props
 */
export type TagPickerInputProps = Omit<
  ComponentProps<Partial<TagPickerInputSlots>>,
  'children' | 'size' | 'defaultValue'
> &
  Pick<ComboboxProps, 'clearable' | 'appearance'> & {
    disabled?: boolean;
    value?: string;
  };
```

### TagPickerButton

The `TagPickerButton` is a `trigger` similar to `TagPickerInput` but it does not provide a text field functionality to allow the user to write texts to select one of the options available on the `TagPicker`, it only provides `trigger` functionality, opening/closing the `popover` once clicked.

A `TagPickerButton` should be an empty space on the `TagPickerControl` that ensures that once clicked the `popover` open state is modified accordingly.

```tsx
export type TagPickerButtonSlots = {
  root: Slot<'button'>;
};

/**
 * PickerButton Props
 */
export type TagPickerButtonProps = ComponentProps<TagPickerButtonSlots> &
  Pick<DropdownProps, 'size' | 'appearance'> & {
    disabled?: boolean;
  };
```

### TagPickerList

`TagPickerList` is equivalent to `listbox` slot from `Combobox`, and it represents the list of options that the `TagPicker` provides. This component should be a direct children of `TagPicker` and it'll be rendered inside of a `Portal` (if the `TagPicker` is not inlined).

`TagPickerList` job is to ensure proper focus once it's opened/closed, and to properly style as wrapper of `TagPickerOption`s.

```tsx
export type TagPickerListSlots = {
  root: Slot<typeof Listbox>;
};

export type TagPickerListProps = ComponentProps<TagPickerListSlots>;
```

### TagPickerOption

Equivalent to `Option` component from `Combobox`, it represents one option that can be picked on the `TagPicker`, main difference between this component and `Option` is on style and slots available. The `TagPickerOption` provides `media` and `secondaryContent` slots.

```tsx
export type TagPickerOptionSlots = Pick<OptionSlots, 'root'> & {
  media?: Slot<'div'>;
  secondaryContent?: Slot<'span'>;
};

/**
 * TagPickerOption Props
 */
export type TagPickerOptionProps = ComponentProps<TagPickerOptionSlots> & {
  children: React.ReactNode;
  /**
   * A TagPickerOption should always provide a value to
   * identify itself once selected
   */
  value: string;
};
```

## Migration

_TBA: Link to migration guide doc_

## Behaviors

`TagPicker` will use **Tabster** to handle the keyboard navigation and ensure focus trapping.

The `TagPicker` component relies on `Combobox` to ensure it's navigation behaviors.

#### Mouse & touch

Mouse and touch behavior of a tag picker

1. Clicking on the trigger (element / button component, either a `TagPickerInput` or a `TagPickerButton`) the `popover` is displayed.
2. A user can continue to interact with elements on the page behind the popover.
3. Clicking on anything outside of the popover will close it.
4. Clicking on an option inside of the popover will select the given option and close the popover, once selected the given selected value will be added to the control as a selected tag.
5. If a selected tag is clicked it'll be dismissed and removed from the list of selected tags

#### Keyboard

Keyboard behavior of tag picker

1. **TabKey** to set focus on Trigger, use **EnterKey** or **KeyDown** to open the popover (if it's a `TagPickerButton` trigger then **Space** key can also be used).
2. Focus is always maintained in the Trigger, but active descendant is moved to the first option of the popover once it's opened.
3. After the popover is dismissed, keyboard focus should maintain in the Trigger
4. **TabKey** Moves focus to `secondaryAction` if available, or for the next focusable element otherwise.
5. **Shift+Tab** Moves focus to the last selected tag if any available, or for the previous focusable element otherwise.
6. **EscKey** Closes the popover.
7. **Enter** Selects an option on the popover and closes it right after.
8. **Space** Selects an option on the popover without closing it.
9. **KeyDown** navigates active descendant to next option if available.
10. **KeyUp** navigates active descendant to previous option if available

## Accessibility

> ⚠️ _Note: All other accessibility information, not covered in this section, is provided throughout the spec._

The tag picker component follows `Combobox` accessibility provisions.

### Aria roles and states

- Trigger
  - [`role="combobox"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/combobox_role)
- Popover
  - [`role="menu"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/menu_role)
- Option
  - [`role="menuitemcheckbox"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/menuitemcheckbox_role)
