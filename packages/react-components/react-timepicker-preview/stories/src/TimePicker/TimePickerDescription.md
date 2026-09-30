`TimePicker` offers a control that’s optimized for selecting a time from a drop-down list or using free-form input to enter a custom time.

> ⚠️ This is a preview component. Its API can change before a stable release, and it should not be used in production.

TimePicker is built on top of `Combobox`, so it shares Combobox's appearance, positioning and accessibility. It replaces `@fluentui/react-timepicker-compat`: the selection callback is now `onSelectedTimeChange` with v9 event data, and a design-free `useTimePickerBase_unstable` hook is available for custom compositions.
