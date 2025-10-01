This comprehensive comparison shows how `hideMode` and `delayMode` work together to create different stagger behaviors.

Now that you understand both configuration dimensions, you can see how they combine to optimize performance and behavior for different scenarios.

## Mode Combinations Matrix

The most common and optimal combinations are:

| hideMode          | delayMode   | Best For                           | Performance | Example                        |
| ----------------- | ----------- | ---------------------------------- | ----------- | ------------------------------ |
| `visibleProp`     | `delayProp` | Presence motion components         | ⭐⭐⭐ Best | `<Fade>`, `<Scale>`, `<Slide>` |
| `visibilityStyle` | `timing`    | Plain DOM elements (bidirectional) | ⭐⭐ Good   | `<div>`, stable layouts        |
| `unmount`         | `delayProp` | One-way motion components          | ⭐⭐⭐ Best | `<Fade.In>`, `<Scale.Out>`     |
| `unmount`         | `timing`    | One-way DOM elements               | ⭐⭐ Good   | Dynamic lists, cards           |

## Advanced Combinations

Less common but useful for specific scenarios:

| hideMode          | delayMode   | When to Use                                  | Trade-offs                                       |
| ----------------- | ----------- | -------------------------------------------- | ------------------------------------------------ |
| `visibilityStyle` | `delayProp` | Motion components with layout preservation   | Layout stable, but bypasses component animations |
| `visibleProp`     | `timing`    | Presence components with custom timing logic | Flexible timing, but less performant             |

## Interactive Comparison

Toggle between different combinations to see how they affect the same content:
