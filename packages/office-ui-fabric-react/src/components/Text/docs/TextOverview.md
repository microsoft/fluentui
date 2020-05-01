Text is a component for displaying text. You can use Text to standardize text across your web app.

You can specify the `variant` prop to apply font styles to Text. This variant pulls from the Fluent UI React theme loaded on the page. If you do not specify the `variant` prop, by default, Text applies the styling from specifying the `variant` value to `medium`.

The Text control is inline wrap by default. You can specify `block` to enable block and `nowrap` to enable `nowrap`. For ellipsis on overflow to work properly, `block` and `nowrap` should be manually set to `true`.
