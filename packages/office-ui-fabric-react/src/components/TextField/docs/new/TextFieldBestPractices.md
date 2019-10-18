### Layout

- Use a multiline text field when long entries are expected
- Don’t place a TextField iin the middle of a sentence. For example, “Remind me in [textfield] weeks” should instead read, “Remind me in this many weeks [textfield]”.
- Whenever possible, format the TextField for the expected entry. For example, four fields for a four-digit PIN, three fields for a phone number.

### Content

- Include a label at the top of the text field to communicate what information should be entered.
- Text field labels should be brief and use sentence-style capitalization.
- Don’t use placeholder text instead of a label. Placeholder text poses a variety of accessibility issues (including possible problems with color/contrast, and people thinking the form input is already filled out).
- When part of a form, make it clear which fields are required vs. optional. If the input is required, add “(required)” to the label. Consider not using “\*” to - indicate required inputs as it is often not read by screen readers. For example, \<label for="name"\>First Name \<span\>(required)\</span\>\</label\>.
