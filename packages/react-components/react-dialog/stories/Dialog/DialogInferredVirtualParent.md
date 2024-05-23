> ⚠️ This case happens very rarely, please make sure this is a problem before proceeding. If you are unsure please consult with the Fluent UI team.

Dialogs and other portal surfaces (i.e. Popover) use virtual parents to make sure that outside clicks will dismiss the surface correctly. The default virtual parent for a Dialog is the element where the `DialogTrigger` is located.

In certain cases the default virtual parent might not be correct. This commonly happens when a Dialog is rendered outside of a `Popover` component in React. This means that the parent popover will be dismissed once a user clicks inside the Dialog. In cases like these, you can use the `inferVirtualParent` prop to infer the virtual parent from the focused element before the Dialog is opened.
