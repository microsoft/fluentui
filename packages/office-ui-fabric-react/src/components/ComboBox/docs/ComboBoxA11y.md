ComoboBox is accessible if these considerations are followed:

- Use `role="combobox"` in the case of custom implementation to make screen readers identify it as combobox.
- Make sure the control has an associated label either using `<label, for, id>`.
- Use `aria-expanded` property to expose expanded/collapsed state to screen readers.
- The options within the combobox should be listed so that screen readers could read out the position for every option.
- `Up/Down` arrow should select next/previous option both when combobox is expanded or collapsed.
- `Home/End` key should select first/last option respectively.
- When a combobox is editable, Home/End key would move cursor to beginning or end respectively in the text field.
- Options should get sorted as per the character keys pressed.
- `Alt+Down arrow` should expand the combobox.
- `Enter` key would select currently highlighted option and collapse the list.
- `Esc` key would select the currently highlighted option and collapse the list.
