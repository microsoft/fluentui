# RFC: File Organization Convention for v9 Packages

Contributors: @TristanWatanabe, @Hotell

## Summary

Fluent v9 is currently lacking a standard on how v9 package files should be structured. This RFC aims to provide a single source of truth on how files should be organized within each v9 package to provide consistency across all v9 packages and to prevent shipping any unnecessary files to npm.

## Problem Statement

Fluent v9 does not have a defined standard on how v9 files should be organized within each respective package. There is currently no standard for where asset files and documentation files such as specs and migration guides should be stored which leads to inconsistency, clutter and shipment of irrelevant files to npm.

## Detailed Design or Proposal

The proposed folder organization can be seen below:

```
|- docs/
  |- assets/
  |- MIGRATION.md
  |- SPEC.md
|- stories/
  |- assets/
  |- {componentName}/ //story files
|- e2e/
  |- assets/
  |- e2e tests
|- src/
  |- common/
  |- components/ //implementation and test files
  |- index.ts
  |- {componentName}.ts
CHANGELOG.json
CHANGELOG.md
package.json
README.md
```

We're already following this convention when it comes to e2e so most of the work will be extracting stories out of the `src` folder and moving those to the root of the package. The asset files will also need to be moved to the appropriate `assets` subfolder. And finally, the `.npmignore` file will then be updated to ignore any asset files and files living within the documentation folder.

## Pros and Cons

### Pros

- Defined standard for v9 package folder structure for developers to reference.
- Prevents shipment of unnecessary files to npm.
- Decoupling to subfolders will allow for better scope alignment for future CI work.

### Cons

- More moving of files around.

## Open Issues

- [#22289](https://github.com/microsoft/fluentui/issues/22289)
