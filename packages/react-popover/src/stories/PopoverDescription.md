A `Popover` is used to display content on temporary surface over other content. The position of the `Popover` surface
is configurable.

The visibility of the surface changes through user interactions with a trigger element, which are configurable to an
extend. In most cases the trigger element is a button, but other types of elements can be used.

Multiple `Popovers` can be nested so that a `Popover` can contain the trigger to open another `Popover`over its content.

⚠️ When a `Popover` contains interactable or focusable elements, the behaviour pattern is similar to that of a modal
dialog. Therefore, make sure to apply the built in focus trap through the `trapFocus` prop for correct component
accessibility.
