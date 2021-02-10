# RFC: Prevent CI and code related tasks from triggering on doc/rfc PRs

---

_Contributors: @andrefcdias_

## Summary

The purpose of this RFC is to find a solution to avoid unnecessary GitHub checks from running on PRs that only affect documentation to avoid wasteful resource usage and improve our DX.

## Problem statement

Whenever someone creates a PR, independently of the content, the CI is triggered and added as a check for a successfull PR. This, along with Screener and CodeSandbox, is consuming unnecessary resources on our pipeline for, essentially, no reason.

Apart from this, other PRs that actually need CI checks, will be delayed due to the lack of parallelism in our pipeline.
By avoiding these checks, we can prevent a wasteful CI pipeline and accelerate work in PRs that bring value to our users.

## Detailed Design or Proposal

The agreed solution is to extract our Wiki into its own separate repository and linking it with the fluentui repo wiki.
This will allow us to avoid the issue altogether and even implement our own checks (like running Prettier as @layershifter suggested) with minimum effort.

Implementation would cover the following:

- Creating the fluentui-wiki repository
- Linking this repository with https://github.com/microsoft/fluentui.wiki.git
- Add documentation on how to contribute with the new workflow

And this details the new workflow mentioned above:

- User forks https://github.com/microsoft/fluentui-wiki
- Applies changes to for and creates a PR
- Merged docs get reflected in the https://github.com/microsoft/fluentui.wiki.git

### Pros and Cons

#### Pros

- Unblocking of code PRs if a doc/rfc PR is created
- Reduced usage of our pipeline resources
- No GitHub checks visual trash on doc/rfc PRs

#### Cons

- New workflow of submitting docs through PRs in a different repo
- Sending people from the @fluentui/react repo into @fluentui/react-wiki repo to contribute with docs

## Discarded Solutions

- Moving docs directly to the wiki repo;

  There is unfortunately no way of creating PRs for changes in the Wiki repo.

- Avoiding the GitHub checks in our CI by excluding doc paths

  Due to the branch protection rules, we are unable to avoid the execution of required checks. Another limitation is our current tooling (no ability to implement content aware pipeline).
  CodeSandbox also did not support this at the time of writing this. Upon contacting their support, they added it to their backlog as a possible future feature.

## Open Issues

N/A
