Dropdown is accessible if these considerations are followed:

- Use the `aria-expanded` property to convey expanded and collapsed states to the screen readers.
- Provide a static label to the dropdown.
- Use the `aria-describedy` property to make sure the currently selected option is announced by a screen reader.
- Make sure options are implemented inside a list so that screen readers could announce the position for every option.
- `Enter` key should expand the dropdown.
- When the dropdown is expanded, pressing `Enter` would collapse the dropdown and select the current highlighted option.
- Selecting the `Up/Down` arrow should take the focus to next/prev option respectively.
- Selecting the `Home/End` key should take the focus to first/last option respectively.
- When the dropdown is collapsed, `Up/Down` arrow should expand the dropdown and place the focus on first/last option respectively.
