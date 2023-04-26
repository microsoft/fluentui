# RFC: Space bar handling in Combobox component

[@jurokapsiar](https://github.com/jurokapsiar) [@smhigley](https://github.com/smhigley)

## Problem statement

In the current version of Combobox, the space key always selects the current option.

This has been done based on a user study. Study shows users prefer to use Space to select in addition to Enter. Enter is also used in forms to submit a form, making users unsure about the result of pressing Enter.

This however makes it hard for the users to find options that contain a space in them, for example multi-word options, names, states or cities. Pressing Space selects the highlighted option, while it is not clear if the user's intent was to select or to find an option containing space.

## Proposal

### Option 1

Currently, there is an agreement on inserting a space character when `freeform` variant is used and the user has not interacted with the dropdown list.

See [feat: react-combobox space conditionally inserts character when freeform is true](https://github.com/microsoft/fluentui/pull/27025) for details.

The proposal is to extend this to all vairants of Combobox:

- When the focus is in the input of the Combobox, pressing Space should insert a space character
- When the focus is in the dropdown list, pressing Space should select the highlighted value
- No change in Enter key handling.

### Option 2

Keep the current behavior and introduce a prop that allows developers to stop Space from selecting an option when focus is ine input.

The risk is that the developer nor the designer is usually not in a position to make a correct decision on the value of the prop. The options are almost in all cases either translations or user data. We would be requring the developer or designer to understand all possible translations across supported languages or understand validations of the user data. At the same time, user has no way of understanding if pressing Space would cause the option to be selected or not.

This option is aligned with the results of user survey.
