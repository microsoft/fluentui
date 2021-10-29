# RFC: Establish "build shield" rotation

## Summary

We need a designated build "firefighter" in each time zone who's responsible for addressing any urgent build-related issues and keeping things unblocked.

At least with the initial scope of responsibilities proposed below, this is a much lower average time commitment than regular shield.

## Background/Problem

To this point, build "firefighting" tends to de facto fall to one or two particular people in each time zone, which has multiple disadvantages:

- Consistent, disproportionate negative impact to these people's "official" work
- Lack of recognition/appreciation for time spent and value provided to the team
- Build-related knowledge stays concentrated with a very limited number of people
- Harder to recognize patterns of failures

Having build shield as a desginated, rotating responsibility will help address all of these issues. It will also help more people on the team gain experience with build troubleshooting.

## Detailed Design or Proposal

### Who

Initially this will rotate within the build v-team, but once we have better documentation (see later in doc) we may be able to expand it to the team as a whole.

Since the focus is addressing urgent issues, we need **one person per time zone.**

### Time commitment

Shift duration will probably be either 1 or 2 weeks (need to discuss).

Total time commitment would be allocated as **up to 25%**. _(DISCUSS: is this enough?)_

Some weeks you'll get lucky and have almost nothing to do, but other weeks something will "blow up" in a way that requires much more time to address. If the time goes beyond ~25% _(or whatever number we decide above)_ it's worth calling out to management and/or pulling in other people as needed.

### Responsibilities

Starting out, the responsibility of build shield is limited to **ensuring that PR/CI/release builds and local development stay unblocked** (and documenting any failures that occur).

This includes monitoring for:

- Automated failure notifications in "Build failures (automated)" channel
- Messages from team members (mainly in "Engineering Systems" channel) about PR or local build issues
- Messages or github mentions from regular shield about urgent build-related regressions/breaks that showed up as github issues
  - This is much less common and will primarily be up to the regular shield PM/dev to watch for these issues and loop in build shield
  - Build shield should NOT be looped in (initially) for build improvement requests/proposals, people wanting help setting up their build, other non-urgent build-related issues

(As with normal shield, it's fine to pull in others for consultation/help as needed, especially if a more in-depth fix turns out to be necessary.)

The second responsibility is **documenting** failures and troubleshooting procedures, with the goals of:

- Noticing failure patterns which we need to schedule work to address
- Establishing a "runbook" for troubleshooting build issues
  - The goal of this is to de-mystify build, and maybe even (eventually) be able to expand the build shield rotation to more team members, so that everyone has exposure to the area

### Non-responsibilities (initially)

At least initially, build shield is NOT responsible for general build improvements/maintenance, such as:

- Upgrading deps
- Addressing non-critical dependabot/governance alerts
- Perf improvements

(If time allows and you'd like to work on any of these things, that's great, but it's not the primary expectation.)

We may in the future make build shield a larger responsibility (with larger time allocation) to address these types of things in a more systematic manner. But to make this a feasible, incremental improvement/experiment, we're keeping the scope small initially.

## Pros and Cons

### Pros

- Less randomization of specific people
- More people learn about build troubleshooting

### Cons

- It's another process to manage

## Discarded Solutions

The regular shield person has more than enough to do already, so it probably doesn't make sense to add this to their responsibilities.

## Open Issues

- Specific list of people on the rotation
- Rotation length
- How to balance scheduling with other responsibilities
