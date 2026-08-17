## Purpose

Defines the structure and interactive behaviour of a component documentation page, so that readers
get a consistent, accessible, themable presentation of every component and its examples.

## ADDED Requirements

### Requirement: Component pages follow a consistent section order

A component documentation page SHALL present its sections in a stable order: title, page-level
controls, subtitle, description, primary example, properties table, then remaining examples.
Sections with no content SHALL be omitted rather than rendered empty.

#### Scenario: Page renders sections in order

- **WHEN** a reader opens a component page that has all content types
- **THEN** the sections appear in the defined order

#### Scenario: Empty sections are omitted

- **WHEN** a component provides no subtitle
- **THEN** no empty subtitle element is rendered

#### Scenario: Each example is individually addressable

- **WHEN** a reader navigates to an example's anchor
- **THEN** the page scrolls to that example
- **AND** the anchor is stable across rebuilds

### Requirement: Examples render as live, isolated, interactive previews

Every example SHALL be rendered as a live, interactive component instance in the browser. Examples
that hold internal state, use timers, or access browser APIs SHALL function correctly, and SHALL NOT
cause a server-rendering failure.

#### Scenario: Stateful example is interactive

- **WHEN** a reader interacts with an example that maintains internal state
- **THEN** the example responds and updates

#### Scenario: Example using browser APIs does not break rendering

- **WHEN** a page contains an example that accesses browser-only APIs
- **THEN** the page renders successfully
- **AND** no server-rendering error is produced

#### Scenario: One failing example does not blank the page

- **WHEN** a single example throws while rendering
- **THEN** the rest of the page and its other examples still render
- **AND** an error state is shown in place of the failing example

### Requirement: Readers can view and copy example source

Each rendered example SHALL offer a way to reveal its source code with syntax highlighting, and to
copy that source to the clipboard.

#### Scenario: Reader reveals source

- **WHEN** a reader activates the source control on an example
- **THEN** the example's standalone source is displayed with syntax highlighting

#### Scenario: Reader copies source

- **WHEN** a reader activates the copy control
- **THEN** the displayed source is placed on the clipboard

### Requirement: Component properties are documented from type definitions

A component page SHALL present a properties table derived from the component's TypeScript type
definitions, listing each property's name, type, whether it is required, its default, and its
description. Sub-components SHALL be documented the same way.

#### Scenario: Properties table is populated from types

- **WHEN** a reader views a component page
- **THEN** a properties table lists the component's public properties with name, type, required flag, default, and description

#### Scenario: Sub-components are documented

- **WHEN** a component declares sub-components
- **THEN** each sub-component's properties are documented in the same form

#### Scenario: Property types stay in sync with source

- **WHEN** a component's public property type changes
- **THEN** the published properties table reflects the change after a rebuild without manual editing

### Requirement: Slot and native-property support is disclosed consistently

Where a component accepts a slot or forwards native element properties, the page SHALL disclose this
and SHALL render the property's type in a readable, abbreviated form. The same abbreviation SHALL be
applied to every consumer of the property data.

#### Scenario: Slot property is shown in abbreviated form

- **WHEN** a property's underlying type is a slot shorthand
- **THEN** the properties table shows the abbreviated slot form rather than the expanded type
- **AND** a note explaining slot customization is shown on the page

#### Scenario: Native property support is disclosed

- **WHEN** a component forwards native properties for a known set of elements
- **THEN** the page states that native properties are supported and names those elements

#### Scenario: Abbreviation is applied uniformly

- **WHEN** property data is consumed by the page and by machine-readable documentation output
- **THEN** both present the same abbreviated type for the same property

### Requirement: Readers can change theme and text direction

A component page SHALL let readers switch the theme applied to its examples and toggle text
direction. The selection SHALL apply to every example on the page and SHALL persist while the reader
navigates within the documentation site.

#### Scenario: Theme selection applies to all examples

- **WHEN** a reader selects a different theme
- **THEN** every example on the page re-renders under that theme

#### Scenario: Text direction toggle applies to all examples

- **WHEN** a reader switches text direction to right-to-left
- **THEN** every example on the page renders right-to-left

#### Scenario: Selection persists across navigation

- **WHEN** a reader changes theme and navigates to another documentation page
- **THEN** the chosen theme is still applied

#### Scenario: Theme control is omitted where not applicable

- **WHEN** a documentation tree declares that theme switching does not apply
- **THEN** no theme control is rendered on its pages

### Requirement: Page content is available as Markdown

Each component page SHALL offer readers a way to obtain the page's content as Markdown suitable for
pasting into a language model.

#### Scenario: Reader copies page as Markdown

- **WHEN** a reader activates the copy-as-Markdown control
- **THEN** the page's title, description, properties, and examples are placed on the clipboard as Markdown

### Requirement: Component pages are accessible

Component documentation pages SHALL be operable by keyboard and SHALL announce dynamic changes to
assistive technology.

#### Scenario: Page controls are keyboard operable

- **WHEN** a reader navigates the page using only a keyboard
- **THEN** every page control can be reached and activated
- **AND** focus order follows the visual order

#### Scenario: Automated accessibility checks pass

- **WHEN** automated accessibility checks are run against a component page
- **THEN** no violations are reported for the page chrome
