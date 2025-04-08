Fluent components leverages the `@fluentui/react-motion` to handle animations. All components that expose a motion slot, can be configured in a similar way. For detailed guidance on creating animations using `@fluentui/react-motion`, refer to the [motion API](https://react.fluentui.dev/?path=/docs/motion-apis-createpresencecomponent--docs) documentation.

### Components using motion API

- Dialog
- Drawer
- Toast (_internally uses the motion API but does not expose a slot_)

For components that provide a slot to control animation, you can disable or customize the motion by configuring these slots.
