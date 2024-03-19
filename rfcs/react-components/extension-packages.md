<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [RFC: Support for extension packages in the Fluent UI umbrella that are not core](#rfc-support-for-extension-packages-in-the-fluent-ui-umbrella-that-are-not-core)
  - [Summary](#summary)
  - [Problem statement](#problem-statement)
  - [Detailed Design or Proposal](#detailed-design-or-proposal)
    - [Design driven approach](#design-driven-approach)
      - [Pros](#pros)
      - [Cons](#cons)
    - [Deviating from v9 core concepts](#deviating-from-v9-core-concepts)
      - [Pros](#pros-1)
      - [Cons](#cons-1)
    - [Core team involvement](#core-team-involvement)
    - [Competing implementations](#competing-implementations)
      - [Resolving competing implementations](#resolving-competing-implementations)
    - [Elevating extension to core library](#elevating-extension-to-core-library)
    - [Different breaking change cadence](#different-breaking-change-cadence)
      - [Pros](#pros-2)
      - [Cons](#cons-2)
    - [How to depend on core components](#how-to-depend-on-core-components)
    - [Packages scope and hosting](#packages-scope-and-hosting)
      - [New package scope](#new-package-scope)
      - [Self code hosting](#self-code-hosting)
      - [Documentation federation](#documentation-federation)
      - [Publish credentials](#publish-credentials)
      - [Pros/Cons](#proscons)

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
that we figure out the answers for these questions so that we can start to move forward
with technical implementation by following concrete requirements.

## Detailed Design or Proposal

### Design driven approach

Any extension pacakge that involves UI components will follow the same design driven approach that all Fluent UI core
components undergo. Each component should have a design spec and technical spec. The technical spec should be co-located
with component implementation.

There should be clear process for any potential contributors to request design guidnace and request a design spec or
formalize a design spec in the Fluent UI design language.

#### Pros

👍 Reduce competing design requirements
👍 Satisfy design requirements for larger audience

#### Cons

👎 Slower velocity for partner teams

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
  👍 No competing design requirements

#### Cons

- 👎 Can lead to a very inconsistent set of components that behave differently to each other
- 👎 Our partners might still want to customize to the max
- 👎 Approaches could be heavily biased on a subset of partners
  👎 Can have competing technical implementations

### Core team involvement

We want to allow partner teams and contributors to iterate quickly on their components while providing guidance
on following best practices in Fluent UI and React. The RFC proposes that each extension package should have a
point of contact with a feature crew. The responsible crew should be involved in reviewing PRs in a non-blocking
way (i.e. the review should not be required) and also the point of contact for external contributors to address
questions to.

The ownership of extension packages by external teams should stay with the external teams. Issues reported
should be handled by the owners of the extension package.

### Competing implementations

The nature of extension packages, as mentioned earlier, is to be more requirement specific and less general. However,
this means that different contributors could have different requirements even for the same kind of UI control. In these
cases, competing implementations are acceptable.In these cases the actual UI control should have a single design
spec that is the source of truth for the visuals.

Naming conflicts will be resolved by contributor teams, this is similar to publishing any package on NPM, and would
be the case if these contributors were to publish their own implementations outside of the Fluent UI umbrella. Some
examples of conflicts that would result in competing implementations:

- Flexible vs Strict API usage
- Style customisability
- Feature customisability
- Performance optimized implementation for different scenarios

#### Resolving competing implementations

Any effort to resolve competing implementations or any conflicts should be the initiative of the owners of the extension
packages. The Fluent UI team can be involved to provide guidance and suggestions for any kind of convergence there, but
the implementation work should be carried out by the respective owners of these extension packages.

### Elevating extension to core library

Extension packages should be able to be elevated to the core library on request or need. This should involve reviews of:

- Design fidelity
- API core principles
- Performance benchmark

before an extension component can be elevated to the core library. The extension package should be deprecated and replaced
with a new package that follows the naming conventions and versioning of the core library.

Example:

1. Contributor creates `@fluentui-contrib/react-people-picker`
2. Contributor requests the Fluent UI team for elevation
3. Fluent UI team assigns a memeber to review the package
4. Changes are proposed to `@fluentui-contrib/react-people-picker`
5. Changes are implemented to `@fluentui-contrib/react-people-picker`
6. Fluent UI team creates new package `@fluentui/react-people-picker@9.0.0`

Once a package is elevated to the core library, the ownership should be shared between the Fluent UI team and original
authors.

Any packages with competing implementations cannot be elevated until the competing implementations converge.

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

We can look at a case by case basis if more concrete dependencies on the core library are needed. This policy should
be enforced by automation that needs to be disabled in the cases where stricter dependencies are necessary.

### Packages scope and hosting

#### New package scope

A new scope `@fluentui-contrib/` will be created for extension packages that will be a part of the Fluent umbrella.
However these packages are not considered a part of the core library. These packages must follow the requirements
mentioned earlier above.

There is no obligation to publish under this scope. However the requirements we set will be only be minimal to
ensure some consistency under the Fluent UI umbrella, which will build confidence for users who want to consume
Fluent UI conformant packages.

#### Self code hosting

Code for `@fluentui/contrib` packages should be self hosted. The Fluent UI team will provide bootstraping utilities
for contributors to set up their repositories and have:

- build
- type check
- linting
- unt tests
- browser tests
- playground/storybook
- publishing

We plan to leverage [NX](https://nx.dev/) which supports migrations, so that any updates made to build infra should
be easy to consume by partners' repositories.

This build and infra should be aligned towards our ideal goal for the Fluent UI monorepo to avoid diverging. This will
also ensure that partners can easily consume all the improvements the Fluent UI build team deliver.

There is no obligation to publish to the `@fluentui/contrib` scope. These tools can be used by anyone to create
a publishable library, and their usefulness can extend to beyond UI components to even creating utility libraries.
Publishing reusable libraries are not obvious and often publishers need to worry about:

- Transpilation
- Correct package.json format
- Typings
- Distributed artifacts

We want to help users who don't have experience publishing libraries succeed with a minimal learning curve.

#### Monorepo code hosting

In addition to self code hosting, this RFC proposes to initially create a monorepo aligned with the current
Fluent UI monorepo DX direction. This will reduce the barrier for entry for initial partners to onboard and
gives the v-build team early feedback to the intended monorepo direction.

As the initiative scales, there should be an active push to get partners to self host code using our monorepo creation
utilities proposed in the previous section.

#### Documentation federation

The repo scaffolding tools that we intend to create should setup a storybook infrastructure. We can leverage
storybook federation so that all documentation for contributor packages will be visible from the Fluent UI docsite.

#### Publish credentials

The Fluent UI team will be responsible for distributing publishing credentials to contributors that want to publish
packages under the `@fluentui-contrib/` scope. NPM allows [creating granular access tokens](https://docs.npmjs.com/creating-and-viewing-access-tokens) that can be scoped for specific packages.

In order for a contributor to publish their code, they must submit a request to the Fluent UI team for access credentials
which should be given after a review of:

- Design spec
- Code/API architecture
- Repo build and infra
- Documentation alignment with Fluent UI

#### Pros/Cons

- 👍 Fluent UI allows partners to iterate quickly
- 👍 Fluent UI will make the final decision on requirements before publishing
- 👍 Easy way to track large numbers of contributor packages - must request publishing permission
- 👍 Partners can setup 'ready to publish' repository easily
- 👍 Partners can use whatever code platform they want
- 👍 Documentation will be in one place (Fluent UI docsite)

- 👎 Work needed to implement build/infra that can be shared
- 👎 Need to maintain build/infra
- 👎 Fluent UI team needs to be proactive maintaining links to contributors
