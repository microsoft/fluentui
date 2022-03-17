# RFC: Establish "build shield" rotation

## Summary

We need a designated build "firefighter" in each time zone who's responsible for addressing any urgent build-related issues and keeping things unblocked.

This is a separate rotation from regular shield, and at least with the initial set of responsibilities proposed, it's a much lower average time commitment.

## Background/Problem

To this point, build "firefighting" tends to de facto fall to one or two particular people in each time zone, which has multiple disadvantages:

- Consistent, disproportionate negative impact to these people's "official" work
- Lack of recognition/appreciation for time spent and value provided to the team
- Build-related knowledge stays concentrated with a very limited number of people
- Harder to recognize patterns of failures

Having build shield as a desginated, rotating responsibility will help address all of these issues. It will also help more people gain experience with build troubleshooting.

(Longer-term, we'd like to start scheduling ongoing efforts for build improvements/upgrades, but this is an incremental step in the meantime. And even if we get the build in a better state overall, random "fires" will still happen sometimes, and someone needs to be on point to investigate.)

## Detailed Design or Proposal

### Who

Initially this will rotate within the build v-team, but once we have better documentation (see later in doc) we may be able to expand it to the team as a whole.

Since the focus is addressing urgent issues, we need **one person per time zone.**

Initial Redmond rotation:

- @ecraig12345
- @TristanWatanabe
- Need to find at least one more person

Initial Europe rotation:

- @ling1726
- @Hotell (when back from leave)
- @varholak-peter
- @andrefcdias

### Time commitment

Initially we'll try a shift duration of 1 week.

Total time commitment would be allocated as **up to 25%** (can change later if it's not enough).

Some weeks you'll get lucky and have almost nothing to do, but other weeks something will "blow up" in a way that requires much more time to address. If the time goes beyond ~25% _(or whatever number we decide above)_ it's worth calling out to management and/or pulling in other people as needed.

### Responsibilities

Starting out, the responsibility of build shield is limited to ensuring that PR/CI/release builds and local development stay unblocked (and documenting any failures that occur).

#### Keeping builds unblocked

This includes monitoring for:

- Automated failure notifications in "Build failures (automated)" channel
- Messages from team members (mainly in "Engineering Systems" channel) about PR or local build issues
- Messages or github mentions from regular shield about urgent build-related regressions/breaks that showed up as github issues
  - This is much less common and will primarily be up to the regular shield PM/dev to watch for these issues and loop in build shield

Prioritization is roughly as follows. As with normal shield, it's fine to pull in others for consultation/help as needed, especially if it's a particularly complex or urgent issue, or if a more in-depth fix turns out to be necessary.

| Issue type                                            | Priority                                                                                                            |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Release build failed                                  | 🔥 Investigate ASAP (fix issue, or retry if intermittent)                                                           |
| CI build fails > 50%                                  | 🔥 Fix ASAP (or notify team if external issue)                                                                      |
| PR builds fail > 50% on non-user errors (CI okay)     | 🔥 ^                                                                                                                |
| Local builds broken for most/all of team (PR/CI okay) | 🔥 Fix or at least find workaround ASAP                                                                             |
| Published package broken                              | 🔥 Fix ASAP (usually due to dep issue or missing file)                                                              |
| CI build intermittently broken                        | ⚠️ Try to investigate/fix (greater frequency => higher priority), or file an issue if it will take significant time |
| PR intermittently fail on non-user errors (CI okay)   | ⚠️ ^                                                                                                                |
| Local builds broken for one person/scenario           | ⚠️ ^ but at least get them unblocked                                                                                |
| v7/8 website release failed (uncommon)                | ⚠️ Re-run failed stage, or see internal wiki                                                                        |

Another way to think about it is that whenever there's an automated failure notification, it's build shield's responsibility to at least click the link and look at the error message ASAP (and add a note to the failure post about what the error was).

- If it's something that's likely to cause a failure every time and block PRs (like a snapshot issue), fix it yourself or find someone to fix it right away.
- If it's a known intermittent error (the localDependencies issue is a current example), no immediate action needed.
- Otherwise, up to your judgment. Look into it now if you have time, or wait and see if it happens again.

Note that PR builds (and local builds) are a little different because in those cases, there are no automated notifications and no way to meaningfully track metrics (PR builds are expected to fail a lot). So in that case you're relying on team members noticing and posting about issues.

#### Documenting issues and troubleshooting procedures

The second responsibility is **documenting** failures and troubleshooting procedures, with the goals of:

- Noticing failure patterns which we need to schedule work to address
- Establishing a "runbook" for troubleshooting build issues
  - The goal of this is to de-mystify build, and maybe even (eventually) be able to expand the build shield rotation to more team members, so that everyone has exposure to the area

Where/how to document:

- Troubleshooting guides should go in the internal wiki
- Comment on automated failure posts with the cause of the failure and the resolution
  - We may also want to make a form or spreadsheet or something to more easily gather metrics on failures

### Non-responsibilities (initially)

At least initially, build shield is NOT responsible for general build improvements/maintenance, such as:

- Upgrading deps
- Addressing non-critical dependabot/governance alerts
- Perf improvements
- Non-urgent build-related requests or proposals that come through github issues

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

As mentioned earlier, we'd like to start scheduling ongoing build improvements (and when that happens, some of the build shield responsibility could move there), but setting up a separate rotation in the meantime is an incremental improvement.
