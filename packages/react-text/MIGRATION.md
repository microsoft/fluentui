# Text Migration

## STATUS: WIP 🚧

This Migration guide is a work in progress and is not yet ready for use.

## Migration from v8

### as

<!-- NO CHANGE -->

### nowrap

<!-- wrap={false} -->

### variant

<!-- size - But also from string to number. Add mapping table -->

### block

<!-- NO CHANGE -->

### className

<!-- NO CHANGE -->

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

### as

<!-- NO CHANGE -->

### truncated

<!-- block + wrap={false} + truncate -->

### size

<!-- size - But also from string to number. Add mapping table -->

### a11y

<!-- Who knows?? -->

### align

<!-- NO CHANGE -->

### atMention

<!-- DEPRECATED - show how to mimic impl -->

### color

<!-- DEPRECATED - show how to mimic impl -->

### content

<!-- children -->

### disabled

<!-- DEPRECATED - show how to mimic impl -->

### error

<!-- DEPRECATED - show how to mimic impl -->

### important

<!-- DEPRECATED (maybe bold/weight?) - show how to mimic impl -->

### success

<!-- DEPRECATED - show how to mimic impl -->

### temporary

<!-- DEPRECATED (maybe italic?) - show how to mimic impl -->

### timestamp

<!-- DEPRECATED - show how to mimic impl -->

### variables

<!-- God help us -->

### weight

<!-- NO CHANGE (I think?) -->

### className

<!-- NO CHANGE -->

### styles

<!-- pls use make-styles 🥺 -->

### design

<!-- *Enya - Only Time playing in the background* -->

## Examples
