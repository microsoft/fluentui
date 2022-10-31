---
name: (internal) Component implementation epic
about: (team member use only) Epic issue tracking implementation of a particular component
---

<!--
These issues are used by core contributors to track the list of items that should be
completed as part of creating a v9 component. More info can be found here: https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide
-->

https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide

## Preparation

- [ ] [Open UI Research](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#open-ui-research)
  - [link to https://open-ui.org/]
- [ ] [Open GitHub issues related to component](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#find-open-issues-on-github)
  - [link to each issue]
- [ ] [Create react-\* package and component from template](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#component-package)
  - [link to PR]
  - [link to package: `https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-<your-component>`]
- [ ] (Optional) [Draft implementation](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#draft-implementation)
  - [link to PR, if applicable]
- [ ] [Component Spec authored and reviewed](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#component-spec)
  - [link to spec in component package / PR]

## Implementation and release to unstable

- [ ] Component implementation
  - [link(s) to component implementation related PRs]
- [ ] Add initial unit tests (validate basic functionality)
- [ ] Initial documentation
  - [ ] Storybook stories
  - [ ] README.md covering basic usage
  - [ ] MIGRATION.md guide (include v8 and v0)
- [ ] Component exported from `@fluentui/react-components/unstable`
  - [link to PR]

## Stable release

- [ ] Add tests
  - [ ] Bundle size fixtures ([link to PR])
  - [ ] Conformance tests ([link to PR])
  - [ ] Unit tests ([link to PR])
  - [ ] VR tests ([link to PR])
  - [ ] Accessibility behavior tests ([link to PR])
  - [ ] Create an issue and run [manual accessibility tests](https://github.com/microsoft/fluentui/wiki/Manual-Accessibility-Review-Checklist): (issue link)
  - [ ] Performance test scenario ([link to PR])
- [ ] Validate in product
- [ ] Finalize migration guide
  - [ ] Author codemods
