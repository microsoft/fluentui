Native HTML elements and Fluent components have first class support as children of `DialogTrigger`, so they will be injected automatically with the correct props for interactions and accessibility attributes.

It is possible to use your own custom React component as a child of `DialogTrigger`. These components should use ref forwarding with [React.forwardRef](https://reactjs.org/docs/forwarding-refs.html#forwarding-refs-to-dom-components)

`DialogTrigger` provides proper aria attributes for a modal trigger.
