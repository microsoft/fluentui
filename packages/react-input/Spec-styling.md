# `@fluentui/react-input`: Styling implementation notes

Input has multiple size and appearance variants. These tables were created based on the design spec to assist with initial implementation and help ensure everything is handled.

General abbreviations used:

- " = inherit from left
- ^ = inherit from above
- ^^ = inherit from 2 lines above

## Sizes

- padding and gap values are from (theoretical) `spacing.horizontal` unless otherwise specified
- interpretation:
  - "spacing between icon before and content"/"spacing between content and icon after 1" => "spacing start/end to content"
  - "spacing between icon after 1 and icon after 2" => "spacing within contentBefore/After" because we're not going to have two icon slots
  - omitted "focus indicator" b/c that's handled elsewhere

| Style         | All                 |
| ------------- | ------------------- |
| v-align       | vertically centered |
| border radius | medium              |

| Style                              | medium           | small               | large     |
| ---------------------------------- | ---------------- | ------------------- | --------- |
| height                             | 32px             | 24px                | 40px      |
| left/right padding                 | mNudge           | sNudge              | m         |
| left/right padding in content      | xxs              | "                   | sNudge    |
| content size                       | body1 (base.300) | caption1 (base.200) | base.400  |
| "icon" size                        | 20Regular        | 16Regular           | 24Regular |
| spacing start/end to content       | xxs              | "                   | sNudge    |
| spacing within contentBefore/After | xs               | "                   | "         |

### Sizes application

| Style                              | Slot                | Notes                                                            |
| ---------------------------------- | ------------------- | ---------------------------------------------------------------- |
| v-align                            | root                | ???                                                              |
| height                             | root                | ? as minHeight or height ?                                       |
| border radius                      | root                | set where borders or shadow are defined; don't use if underlined |
| left/right padding                 | root                | padding                                                          |
| left/right padding in content      | input               | padding                                                          |
| content size                       | root, input         | fontSize; doesn't inherit to input                               |
| "icon" size                        | n/a                 | no icons built in                                                |
| spacing start/end to content       | root                | display: flex (also to grow input), flex gap                     |
| spacing within contentBefore/After | contentBefore/After | display: flex, flex gap                                          |

## Appearance colors and strokes

- italics = thick border
- interpreting "compound brand stroke 1 pressed" as compoundBrandStrokePressed
- appears that focus and keyboard focus styles are the same

| Style                                      | All                       |
| ------------------------------------------ | ------------------------- |
| content                                    | neutralForeground1        |
| content disabled                           | neutralForegroundDisabled |
| placeholder                                | neutralForeground4        |
| placeholder disabled                       | neutralForegroundDisabled |
| "icon" color                               | neutralForeground3        |
| "icon" color disabled                      | neutralForegroundDisabled |
| background disabled                        | transparentBackground     |
| border disabled                            | neutralStrokeDisabled     |
| in focus indicator (bottom border)         | _compoundBrandStroke_     |
| in focus indicator (bottom border) pressed | _^Pressed_                |
| cursor disabled                            | not-allowed               |

| Style                | filledDarker       | filledLighter      | underline                | outline              |
| -------------------- | ------------------ | ------------------ | ------------------------ | -------------------- |
| shadow               | shadow2            | "                  | none                     | "                    |
| background           | neutralBackground3 | neutralBackground1 | transparentBackground    | neutralBackground1   |
| border               | transparentStroke  | "                  | none                     | neutralStroke1       |
| border hover         | ^Interactive       | "                  | n/a                      | ^Hover               |
| border pressed       | ^                  | "                  | n/a                      | ^^Pressed            |
| border focused       | ^                  | "                  | n/a                      | n/a (neutralStroke1) |
| borderBottom         | n/a                | n/a                | neutralStrokeAccessible  | "                    |
| borderBottom hover   | n/a                | n/a                | ^Hover                   | "                    |
| borderBottom pressed | n/a                | n/a                | _^^Pressed_              | "                    |
| borderBottom focused | n/a                | n/a                | n/a (in focus indicator) | "                    |

### Appearance application

| Style                      | Slot                | Notes                              |
| -------------------------- | ------------------- | ---------------------------------- |
| content color              | input               | other things have their own colors |
| placeholder color          | input               | `::placeholder`                    |
| "icon" color               | contentBefore/After |                                    |
| shadow                     | root                |                                    |
| background                 | root, input         |                                    |
| border                     | root                |                                    |
| border hover               | TODO root           | `:hover`                           |
| border pressed             | TODO                |                                    |
| border focused             | TODO root           | `:focus-within`                    |
| borderBottom               | root                |                                    |
| borderBottom hover         | TODO root           | `:hover`                           |
| borderBottom pressed       | TODO                |                                    |
| borderBottom focused       | n/a                 | handled by focus indicator         |
| in focus indicator         | TODO                |                                    |
| in focus indicator pressed | TODO                |                                    |
| cursor                     | root, input         |                                    |

## Bookends (deferred)

Bookend implementation has been deferred and will likely be handled in a separate component, but leaving these for reference.

### Sizes

| Style              | medium              | small  | large |
| ------------------ | ------------------- | ------ | ----- |
| v-align            | vertically centered | "      | "     |
| border radius      | medium              | "      | "     |
| left/right padding | s                   | sNudge | m     |
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
