Communicates important information about the state of the entire application or surface.
For example, the status of a page, panel, dialog or card. The information shouldn't require someone
to take immediate action, but should persist until the user performs one of the required actions.

In multiline layout, the message body's text area is limited to 520px and shrinks with the available
width. Actions remain aligned to the end of the bar. Single-line layout does not apply this limit.
With `layout="auto"`, the limit follows automatic reflow as the container is resized.

> ⚠️ For `aria-live` announcements to work correctly you should configure you application with a
> <a href="https://react.fluentui.dev/?path=/docs/utilities-aria-live-arialiveannouncer--docs">AriaLiveAnnouncer</a>
> towards the top of the React tree.
