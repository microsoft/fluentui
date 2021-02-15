A `Stack` is a container-type component that abstracts the implementation of a flexbox in order to define the layout of its children components.

### Stack properties

Although the `Stack` component has a number of different properties, there are three in particular that define the overall layout that the component has:

1. Direction: Refers to whether the stacking of children components is horizontal or vertical. By default the `Stack` component is vertical, but can be turned horizontal by adding the `horizontal` property when using the component.
2. Alignment: Refers to how the children components are aligned inside the container. This is controlled via the `verticalAlign` and `horizontalAlign` properties. One thing to notice here is that while flexbox containers align always across the cross axis, `Stack` aims to remove the mental strain involved in this process by making the `verticalAlign` and `horizontalAlign` properties always follow the vertical and horizontal axes, respectively, regardless of the direction of the `Stack`.
3. Spacing: Refers to the space that exists between children components inside the `Stack`. This is controlled via the `gap` and `verticalGap` properties.

## Stack Items

The `Stack` component provides an abstraction of a flexbox container but there are some flexbox related properties that are applied on specific children of the flexbox instead of being applied on the container. This is where `Stack Items` comes into play.

A `Stack Item` abstracts those properties that are or can be specifically applied on flexbox's children, like `grow` and `shrink`.

To use a `Stack Item` in an application, the `Stack` component should be imported and `Stack.Item` should be used inside of a `Stack`. This is done so that the existence of the `Stack Item` is inherently linked to the `Stack` component.

### Stack wrapping

Aside from the previously mentioned properties, there is another property called `wrap` that determines if items overflow the `Stack` container or wrap around it. The wrap property only works in the direction of the `Stack`, which means that the children components can still overflow in the perpendicular direction (i.e. in a `Vertical Stack`, items might overflow horizontally and vice versa).

### Stack nesting

`Stacks` can be nested inside one another in order to be able to configure the layout of the application as desired.
