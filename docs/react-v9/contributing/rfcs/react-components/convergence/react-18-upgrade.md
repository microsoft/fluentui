<!-- Disable markdown rule as we need duplicate headers to show multiple pros/cons for the sections -->
<!-- markdownlint-disable MD024 -->

# RFC: React 18 upgrade

[@marcosmoura](https://github.com/marcosmoura)\
[@mainframev](https://github.com/mainframev)

## Table of contents

- [RFC: React 18 upgrade](#rfc-react-18-upgrade)
  - [Table of contents](#table-of-contents)
  - [Summary](#summary)
  - [Problem statement](#problem-statement)
  - [Detailed Design or Proposal](#detailed-design-or-proposal)
    - [Breaking Changes](#breaking-changes)
    - [What is not covered by this RFC](#what-is-not-covered-by-this-rfc)
  - [Areas of impact](#areas-of-impact)
  - [Options](#options)
    - [Option 1: Release a new major version of Fluent UI](#option-1-release-a-new-major-version-of-fluent-ui)
      - [Pros](#pros)
      - [Cons](#cons)
        - [Option 1-a: Add React 18 support by updating types](#option-1-a-add-react-18-support-by-updating-types)
          - [Pros](#pros-1)
        - [Option 1-b: New Slot APIs](#option-1-b-new-slot-apis)
          - [Pros](#pros-2)
          - [Cons](#cons-1)
        - [Option 1-c: New Slot APIs with compat layer](#option-1-c-new-slot-apis-with-compat-layer)
          - [Pros](#pros-3)
          - [Cons](#cons-2)
          - [Cons](#cons-3)
    - [Option 2: Release a new minor version of Fluent UI](#option-2-release-a-new-minor-version-of-fluent-ui)
      - [Pros](#pros-4)
      - [Cons](#cons-4)

## Summary

This RFC outlines the ideas and implementation to effectively add React 18 support for Fluent UI. This will also briefly mention on plans to migrate the whole repository to React 18.

## Problem statement

Currently, Fluent UI lacks support for React 18 out of the box. Due to type changes in React 18, the current Fluent UI codebase works but has issues with the types and new features present only in React 18.

Please note that those breaking changes only apply to v9 of Fluent UI, as the deprecations happen in the Slot API of v9. v8 and below are not affected by the breaking changes, but they'll be updated accordingly to support React 18.

## Detailed Design or Proposal

The goal is to make updates to our type system codebase to accommodate the breaking changes found in **@types/react**. Unfortunately, breaking changes are unavoidable, but this RFC outlines the steps to make the transition as smooth as possible.

### Breaking Changes

As of now, the following breaking changes are present in React 18:

<!-- Disable HTML tags lint for this line as it is temporary -->
<!-- markdownlint-disable-next-line MD033 -->

`@types/react@17 -> @types/react@18`

- Removal of implicit children from `React.FC` / `React.FunctionComponent / React.Component`.
- `this.context` becomes `unknown`.
- Removal of previously deprecated types. Affecting only older versions, where React.ReactType, React.Props used.
- `ref` property in `React.RefAttributes` becomes `LegacyRef`. Affects `useMergedRefs` , breaks where `React.PropsWithRef` and `React.RefAttributes` are used.


```ts
// v17
interface RefAttributes<T> {
  ref?: Ref<T>;
}

// v18
interface RefAttributes<T> {
  // 💣💣💣💣
  ref?: LegacyRef<T>;
}
```


- `ReactNode` becomes more specific. This change affects heavily our Slots API.

```ts
// v17
type ReactText = string | number;
type ReactChild = ReactElement | ReactText;
// 💣💣💣
type ReactFragment = {} | ReactNodeArray;
type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;

// v18
type ReactNode =
  | ReactElement
  | string
  | number
  | Iterable<ReactNode>
  | ReactPortal
  | boolean
  | null
  | undefined
  | DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES[keyof DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES];
```

Related links:

- [DefinitelyTyped: React 18 types](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/56210)
- [React v9 Slots Proposed Changes](https://github.com/microsoft/fluentui/pull/31548/files)


### What is not covered by this RFC

Please note that even though our efforts on this RFC take into consideration React 19 as a future goal, the full support will be discussed in a separate RFC.

## Areas of impact

There are two distinct areas of impact for this RFC:

- Library release include coding changes, documentation updates, and any other changes required to support React 18, including the breaking changes.
- Migrate our codebase to React 18, adding testing applications to ensure compatibility with the new version but also for backward compatibility.

## Options

Since the breaking changes are unavoidable, the following options are available to make the transition as smooth as possible:

### Option 1: Release a new major version of Fluent UI

This option involves releasing a new **major** version of Fluent UI, updating the type definitions and making necessary changes to the codebase to accommodate the breaking changes. This will follow semantic versioning and will be a major release, which, as off now, means a release of a version number **10**.

The release will include the necessary type changes, documentation updates and any other changes required. This approach comes with super big challenges.

#### Pros

- 👍 Breaking changes following semantic versioning
- 👍 This would clearly mark the cut on where Fluent have the support, since it wouldn't be among minor releases
- 👍 Pull the band-aid and start building the trust that major releases will not be a whole new library

#### Cons

- 👎 The biggest challenge is how we currently communicate our library to partners. We have the explicit (and sometimes implicit) nomenclature "Fluent UI v9" everywhere, including chats, meetings, documents, e-mails, pipelines, folder structures and more. Even the root folder where this RFC document is located receive the react-v9 prefix.\
  \
  Whenever partners need help, they often refer as "v9" rather than "Fluent UI" or "Fluent UI React" only. So releasing a new v10 would come with the extra work of streamlining the communication that Fluent UI React is not bound to a single major release. We would also need to be extra careful communicating this to avoid creating the "fear" that a new major release does not mean a whole new library.

##### Option 1-a: Add React 18 support by updating types

This is a much more conservative approach. We would simply update the types to support React 18 and make necessary changes to the codebase to accommodate the breaking changes. All the documentation and other changes would be made to support this and no further updates would be made to the codebase, accommodating the breaking changes.

The breaking changes would be the same as described in the beginning of this RFC.

###### Pros

- 👍 Less breaking changes for partners
- 👍 React 18 support would land quicker

##### Option 1-b: New Slot APIs

If we choose to release a new major version, we could also take the opportunity to introduce new Slot APIs. This would be a good moment to overhaul the APIs to be more aligned with the future of Fluent UI, adding support for React 18 and beyond and making the slot API more flexible and easier to maintain/upgrade.

The implementation APIs would be up to debate, but the idea is to make the APIs more flexible and easier to use, possibly decoupling from "@types/react" and making it easier to document and maintain. There are a few experiments in this direction, but nothing concrete yet.

###### Pros

- 👍 New Slot APIs would improve many aspects for Fluent:
  - 👍 Easier types and possibly decoupled from "@types/react"
  - 👍 Better prop tables
  - 👍 Better documentation
  - 👍 Future proof
- 👍 We could also take the opportunity to fix some of the current issues with the slot API

###### Cons

- 👎 Time consuming and would delay the release
- 👎 This would require more work to implement, test and release
- 👎 This would be a big breaking change for partners, and it'll require good documentation and assistance

> [!NOTE]
> Due to how urgent React 18 upgrade is at the moment of the writing of this RFC, this option might not be viable, but it is written here anyway.

##### Option 1-c: New Slot APIs with compat layer

This is a variation of the previous option. We would introduce the new Slot APIs, but we could also add a compatibility layer to make the transition easier for partners. This would allow partners to upgrade to the new Slot APIs at their own pace, by using a compat package that would be a bridge between the old and new APIs.

###### Pros

- 👍 Partners could upgrade at their own pace
- 👍 Same other pros as option 1-a

###### Cons

- 👎 It would require some strategy to deprecate this compat package in the future
- 👎 Could bring some confusion to partners on why this is necessary
- 👎 Same other cons as option 1-a

> [!NOTE]
> Due to how urgent React 18 upgrade is at the moment of the writing of this RFC, this option might not be viable, but it is written here anyway.

###### Cons

- 👎 In case we opt to develop new APIs for Slots in the future, it'd require a new breaking change

### Option 2: Release a new minor version of Fluent UI

This option involves releasing a new **minor** version of Fluent UI. This will break semantic versioning, but it will be a more seamless transition for partners.

The release will include the necessary type changes, documentation updates and any other changes required.

#### Pros

- 👍 Avoid the fear of a new major release

#### Cons

- 👎 Breaks semantic versioning
- 👎 Documentation issues to communicate what release adds the React 18 support

The breaking changes would be the same as described in the beginning of this RFC.
