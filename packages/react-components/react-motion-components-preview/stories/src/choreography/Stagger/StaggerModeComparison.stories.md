The `hideMode` prop determines how items are hidden during staggered animations.
This comparison demonstrates how different hide modes affect DOM structure and layout behavior during staggered animations.

|                     | visibleProp       | visibilityStyle                    | unmount           |
| ------------------- | ----------------- | ---------------------------------- | ----------------- |
| **hidden by code:** | `visible={false}` | `style={{ visibility: 'hidden' }}` | `// not rendered` |
| element type        | motion components | regular elements                   | regular elements  |
| DOM presence        | elements remain   | elements remain                    | elements removed  |
| Layout impact       | space preserved   | space preserved                    | space removed     |
