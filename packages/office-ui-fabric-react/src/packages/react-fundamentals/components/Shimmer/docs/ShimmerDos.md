
- Use shimmer to help ease a UI transition when we know the service will potentially take a longer amount of time to retrieve the data.
- Provide widths for each of the shimmer elements you used to build a skeleton layout looking as close as possible to real content it is replacing.
- Use `isDataLoaded` prop to trigger the transition once we have the data from the service. The Shimmer UI should Fade out while the real UI Fades In.
- Use shimmer if you know the UI loading time is longer than 1 second.
- Provide an ETA as quickly as possible to help the user understand that the system isn’t broken if you use shimmer and the delay is longer than 10 seconds.
- Provide shimmer designs for the breakpoints that your experience is supported in.