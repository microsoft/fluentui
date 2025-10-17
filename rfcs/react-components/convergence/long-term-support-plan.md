# RFC: Long-term support (LTS) plan

Geoff Cox, Tudor Papa, Gouttierre Gomes, Martin Hochell

2024-02-06

## Summary

We need to establish a long-term support (LTS) plan to set expectations with partners and the open-source community. This includes building a plan for the sunset and retirement of older versions of Fluent.

For example, this issue [Fluent v8 LTS/EOL (long-term support / end of life)?](https://github.com/microsoft/fluentui/discussions/29100) brought up the question.

## Background

We currently support v7, v8, and v9 versions of Fluent UI React and v0 of Northstar/Stardust.

- v0 is active in the master branch. It is still supported by Teams, but all new feature work happens in v9.
- v7 is in maintenance. Only critical issues are fixed. The last fix was over 6 months ago (2023-08-17).
- v8 is active in the master branch. Important issues raised by partners are fixed and partners actively develop on v8.
- v9 is active in the master branch. It is our focus for feature development.

We also have multiple projects in our master branch:

- Fluent UI Core (react & react-components)
- Fluent UI web components
- partner Fluent extensions (react-charting)
- partner Fluent themes (azure-themes)

These projects have different versions and different release cadences.

## Problem statement

We need to:

1. Communicate LTS plans for each version to partners and the open-source community.
2. Plan for sunset/retirement of old versions and plan an approach for future versions.
3. Coordinate with partners that contribute to or own packages in our repository.
4. Be careful to sequence changes to avoid unnecessary churn for consumers or overloading the v-build team.

## Proposal: Manage version lifetime with branches

These are somewhat sequential, but work can be done as soon as it makes sense.

#### Retire v7

Proposed ETA: End of FY2024.

We should announce an end-of-life to v7. We would [lock the branch from any changes](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches#lock-branch), disable and archive any build pipelines, and replace public documentation sites with a redirect to a notice that v7 is retired.

Any partners wanting to continue using v7, should take a snapshot of the code and integrate it into their own repositories and build it.

#### Get v9 to parity with v8

Proposed ETA: End of FY2024.

To make v9 the official current branch, developers need to be able to do everything they could with v8.

The [Fluent UI React component roadmap](https://github.com/orgs/microsoft/projects/786] shows
the plan for each component providing parity.

Components specific to one product should be moved into the partner repository. Components with limited shared re-use should be moved into the community contrib repository. Lower-value components or eccentric features should be considered for deprecation.

We should set a date when we expect to be at parity and communicate it to partners.

#### Publish an LTS policy with each version

Proposed ETA: Following commit of this RFC

We should add a Long Term Support section to the README.MD of each version. It should detail what stage the version is in, what kind of issues will be fixed by our team, what kind of issues should be fixed by the community, and the expected response time to issue triage and PR review.

We should add pointers from the wiki FAQ back to the README.MD for each version.

We should consider documentation similar to Node JS [previous releases](https://nodejs.org/en/about/previous-releases).

- ACTIVE = active development in main (always LTS)
- MAINTENANCE = only critical bug fixes
- EOL = frozen code, no changes possible

#### Get build to latest tooling and robust CI pipelines

There is some work in progress to move to the latest verson of Nx and to [make the release pipeline more reliable](https://github.com/microsoft/fluentui/issues/27758). We want to have a build system that we know works before creating new branches; akin to having unit tests before refactoring code.

#### Separate v0, v8 and v9 branches

Proposed ETA: H1 or early H2 FY2025

v7 is already in its own branch. v0, v8, and v9 are in the master branch which causes some confusion for developers<sup>1</sup>.

> We need to be able to distinguish between the multiple projects and their multiple versions when creating branches, so the names are more than just the version number.

> v-build is confident that we can create scripts to do the branching and most of the update work. This would allow us to cut branches quickly and have only a weekend day of unavailability.

1. Create a react-v8 branch from master<sup>2</sup>
2. Create a northstar-v0 branch from master<sup>2</sup>
3. Remove all v9 code from the northstar-v0, and react-v8 branches
4. Remove all v0 and v8 code from the master branch
5. Update v8 components to take npm dependencies on compat components<sup>3</sup>.
6. Update migration component<sup>4</sup> to take npm dependencies on v8 components
7. Update northstar-v0, react-v8 builds to publish only their components<sup>5</sup>
8. Update master build to not publish v0 or v8 components<sup>5</sup>
9. Update README.MD in each branch to cover its version and point to the other branches
10. Update ADO pipelines to handle each different branch (triggers, builds, releases)
11. Update ADO documentation for releasing each version

- Keep cross-version compat components in master (v9).
- Keep migration components in master (v9).

This plan requires communicating to partners that own their own v0 and v8 based packages in the master branch that they will need to start working on them in the new branches. It also requires careful communication to consumers about any open PRs just before cut-over might be lost.

There should be a cut-over date where branches are locked for changes and then the steps taken (scripts?) to make the change followed by the branches being unlocked. It would be good to time
the cutover to a time of low activity for all teams globally.

<sup>1</sup> Multiple migration partners have asked 'where is the v9 code?', 'are packages at the same level as react or react-components v8 or v9?', and 'do improvements in react or react-components get cherry-picked to the other folder?'. We've had similar questions come up on our shield and 1JS channels.

<sup>2</sup> Includes branch protection policies.

<sup>3</sup> react-portal-compat, react-portal-compat-context

<sup>4</sup> react-migration-v0-v9, react-migration-v8-v9

<sup>5</sup> Today our builds have some conditional code specific to v8 or v9 builds. This work would remove those conditions.

#### Organize master branch (a little more)

With northstar-v0 and react-v8 no longer in the master branch, top-level folders should be project named (react-components, web-components, and shared infrastructure). Within those folders will be the standard apps, packages, scripts, etc.

We can remove the extra react-components folder inside of packages as we'll have a top-level folder.

#### react-v8, northstar-v0 to maintenance and eventually EOL

Proposed ETAs:

- End of FY2024: Message partners intent to put v8 into maintenance
- Start of H3 FY2025: react-v8 and northstar-v0 maintenance mode
- End of FY2025: react-v8, northstar-v0 EOL

After retiring v7, announce v8 is in maintenance mode. Only critical bugs will be fixed. We will no longer be moving React forward in v8. Set a retirement date for one year out.

#### Define team tenets for active versions

The Fluent team size doesn't allow for supporting more than 2 versions of Fluent. We should consider policy where we don't start active development on a new major version until the oldest version is retired (or at least in sunset). We can have a next branch and do lots of experimentation there, but there would be no support for this branch.

Branch renames make it possible to have an easier current verson change if we do next version development it its own branch. We can rename master to vX and then rename next to master.

#### Consider renaming master to main

In 2020, as part of replacing exclusionary terms with more inclusive ones, many repositories started renaming the master branch to main. New repositories in GitHub now default to main. We should take this opportunity to do the same if we are renaming branches.

#### Consider renaming v7 to react-v7

At some point after v7's EOL, we can rename for consistency.

#### Approach for future versions

The future version approach doesn't have to be too specific at this point. We want to ensure that we have the option of doing work in vNext branches when we don't want to expose that work in main. We also want to be able to take an evolutionary approach of adding the next version components to main, keeping current version components compatible, and then converting current version components to shims around next version components.

We'll have another RFC or vNext plan for more details.

### Pros and Cons

- 👍 v7 is already isolated in own branch, requiring no changes and will be familiar to partners
- 👍 branches provide independent policy allowing for easier management
- 👍 folder depth is reduced and packages more discoverable
- 👍 build times should be moderately faster with no if/then logic<sub>1<sub>
- 👍 builds should be more reliable as changes are always specific to that version
- 👍 build technology can evolve more rapidly as there is less compatibility work to consider and reduces build script surface area.

- 👎 more branches means more enlisting, github configuration, and pipeline configuration
- 👎 aging builds for sunset and retiring versions means keeping track of different build approaches
- 👎 we'll be asking partners who regularly contribute to the repo to absorb more pain while we're also asking them to migrate

<sub>1<sub> As well, some components with large test snapshots such as react-charting won't slow test run times during builds.

## Open Issues

- Need detailed review by Martin as the v-build lead and build expert
- This is asking for a lot of effort by the v-build team. Should find ways to have the entire team help out, although there are some sequential work items that will make it difficult.
