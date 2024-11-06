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

When implementing callback events be mindful of:

1.) All events for a state change must be supported, take care to leave flexibility in data and event types to prevent breaking changes if new functionality is added

2.) Some callbacks may not have an underlying DOM or React event to bubble if not driven by user interaction, such as a timer based interactions. If non-event callbacks may be required in the future, it is important to set event types as optional to prevent breaking changes when not present.
