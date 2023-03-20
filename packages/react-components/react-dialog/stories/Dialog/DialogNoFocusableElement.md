A `Dialog` **should** always have at least one focusable element.
Some accessibility issues might happen if no focusable element is provided, like this one caught in [Talkback](https://issuetracker.google.com/issues/243456562?pli=1).

In the case no focusable element is present inside a `Dialog` the only method
that would close the `Dialog` would be clicking on the `backdrop`
