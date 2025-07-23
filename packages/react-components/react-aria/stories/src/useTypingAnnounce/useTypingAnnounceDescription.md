`useTypingAnnounce` takes a reference to an element (which should be an `input`, `textarea`, or `contenteditable`) and returns a ref to put on the editable input element and a `typingAnnounce` function with the same paramters as the `announce` function returned by `useAnnounce`.

The purpose of `useTypingAnnounce` is to enable screen reader announcements that need to fire while a user is typing, without the announcement conflicting with screen reader keyboard feedback. `typingAnnounce()` will wait until the user stops typing for at least 0.5s before firing the live region.

It is fine to call `typingAnnounce` multiple times in quick succession with updates based on user typing (e.g. for a character limit), so long as all messages have the same `batchId`; only the last message will be announced when the user stops typing. If no `batchId` or different `batchId`s are provided, then all messages will be announced once the user stops typing. For more on `batchId`, see the [AriaLiveAnnouncer docs](http://localhost:3000/?path=/docs/utilities-aria-live-useannounce--docs).

Like `useAnnounce`, `useTypingAnnounce` relies on the existance of either an ancestor `AriaLiveAnnouncer` or a custom live region implementation + `AnnounceProvider`.
