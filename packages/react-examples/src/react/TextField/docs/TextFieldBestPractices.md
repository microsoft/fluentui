### Layout

- Use a multiline text field when long entries are expected.
- Don't place a text field in the middle of a sentence, because the sentence structure might not make sense in all languages. For example, "Remind me in [textfield] weeks" should instead read, "Remind me in this many weeks: [textfield]".
- Format the text field for the expected entry. For example, when someone needs to enter a phone number, use an input mask to indicate that three sets of digits should be entered.

### Content

- Include a short label above the text field to communicate what information should be entered. Don't use placeholder text instead of a label. Placeholder text poses a variety of accessibility issues (including possible problems with color/contrast, and people thinking the form input is already filled out).
- When part of a form, make it clear which fields are required vs. optional. If the input is required, add an asterisk "\*" to the label. For screen readers, make sure the `aria-required` property is set to `true`.
- Use sentence-style capitalization—only capitalize the first word. For more info, see [Capitalization](https://docs.microsoft.com/style-guide/capitalization) in the Microsoft Writing Style Guide.
