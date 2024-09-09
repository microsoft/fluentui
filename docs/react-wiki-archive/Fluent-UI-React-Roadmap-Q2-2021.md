This roadmap represents the currently planned work for Fluent UI React for the next Quarter (April - June).

As an open source project, features not tracked on this roadmap may be submitted by the community. If you have a feature you would like to add to Fluent UI React, [file an issue](https://github.com/microsoft/fluentui/issues/new/choose) or an [RFC](https://github.com/microsoft/fluentui/tree/master/rfcs) to start the discussion!

| ⚠️ Subject to Change
|:-----------------------------------------|
|Our roadmap provides insight into our current planning and is subject to change based on new priorities, feature requests, or learnings. While we will do our best to maintain a stable roadmap, this document does not represent a firm commitment.|

| ❓ Got questions |
| :--------------- |

|Post any questions or feedback on our Roadmap over on the [Q&A Discussions](https://github.com/microsoft/fluentui/discussions/categories/q-a)

### Fluent UI vNext components (formerly Component Convergence)

- Next round of Fluent UI baseline components in experimental phase (rough priority)
  - [ ] Icon
  - [ ] Divider
  - [ ] Flex
  - [ ] Tooltip
  - [x] Button
  - [x] Badge
  - [x] Avatar
  - [ ] Menu
  - [ ] MenuButton
  - [ ] Popup
  - [ ] Text
  - [ ] FocusZone
  - [ ] FocusTrapZone
  - [ ] Accordion
  - [ ] Header
  - [ ] Input

### Fluent UI vNext foundation

- Deliver Pri 1 issues tracked here [Project: Stabilize react-components
  ](https://github.com/microsoft/fluentui/projects/42)
- Write up component model, share broadly for feedback
- Write up theming/tokens approach, share broadly for feedback
- Write up component styling approach, share broadly for feedback

### Accessibility push for @fluentui/react

- Fix several outstanding a11y issues

### Establish Fluent UI vNext roll out w/ internal partners

- Build plan jointly with partners

### Establish Monitoring and gates for key vNext benefits

There are a few key benefits customers will see when upgrading to Fluent UI vNext components. We need to establish regular measurements and monitoring for these scenarios. This is to back up our claims with real data, as well as ensure we do not accidentally regress these as we build out components.

- Performance \
  Performance benefits primarily come from our optimized approach to CSS-in-JSS (make-styles). \
  Areas to measure include:
  - Scenarios for real world CSS-in-JS overhead
  - CSS Size (savings from Atomic CSS)
  - Initial render cost
  - Re-render cost
- Bundle Size \
  We need to measure our bundle size, understand where we are at and develop and opinion for what the incremental cost of adopting Fluent UI vNext components will be. Doing so will allow us to vette this with partners and get feedback.
  - Bundle Size of utilities
  - Bundle Size of incremental scenarios (Import FluentProvider + Button)
  - Bundle Size of each component in isolation (we have this already)
  - Bundle Size of common component scenarios
- Accessibility \
  Our a11y first approach to design and implementation of Fluent UI vNext components will lead to a much more accessible set of components. As part of this we are also planning to do a11y specific usability testing for our components. Ensuring they are not only designed following best practices, but also work great for all types of users.
  - Write up key Accessibility benefits and implement measurements
- API Surface \
  One key issue with the existing Fluent UI React component library is the large surface exported from the library. With Fluent UI vNext we intend to trim this down to core component exports needed in common use cases. We are also exploring the idea of allowing advanced exports to be access through individual packages.
  - Write up key API surface benefits and implement measurements

### Improve developer productivity in the Fluent UI repo

- Reduce false build failure rate
