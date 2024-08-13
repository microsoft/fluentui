Fluent UI focus management is handled by [Tabster](http://tabster.io/). Tabster is intended to be used as the
only focus management framework in an application. However, it's understandable that applications might need to accomodate
other focus management frameworks. In these cases, the `useUncontrolledFocus` hook can be used to explicitly
remove explicit focus controlling for a region of DOM.

This is particularly useful to support legacy v8 focus management components such as `FocusZone` and `FocusTrapZone`
