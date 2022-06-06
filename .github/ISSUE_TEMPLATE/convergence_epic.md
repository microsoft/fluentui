---
name: (internal) Component convergence epic
about: (team member use only) Epic issue tracking convergence of a particular component
---

<!--
These issues are used by core contributors to track the list of items that should be
completed as part of converging a component. More info can be found here: https://github.com/microsoft/fluentui/wiki/Component-Convergence-Guide
-->

# Preparation:

- [ ] Started prep
- [ ] Open UI Research complete
  - [link to https://open-ui.org/]
- [ ] Comparison on v8 and v0 complete
- [ ] Gather open GitHub issues related to component
- [ ] react-\* package scaffolded
  - [link to package]
- [ ] Component Spec authored and reviewed
  - [link to spec in component package]
- [ ] **Deliverable:** Reviewed component spec

# Implementation

[link to react-* package folder]

- [ ] Started impl
- [ ] Implement component
- [ ] Add storybook stories
- [ ] Using hooks
- [ ] Using makeStyles
- [ ] Respects Figma tokens (and using provider)
- [ ] Respects API principles, shorthands and slots handling
- [ ] No dependency on v0/v7
- [ ] Add tests - Conformance, Unit, and VR
  - [ ] Bundle size fixtures
  - [ ] Conformance tests
  - [ ] Unit tests
  - [ ] VR tests
  - [ ] Accessibility behavior tests
  - [ ] Create an issue and run [manual accessibility tests](https://github.com/microsoft/fluentui/wiki/Manual-Accessibility-Review-Checklist): (issue link)
- [ ] Write README.md covering basic usage
- [ ] Write initial MIGRATION.md guide (include v8 and v0)
- [ ] Set component ownership in CODEOWNERS
- [ ] **Deliverable:** Experimental component ready for partner use, component re-exported in `react-components`

# Validation

- [ ] Started validating
- [ ] Add and validate in UI Builder
- [ ] Add and validate in docs site
- [ ] Validate with token pipeline
- [ ] Validate in product
- [ ] Finalize migration guide
  - [ ] Author codemods
- [ ] **Deliverable:** Preview component ready for broader/3rd party use
