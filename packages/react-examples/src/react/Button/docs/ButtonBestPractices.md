### Layout

- For dialog boxes and panels, where people are moving through a sequence of screens, right-align buttons with the container.
- For single-page forms and focused tasks, left-align buttons with the container.
- Always place the primary button on the left, the secondary button just to the right of it.
- Show only one primary button that inherits theme color at rest state. If there are more than two buttons with equal priority, all buttons should have neutral backgrounds.
- Don't use a button to navigate to another place; use a link instead. The exception is in a wizard where "Back" and "Next" buttons may be used.
- Don't place the default focus on a button that destroys data. Instead, place the default focus on the button that performs the "safe act" and retains the content (such as "Save") or cancels the action (such as "Cancel").

### Content

- Use sentence-style capitalization—only capitalize the first word. For more info, see [Capitalization](https://docs.microsoft.com/style-guide/capitalization) in the Microsoft Writing Style Guide.
- Make sure it's clear what will happen when people interact with the button. Be concise; usually a single verb is best. Include a noun if there is any room for interpretation about what the verb means. For example, "Delete folder" or "Create account".

### Accessibility

- SplitButton automated test error: because the SplitButton variant is a single tab stop with two actions (the primary action and the menu), we have a parent button that gets keyboard focus and two individual buttons nested within it. This covers the widest range of practical accessibility scenarios, but causes an automated error that should be ignored. The v9 SplitButton does not have this issue because it is treated as two separate tab stops.
