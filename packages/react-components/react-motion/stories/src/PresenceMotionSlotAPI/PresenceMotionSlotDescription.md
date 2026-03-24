`presenceMotionSlot()` integrates a presence motion component (created with `createPresenceComponent()`) into Fluent UI's slot system. It allows component consumers to disable or customize enter/exit animations on a component via props.

This is the API used by components like Dialog, Drawer, Popover, Menu, Accordion, Nav, and Tree to expose their animations as configurable slots. It manages `visible`, `appear`, and `unmountOnExit` state automatically.

For details on creating the underlying animations, see the [createPresenceComponent](https://react.fluentui.dev/?path=/docs/motion-apis-createpresencecomponent--docs) documentation.
