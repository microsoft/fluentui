## Component features and behavior

This section documents accessibility-related behavoirs of spin buttons.

### Keyboarding

#### Tab Order
SpinButton is a single tab stop, with focus landing on the native `<input type="text">` element.

#### States
1. Committed (Focused and value committed)
2. Editing (Focused and editing)

#### Keyboard State Diagram

| Starting state | Transition | Resulting state |
| ---------- | ------------ | ------- |
| Content before spin button | Tab | Committed |
| Committed  | Tab | Content after spin button (Value committed) |
| Editing  | Tab | Content after spin button (Value committed) |
| Editing (Autofill option provided)  | Tab | Content after spin button (Value committed) |
| Editing  | Enter | Committed |
| Committed  | Any Edit Key (that results in a change) | Editing |
| Editing  | Any Edit Key | Editing |
| Content after spin button (Value committed) | Shift + Tab | Committed |

##### Edit keys
| Edit Key | Result |
| ---------- | ------------ |
| Home | First item in defined range |
| End | Last item in defined range |
| Up arrow | One increment higher |
| Down arrow | One increment lower |
| Page up | Several increments higher |
| Page down | Several increments lower |
| Typing valid value | Valid value |
| Begin typing valid value | Autofill option provided |

### High contrast mode

Be careful about visibility of the spin button arrows in high contrast mode.

### Motion and animation

Animations occur when the value changes to give the appearance of spinning. This needs to respond to user settings to turn off animations.

Placeholder: Mouse press speed of value changes visual indicators

### Semantics

## Known issues

Placeholder: If there are any current known bugs with browsers or AT that impact this component, list them here.

Mouse press quick changes to value are not announced to screen readers.

## Usage



### When to choose Spin button

SpinButtons allow someone to incrementally adjust a value in small steps.

### Required props

Placeholder: If there are any props or other specific work that the author must do to make the default usage of the component accessible, list those here. One example is that all form components must have a label provided by the author. If the component has any internally defined strings that should be localized, list those here.

Open question: How does everything read? Name, role, value? What about when there are prefixes or postfixes?

### Styling



### Advanced usage

Placeholder: Cover potential use cases not included in our storybook examples here (or even included storybook examples, if they're complex require a notable amout of work or nuanced understanding from authors)

#### Child content restrictions

The following child content is allowed:
1. Text

#### Component-specific usage warnings

If there are any other accessibility pitfalls specific to this component, add more sections under "Advanced Usage" for those.

## Extending [component name]


