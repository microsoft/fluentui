---
name: (internal) Component convergence epic
about: (team member use only) Epic issue tracking convergence of a particular component
---

<!--
These issues are used by core contributors to track the list of items that should be
completed as part of converging a component. More info can be found here: https://github.com/microsoft/fluentui/wiki/Component-Convergence-Guide
-->

## Preparation:

- [ ] Open UI Research
  - [link to https://open-ui.org/]
- [ ] Open GitHub issues related to component
  - [link to each issue]
- [ ] react-\* package scaffolded with the right ownership in CODEOWNERS
  - [link to package / PR]
- [ ] Component Spec authored and reviewed
  - [link to spec in component package / PR]

## Implementation

[link to react-* package folder]

- [ ] Component implementation
  - [link(s) to component implementation related PRs]
- [ ] Storybook stories
  - [link(s) to stories PRs]
- [ ] Add tests: Conformance, Unit, and VR -- add PRs to all
  - [ ] Bundle size fixtures
  - [ ] Conformance tests
  - [ ] Unit tests
  - [ ] VR tests
  - [ ] Accessibility behavior tests
  - [ ] Create an issue and run [manual accessibility tests](https://github.com/microsoft/fluentui/wiki/Manual-Accessibility-Review-Checklist): (issue link)
  - [ ] Performance test scenario
- [ ] README.md covering basic usage
- [ ] MIGRATION.md guide (include v8 and v0)

## Validation

- [ ] Add and validate in UI Builder
- [ ] Add and validate in docs site
- [ ] Validate with token pipeline
- [ ] Validate in product
- [ ] Finalize migration guide
  - [ ] Author codemods
