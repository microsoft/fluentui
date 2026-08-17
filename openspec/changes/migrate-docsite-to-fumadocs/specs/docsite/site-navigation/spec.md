## Purpose

Defines how readers and machines find their way around the documentation site — its two content
trees, navigation ordering, search, machine-readable output, static serving with no server runtime,
and coexistence with the component workbench it is published alongside.

## ADDED Requirements

### Requirement: The site serves two documentation trees

The documentation site SHALL serve the styled component library and the headless component library
as two distinct, separately navigable trees, each with its own navigation, while sharing one search
index, one theme, and one deployment.

#### Scenario: Reader switches between trees

- **WHEN** a reader switches from one documentation tree to the other
- **THEN** the navigation updates to that tree's contents
- **AND** the reader remains on the same site without a full page reload

#### Scenario: Each tree has an independent navigation root

- **WHEN** a reader browses one tree's navigation
- **THEN** only that tree's pages are listed

### Requirement: Navigation order is explicitly defined

The order of sections and pages in the navigation SHALL be explicitly declared content, not derived
from file names or page titles. Pages not explicitly ordered SHALL still appear, in a deterministic
position.

#### Scenario: Declared order is honoured

- **WHEN** a reader views the navigation
- **THEN** sections and pages appear in the declared order

#### Scenario: Undeclared page still appears

- **WHEN** a page exists that the ordering declaration does not mention
- **THEN** the page still appears in the navigation in a deterministic position
- **AND** the build does not fail

### Requirement: Readers can search all documentation content

The site SHALL provide full-text search across both trees, covering page prose, component names, and
example names.

#### Scenario: Search finds a component page

- **WHEN** a reader searches for a component's name
- **THEN** that component's page appears in the results

#### Scenario: Search finds prose content

- **WHEN** a reader searches for a phrase that appears only in a conceptual page's body
- **THEN** that page appears in the results

#### Scenario: Search spans both trees

- **WHEN** a reader searches for a term documented in both trees
- **THEN** results from both trees are returned and distinguishable

### Requirement: Documentation is published in a machine-readable form

The site SHALL publish a machine-readable summary of its contents and a per-page plain-text
rendering, generated from the same content the site renders.

#### Scenario: Summary index is published

- **WHEN** a client requests the site's machine-readable summary
- **THEN** it receives an index listing each documented page with its title, description, and address

#### Scenario: Per-page plain text is published

- **WHEN** a client requests a page's plain-text rendering
- **THEN** it receives the page's title, description, properties, and examples with their source

#### Scenario: Machine-readable output matches rendered content

- **WHEN** a page's content changes
- **THEN** its machine-readable rendering reflects the change in the same build

### Requirement: The site is served as static files

The documentation site SHALL be published as static files requiring no server runtime. Every page
SHALL resolve directly, without depending on host rewrite rules or a single-page-application
fallback.

#### Scenario: Deep link resolves without rewrite rules

- **WHEN** a client requests any documentation page address directly, on a host that serves static files and applies no rewrite rules
- **THEN** that page is returned

#### Scenario: Search operates without a server

- **WHEN** a reader searches on a site served purely as static files
- **THEN** results are returned
- **AND** no request is made to a server-side search endpoint

#### Scenario: Site is served from a sub-path

- **WHEN** the site is published beneath a sub-path rather than at a domain root
- **THEN** navigation, assets, and internal links all resolve correctly

### Requirement: Existing published sites are not disturbed

This documentation site SHALL be published at addresses not previously in use. Addresses already
published for the component workbench SHALL continue to serve the workbench, unchanged.

#### Scenario: Workbench addresses are unaffected

- **WHEN** a client requests an address previously published for the component workbench
- **THEN** the workbench is served as before
- **AND** no redirect is issued

#### Scenario: New site occupies unused addresses

- **WHEN** the documentation site is published
- **THEN** it occupies addresses that served no content beforehand

### Requirement: Readers can move between the two sites

Each site SHALL link to the other so a reader who lands on either can reach the equivalent content.
Once the documentation site reaches content parity, the workbench's documentation experience SHALL
present a deprecation notice directing readers to it, while remaining fully published and functional.

#### Scenario: Documentation site links to the workbench

- **WHEN** a reader views the documentation site
- **THEN** a link to the component workbench is offered

#### Scenario: Workbench shows a deprecation notice after parity

- **WHEN** a reader views the workbench's documentation experience after content parity is reached
- **THEN** a notice states it is deprecated and links to the documentation site

#### Scenario: Deprecated workbench remains functional

- **WHEN** a reader continues using the workbench after the notice appears
- **THEN** all of its pages remain reachable and functional

### Requirement: Content not migrated remains reachable

Documentation intentionally left on the component workbench SHALL be reachable from the site's
navigation as clearly marked outbound links.

#### Scenario: Charts documentation is linked

- **WHEN** a reader looks for charts documentation
- **THEN** the navigation offers an outbound link to it
- **AND** the link is marked as leaving the site

#### Scenario: Migration-shim documentation is linked

- **WHEN** a reader looks for version-migration documentation
- **THEN** the navigation offers an outbound link to it

### Requirement: Internal links are verified at build time

The build SHALL fail when a page links to a documentation address that does not exist.

#### Scenario: Broken internal link fails the build

- **WHEN** a page links to a non-existent documentation address
- **THEN** the build fails
- **AND** the error identifies the source page and the broken address
