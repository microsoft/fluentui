A `Tree` can be flattened, meaning that its nested structure is transformed into a flat list of items. This can be helpful when you need to display a tree in a linear fashion, such as in a list.

In the code, the `defaultItems` array represents a flattened tree with each item containing the content to display. The `useFlatTree` hook transforms the flattened tree into a format that can be consumed by a `Tree` component. The `Tree` component handles rendering the nested structure, while the `useFlatTree` hook handles the logic for flattened data.
