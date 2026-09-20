## Best practices

### Do

- If your Spinner is the only element on the page, set tabIndex={0} on it to allow it to be picked up by screen readers.
- Use a Spinner when a task is not immediate.
- Use one Spinner at a time.
- Descriptive verbs are appropriate under a Spinner to help the user understand what's happening. Ie: Saving, processing, updating.
- Use a Spinner when confirming a change has been made or a task is being processed.
- Add a description to a Spinner when reduced-motion is active

### Don't

- Don’t use a Spinner when performing immediate tasks.
- Don't show multiple Spinners at the same time.
- Don't include more than a few words when paired with a Spinner.
