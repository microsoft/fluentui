# Add a feature for `@fluentui/react-northstar` (and others under `packages/fluentui`)

**NOTE: Please see [this wiki page](https://github.com/microsoft/fluentui/wiki/Contributing) for the current feature proposal process. This page is kept for reference until the guidance can be merged.**

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Propose feature](#propose-feature)
- [Prototype](#prototype)
- [Spec out the API](#spec-out-the-api)
- [Create a component](#create-a-component)
  - [How to create a component](#how-to-create-a-component)
  - [Good practice](#good-practice)
  - [Display Name and Class Name](#display-name-and-class-name)
  - [Using prop interfaces and propTypes](#using-prop-interfaces-and-proptypes)
  - [State](#state)
  - [Conformance Test](#conformance-test)
  - [Performance Test](#performance-test)
  - [Add doc site example](#add-doc-site-example)
  - [Commit Messages](#commit-messages)
- [Open PR](#open-pr)
- [Review & Finalize](#review--finalize)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Propose feature

Before starting on a new feature, be sure it has been approved by the maintainers and community. To do that, please file an RFC under the [Issues][1] tab so that a decision can be taken quicker. Doing this will potentially save you wasted time.

## Prototype

Build a minimal prototype showcasing the proposed feature. Do not worry about testing or documentation at this phase, this is just to push some changes for collaborative review.

## Spec out the API

Review the documentation for the component. Spec out the component's proposed API. The spec should demonstrate how component's API you are proposing will be used by Fluent UI consumer. You can reference this [API proposal][2] for the Menu Icons.

Once the component spec is solidified, it's time to write some code. The following sections cover everything you'll need to spec and build your awesome component.

## Create a component

### How to create a component

You can create a new component `MyComponent` by following the example of an existing component (e.g. Button).

The corresponding component directory trees should be created in correct places:

- the component under `packages/fluentui/{package}/src/components/MyComponent`,
  - the docs under `packages/fluentui/docs/src/examples/components/MyComponent`,
- the tests under `packages/fluentui/{package}/test/specs/components/MyComponent`

`{package}` is likely going to stand for `react-northstar` if you are contributing a component to the main package.

You can customize the styles of your component by adding necessary variables and styles as part of your theme.
E.g. for update on the `teams` theme: `/src/themes/`

### Good practice

Generally if you're updating a component, push a small change so that your PR could be reviewed quickly.

Stateless components should be written as an arrow function:

```tsx
const Button: React.FunctionalComponent = props => {
  // ...
};
```

Stateful components should be classes:

```tsx
import { AutoControlledComponent as Component } from '../../utils';

class Dropdown extends AutoControlledComponent {
  // ...
}
```

You can now iterate on the component code and your doc site example will hot reload your changes. Use this workflow to iterate on the prototype for your proposed feature.

### Display Name and Class Name

Every component has two static properties called `displayName` and `className`. The values here are used for generated documentation, generated test cases and some utilities.

Here's an example:

```ts
  static displayName = 'Accordion'
  static className = 'ui-accordion'
```

### Using prop interfaces and propTypes

Every component must have fully described `MyComponentProps` interface and `propTypes`.

```tsx
import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
 ChildrenComponentProps,
 ContentComponentProps,
 UIComponentProps,
 commonPropTypes,
} from '../../utils'

export interface DividerProps
 extends UIComponentProps,
   ChildrenComponentProps,
   ContentComponentProps {
 /**
  * Accessibility behavior if overridden by the user.
  */
 accessibility?: Accessibility

 /** A divider can be fitted, without any space above or below it.  */
 fitted?: boolean

 /** Size multiplier (default 0) * */
 size?: number

 /** A divider can appear more important and draw the user's attention. */
 important?: boolean
}

// ...

 static propTypes = {
    ...commonPropTypes.createCommon({ color: true }),
    fitted: PropTypes.bool,
    important: PropTypes.bool,
    size: PropTypes.number,
 }
```

### State

Strive to use stateless functional components when possible:

```tsx
export interface MyComponentProps {}

const MyComponent: React.FunctionalComponent<MyComponentProps> = props => {
  return <div {...props} />;
};
```

If you're component requires event handlers, it is a stateful class component. Want to know [why][8]?

```tsx
export interface MyComponentProps {}

class MyComponent extends AutoControlledComponent<MyComponentProps> {
  handleClick = e => {
    console.log('Clicked my component!');
  };

  render() {
    return <div onClick={this.handleClick} />;
  }
}
```

### Conformance Test

Review [common tests](test-a-feature.md#common-tests) below. You should now add the [`isConformant()`](test-a-feature.md#isconformant-required) common test and get it to pass. This will validate the `displayName` and `className` and multiple other aspects to help you get your component off the ground.

### Performance Test

Add a [performance test](test-a-feature.md#performance-tests) to set a baseline performance measurement for your component and guard against future regressions.

### Add doc site example

Create a new documentation example that demonstrates usage of the new feature.

1. Create a new example in `packages/fluentui/docs/src/examples/components` under the appropriate component.
1. Add your example to the `index.ts` in respective directory.
1. Running `yarn start` should now show your example in the doc site.

### Commit Messages

Please follow the [Angular Git Commit Guidelines][6] format.

## Open PR

Open a PR as soon as possible with as little code as necessary to show the feature. This way, we can iteratively collaborate on the design of the feature.

## Review & Finalize

After iterating on the feature with the maintainers, you will add full test coverage and documentation. See the individual guides for instructions.

- [Test a component](test-a-feature.md)
- [Writing documentation](document-a-feature.md)

[1]: https://github.com/microsoft/fluentui/issues
[2]: https://github.com/microsoft/fluent-ui-react/pull/73
[3]: https://github.com/microsoft/fluentui/blob/master/packages/fluentui/react-northstar/src/utils/AutoControlledComponent.tsx
[4]: https://facebook.github.io/react/docs/forms.html#controlled-components
[5]: https://facebook.github.io/react/docs/forms.html#uncontrolled-components
[6]: https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit
[7]: https://microsoft.github.io/fluent-ui-react/glossary
[8]: https://github.com/Semantic-Org/Semantic-UI-React/issues/607
