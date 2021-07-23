# Text Migration

## STATUS: WIP 🚧

This Migration guide is a work in progress and is not yet ready for use.

## Migration from v8

## Migration from v0

The v0 Text is similar to the converged Text.
The converged component does not support many of the v0 properties that had very specific usages, such as: `important`, `success`, `error` etc.

## Property mapping

| v8 `Text` | v0 `Text` | Converged `Text` |
| --------- | --------- | ---------------- |
| nowrap    | truncated | truncate         |
| variant   | size      | size             |
| block     | -         | block            |
| as        | as        | as               |
| -         | -         | wrap             |
| -         | -         | italic           |
| -         | -         | underline        |
| -         | -         | strikethrough    |
| -         | -         | font             |
| -         | weight    | weight           |
| -         | align     | align            |

## Examples
