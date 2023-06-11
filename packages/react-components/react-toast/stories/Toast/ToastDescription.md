<!-- Don't allow prettier to collapse code block into single line -->
<!-- prettier-ignore -->
> **⚠️ Preview components are considered unstable:**
>
> ```jsx
>
> import { Toast } from '@fluentui/react-components/unstable';
>
> ```
>
> - Features and APIs may change before final release
> - Please contact us if you intend to use this in your product

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
