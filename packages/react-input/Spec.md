# @fluentui/react-input Spec

## Background

_Description and use cases of this component_

## Prior Art

_Include background research done for this component_

- _Link to Open UI research_
- _Link to comparison of v7 and v0_
- _Link to GitHub epic issue for the converged component_

## Sample Code

_Provide some representative example code that uses the proposed API for the component_

## Variants

_Describe visual or functional variants of this control, if applicable. For example, a slider could have a 2D variant._

## API

_List the **Props** and **Slots** proposed for the component. Ideally this would just be a link to the component's `.types.ts` file_

## Structure

- _**Public**_
- _**Internal**_
- _**DOM** - how the component will be rendered as HTML elements_

## Migration

_Describe what will need to be done to upgrade from the existing implementations:_

- _Migration from v8_
- _Migration from v0_

## Behaviors

_Explain how the component will behave in use, including:_

- _Component States_
- _Interaction_
  - _Keyboard_
  - _Cursor_
  - _Touch_
  - _Screen readers_

## Accessibility

Base accessibility information is included in the design document. After the spec is filled and review, outcomes from it need to be communicated to design and incorporated in the design document.

- Decide whether to use **native element** or folow **ARIA** and provide reasons
- Identify the **[ARIA](https://www.w3.org/TR/wai-aria-practices-1.2/) pattern** and, if the component is listed there, follow its specification as possible.
- Identify accessibility **variants**, the `role` ([ARIA roles](https://www.w3.org/TR/wai-aria-1.1/#role_definitions)) of the component, its `slots` and `aria-*` props.
- Describe the **keyboard navigation**: Tab Oder and Arrow Key Navigation. Describe any other keyboard **shortcuts** used
- Specify texts for **state change announcements** - [ARIA live regions
  ](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) (number of available items in dropdown, error messages, confirmations, ...)
- Identify UI parts that appear on **hover or focus** and specify keyboard and screen reader interaction with them
- List cases when **focus** needs to be **trapped** in sections of the UI (for dialogs and popups or for hierarchical navigation)
- List cases when **focus** needs to be **moved programatically** (if parts of the UI are appearing/disappearing or other cases)

## Styling implementation notes

Input has multiple size and appearance variants. These tables were created based on the design spec to assist with initial implementation and help ensure everything is handled. (They're not exactly part of the input spec, but this seemed like a reasonable place to put them.)

General abbreviations used:

- " = inherit from left
- ^ = inherit from above
- ^^ = inherit from 2 lines above

## Sizes

- padding and gap values are from (theoretical) `spacing.horizontal` unless otherwise specified
- bookend-related sizes are from separate bookends page (everything except L/R padding and spacing within inherits from default)
- interpretation:
  - "spacing between icon before and content"/"spacing between content and icon after 1" => "spacing start/end to content"
  - "spacing between icon after 1 and icon after 2" => "spacing within insideEnd" because we're not going to have two icon slots
  - bookend "spacing between content and icon" => "spacing within bookend"
  - omitted "focus indicator" b/c that's handled elsewhere

| Style         | All                 |
| ------------- | ------------------- |
| v-align       | vertically centered |
| border radius | medium              |

| Style                         | medium           | small               | large     |
| ----------------------------- | ---------------- | ------------------- | --------- |
| height                        | 32px             | 24px                | 40px      |
| left/right padding            | mNudge           | sNudge              | m         |
| left/right padding in content | xxs              | "                   | sNudge    |
| bookends left/right padding   | s                | sNudge              | m         |
| content size                  | body1 (base.300) | caption1 (base.200) | base.400  |
| "icon" size                   | 20Regular        | 16Regular           | 24Regular |
| spacing start/end to content  | xxs              | "                   | sNudge    |
| spacing within insideEnd      | xs               | "                   | "         |
| spacing within bookend        | xs               | "                   | "         |

### Sizes application

| Style                         | Slot                         | Notes                                                            |
| ----------------------------- | ---------------------------- | ---------------------------------------------------------------- |
| v-align                       | root, inputWrapper           | ???                                                              |
| height                        | root                         | ? as minHeight or height ?                                       |
| border radius                 | bookends, inputWrapper, root | set where borders or shadow are defined; don't use if underlined |
| left/right padding            | inputWrapper                 | padding                                                          |
| left/right padding in content | input                        | padding                                                          |
| bookends left/right padding   | bookends                     | padding                                                          |
| content size                  | root, input                  | fontSize; doesn't inherit to input                               |
| "icon" size                   | n/a                          | no icons built in                                                |
| spacing start/end to content  | inputWrapper                 | display: flex (also to grow input), flex gap                     |
| spacing within insideEnd      | insideEnd                    | display: flex, flex gap                                          |
| spacing within bookends       | bookends                     | display: flex, flex gap                                          |

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

| Style                      | Slot                | Notes                                                    |
| -------------------------- | ------------------- | -------------------------------------------------------- |
| content color              | input               | other things have their own colors                       |
| placeholder color          | input               | `::placeholder`                                          |
| "icon" color               | insideStart/End     |                                                          |
| shadow                     | root                | encompasses bookends; requires rounding root corners     |
| background                 | inputWrapper, input | bookends have separate background; input doesn't inherit |
| border                     | inputWrapper        |                                                          |
| border hover               | TODO inputWrapper   | `:hover`                                                 |
| border pressed             | TODO                |                                                          |
| border focused             | TODO inputWrapper   | `:focus-within`                                          |
| borderBottom               | inputWrapper        |                                                          |
| borderBottom hover         | TODO inputWrapper   | `:hover`                                                 |
| borderBottom pressed       | TODO                |                                                          |
| borderBottom focused       | n/a                 | handled by focus indicator                               |
| in focus indicator         | TODO                |                                                          |
| in focus indicator pressed | TODO                |                                                          |
| cursor                     | root, input         |                                                          |

## Bookend appearance (TODO)

| Style           | filled             | brand                    | transparent           |
| --------------- | ------------------ | ------------------------ | --------------------- |
| background      | neutralBackground6 | brandBackground          | transparentBackground |
| content (+icon) | neutralForeground2 | neutralForegroundOnBrand | neutralForeground2    |
| border          | transparentStroke  | none                     | transparentStroke     |
| inner border    | n/a                | n/a                      | neutralStroke3        |

- Inner border ("border right") color is applied separately to before/after bookends.
- Others are applied in obvious way to both bookends.
- All borders are thin (1px).
