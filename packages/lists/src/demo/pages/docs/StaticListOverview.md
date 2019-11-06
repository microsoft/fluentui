StaticList is a component that renders a collection of items within a container. It does not offer virtualization for large collections nor constrained scrolling behavior within a viewport. However it can be used with composition to provide these behaviors.

By default, the StaticList component renders an unordered list with each row's key equal to the item index. Both the component's containing element tag and row render function can be overridden via its props.
