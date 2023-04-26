<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [RFC: Support for extension packages in the Fluent UI umbrella that are not core](#rfc-support-for-extension-packages-in-the-fluent-ui-umbrella-that-are-not-core)
  - [Summary](#summary)
  - [Problem statement](#problem-statement)
  - [Detailed Design or Proposal](#detailed-design-or-proposal)
    - [Deviating from v9 core concepts](#deviating-from-v9-core-concepts)
      - [Pros](#pros)
      - [Cons](#cons)
    - [Different breaking change cadence](#different-breaking-change-cadence)
      - [Pros](#pros-1)
      - [Cons](#cons-1)
    - [How to depend on core components](#how-to-depend-on-core-components)
    - [Core team involvement](#core-team-involvement)
    - [Packages scope and hosting](#packages-scope-and-hosting)
      - [Option 1: Current monorepo using existing scope](#option-1-current-monorepo-using-existing-scope)
        - [Pros](#pros-2)
        - [Cons](#cons-2)
      - [Option 2: New package scope and monorepo](#option-2-new-package-scope-and-monorepo)
        - [Pros](#pros-3)
        - [Cons](#cons-3)
    - [Documentation](#documentation)
      - [Current docsite](#current-docsite)
        - [Pros](#pros-4)
        - [Cons](#cons-4)
      - [New docsite](#new-docsite)
        - [Pros](#pros-5)
        - [Cons](#cons-5)
    - [Partner code hosting](#partner-code-hosting)
      - [GitHub](#github)
        - [Pros](#pros-6)
        - [Cons](#cons-6)
      - [ADO mirroring](#ado-mirroring)
        - [Pros](#pros-7)
        - [Cons](#cons-7)
      - [Both](#both)
        - [Pros](#pros-8)
        - [Cons](#cons-8)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# RFC: Support for extension packages in the Fluent UI umbrella that are not core

[@ling1726](https://github.com/ling1726) [@layershifter](https://github.com/layershifter)

## Summary

@fluentui/react-components has matured, with many flexible primitives that are also highly customizable. These
primitive components generally don't reuse each other and are considered the 'building blocks' of a design system.
Future design iterations might introduce components that are either:

- Very situational - i.e. applied to specific scenarios only
- Composed of multiple primitive components
- Specializations of primitive components

We need to formalise how we will deliver these components not only as first party packages but also second party
packages with our partners who might need more situational components powered by V9. This RFC refers to these kinds
of components as `extension`.

## Problem statement

We create components that will not be shipped as a part of our 'core' components under the `@fluentui/react-components`
library but other packages. We will have to finalize the following requirements:

- Should extension components be able to deviate from V9 core concepts?
- Should extension components have a faster breaking change cadence?
- Should extension components live in a separate repo?
- Should extension components still be under the `@fluentui` scope?
- How should users consume extension packages?
- How should extension components be documented?
- How should code for partner owned components be hosted?
- How much involvement should the core team have?

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
(i.e. tech sync), what deviations are done and the context behind them. All extension components should still
follow the V9 spec driven approach.

We will allow deviating from core V9 principles in extension packages. However, any differences will need to be
justified and discussed with the core team.

#### Pros

- 👍 Can enforce design across Microsoft more strictly
- 👍 Can be more flexible than core components
- 👍 Can be done on a case-by-case basis depending on requirements

#### Cons

- 👎 Can lead to a very inconsistent set of components that behave differently to each other
- 👎 Our partners might still want to customize to the max
- 👎 Approaches could be heavily biased on a subset of partners

### Different breaking change cadence

Breaking changes for extension components can occur more frequently than for core components. The proposal does not
mean that breaking changes will be taken lightly, or that there will be a requirement to make breaking changes often.

##### Pros

- 👍 Bleeding edge improvements for partners
- 👍 Specialized components might not have widespread use and can be upgraded in a few instances

##### Cons

- 👎 Cost of breaking changes has not changed
- 👎 Just because we make breaking changes does not mean users will upgrade earlier
- 👎 Need to handle urgent bugfixes for most past versions - need a clear support SLA

### How to depend on core components

All extension packages should begin with a peer dependency on `@fluentui/react-components`. This is the recommendation used
by [material-ui](https://mui.com/material-ui/getting-started/faq/#v4-why-arent-my-components-rendering-correctly-in-production-builds)
for OSS authors that want to extend the library. This recommendation is made to [reduce duplicates in bundle](https://github.com/facebook/react/issues/13346#issuecomment-515079922).

We can look at a case by case basis if more concrete dependencies on the core library are needed.

### Core team involvement

We want to allow partner teams and contributors to iterate quickly on their components while providing guidance
on following best practices in Fluent UI and React. The RFC proposes that each extension package should have a
point of contact with a feature crew. The responsible crew should be involved in reviewing PRs in a non-blocking
way (i.e. the review should not be required) and also the point of contact for external contributors to address
questions to.

The ownership of extension packages by external teams should stay with the external teams. Issues reported
should be handled by the owners of the extension package.

### Packages scope and hosting

#### Option 1: Current monorepo using existing scope

All extension packages will use the same `@fluentui/` scope. Two new prefixes will be introduced:

- `@fluentui/labs-` - For experimental packages that need validating - replacement for pre-release tags
- `@fluentui/contrib-` - For official extensions to the core library

##### Pros

- 👍 Easier setup
- 👍 Nothing new to learn
- 👍 Extension packages always use latest code
- 👍 Issue reporting path does not change

##### Cons

- 👎 We might not want the same release cadence - releasing a fix for a extension component would release all of core
- 👎 More release script work
- 👎 Extra load on the CI as more extension components are needed
- 👎 Not possible to have more separation from core components without lots of tooling hacks
- 👎 Issue reporting path does not change

#### Option 2: New package scope and monorepo

Creates a new package scope, `@fluentui-contrib/` for all components/packages that are extensions. All packages
with this new scope will be hosted in a separate monorepo.

##### Pros

- 👍 Very clear differentiation between core and extension
- 👍 Creates a clear boundary for FUI team and partners to collaborate
- 👍 Clear path to upgrade/downgrade packages between core and extension (i.e. experiments/compat)

##### Cons

- 👎 Need to bump core dependencies
- 👎 Need to maintain a new NPM organization and credentials
- 👎 Initially could cause some confusion if we don't communicate this well

### Documentation

Fluent UI production components should always be documented regardless of whether they are core/extension components.
This section describes the ways to document extension components.

#### Current docsite

Create a new section in our docsite explicitly for extension components alongside core components.

##### Pros

- 👍 Existing infrastructure already setup
- 👍 Enforces consistent documentation approach

##### Cons

- 👎 Do we want to document extension components in the same way?
- 👎 For separate repo, would need to think about how to consume stories
- 👎 Needs work to support independently versioned packages

#### New docsite

Creates a new docsite for extension components that will be linked to the current docsite.

##### Pros

- 👍 It's not hard to link between docsites that share the same look and feel
- 👍 Clear boundary for users to distinguish core/extension components
- 👍 Possible to change documentation approach

##### Cons

- 👎 Manage the infra for another domain and publish
- 👎 Needs work to support independently versioned packages

### Partner code hosting

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
code in GitHub so that it is visible in open source for issue reporting and third party extensionutions.

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
