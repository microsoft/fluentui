`AriaLiveAnnouncer` provides a sample implementation of an `aria-live` region that can be used to announce messages to screen readers.

It injects announcements into the DOM, and also exposes a function (to its children in a React tree) that can be used to announce messages. It's designed to be used with `useAnnounce()` or `useTypingAnnounce()` hooks.

For debugging information, check our [Debugging Notifications](./?path=/docs/concepts-developer-accessibility-notification-debugging--docs) docs page.

To learn more about `aria-live` regions, see [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions).
