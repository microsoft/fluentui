<!-- Disable markdown rule as we need duplicate headers to show multiple pros/cons for the sections -->
<!-- markdownlint-disable MD024 -->

# RFC: React 18 upgrade

[@marcosmoura](https://github.com/marcosmoura)
[@mainframev](https://github.com/mainframev)

---

- [RFC: React 18 upgrade](#rfc-react-18-upgrade)
  - [Summary](#summary)
  - [Problem statement](#problem-statement)
  - [Detailed Design or Proposal](#detailed-design-or-proposal)
    - [Breaking Changes](#breaking-changes)
    - [What is not covered by this RFC](#what-is-not-covered-by-this-rfc)
  - [Options](#options)
    - [Option 1: Release a new major version of Fluent UI](#option-1-release-a-new-major-version-of-fluent-ui)
      - [Pros](#pros)
      - [Cons](#cons)
        - [Option 1-a: New Slot APIs](#option-1-a-new-slot-apis)
          - [Pros](#pros-1)
          - [Cons](#cons-1)
        - [Option 1-b: New Slot APIs with compat layer](#option-1-b-new-slot-apis-with-compat-layer)
          - [Pros](#pros-2)
          - [Cons](#cons-2)
        - [Option 1-c: Just add React 18 support by updating types](#option-1-c-just-add-react-18-support-by-updating-types)
          - [Pros](#pros-3)
          - [Cons](#cons-3)
    - [Option 2: Release a new minor version of Fluent UI](#option-2-release-a-new-minor-version-of-fluent-ui)
      - [Pros](#pros-4)
      - [Cons](#cons-4)

## Summary

This RFC outlines the ideas and implementation to effectively add React 18 support for Fluent UI. This will also briefly mention on plans to migrate the whole repository to React 18.

## Problem statement

Currently, Fluent UI lacks support for React 18 out of the box. Due to type changes in React 18, the current Fluent UI codebase works but have issues with the types and new features present only in React 18.

## Detailed Design or Proposal

The goal is to make updates to our type system codebase to accommodate the breaking changes found in @types/react. Unfortunately, breaking changes are unavoidable, but this RFC outlines the steps to make the transition as smooth as possible.

### Breaking Changes

As of now, the following breaking changes are present in React 18:
**TODO**: Add breaking changes here

### What is not covered by this RFC

Please note that even though our efforts on this RFC take into consideration React 19 as a future goal, the full support will be discussed in a separate RFC.

## Options

Since the breaking changes are unavoidable, the following options are available to make the transition as smooth as possible:

### Option 1: Release a new major version of Fluent UI

This option involves releasing a new **major** version of Fluent UI. This will involve updating the type definitions and making necessary changes to the codebase to accommodate the breaking changes. This will follow semantic versioning and will be a major release, which, as off now, means a release of a version number **10**.

The release will include the necessary type changes, documentation updates and any other changes required. This approach comes with super big challenges.

#### Pros

- 👍 Big breaking changes following semantic versioning
- 👍 This would clearly mark the cut on where Fluent have the support, since it wouldn't be among minor releases
- 👍 Pull the band-aid and start building the trust that major releases will not be a whole new library

#### Cons

- 👎 The biggest challenge is how we currently communicate our library to partners. We have the explicit (and sometimes implicit) nomenclature "Fluent UI v9" everywhere, including chats, meetings, documents, e-mails, pipelines, folder structures and more. Even the root folder where this RFC document is located receive the react-v9 prefix.\
  \
  Whenever partners need help, they often refer as "v9" rather than "Fluent UI" or "Fluent UI React" only. So releasing a new v10 would come with the extra work of streamlining the communication that Fluent UI React is not bound to a single major release. We would also need to be extra careful communicating this to avoid creating the "fear" that a new major release does not mean a whole new library.

##### Option 1-a: New Slot APIs

If we choose to release a new major version, we could also take the opportunity to introduce new Slot APIs. This would be a good opportunity to introduce new APIs that are more aligned with the future of Fluent UI, adding support for React 18 and beyond and making the slot API more flexible and easier to maintain/upgrade. This would also be a good leap to add support for React 19 in the future.

**TODO** Add implementation details here

###### Pros

- 👍 New Slot APIs would improve many aspects for Fluent:
  - 👍 Much easier types
  - 👍 Better prop tables
  - 👍 Better documentation
  - 👍 Future proof
- 👍 We could also take the opportunity to fix some of the current issues with the slot API

###### Cons

- 👎 This would be a big breaking change for partners, and it'll require good documentation and assistance
- 👎 This would require more work to implement, test and release

##### Option 1-b: New Slot APIs with compat layer

This is a variation of the previous option. We would introduce the new Slot APIs, but we would also add a compatibility layer to make the transition easier for partners. This would allow partners to upgrade to the new Slot APIs at their own pace, by using a compat package that would be a bridge between the old and new APIs.

**TODO** Add implementation details here

###### Pros

- 👍 Partners could upgrade at their own pace
- 👍 Same other pros as option 1-a

###### Cons

- 👎 It would require some strategy to deprecate this compat package in the future
- 👎 Could bring some confusion to partners on why this is necessary

##### Option 1-c: Just add React 18 support by updating types

This is a much more conservative approach. We would simply update the types to support React 18 and make necessary changes to the codebase to accommodate the breaking changes. All the documentation and other changes would be made to support this and no further updates would be made to the codebase.

**TODO** Add implementation details here

###### Pros

- 👍 Less breaking changes for partners
- 👍 React 18 support would land quicker

###### Cons

- 👎 We would need another breaking change in the future to introduce those changes.

### Option 2: Release a new minor version of Fluent UI

This option involves releasing a new **minor** version of Fluent UI. This will break semantic versioning, but it will be a more seamless transition for partners.

The release will include the necessary type changes, documentation updates and any other changes required.

#### Pros

- 👍 Avoid the fear of a new major release

#### Cons

- 👎 Breaks heavily semantic versioning
- 👎 Documentation issues to communicate what release adds the React 18 support
