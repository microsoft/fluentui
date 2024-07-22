## Best practices

### Do

- Use `Skeleton` to help ease a UI transition when we know the service will potentially take a longer amount of time to retrieve the data.
- Provide widths for each of the `Skeleton` elements you used to build a skeleton layout looking as close as possible to real content it is replacing.
- Add `aria-busy` to the top-level node of the loading container.
- Use `Skeleton` if you know the UI loading time is longer than 1 second.

### Don't

- Build Skeleton UI with a lot of details. Circles and rectangles are really as detailed as you want to get. Adding more detail will result in confusion once the UI loads.
- Use `Skeleton` if you are confident that the UI will take less than a second to load.
