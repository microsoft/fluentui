# Text Migration

## STATUS: WIP 🚧

This Migration guide is a work in progress and is not yet ready for use.

## Property mapping

| Fabric (v8) | Northstar (v0) | Converged (vNext) |
| ----------- | -------------- | ----------------- |
| as          | as             | as                |
| className   | className      | className         |
| variant     | size           | size              |
| block       | -              | block             |
| nowrap      | -              | wrap              |
| -           | align          | align             |
| -           | content        | children          |
| -           | styles         | styles            |
| -           | truncated      | truncate          |
| -           | weight         | weight            |
| -           | -              | font              |
| -           | -              | italic            |
| -           | -              | strikethrough     |
| -           | -              | underline         |

> ⚠️ Note - Properties not in this table are considered deprecated.
> You can find the migration guide below.

## Migration from v8 (Fabric)

### as

<!-- NO CHANGE -->

### nowrap

<!-- wrap={false} -->

### variant

<!-- size - But also from string to number. Add mapping table -->

<h4 id="size-table">Size table</h4>

| Size token | font-size | line-height |
| ---------- | --------- | ----------- |
| 100        | 10px      | 14px        |
| 200        | 12px      | 16px        |
| 300        | 14px      | 20px        |
| 400        | 16px      | 22px        |
| 500        | 20px      | 28px        |
| 600        | 24px      | 32px        |
| 700        | 28px      | 36px        |
| 800        | 32px      | 40px        |
| 900        | 40px      | 52px        |
| 1000       | 68px      | 92px        |

### block

<!-- NO CHANGE -->

### className

<!-- NO CHANGE -->

---

## Migration from v0 (Northstar)

The v0 Text is similar to the converged Text.
The converged component does not support many of the v0 properties that had very specific usages, such as: `important`, `success`, `error` etc.

### as

<!-- NO CHANGE -->

### truncated

<!-- block + wrap={false} + truncate -->

### size

<!-- size - But also from string to number. Add mapping table -->

Refer to the [Size Table](#size-table) above.

### a11y

<!-- Who knows?? I guess the 'as' prop?? -->

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

color: gray?

### error

<!-- DEPRECATED - show how to mimic impl -->

color: red

### important

<!-- DEPRECATED (maybe bold/weight?) - show how to mimic impl -->

weight="semibold" & color red

### success

<!-- DEPRECATED - show how to mimic impl -->

color: green

### temporary

<!-- DEPRECATED (maybe italic?) - show how to mimic impl -->

### timestamp

<!-- DEPRECATED - show how to mimic impl -->

### variables

<!-- God help us --> xD

### weight

<!-- NO CHANGE (I think?) -->

N\* has these values: bold light semilight regular semibold

Converged has these: "regular" \| "medium" \| "semibold"

I'm guessing:

- light&semilight -> regular
- semibold -> medium
- bold -> semibold

### className

<!-- NO CHANGE -->

### styles

<!-- pls use make-styles 🥺 -->

### design

<!-- *Enya - Only Time playing in the background* -->

## Examples
