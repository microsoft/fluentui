# RFC: Unified project board process

---

@tudorpopams

## Summary

Proposes the processes for using the [FluentUI - Unified](https://github.com/orgs/microsoft/projects/395/views/2) project board.

## Background

There have been multiple efforts into trying to unify the way we track, assign, prioritize and estimate issues across FluentUI React teams. With this RFC we're trying to set a process for using a single unified board for all teams and v-teams.

## Problem statement

We currently have 8 project boards that span across all teams and v-teams. This creates redundancy when sharing statuses and makes it hard to have a common [backlog](#backlog) that we can groom and prioritize. Besides this, having separate boards for each team creates desynchronized [sprint](#sprints) timelines and different types of [estimations](#difficulty).

With this RFC we're hoping to solve most of these issues by creating a process on how we should use the unified board and its "ceremonies".

## Detailed Design or Proposal

Our solution to these problems is to start using a [common, unified project board](https://github.com/orgs/microsoft/projects/395/views/2) across all teams and v-teams with the following processes:

1. All teams will run under the same [sprint](#sprints). We will start with 2 weeks long sprints.
   - Planning and other sprint related ceremonies (ie retrospective) are up to each team.
1. Ideally all issues assigned to a sprint should be [prioritized](#prioritization) and [estimated](#difficulty).
1. The managers of each team will have weekly meetings to [groom the backlog](#backlog-grooming) and prioritize items.
   - Teams will have full ownership of breaking down big tasks and planning accordingly
1. The goal of each [sprint](#sprints) is to have as few leftovers as possible for the next one, so making sure that you **break your work into chunks that fit in a sprint** is essential.
1. Each team will set up [milestones](#milestones) which will reflect their 6 sprints long road map.
1. Teams should try to use [labels](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels) instead of creating new fields.
   - Separate views can be created to display specific labels (ie "Known intermittent issues")

### Backlog

The backlog is a collection of items that are not included in a sprint. Backlog items can be prioritized, which means that EMs / PMs have already checked them, but also unprioritized, which means that they must be checked by EMs / PMs in the following grooming sessions.

Once items in the backlog are groomed, they can also be assigned to specific teams. Items such as PRs can be assigned to boards without being prioritized.

### Backlog grooming

The grooming process is as follows:

1. We start by going through the ["By team" board view](https://github.com/orgs/microsoft/projects/395/views/6) and assign as many unassigned items as possible.
   1. Sometimes we might also prioritise some of them, depending on their size but most of the time we would like to leave this for each crew to decide.
   1. In some cases we might also add comments to get more context / clarify the current status of an issue. The comments may come from any of us (Justin, Juraj and Tudor) and they're basically a group comment.
1. We will look at all [Needs: Backlog review issues](https://github.com/microsoft/fluentui/issues?q=is%3Aopen+is%3Aissue+label%3A%22Needs%3A+Backlog+review%22) directly in the issues view and try to groom as many as possible. This could mean team assignment, prioritisation, questions for better context.
   1. It's important to note that **we will go through non unified board issues as well**, so make sure to **add the "Needs: Backlog review" label** to all issues you'd like us to go through.

### Sprints

Sprints are 2 week long chunks in which each team works on a specific, ideally predefined (planned) list of issues. There's no strict rule about the number of items or the capacity of a sprint, so items can be added or removed at will.

We use sprints to better correlate [estimations](#difficulty) with a specific timeline and offer a sneak peek into what a team is supposed to work on in the upcoming weeks, using a single board view.

#### Sprint goals

Ideally, the work that is done in a sprint should not be transferred to the next sprint. This means that teams are responsible for breaking down big tasks into smaller ones that fit in a sprint (or less) and make sure that they get delivered.

### Milestones

A milestone is a group of 6 sprints (~3 months). We use milestones to see the planning and progress on a longer term fashion. Milestones can be shared with anyone interested in seeing the road map.

### Prioritization

| Priority  | Description                            |
| :-------- | :------------------------------------- |
| 🌋 Urgent | to be done in current sprint           |
| 🏔 High    | to be done in the current milestone    |
| 🏕 Medium  | to be done in the next 2 milestones    |
| 🏝 Low     | to be done in the following milestones |

_The priority descriptions have ballpark values and are subject to change based on the progress of our milestones._

### Difficulty

Estimations are based on Fibonacci numbers and are relative to sprint length.

| Estimation     | Description              |
| :------------- | :----------------------- |
| 🐥 Trivial (1) | a one liner              |
| 🐔 Easy (2)    | a day long               |
| 🐓 Medium (3)  | between 1 - 3 days long  |
| 🦅 Hard (5)    | half or more of a sprint |
| 🛩 Heroic (8)   | full sprint              |

_Estimations are dependent on sprint length._

## Pros and Cons

- 👍 Easier to see what each team is working on
- 👍 Easier to assign tasks to other teams
- 👍 Prioritized backlog
- 👍 Improved transparency on road map and delivery
- 👎 Existing tasks will have to be migrated to the new board
- 👎 [Another FluentUI project](https://xkcd.com/927/)
