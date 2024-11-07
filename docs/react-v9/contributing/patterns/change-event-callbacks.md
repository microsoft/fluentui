## Change Event Callbacks

Fluent UI React V9 implements event callbacks to expose internal state changes to consumers. These callbacks pass both the event data and the underlying React or DOM event for consumption.

An example of this is the boolean change on Dialog to open or close via internal interactions, surfacing these events ensures that controlled implementations can update based on internal state.

```
// Dialog.types..ts
  export type DialogOpenChangeEvent = DialogOpenChangeData['event'];

  export type DialogOpenChangeData =
  | {
      type: 'escapeKeyDown';
      open: boolean;
      event: React.KeyboardEvent<DialogSurfaceElement>;
    }
  | {
      type: 'backdropClick';
      open: boolean;
      event: React.MouseEvent<DialogSurfaceElement>;
    }
  | {
      type: 'triggerClick';
      open: boolean;
      event: React.MouseEvent<DialogSurfaceElement>;
  };
  /**
  * Callback fired when the component changes value from open state.
  *
  * @param event - a React's Synthetic event or a KeyboardEvent in case of `documentEscapeKeyDown`
  * @param data - A data object with relevant information,
  * such as open value and type of interaction that created the event
  */
  export type DialogOpenChangeEventHandler = (event: DialogOpenChangeEvent, data: DialogOpenChangeData) => void;

  /**
   * Callback fired when the component changes value from open state.
   *
   * @param event - a React's Synthetic event or a KeyboardEvent in case of `documentEscapeKeyDown`
   * @param data - A data object with relevant information,
   * such as open value and type of interaction that created the event
   */
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- can't change type of existing callback
  onOpenChange?: DialogOpenChangeEventHandler;
```

When implementing the change callback event, dialog wraps the function in a helper function for it's trigger component:

```
// useDialog.ts
const requestOpenChange = useEventCallback((data: DialogOpenChangeData) => {
    onOpenChange?.(data.event, data);

    // if user prevents default then do not change state value
    // otherwise updates state value and trigger reference to the element that caused the opening
    if (!data.event.isDefaultPrevented()) {
      setOpen(data.open);
    }
  });
```

This function is then consumed in the triggers onClick to bubble up event:

```
// useDialogTrigger.ts
  const handleClick = useEventCallback(
    (event: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>) => {
      child?.props.onClick?.(event);
      if (!event.isDefaultPrevented()) {
        requestOpenChange({
          event,
          type: 'triggerClick',
          open: action === 'open',
        });
      }
    },
  );
```

Users can then access the Event and data via Dialog api:

```
// DialogControllingOpenAndClose.stories.tsx
    <Dialog open={open} onOpenChange={(event, data) => setOpen(data.open)}>
```

Alternatively, you can use the callback directly in an event, or wrap for multiple types of events provided in context similar to react-carousel:

````

// useCarousel.ts
const selectPageByElement: CarouselContextValue['selectPageByElement'] = useEventCallback((event, element, jump) => {
const foundIndex = carouselApi.scrollToElement(element, jump);
onActiveIndexChange?.(event, { event, type: 'focus', index: foundIndex });

    return foundIndex;

});

const selectPageByIndex: CarouselContextValue['selectPageByIndex'] = useEventCallback((event, index, jump) => {
carouselApi.scrollToIndex(index, jump);

    onActiveIndexChange?.(event, { event, type: 'click', index });

});

const selectPageByDirection: CarouselContextValue['selectPageByDirection'] = useEventCallback((event, direction) => {
const nextPageIndex = carouselApi.scrollInDirection(direction);
onActiveIndexChange?.(event, { event, type: 'click', index: nextPageIndex });

    return nextPageIndex;

});

```

When implementing callback events be mindful of:

1.) All events for a state change must be supported, take care to leave flexibility in data and event types to prevent breaking changes if new functionality is added.

2.) Some callbacks may not have an underlying DOM or React event to bubble if not driven by user interaction, such as a timer based interactions. If non-event callbacks may be required in the future, it is important to set event types as optionally null to prevent breaking changes when not present.
```
````
