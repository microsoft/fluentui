Our repository structure is an important topic to touch on as it is the gateway into contributing to our codebase.

## Folders

At the root level, there are general configuration files for the repository (such as package.json, prettier.config.js, tsconfig.json, yarn.lock, etc.) as well as a number of different folders, including:

- `apps`: Contains a number of non-published packages used for internal purposes, such as tests and the website.
- `packages`: Contains our published packages that cover everything from styling, theming and utilities to the components that make the Fluent UI React library.
- `packages/fluentui`: Contains packages, utilities, and tests specific to `@fluentui/react-northstar`
- `scripts`: Contains most of the scripts used for the inner loop build system and for the monorepo management.
- `specs`: Contains technical specs that lay the foundation on which a number of different components are built, although it is not being frequently updated as of now.
- `typings`: Contains custom type definitions for custom global types and packages which don't have `@types` or included declaration files.

## Relevant published packages

**NOTE: The info below DOES NOT currently cover `@fluentui/react-components` and related packages from the latest convergence work!**

Below is some information about some of the most relevant published packages, as they are where most of the work we do happens.

Note: The repo structure and packages will change over time as we converge existing libraries. This is the reason for the current complexity with these packages.

First we have the packages that directly deal with the set of components we provide for consumption:

- `@fluentui/react`: Exports the official finished components which we plan to support long-term or which we plan to provide good migration paths if major changes are made. This is a suite package that mostly re-exports components in other packages, but a few components live here right now to avoid circular dependencies.
- `@fluentui/react-northstar` (under `packages/fluentui/react-northstar`): This package contains the set of components that is mainly consumed by the Teams web application. The set of packages under `packages/fluentui` contains utilities associated with these components.
- `@fluentui/react-{component}`: This set of packages (with some exceptions outlined below) contains work on versions of the components that are expected to use our new composition and styling approaches, which should address the needs of both `react` and `react-northstar` variants in their design (used in v9+, we call these components "converged"). These packages are in varying states of active work and completeness.
  - `@fluentui/react-cards`: This package exports the non-converged version of Card. The converged-WIP version is `@fluentui/react-card` (singular).
  - `@fluentui/react-focus`: Contains the `FocusZone` component which is re-exported by the suite package.
  - Other old packages (see below): `@fluentui/react-charting`, `@fluentui/react-date-time`, `@fluentui/react-experiments`

Then we have those packages that, while not having components in them, are supporting on how we build them:

- `@fluentui/merge-styles`: This package includes the inner workings of our existing styling solution used in most of the components in the suite package.
- `@fluentui/make-styles`: This package contains explorations on newer styling solutions that are being experimented with to solve the problems that exist with today's styling solution.
- `@fluentui/style-utilities`: This package includes a number of styling helpers required by most Fluent UI React components.
- `@fluentui/utilities`: This package includes a number of basic utility functions required by most Fluent UI React components.
- `@fluentui/theme`: This package includes all the building blocks to create a theme to be consumed by Fluent UI React components.

The below packages are worth knowing about but are mostly not actively worked on by our team:

- `@fluentui/react-charting`: This package has ongoing work but is owned and developed by a separate team. It does not follow most of the patterns that exist in the rest of the repo and we should consider splitting it out in the future.
- `@fluentui/react-date-time`: Previously contained Calendar and DatePicker. As of version 8, these have moved to the suite and this package just re-exports them.
- `@fluentui/react-experiments`: This is a legacy package that was used for developing experimental components and proving out ideas. Some things in there are actively worked on or used by other teams while others have been abandoned. More discussion about this package [can be found here](https://github.com/microsoft/fluentui/issues/16452).
