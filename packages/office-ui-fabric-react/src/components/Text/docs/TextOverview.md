Text is a component for displaying text.
You can use Text to standardize text across your web app.

You can specify the `variant` prop to apply font styles to Text.
This variant pulls from the Fabric theme loaded on the page.
If you do not specify the `variant` prop, by default, Text inherits font family, font size, font weight, and color from its parent element.

The Text control is inline wrap by default.
You can specify `block` to enable block and `nowrap` to enable `nowrap`.
In order for ellipsis on overflow to work properly, `block` should be set to true in addition to `nowrap`.
Both of these props are false by default.