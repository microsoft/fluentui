# RFC: Support for components in the Fluent UI umbrella that are not core

[@ling1726](https://github.com/ling1726)

## Summary

@fluentui/react-components has matured, with many flexible primitives that are also highly customizable. These
primitive components generally don't reuse each other and are considered the 'building blocks' of a design system.
Future design iterations might introduce components that are either:

- Very situational - i.e. applied to specific scenarios only
- Composed of multiple primitive components
- Specializations of primitive components

We need to formalise how we will deliver these components not only as first party packages but also second party
packages with our partners who might need more situational components powered by V9. This RFC refers to these kinds
of components as `non-core`.

## Problem statement

We create components that will not be shipped as a part of our 'core' components under the `@fluentui/react-components`
library but other packages. We will have to finalize the following requirements:

- Should non-core components be able to deviate from V9 core concepts?
- Should non-core components have a faster breaking change cadence?
- Should non-core components live in a separate repo?
- Should non-core components still be under the `@fluentui` scope?
- How should users consume non-core packages?
- How should non-core components be documented?
- How should code for partner owned components be hosted?

The Proposal treats each of the above questions separately and provides pros/cons for different approaches we could take.
Keep in mind that some decisions will influence other decisions.

None of the approaches are particularly complex to understand, but the resulting work could be complex. It is important
that we figure out what answers for these questions so that we can start to move forward
with technical implementation by following concrete requirements.

## Detailed Design or Proposal

### Deviating from v9 core concepts

It's difficult to formalize what 'deviating' means here, and any attempt to do so will probably not be
very future proof as the library continues to evolve. The main objective of this section is to decide whether or not
we should allow deviations from v9 core concepts (whatever they are or might be in the future). Here are some
examples of current deviations that could happen based on the current situation:

- Allowing shorthand collections
- 'Fatter' JSX elements that have more functionality
- Less customizable styles
- More opinionated layout

The short list above indicates some possibilities to have components that are less flexible in cases where
components are more specialized versions of core primitives that we don't want to maintain a large customization
feature set for, or product/scenario specific components where we want more alignment across Microsoft.

The extent of 'deviating' will have to depend on the requirements of each component, but we should be ready to accept
that we might end up delivering a set of components that don't follow the principles that drive the core library
(@fluentui/react-components).

In cases where components need to deviate, we should notify the team through specs and architecture meetings
(i.e. tech sync), what deviations are done and the context behind them. All non-core components should still
follow the V9 spec driven approach.

#### Pros

- 👍 Can enforce design across Microsoft more strictly
- 👍 Can be more flexible than core components
- 👍 Can be done on a case-by-case basis depending on requirements

#### Cons

- 👎 Can lead to a very inconsistent set of components that behave differently to each other
- 👎 Our partners might still want to customize to the max
- 👎 Approaches could be heavily biased on a subset of partners

### Breaking change cadence

#### Same cadence as core components

Breaking changes for non-core components will follow the same cadence as core components i.e.
breaking changes can only happen when @fluentui/react-components reaches v10.

##### Pros

- 👍 Predictability - nothing new compared to current library
- 👍 Good support for partners to build on

##### Cons

- 👎 Partners might not mind breaking changes for specialized components that are not used often
- 👎 Maintaining legacy for components that are not used often in applications

#### Faster than core components

Breaking changes for non-core components can occur more frequently than for core components. The proposal does not
mean that breaking changes will be taken lightly, or that there will be a requirement to make breaking changes often.

##### Pros

- 👍 Bleeding edge improvements for partners
- 👍 Specialized components might not have widespread use and can be upgraded in a few instances

##### Cons

- 👎 Cost of breaking changes has not changed
- 👎 Just because we make breaking changes does not mean users will upgrade earlier
- 👎 Need to handle urgent bugfixes for most past versions - need a clear support SLA

### Choosing a repo for

#### Current monorepo

Non-core packages should still live in the monorepo.

##### Pros

- 👍 Easier setup
- 👍 Nothing new to learn
- 👍 Issue reporting path does not change

##### Cons

- 👎 We might not want the same release cadence - releasing a fix for a non-core component would release all of core
- 👎 Extra load on the CI as more non-core components are needed
- 👎 Not possible to have more separation from core components without lots of tooling hacks

#### Separate monorepo

We can create a new monorepo for our non-core packages and depend on core packages from NPM.

##### Pros

- 👍 We can have our ideal DX
- 👍 Release cadence does not need to depend on core
- 👍 Developing our with our public API - we eat our own dogfood

##### Cons

- 👎 Needs effort to setup
- 👎 Issue reporting becomes more unclear
- 👎 Requires linking to use latest core code
- 👎 Manual/Automated bumps required to keep packages up to date

### Package scope

#### @fluentui scope

Non-core packages would be published under the same `@fluentui/` NPM scope.

##### Pros

- 👍 No need to create and manage another organization
- 👍 Easier discoverability for OSS users and internal partners

##### Cons

- 👎 Not clear that there is a difference between non-core components and core components/utilities
- 👎 Harder for us to tell the difference between non-core and core

#### New package scope

Creates a new package scope, `@fluentui-banana/` (name pending) for all components/packages that are core
or non-core.

##### Pros

- 👍 Very clear differentiation between core and non-core
- 👍 Creates a clear boundary for FUI team and partners to collaborate
- 👍 Clear path to upgrade/downgrade packages between core and non-core (i.e. experiments/compat)

##### Cons

- 👎 Need to maintain a new NPM organization and credentials
- 👎 Initially could cause some confusion if we don't communicate this well

### How users should consume components

We should keep the same architecture we currently have for our core components: one package per component. What should
be decided here is how users consume these components.

#### Suite packages

Structure non-core components into a new suite package similar to `@fluentui/react-components`.

##### Pros

- 👍 Similar to core components
- 👍 Easy to update when using multiple components

##### Cons

- 👎 Needs to follow the breaking change cadence of each components
- 👎 Slows down breaking changes for all components

#### Individual packages

Users should install each component package individually.

##### Pros

- 👍 Easy to pick and choose components that might not always be relevant
- 👍 Allows more flexible breaking change cadence

##### Cons

- 👎 Easier to install duplicate versions
- 👎 We might be encouraged to break too often

### How to depend on core components

#### Depend directly on components packages

Each non-core component should depend on the individual core components

##### Pros

- 👍 Users will always install the required core components

##### Cons

- 👎 Consumes core packages in a way we don't recommend other users
- 👎 Dependency graph could be hard to manage/track
- 👎 Internal API might become public

#### Depend on suite package is peer dependency

#### Pros

- 👍 No unnecessary dependencies - we expect users to have core suite package installed
- 👍 Other examples in OSS - Material UI/React all recommend peer dependencies
- 👍 Easy for users to consume as long as core does not break
- 👍 We test how 'complete' our public API is

#### Cons

- 👎 V10 upgrade could be unpleasant - need to check what range is supported for each package
- 👎 More of our internal API becomes public

### Documentation

Fluent UI production components should always be documented regardless of whether they are core/non-core components.
This section describes the ways to document non-core components.

#### Current docsite

Create a new section in our docsite explicitly for non-core components alongside core components.

##### Pros

- 👍 Existing infrastructure already setup
- 👍 Enforces consistent documentation approach

##### Cons

- 👎 Do we want to document non-core components in the same way?
- 👎 For separate repo, would need to think about how to consume stories
- 👎 Needs work to support independently versioned packages

#### New docsite

Creates a new docsite for non-core components that will be linked to the current docsite.

##### Pros

- 👍 It's not hard to link between docsites that share the same look and feel
- 👍 Clear boundary for users to distinguish core/non-core components
- 👍 Possible to change documentation approach

##### Cons

- 👎 Manage the infra for another domain and publish
- 👎 Needs work to support independently versioned packages

### Parnter ownership and collaboration

Partner teams might want to build scenario/product specific components, with guidance and support from the Fluent UI
team. The Fluent UI team should have a say in the quality of the code that is shipped by partner teams under the
Fluent UI umbrella and work with them to establish these quality criteria and ownership. This section proposes
two different ways we should host partner code.

#### GitHub

##### Pros

- 👍 Get different organizations in microsoft directly involved in open source

##### Cons

- 👎 Access management and compliance boundaries will be complicated
- 👎 Figure out how to make sure partners maintain their projects properly

#### ADO mirroring

Partner teams can continue to host their code in respective ADO reponsitories and we host a mirror for their
code in GitHub so that it is visible in open source for issue reporting and third party contributions.

##### Pros

- 👍 Already done in open source - React does this
- 👍 Partners can stick to the tools they know but still have open source presence

##### Cons

- 👎 Complicated infra work
- 👎 Potentially less accountability for partner teams that do this

#### Both

We let partner teams decide how they would like to participate in creating official Fluent powere components.

##### Pros

- 👍 Everybody is happy and can have a presence in open source
- 👍 Maximum microsoft coverage for open source
- 👎 Figure out how to make sure partners maintain their projects properly

##### Cons

- 👎 Cons of both solutions
- 👎 More work
- 👎 Figure out how to make sure partners maintain their projects properly
