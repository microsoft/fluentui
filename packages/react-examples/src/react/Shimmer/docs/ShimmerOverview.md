Shimmer is a temporary animation placeholder for when a service call takes time to return data and we don't want to block rendering the rest of the UI.

If a smooth transition from Shimmer to content is desired, wrap the content node with a Shimmer element and use the `isDataLoaded` prop to trigger the transition. In cases where the content node is not wrapped in a Shimmer, use the `shimmerElements` or `customElementsGroup` props, and once data arrives, manually replace the Shimmer UI with the intended content. See the examples below for reference.
