Communicates important information about the state of the entire application or surface.
For example, the status of a page, panel, dialog or card. The information shouldn't require someone
to take immediate action, but should persist until the user performs one of the required actions.

> ⚠️ For `aria-live` announcements to work correctly you should configure you application with a
> <a href="https://storybooks.fluentui.dev/react/?path=/docs/utilities-aria-live-arialiveannouncer--docs">AriaLiveAnnouncer</a>
> towards the top of the React tree.

## Best practices

### Do

- Use MessageBar components inside MesssageBarGroup
- Include a dismiss button as the container action
- Reduce number of actions in the MessageBar
- Use preset intents

### Don't

- Use enter animations on page load
- Use manual layout if possible - this is a built-in feature
- Use long messages for content - keep content to under 100 characters
- Customize announcement politeness - check with your a11y champ
