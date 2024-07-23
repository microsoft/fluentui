You can give the bot commands to customize how the bot assists you with merging your pull request when all merge policies pass.

To customize the auto-merge parameters, @ mention the bot **(e.g. `@msft-fluent-ui-bot`, `@msft-github-bot` or `@msftbot` depending on the bot identity providing auto-merge capabilities)** and provide your instruction in English. Note that for all scenarios below, pre-configured merge policies at the GitHub level must still be satisfied (i.e. the bot will never bypass merge policies for you). Note that you must be a contributor - the bot will ignore all commands given by non-contributors.

---

At this time, the bot supports the following scenarios:

### Requiring a specific, minimum number of approvals

Examples of what to say (illustrative, not prescriptive nor exhaustive):

- > Only merge this pull request if it has 2 approvals.
- > require 3 sign offs.
- > Please make sure there are at least two approving reviews.

### Requiring an approval from a specific person

Examples of what to say (illustrative, not prescriptive nor exhaustive):

- > make sure @cliffkoh has a chance to review before you merge
- > do not merge unless @cliffkoh approves.

### Requiring approvals from multiple people

Examples of what to say (illustrative, not prescriptive nor exhaustive):

- > require sign-offs from @kkjeer and @JasonGore
- > hold this pr until all of the following approve: @kkjeer, @JasonGore, @dzearing

### Requiring approvals from one of several people

Examples of what to say (illustrative, not prescriptive nor exhaustive):

- > make sure @kkjeer, @dzearing or @JasonGore gets to approve
- > require approvals from any one of the following: @kkjeer, @JasonGore, @dzearing

### Changing the time the pull-request is held open before the bot merges the pull request on your behalf

Examples of what to say (illustrative, not prescriptive nor exhaustive):

- > hold this pr for the next 2 hours
- > please wait 1 more day before merging this
- > delay merging this pull request for 2 hours 30 mins

---

Note that the examples above of what to say are only meant to be illustrative and not definitive.

Additionally, if the bot has misinterpreted you or you have changed your mind, you can express such an intent with a phrase like "nevermind" or "forget what I just told you".

### Enforcement of policies

on April 18th 2023 `auto-merge.config.enforce` started to block all PR's (it never ran/finish).

As we use github automerge funcionatity anyways we removed it from required status checks to unblock contributors and use github build-in features.

~Enforcement of auto-merge comments is handled by the `auto-merge.config.enforce` status check. It's intended to run for each PR and automatically succeed if no AutoMerge policies apply. If this stops working, contact the bot team (check internal wiki for contact info).~
