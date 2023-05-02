# Text area

## Component Description


A text area is a type of input field that allows users to enter multiple lines of text. It is commonly used in web forms and text editors to provide a space for users to input large amounts of text, such as comments, messages, or other types of content.

## Design Spec

[Link to Design Spec in Figma](https://www.figma.com/file/IBCBJxEbPKS7CvLHG55Wn9/Slider?node-id=513%3A510&t=hCOhOiQJVCVNVVJP-0)

## Engineering Spec

### Inputs

- @attr placeholder: string
- @attr resize: "none" "both" "horizontal" "vertical" | "none"
- @attr value: string
- @attr rows: number
- @attr columns: number
- @attr name: string
- @attr autofocus: boolean
- @attr autocomplete: "on" "off" | "off"
- @attr disabled: boolean | false
- @attr minlength: number
- @attr maxlength: number

### Outputs

None

### Events

- @change: Fires whenever the  user modifies of the text area value

### Slots
- default: The default slot for the label

### CSS Variables

None

## Accessibility

- [x] Find the matching component through WCAG's patterns: https://www.w3.org/WAI/ARIA/apg/patterns/
  - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea
- [x] Are there any accessibility elements unique to this component?
- [x] List ARIA attributes
  - @attr aria-label: string
  - @attr aria-labelledby: string
  - @attr aria-describedby: string
  - Use ARIAGlobalStatesAndProperties from @microsoft/fast-foundation
- [x] What keyboard behaviors does the component support?
  - Up / Down : Moves focus between text line


## Preparation

This will extend the FASTElement.
