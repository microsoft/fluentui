A Toasts displays temporary content to the user. Toasts are rendered as a separate surface that can be dismissed by
user action or a application timeout. Toasts are typically used in the following situations:

- Update the user on the status of a task
- Display the progress of a task
- Notify the user to take an action
- Notify the user of an application update
- Warn the user of an error

The Fluent UI Toast component uses an **imperative** API. Once a Toaster has been rendered, you can use the
`useToastController` hook to get access to imperative methods to dispatch a Toast. The Toast component itself
is simply a layout component.

> ⚠️ In order for notifications that use toast to be fully accessible, developers should include make the notifications
> available on a permanent surface too. One of the ways to do this in an application is to implement a notification
> centre.

## Best practices

### Do

- Configure defaults on the Toaster
- Use the toast for non-critical messages
- Let the user view the toast content in the application after the toast dismissed
- Create a keyboard shortcut to move focus to actionable toasts
- Use `politeness` setting to differentiate urgent and non-urgent messages

### Don't

- Render too many toasts at once
- Use different positions for toasts
- Use more than one Toaster in an application
- Make every toast have `assertive` politeness
