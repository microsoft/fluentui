# RFC: Expectations on issue resolution while on Shield

---

Contributors: @khmakoto, @JustSlone, @gouttierre

## Summary

This RFC seeks to improve the Shield process by defining better expectations regarding our response to issues and outlining key actions to follow as part of the rotation.

## Problem statement

Since convergence work started our Shield process has been continuously changing to adapt to the changing conditions in our team (merging of the libraries in one repo, influx and efflux of people in the team, balancing v0, v8 and converged work, etc). This has generated enough instability that, coupled with an already vague set of expectations around issue resolution, has amounted to a somewhat unmanageable situation where the issue number keeps creeping up, the person on point for Shield that month feels like they are not stepping up to the task, and the people logging the issues feeling frustrated about the delay in response/their issues not being given a solution.

## Detailed Design or Proposal

Below we describe some of the individual problems that we think, when coupled together, contribute largely to the bigger issue described above. We also describe our proposed solutions to them.

#### Problem

There is an ever increasing number of issues logged in and a limited number of people in the team that can work on them.

#### Proposed solution

We should actively encourage the issues' authors to create PRs that solve their issues. This should be done by both PM and Engineering so we can adopt a more successful open-source model and shift some of the burden off the person that is on Shield at the time.

#### Problem

Engineering time spent on Shield is spread too thin among many different things, some of which could be handled by PM.

#### Proposed solution

PM can help with some of the tasks that take more time when triaging an issue. They already do a good job at checking if certain behavior is reproducing or not but usually ask Engineering to check if something is classified as a bug. While I think this is useful in scenarios where it is vague if a component should behave a certain way I think there are issues where it is clear that the behavior described is buggy. It is those issues that could be tagged as bugs without input from Engineering.

#### Problem

The expectation on which issues should be fixed immediately vs can be delayed vs will probably not get fixed in the short or medium term is not well defined.

#### Proposed solution

We should agree and write down which issues should definitely be fixed while a person is on Shield and which ones are not necessarily going to be fixed during this time frame. Here is a proposed set of expectations:

> _Issues that need to be fixed ASAP:_
>
> - Accessibility issues that affect our accessibility score card.
> - Bugs identified as high impact or breaking for a partner product.
>
> _Issues that need to fixed but that we are ok with not fixing immediately/waiting for help from external contributors/waiting for the right time to make the change:_
>
> - Bugs that are identified as not being high impact.
> - Feature requests that have been discussed about and agreed on a solution with team members.
> - Bugs that require a breaking change in terms of the API interface and require a major version release.
>
> _Issues that we make no commitments on ever fixing:_
>
> - Feature requests that have not been discussed with team members.

#### Problem

Users of FluentUI that are logging issues in our repository have a different set of expectations regarding issue resolution than the ones we have as part of our Shield process.

#### Proposed solution

We should clearly communicate with our customers how we are looking at issues and set clear expectations on them. This would ideally be in the way of a wiki entry in our repository detailing our Shield process with the expectations on issue resolution there.

_TO-DO: Write up the wiki entry detailing the Shield process._

## Pros and Cons

The benefits of going with the proposed solutions are numerous:

- There is a clearer, written-down set up expectations for both people on Shield and users logging issues regarding the incoming issues when someone is on Shield.
- We are actively encouraging community contribution.
- We are avoiding the duplication of efforts across PM and Engineering.

This approach, however, carries some risks with it:

- We have to be on top of community contributions if we start to encourage those, as sitting on a PR we encouraged will just make the author not want to contribute again.
- We need to be very careful when communicating what kind of response users can expect from us. A careless response can lead, for example, to people thinking we are not maintaining the repository anymore.

## Open Issues

This RFC is just a first step in addressing the long list of areas of opportunity that we have regarding the Shield process and the repository management process in general. A more thorough reimagining of both processes is needed that is coupled with detailed RFCs regarding the individual issues that we are hoping to address. Some of these other standing issues are:

- Pull request turn-around.
- Better measuring and handling of repository metrics.
- Closing down old/non-applicable issues as we move forward.
