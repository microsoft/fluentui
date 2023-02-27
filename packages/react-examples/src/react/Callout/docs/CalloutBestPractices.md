### Layout

- Don’t use a callout to ask for action confirmation; use a dialog instead.
- Place a callout near the object being described. At the pointer’s tail or head, if possible.
- Don't use large, unformatted blocks of text in your callout. They're difficult to read and overwhelming.
- Don’t block important UI with the placement of your callout. It's a poor user experience that will lead to frustration.
- Don’t open a callout from within another callout.
- Don’t show callouts on hidden elements.
- Don’t overuse callouts. Too many callouts opening automatically can be perceived as interrupting someone's workflow.
- For a particularly complex concept that needs explanation, place an info icon (`iconClassNames.info`) next to the concept to indicate there's more helpful information available. When someone hovers over or selects the icon, the callout should appear.

### Content

- Because the content inside of a callout isn't always visible, don't put required information in a callout.
- Short sentences or sentence fragments are best.
- Don't use obvious tip text or text that simply repeats what is already on the screen. Limit the information inside of a callout to supplemental information.
- When additional context or a more advanced description is necessary, consider placing a link to "Learn more" at the bottom of the callout. When clicked, open the additional content in a new window or panel.

### Accessibility

If the callout is being used as a dialog (usually the case if you're moving focus within it when it is opened), then we recommend setting `role="dialog"` as demonstrated in our examples.

Other possible roles include `alert` (shown in the "Non-focusable Callout with accessible text" example), `group` (a more generic non-dialog role), or `alertdialog` (shown in the "FocusTrapCallout variant" example).
