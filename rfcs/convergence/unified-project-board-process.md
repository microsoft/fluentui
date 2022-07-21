# RFC: Unified project board process

---

@tudorpopams

## Summary

Proposes the processes for using the [FluentUI - Unified](https://github.com/orgs/microsoft/projects/395/views/2) project board.

## Background

There have been multiple efforts into trying to unify the way we track, assign, prioritize and estimate issues across FluentUI React teams. With this RFC we're trying to set a process for using a single unified board for all teams and v-teams.

## Problem statement

We currently have 8 project boards that span across all teams and v-teams. This creates redundancy when sharing statuses and makes it hard to have a common backlog that we can groom and prioritize. Besides this, having separate boards for each team creates desynchronized sprint timelines and different types of estimations.

With this RFC we're hoping to solve most of these issues by creating a process on how we should use the unified board and its "ceremonies".

## Detailed Design or Proposal

Our solution to these problems is to start using a [common, unified project board](https://github.com/orgs/microsoft/projects/395/views/2) across all teams and v-teams with the following processes:

1. All teams will run under the same [sprint](Sprints). We will start with 2 weeks long sprints.
   - Planning and other sprint related ceremonies (ie retrospective) are up to each team.
1. Ideally all issues assigned to a sprint should be [prioritized](Prioritization) and [estimated](Difficulty).
1. The managers of each team will have weekly meetings to groom the backlog and prioritize items.
   - Teams will have full ownership of breaking down big tasks and planning accordingly
1. Each team will set up milestones which will reflect their [increment](Increments) outcome.

### Sprints

Sprints are 2 week long chunks in which each team works on a specific, ideally predefined (planned) list of issues. There's no strict rule about the number of items or the capacity of a sprint, so items can be added or removed at will.

We use sprints to better correlate [estimations](Difficulty) with a specific timeline and offer a sneak peek into what a team is supposed to work on in the upcoming weeks, using a single board view.

### Increments

An increment is a group of 4 sprints. We use increments to see the planning and progress on a long term fashion. Increments should be tied to milestones which can be shared with anyone interested in seeing the short term road map.

### Prioritization

| Priority  | Description                            |
| :-------- | :------------------------------------- |
| 🌋 Urgent | to be done in current sprint           |
| 🏔 High    | to be done in the current increment    |
| 🏕 Medium  | to be done in the next 2 increments    |
| 🏝 Low     | to be done in the following increments |

_The priority descriptions have ballpark values and are subject to change based on the progress of our increments._

### Difficulty

Estimations are based on Fibonacci numbers and are relative to sprint length.

| Estimation     | Description              |
| :------------- | :----------------------- |
| 🐥 Trivial (1) | a one liner              |
| 🐔 Easy (2)    | a day long               |
| 🐓 Medium (3)  | between 1 - 3 days long  |
| 🦅 Hard (5)    | half or more of a sprint |
| 🛩 Heroic (8)   | full sprint              |

## Pros and Cons

- 👍 Easier to see what each team is working on
- 👍 Easier to assign tasks to other teams
- 👍 Prioritized backlog
- 👍 Improved transparency on road map and delivery
- 👎 Existing tasks will have to be migrated to the new board
- 👎 [Another FluentUI project](https://xkcd.com/927/)
