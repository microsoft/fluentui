By default, every `TreeItem` component that can be expanded or collapsed will respond to clicks on both the content and the expand/collapse icon. If you need to perform a different action when the `TreeItem` content is clicked, you can override this behavior.

To do so, you can listen for the `onOpenChange` event in the root `Tree` component. When this event is triggered, you can check the type of the event data to determine whether the user clicked on the `TreeItem`'s content or the expand/collapse icon. This way, you can handle clicks on the content separately from expand/collapse events.
