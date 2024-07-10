# How to treat API's marked with the `unstable` suffix

There are many hooks and functions throughout this library marked with the `_unstable` suffix.

This is due to legacy decisions in the early days of v9 development, when there was a chance these API's might change.

Since then, the library has continued to move and grow. However stability was something we've learned partners value highly, so we've also embraced that value.It was concluded that these API's should not be changed, even to rename them.

Renaming an API to remove the suffix would be a breaking change. Marking the `_unstable` API's as `@deprecated`with JSDocs and re-exporting them would also trip many teams linters and cause friction for consuming teams.

**We treat API's with the `_unstable` suffix as stable, and our consumers should do also consider them stable.**

One step consuming teams can do to reduce friction as they import `_unstable` API's is to rename and re-export them at an abstraction layer local to their project.

We are actively working towards a solution that removes this point of friction for consuming teams, and will update this document accordingly.
