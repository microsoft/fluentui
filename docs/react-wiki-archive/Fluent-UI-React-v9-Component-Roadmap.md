Below you will find the last updated roadmap for the build out of Fluent UI React components.

for our overall roadmap see the [Fluent UI React Roadmap](Fluent-UI-React-Roadmap)

Note: These dates are approximate targets for a component and are subject to change as we iterate through the development process.

## What does the status mean?

For the general component lifecycle please read: [Component Lifecycle](https://dev.to/paulgildea/fluent-ui-react-component-lifecycle-29n5)

### ❓TBD

This is on the roadmap, but the team is not actively working on the component yet.

### 🔍 Reseach

1. A scaffolded/prototyped component within the defined feature scope
2. Relative high confidence estimation on when the component will reach the next phase on a quarter boundary

### ⚠️ Preview/Unstable

The main criteria for moving from Research to an Unstable component is:

1. Component publicly available via granular package with `*-preview` suffix ( example `@fluentui/react-one-preview@0.1.0` )

- > NOTES 💡:
  >
  > - these packages use zero major semver `0.x.y`, where `x` bumps mean "major(breaking changes)/feature" releases and `y` is for fixes
  > - initially we used for **`@fluentui/react-components/unstable` deep import** from for exposing unstable packages, which **is now deprecated** and no longer applies for new controls.

2. Component has a majority of the feature set complete, but may still be added or removed
3. Relative high confidence estimation on when the component will reach the next phase on a quarter boundary

### 🎉 Stable

The main criteria for moving from Unstable to Stable phase is:

1. Component exported from the top level of the UI library
2. Component is design and feature complete
3. Future API changes will occur according to semver
4. Component can be used in Production
5. The component has gone through a long list of testing

Essentially the component is ready to be used.

### Timelines and Estimates

The team tends to estimate component completion from start to finish for roughly 2 quarters. This is highly dependent on the complexity of the component, but that gives partner teams enough time to plan and set expectations on timelines. We also check in mid-quarter to notify of any changes to the schedule, as that should give runway to adapt to any changes. Quarters are based on the Financial Year.

## Component Rollout

- [Fluent UI React Component Build-out Roadmap](https://github.com/orgs/microsoft/projects/786)
- [Fluent UI React Components in StoryBook](https://react.fluentui.dev/)
