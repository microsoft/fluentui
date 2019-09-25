ChoiceGroup is accessible if these considerations are followed:

- Tab focus should take focus on the currently selected radio button.
- When no radio button is selected, focus should fall on the first radio button.
- Space key should select the radio button.
- Arrow keys should take the focus to next / previous radio button and select the respective radio button.
- Pressing down arrow at the last radio button should take the focus to first radio button and pressing up arrow on first radio button should take focus to the last radio button.
- For custom radio buttons, use role="radio" to make screen readers recognize it as a radio button and use `aria-checked` property to convey the state to screen readers.
- Use `role="radiogroup"` on the container containing the radio buttons, this will help screen readers identify it as a group control. Alternatively, fieldsets and legends could be used to accomplish same purpose.
- The container acting as a radio group should be associated with the choice group label using `aria-labelledby`, this should make screen reader announce the choice group label as soon as the focus reaches into the group for the first time.
- Don’t associate the choice group label to individual radio buttons as this would make the screen reader read group label with every radio button which would make screen reader quite verbose. Associate the label to the radio group container instead.
