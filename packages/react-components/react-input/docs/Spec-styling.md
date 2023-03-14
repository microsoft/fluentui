# `@fluentui/react-input`: Styling implementation notes

Input has multiple size and appearance variants. These tables were created based on the design spec to assist with initial implementation and help ensure everything is handled.

General abbreviations used:

- " = inherit from left
- ^ = inherit from above
- ^^ = inherit from 2 lines above

## Sizes

Notes:

- padding and gap values are from (theoretical) `spacing.horizontal` unless otherwise specified
- interpretation:
  - "spacing between icon before and content"/"spacing between content and icon after 1" => "spacing within root"
  - "spacing between icon after 1 and icon after 2" => "spacing within contentBefore/After" because we're not going to have two icon slots
  - omitted "focus indicator" b/c that's handled elsewhere

### For all field sizes

| Style                                  | Application               | All                 |
| -------------------------------------- | ------------------------- | ------------------- |
| v-align                                | root                      | vertically centered |
| border radius                          | root (unless underlined)  | medium              |
| ~~spacing within contentBefore/After~~ | n/a (add later if needed) | xs                  |

### Varying by field size

| Style                         | Application                    | small               | medium           | large     |
| ----------------------------- | ------------------------------ | ------------------- | ---------------- | --------- |
| height                        | root `minHeight`               | 24px                | 32px             | 40px      |
| left/right padding            | root                           | sNudge              | mNudge           | m         |
| left/right padding in content | input                          | xxs                 | xxs              | sNudge    |
| content size                  | root, input (doesn't inherit)  | caption1 (base.200) | body1 (base.300) | base.400  |
| "icon" size                   | contentBefore/after `> svg`    | 16Regular           | 20Regular        | 24Regular |
| spacing within root           | root `display: flex`, flex gap | xxs                 | xxs              | sNudge    |

## Appearance colors and strokes

Notes:

- borders are thin (1px) unless otherwise noted
- "in focus indicator" means the bottom border (applied to `:after`)
- interpreting "compound brand stroke 1 pressed" as compoundBrandStrokePressed
- mouse and keyboard focus styles are the same

TODO Open questions:

- What color should the focus indicator be while animating? (pressed or non-pressed color)
- For borderBottom pressed:
  - The designs for outline/underline show a thick bottom border in the pressed state as the focus indicator animates in, but this isn't included in the animation demoing the focus border (and I can't tell if Windows 11 uses it).
  - This wide border could be added on the root (while maintaining the blue focus border) using `:focus-within:before` + setting the bottom border color on `:focus-within`.

### For all appearances

| Style                      | Application                      | All                       |
| -------------------------- | -------------------------------- | ------------------------- |
| content color              | input                            | neutralForeground1        |
| content color disabled     | ^                                | neutralForegroundDisabled |
| placeholder color          | input `::placeholder`            | neutralForeground4        |
| placeholder color disabled | ^                                | neutralForegroundDisabled |
| "icon" color               | contentBefore/After              | neutralForeground3        |
| "icon" color disabled      | ^                                | neutralForegroundDisabled |
| background disabled        | root, input                      | transparentBackground     |
| border disabled            | root                             | neutralStrokeDisabled     |
| ~~borderBottom focused~~   | n/a (covered by focus indicator) |                           |
| in focus indicator         | root `:focus-within:after`       | thick compoundBrandStroke |
| in focus indicator pressed | root `:after`                    | thick ^Pressed            |
| cursor disabled            | root, input                      | not-allowed               |

### Varying per appearance

| Style                | Application          | outline                 | underline             | filledDarker       | filledLighter      |
| -------------------- | -------------------- | ----------------------- | --------------------- | ------------------ | ------------------ |
| shadow               | root                 | none                    | "                     | shadow2            | "                  |
| background           | root, input          | neutralBackground1      | transparentBackground | neutralBackground3 | neutralBackground1 |
| border               | root                 | neutralStroke1          | none                  | transparentStroke  | "                  |
| border hover         | root `:hover`        | ^Hover                  | n/a                   | ^Interactive       | "                  |
| border pressed       | root `:active`       | ^^Pressed               | n/a                   | ^                  | "                  |
| border focused       | root `:focus-within` | n/a (neutralStroke1)    | n/a                   | ^                  | "                  |
| borderBottom         | root                 | neutralStrokeAccessible | "                     | n/a                | n/a                |
| borderBottom hover   | root `:hover`        | ^Hover                  | "                     | n/a                | n/a                |
| borderBottom pressed | TODO (see ? above)   | thick ^^Pressed         | "                     | n/a                | n/a                |

### In focus indicator

|           | focus in                   | focus out        |
| --------- | -------------------------- | ---------------- |
| apply to  | root `:focus-within:after` | root `:after`    |
| transform | scaleX 0-1                 | scaleX 1-0       |
| duration  | normal (200ms)             | ultraFast (50ms) |
| easing    | decelerateMid              | accelerateMid    |

## Bookends (deferred)

Bookend implementation has been deferred and will likely be handled in a separate component, but leaving these for reference.

### Sizes

| Style              | small               | medium | large |
| ------------------ | ------------------- | ------ | ----- |
| v-align            | vertically centered | "      | "     |
| border radius      | medium              | "      | "     |
| left/right padding | sNudge              | s      | m     |
| spacing within     | xs                  | "      | "     |

### Appearance

| Style           | filled             | brand                    | transparent           |
| --------------- | ------------------ | ------------------------ | --------------------- |
| background      | neutralBackground6 | brandBackground          | transparentBackground |
| content (+icon) | neutralForeground2 | neutralForegroundOnBrand | neutralForeground2    |
| border          | transparentStroke  | none                     | transparentStroke     |
| inner border    | n/a                | n/a                      | neutralStroke3        |

- Inner border ("border right") color is applied separately to before/after bookends.
- Others are applied in obvious way to both bookends.
- All borders are thin (1px).

### Changes to default input appearance

- Remove rounded corners from input
- For filled inputs with shadow, change the shadow to also encompass the bookends
