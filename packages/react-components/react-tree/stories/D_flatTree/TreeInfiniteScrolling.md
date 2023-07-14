The `InfiniteScrolling` example of the `Tree` component provides a dynamic and efficient Tree structure that loads more data as the user scrolls down the list. It uses the `useFlatTree` hook to manage a flat array of tree items, converting them into a hierarchical tree structure as needed.

When the `Tree` is first rendered, a set number of `TreeItem` components are displayed, ensuring fast load times and efficient handling of potentially large amounts of data. As the user scrolls down the list, the `onScroll` event triggers the loading of more `TreeItem` components.

This approach not only enhances the scalability of your application, but also improves the user experience by loading data as and when it is needed. The user is not overwhelmed with all the data at once and does not have to wait for large amounts of data to load initially.
