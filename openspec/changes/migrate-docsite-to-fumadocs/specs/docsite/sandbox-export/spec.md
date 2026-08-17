## Purpose

Defines the behaviour of exporting a documented example into an online code sandbox, so readers can
run and modify any example in a working project without manually assembling dependencies.

## ADDED Requirements

### Requirement: Every rendered example can be exported to a code sandbox

Each example rendered on the documentation site SHALL offer a control that opens that example in an
online code sandbox as a complete, runnable project.

#### Scenario: Reader exports an example

- **WHEN** a reader activates the export control on an example
- **THEN** a code sandbox opens in a new browser context containing a runnable project for that example

#### Scenario: Exported project runs without modification

- **WHEN** the exported sandbox finishes installing and starting
- **THEN** the example renders in the sandbox as it does on the documentation page
- **AND** no manual edits were required

#### Scenario: Export is available on every example

- **WHEN** any example on any component page is inspected
- **THEN** an export control is present

### Requirement: Exported projects declare complete and correct dependencies

An exported project SHALL declare every package its source imports, SHALL pin the versions the
documentation site requires, and SHALL NOT declare packages the example does not use.

#### Scenario: Imported packages are declared

- **WHEN** an example imports a package
- **THEN** the exported project declares that package as a dependency

#### Scenario: Required packages are always present

- **WHEN** any example is exported
- **THEN** the exported project declares the framework and component-library packages the site requires, at the site's configured versions

#### Scenario: Relative and sub-path imports are not treated as packages

- **WHEN** an example's source contains relative imports or sub-path imports of an already-declared package
- **THEN** no spurious dependency entry is produced for them

### Requirement: Exported projects are correctly scaffolded

An exported project SHALL include the configuration, entry point, and application shell needed to
build and run, and SHALL wrap the example in the component library's provider.

#### Scenario: Project includes required scaffolding

- **WHEN** an example is exported
- **THEN** the project contains an entry point, an application shell, the example source, and build and package configuration

#### Scenario: Example is wrapped in the library provider

- **WHEN** an exported project runs
- **THEN** the example is rendered inside the component library's theme provider

#### Scenario: Sandbox opens focused on the example source

- **WHEN** the sandbox opens
- **THEN** the example's source file is the file presented to the reader

### Requirement: CSS Module styles survive export

Where an example is styled with CSS Modules, the exported project SHALL include those stylesheets
and any shared design-token stylesheet the example depends on, with imports resolving correctly.

#### Scenario: CSS Module is included

- **WHEN** an example styled with a CSS Module is exported
- **THEN** the exported project contains that stylesheet
- **AND** the example's import of it resolves

#### Scenario: Shared token stylesheet is included

- **WHEN** an example's styles depend on shared design tokens
- **THEN** the exported project contains the token stylesheet and applies it

### Requirement: Export works without the component workbench

The export capability SHALL be usable by any host application given an example's source and
configuration. It SHALL NOT depend on the component workbench's runtime, page structure, or DOM.

#### Scenario: Host provides inputs directly

- **WHEN** a host supplies an example's source, export name, target provider, and dependency configuration
- **THEN** a complete sandbox project is produced

#### Scenario: No workbench DOM is required

- **WHEN** the export capability runs in a host that has no component-workbench markup
- **THEN** the export succeeds

#### Scenario: Document access is supplied by the host

- **WHEN** the export capability needs a document to perform the sandbox handoff
- **THEN** it uses a document supplied by the host rather than an ambient global

### Requirement: Export failures are reported to the reader

If an export cannot be completed, the reader SHALL be informed. The failure SHALL NOT be silent and
SHALL NOT leave the page in a broken state.

#### Scenario: Export failure is surfaced

- **WHEN** the sandbox handoff fails
- **THEN** the reader is shown an error message
- **AND** the page remains usable
