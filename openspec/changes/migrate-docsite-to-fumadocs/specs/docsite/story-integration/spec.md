## Purpose

Defines how the documentation site sources its runnable examples from the existing Storybook story
modules, so that example code has exactly one authored copy in the repository and cannot drift
between the component workbench and the published documentation.

## ADDED Requirements

### Requirement: Stories are the single source of truth for examples

The documentation site SHALL render examples by consuming the same story modules that the component
workbench consumes. The site SHALL NOT contain a second authored copy, transcription, or generated
duplicate of any example's implementation.

#### Scenario: An example is changed once and updates everywhere

- **WHEN** a contributor edits the implementation of an example in its story module
- **THEN** the component workbench and the documentation site both reflect the change after a rebuild
- **AND** no other file in the repository required editing to propagate it

#### Scenario: No duplicated example source exists

- **WHEN** the repository is inspected for a given example
- **THEN** exactly one file contains that example's implementation
- **AND** that file is the story module

#### Scenario: Adding a new example requires no documentation-site edit

- **WHEN** a contributor adds a new example and re-exports it from its component's story entry point
- **THEN** the example appears on the corresponding documentation page without editing that page

### Requirement: Example descriptions resolve identically in both hosts

Descriptions authored alongside examples SHALL be resolved by the documentation site to the same
text the component workbench resolves, whether the description is authored in a sibling Markdown
file or inline in the story module's metadata.

#### Scenario: Description authored in a sibling Markdown file

- **WHEN** a component's story entry point composes its description from sibling Markdown files
- **THEN** the documentation page renders that composed description
- **AND** the rendered text matches what the component workbench renders

#### Scenario: Description authored inline in story metadata

- **WHEN** an individual example carries a description string in its story metadata
- **THEN** the documentation page renders that description with the example
- **AND** Markdown formatting within the string is rendered, not shown literally

#### Scenario: Component has no authored description

- **WHEN** a component's story entry point provides no description
- **THEN** the page renders without a description block and without error

### Requirement: Displayed source is standalone and runnable

For every rendered example, the site SHALL present source code that is self-contained: it SHALL
resolve internal package imports to the public package entry point, SHALL exclude workbench-specific
metadata, and SHALL contain only the declarations that example actually uses.

#### Scenario: Internal imports are rewritten to the public entry point

- **WHEN** an example's story module imports from an internal component package
- **THEN** the displayed source imports from the public package entry point instead

#### Scenario: Workbench metadata is excluded

- **WHEN** an example's story module assigns workbench-only metadata to the example
- **THEN** that metadata does not appear in the displayed source

#### Scenario: Unrelated declarations are excluded

- **WHEN** a story module file declares helpers or types used only by a different example in the same file
- **THEN** those declarations do not appear in the displayed source for this example

#### Scenario: Styles authored as CSS Modules are included

- **WHEN** an example styles itself with a CSS Module
- **THEN** the CSS Module's contents are available alongside the displayed source

### Requirement: Story modules unsupported by the site fail the build

Where a story module relies on a capability the documentation site does not support, the failure
SHALL surface at build time with the offending module identified. The site SHALL NOT silently omit
the example or render a blank preview.

#### Scenario: Unsupported story is detected during build

- **WHEN** the site is built and a story module uses an unsupported authoring capability
- **THEN** the build fails
- **AND** the error names the story module and the unsupported capability

### Requirement: Migration-shim examples are excluded

Examples belonging to the version-migration shim packages SHALL NOT be built into the documentation
site. Their documentation SHALL remain reachable by an outbound link.

#### Scenario: Shim packages are not bundled

- **WHEN** the documentation site is built
- **THEN** no legacy major-version component library is present in its output bundle

#### Scenario: Shim documentation is still reachable

- **WHEN** a reader looks for migration-shim documentation from the site navigation
- **THEN** an outbound link to the component workbench is presented
