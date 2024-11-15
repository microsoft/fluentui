## Change Event Callbacks

Fluent UI React V9 implements event callbacks to expose internal state changes to consumers. These callbacks pass both the event data and the underlying React or DOM event for consumption.

An example of this is the boolean change on TagPicker to open or close via internal interactions and provide updates on selection state, surfacing these events ensures that controlled implementations can both access and modify internal changes, or respond to specific event types.

```
// TagPicker.types.ts

  // Source event type is defined by string to handle varying event source types i.e. 'click' vs 'keydown'
  export type TagPickerOnOptionSelectData = {
    value: string;
    selectedOptions: string[];
  } & (EventData<'click', React.MouseEvent<HTMLDivElement>> | EventData<'keydown', React.KeyboardEvent<HTMLDivElement>>);

  // Unique event data type is provided for each component action
  export type TagPickerOnOpenChangeData = { open: boolean } & (
    | EventData<'click', React.MouseEvent<HTMLDivElement>>
    | EventData<'keydown', React.KeyboardEvent<HTMLDivElement>>
  );

  // Event callbacks are then defined as EventHandler with data type in TagPickerProps
  onOpenChange?: EventHandler<TagPickerOnOpenChangeData>;
  onOptionSelect?: EventHandler<TagPickerOnOptionSelectData>;

```

TagPicker then passes the wrapped event callback into it's underlying ComboBox hook (useEventCallback ensures memoization with latest updated state) - the wrapped event callback could also be provided directly to a local onClick or onKeyDown slot property:

```
// useTagPicker.ts

  // Note: ComboBox uses a previous legacy event data type that remains backwards compatible
  const comboboxState = useComboboxBaseState({
    ...props,
    onOptionSelect: useEventCallback((event, data) =>
      props.onOptionSelect?.(event, {
        selectedOptions: data.selectedOptions,
        value: data.optionValue,
        type: event.type,
        event,
      } as TagPickerOnOptionSelectData),
    ),
    onOpenChange: useEventCallback((event, data) =>
      props.onOpenChange?.(event, {
        ...data,
        type: event.type,
        event,
      } as TagPickerOnOpenChangeData),
    ),
    activeDescendantController,
    editable: true,
    multiselect: true,
    size: 'medium',
  });
```

Consumer interface:

```
  const [open, setOpen] = React.useState(false);
  const handleOpenChange: TagPickerProps['onOpenChange'] = (e, data) => setOpen(data.open);

  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (e, data) => {
    if (data.value === 'no-options') {
      return;
    }
    setSelectedOptions(data.selectedOptions);
  };

  return (
    <TagPicker
        onOptionSelect={onOptionSelect}
        selectedOptions={selectedOptions}
        onOpenChange={handleOpenChange}
        open
      >
      {...}
    </TagPicker>
  );
```

When implementing event callbacks be mindful of:

1.) All events for a state change must be supported to ensure external user state is always updated, take care to leave flexibility in data and event types to prevent breaking changes if new functionality is added.

2.) Some callbacks may not have an underlying DOM or React event to bubble if not driven by user interaction, such as a timer based interactions. If non-event callbacks may be required in the future, it is important to set event types as optionally null to prevent breaking changes when not present.
