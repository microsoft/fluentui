The hooks `useRestoreFocusSource` and `useRestoreFocusTarget` are intended to be used together, but without tight
coupling.

When the attribute returned by `useRestoreFocusSource` is applied to an element, it will be ready to restore focus
to the last 'bookmarked' element that was set using `useRestoreFocusTarget`. The restore focus target
**needs to be focused** before focus is lost from a source. This is to prevent focus randomly jumping across
an application but being restored to the an element at the closest point in time.

The examples below simulate a feedback experience. One a user submits feedback, the control will be removed from
the page and the focus will need to revert from the body (since the focused element was removed).
