# @fluentui/react-calendar-preview

**React Calendar components for [Fluent UI React](https://react.fluentui.dev/)**

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

## Utility tests

Run from the repository root:

```sh
yarn nx run react-calendar-preview:test --runInBand
TZ=Pacific/Apia yarn nx run react-calendar-preview:test --runInBand --skipNxCache
```

The test target collects coverage and requires 100% statement, branch, function, and line coverage for each executable file under `src/utils`. Type-only files and re-export barrels are excluded. Tests cover date arithmetic, input validation, grid selection and restrictions, work-week fallback, localization, deferred focus, and data attributes.

The timezone run exercises Samoa's skipped December 30, 2011. Deterministic normalization tests also cover this regression in the default test run, independent of the machine's timezone.
