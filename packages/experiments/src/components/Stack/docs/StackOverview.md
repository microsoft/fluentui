A Stack is a container-type component that abstracts the implementation of a flexbox in order to define the layout of its children components.

## Stack Properties

Although Stack has a number of different properties, there are three in particular that define the overall layout that the component has:

1. Direction: Refers to whether the stacking of children components is horizontal or vertical. By default the Stack component is vertical, but can be turned horizontal by adding the `horizontal` property when using the component.
2. Alignment: Refers to how are the children components aligned inside the container. This is controlled via the `verticalAlign` and `horizontalAlign` properties.
3. Spacing: Refers to the space that exists between children components inside the Stack. This is controlled via the `gap` and `verticalGap` properties.

## Stack Wrapping

Aside from the previously mentioned properties, there is another property called `wrap` that determines if items overflow the Stack container or wrap around it. The wrap property only works in the direction of the Stack, which means that the children components can still overflow in the perpendicular direction (i.e. in a Vertical Stack, items might overflow horizontally and vice versa).

## Stack Nesting

Stacks can be nested inside one another in order to be able to configure the layout of the application as desired.
