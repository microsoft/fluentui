## Accessibility

When the ScrollView has no focusable children, the container itself should be given `tabIndex: 0` so that it can be scrolled with the keyboard. If it does contain focusable descendants, this is not necessary.
