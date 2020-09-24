The purpose of tests in this package is to ensure that `@fluentui/react-northstar` and its subpackages can be consumed without issues in different environments and bundlers.

## FAQ

#### A module is not exported

```
./node_modules/@fluentui/react-northstar/dist/es/components/Datepicker/DatepickerCalendar.js
Attempted import error: 'getEndDateOfWeek' is not exported from '@fluentui/date-time-utilities'.
```

Tests in this package consider all packages outside `packages/fluentui` as third party dependencies. If you met such issue please split your changes into two separate PRs: one PR will contain changes to `@fluentui/date-time-utilities`, for example, and another to `@fluentui/react-northstar`. Once your changes to `@fluentui/date-time-utilities` will be published (packages outside of `packages/fluentui` are releasing daily) you will be able to use them in the second PR and pass the test.

As packages inside `packages/fluentui` have a different release cycle which could lead to shipping a broken code. For example, your changes will be shipped in `@fluentui/date-time-utilities@2.0.0` on next day, release will be done by `beachball` and it will bump version to `2.0.0`. However, today it will be still `1.0.0`, this means that if we release `@fluentui/react-northstar` it will have a dependency on `@fluentui/date-time-utilities@1.0.0` and we will get a broken release.
