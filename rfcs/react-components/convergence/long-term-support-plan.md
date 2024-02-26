# RFC: Long-term support (LTS) plan

Geoff Cox, Tudor Papa, Gouttierre Gomes

2024-02-06

## Summary

We need to establish a long-term support (LTS) plan to set expectations with partners and the open-source community. This includes building a plan for the sunset and retirement of older versions of Fluent.

For example, this issue [Fluent v8 LTS/EOL (long-term support / end of life)?](https://github.com/microsoft/fluentui/discussions/29100) brought up the question.

## Background

We currently support v7, v8, and v9 versions of Fluent UI React and v0 of Northstar/Stardust.

- v0 is active in the master branch. It is still supported by Teams, but all new feature work happens in v9.
- v7 is in sunset. Only critical issues are fixed. The last fix was over 6 months ago (2023-08-17).
- v8 is active in the master branch. Important issues raised by partners are fixed and partners actively develop on v8.
- v9 is active in the master branch. It is Fluent's focus for feature development.

## Problem statement

We need to:

1. Communicate LTS plans for each version to partners and the open-source community.
2. Plan for sunset/retirement of old versions.
3. Coordinate with partners that contribute to or own packages in our repository.

## Proposal: Manage versions with branches

These are somewhat sequential, but work can be done as soon as it makes sense.

#### Get v9 to parity with v8

To make v9 the official current branch, developers need to be able to do everything they could with v8.

Our status as of 2024-02:

- In preview: Rating, SearchBox, TeachingPopover, Motion
- In compat: Calendar, DatePicker, TimePicker
- In progress Nav, SwatchPicker, PeoplePicker, Carousel,
- Not started: Calendar, ColorPickerCompat,
- On hold: Coachmark
- Unknown: Chart, Keytips, MarqueeSelection, ActivityItem

Our planning cadence is scheduling component work to get to parity.

Components specific to one product should be moved into the partner repository. Components with limited shared re-use should be moved into the community contrib repository. Lower-value components or eccentric features should be considered for deprecation.

We should set a date when we expect to be at parity and communicate it to partners.

#### Publish an LTS policy with each version

We should add a Long Term Support section to the README.MD of each version. It should detail what stage the version is in, what kind of issues will be fixed by our team, what kind of issues should be fixed by the community, and the expected response time to issue triage and PR review.

We should add pointers from the wiki FAQ back to the README.MD for each version.

#### Retire v7

We should announce an end-of-life to v7. Proposed: June 30th, 2024. We would [lock the branch from any changes](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches#lock-branch), disable and archive any build pipelines, and replace public documentation sites with a redirect to a notice that v7 is retired.

Any partners wanting to continue using v7, should take a snapshot of the code and integrate it into their own repositories and build it.

#### Separate v0, v8 and v9 branches

v7 is already in its own branch. v0, v8, and v9 are in the master branch which causes some confusion for developers.

1. Create a v8 branch from master
2. Create a northstar-v0 branch from master
3. Remove all v9 code from the northstar-v0, and v8 branches
4. Remove all v0 and v8 code from the master branch
5. Update v8 components to take npm dependencies on compat components
6. Update any migration components to take npm dependencies on v8 components
7. Update v0, v8 builds to publish only v0, v8 components
8. Update v9 build to publish only v9 components
9. Update README.MD in each branch to cover its version and point to the other branches
10. Update ADO pipelines to handle each different branch (triggers, builds, releases)
11. Update ADO documentation for releasing each version

- Keep cross-version compat components in master (v9).
- Keep migration components in master (v9).

This plan requires communicating to partners that own their own v0 and v8 based packages in the master branch that they will need to start working on them in the new branches.

There should be a cut-over date where branches are locked for changes and then the steps taken (scripts?) to make the change followed by the branches being unlocked. It would be good to time
the cutover to a time of low activity for all teams globally.

#### Flatten master branch

With northstar-v0 and v8 no longer in the master branch, we can reduce the depth of the tree by bringing components within the react-components folder up one level.

#### Sunset v8

After retiring v7, announce v8 is in sunset mode. Only critical bugs will be fixed. We will no longer be moving React forward in v8. Set a retirement date for one year out.

#### Define team tenets for active versions

The Fluent team size doesn't allow for supporting more than 2 versions of Fluent. We should consider policy where we don't start active development on a new major version until the oldest version is retired (or at least in sunset). We can have a next branch and do lots of experimentation there, but there would be no support for this branch.

Branch renames make it possible to have an easier current verson change if we do next version development it its own branch. We can rename master to vX and then rename next to master.

Note: We should also consider renaming master to main.

### Pros and Cons

- 👍 v7 is already isolated in own branch, requiring no changes and will be familiar to partners
- 👍 branches provide independent policy allowing for easier management
- 👍 folder depth is reduced and packages more discoverable
- 👍 build times should be moderately faster with no if/then logic
- 👍 builds should be more reliable as changes are always specific to that version

- 👎 more branches means more enlisting, github configuration, and pipeline configuration
- 👎 aging builds for sunset and retiring versions means keeping track of different build approaches
- 👎 we'll be asking partners who regularly contribute to the repo to absorb more pain while we're also asking them to migrate

## Open Issues

- Need detailed review by Martin as the v-build lead and build expert
- This is asking for a lot of effort by the v-build team. Should find ways to have the entire team help out, although there are some sequential work items that will make it difficult.
