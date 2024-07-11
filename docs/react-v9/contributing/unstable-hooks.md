# How to treat API's marked with the `_unstable` suffix

There are many hooks and functions throughout this library marked with the `_unstable` suffix.

This is due to legacy decisions in the early days of v9 development, when there was a chance these API's might change.

Since then, the library has continued to move and grow. We've learned stability is something partners treasure, so we've also embraced that value. It was concluded that these API's should not be changed, even to rename them in the v9 iteration of Fluent UI React.

Renaming an API to remove the suffix would be a breaking change. Marking the `_unstable` API's as `@deprecated`with JSDocs and re-exporting them would also trip many teams linters and cause friction for consuming teams.

**In our stable packages, we treat API's with the `_unstable` suffix as stable. Our consumers should also consider them stable.** This should be considered simply a naming bug at this point.

**Stable packages :**

- Are under "Components" on react.fluentui.dev
- Has a 9.x.y version number
- Is exported from @fluentui/react-components

**Unstable packages :**

- Are under "Preview Components" on react.fluentui.dev
- Have a 0.x.y version number
- Have `-preview` suffix on the package name
- Are never exported from @fluentui/react-components

Consuming teams can reduce friction as they import `_unstable` API's by renaming and re-exporting them at an abstraction layer local to their project.

We are actively working towards a solution that gracefully removes this point of friction for consuming teams, and will update this document accordingly.
