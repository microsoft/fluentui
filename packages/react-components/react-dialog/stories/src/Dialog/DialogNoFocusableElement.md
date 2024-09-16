A `Dialog` **should** always have at least one focusable element.
Some accessibility issues might happen if no focusable element is provided, like this one caught in [Talkback](https://issuetracker.google.com/issues/243456562?pli=1).

In the case when there is no focusable element inside a `Dialog` the only way to close the `Dialog` would be clicking on the `backdrop`.

> A common scenario for no focusable elements on a dialog is lazy loaded content, where the content (with focusable elements) is added after the Dialog is mounted. In that case, it is recommended to manually focus on the desired focusable element after the content is loaded.
