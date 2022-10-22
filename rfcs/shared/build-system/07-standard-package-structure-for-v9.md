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
|- src/
  |- components/
    |- {ComponentName}/ //implementation, unit and cypress test files
      |- index.ts
      |- {ComponentName}.tsx
      |- {ComponentName}.types.ts
      |- {ComponentName}.test.tsx
      |- {ComponentName}.cy.tsx
      |- render{ComponentName}.tsx
      |- use{ComponentName}.tsx
      |- use{ComponentName}Styles.ts
  |- utils/ //shared implementation or utility files
    |- index.ts
    |- shared-component-types.types.ts
    |- some-function-or-hook.ts
  |- testing/
    |- index.ts
    |- isConformant.ts
    |- some-testing-utility.ts
    |- your-mock-test.mock.ts //mock testing files to be used in multiple tests within package
  |- index.ts
  |- {componentName}.ts
CHANGELOG.json
CHANGELOG.md
package.json
README.md
```

We will be extracting stories out of the `src` folder and moving those to the root of the package within a `stories/` subfolder. The asset files will also need to be moved to the appropriate `assets` subfolder. The `.npmignore` file will then be updated to ignore any asset files and files living within the documentation folder.

Also, the old `common/` folder which caused confusion and unexpected linting errors will now be replaced with a more robust `testing/` subfolder within the `src` folder to house the conformance testing factory and any mock or utility testing files to be used in multiple tests within a package.

The final change will be removing the `e2e/` subfolder and collocating all cypress component tests with the implementation and jest test files. The motivation for this is that we use cypress to test components on a real browser and not as a true e2e solution so calling it e2e is a bit misleading. Nx also collocates those cypress component test files with standard jest files so having them together from the get go provides more consistency.

## Pros and Cons

### Pros

- Defined standard for v9 package folder structure for developers to reference.
- Prevents shipment of unnecessary files to npm.
- Decoupling to subfolders will allow for better scope alignment for future CI work.

### Cons

- More moving of files around.

## Open Issues

- [#22289](https://github.com/microsoft/fluentui/issues/22289)
- [#23976](https://github.com/microsoft/fluentui/issues/23976)
