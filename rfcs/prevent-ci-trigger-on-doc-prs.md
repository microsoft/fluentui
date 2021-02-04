# RFC: Prevent CI and code related tasks from triggering on doc/rfc PRs

---

_Contributors: @andrefcdias_

## Summary

The purpose of this RFC is to find a solution to prevent unnecessary GitHub checks from running on PRs that only affect documentation.

## Problem statement

Whenever someone creates a PR, independently of the content, the CI is triggered and added as a check for a successfull PR. This, along with Screener and CodeSandbox, is consuming unnecessary resources on our pipeline for, essentially, no reason.

Apart from this, other PRs that actually need CI checks, will be delayed due to the lack of parallelism in our pipeline.
By avoiding these checks, we can prevent a wasteful CI pipeline and accelerate work in PRs that bring value to our users.

## Detailed Design or Proposal

### Azure DevOps (Build, Deploy, SizeAuditor, Perf Analysis, BundleSize)

To prevent the builds, adding the following will prevent unnecessary triggers:

```yaml
pr:
  branches:
    include:
      - master
  paths:
    exclude:
      - rfcs
      - specs
      - <other relevant doc paths>
```

_There's a PoC repo to test the ADO solution [here](https://github.com/andrefcdias/actions-test)._

### Screener

_To be defined_

### CodeSanbox

_To be defined_

### Pros and Cons

#### Pros

- Unblocking of code PRs if a doc/rfc PR is created
- Reduced usage of our pipeline resources
- No GitHub checks visual trash on doc/rfc PRs

#### Cons

- None so far

## Discarded Solutions

N/A

## Open Issues

N/A
