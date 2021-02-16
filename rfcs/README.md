# Fluent UI RFCs

We're trying a new approach of checking in Fluent UI RFCs to the repo so that they're more persistent, easier to find, and we can use PR comments to discuss the proposals.

## Why RFCs?

The RFC process is intended to bring a few benefits:

- More efficent and durable decision making
  - **Efficent** as we can all engage and review on our own time, rather than locking X engineers in a room for hours
  - **Durable** as we give more time for decisions to be reviewed, commented, and considered. Rather than making a decision
    after being locked in a room for an hour with X other engineers.
- A more inclusive review proces
  - Supporting both quick and deep thinkers
  - Allowing proposals and comments from contributors
- Capturing decisions, allowing:
  - Us to review recent decisions and build ontop of them
  - Others to join the project more easily

The React RFC Process<sup>[1](#f1)</sup> sums it up nicely

> The RFC process is a great opportunity to get more eyeballs on your proposal before it becomes a part of a released version. Quite often, even proposals that seem "obvious" can be significantly improved once a wider group of interested people have a chance to weigh in.
>
> The RFC process can also be helpful to encourage discussions about a proposed feature as it is being designed, and incorporate important constraints into the design while it's easier to change, before the design has been fully implemented.

## RFC process

### 1. Creation

- Start by making a copy of [TEMPLATE.md](./TEMPLATE.md) under an appropriate area sub-folder and name. (While we're still experimenting with the RFC process, feel free to create a new area sub-folder if you don't think an appropriate one exists yet.)
- Write the RFC
- Submit a PR and label it with **Type: RFC**.

### 2. Review

A key purpose of the review phase is to seek feedback to help improve your idea. You the author are ultimately accountable for the proposal and its impact. Reviewers can, through comments, help you make the best decision you can. Throughout this review and process it is important that we strive to avoid both [Design by Committee](https://en.wikipedia.org/wiki/Design_by_committee) and [Diffusion of Responsibility](https://en.wikipedia.org/wiki/Diffusion_of_responsibility).

- Seek support and integrate feedback
  - It is the responsibility of the author(s) to read, consider, and respond to all feedback in a timely manner. This does not mean all feedback must be integrated into the proposal, but it must be considered.
  - If you want to good engagement on your RFC, reserve time to respond to comments quickly.
  - A DRAFT PR can be used to gather early feedback and support from specific reviewers

Once the RFC has been open for **at least 2 days**, and recieved sufficent comments, the author can begin seeking approval.

### 3. Approval

We're still working through details for approval, below are the current guidelines.

Following the theme of author accountability, in general it's up to the author to decide when they feel they have recieved enough feedback, and enough approvals to proceed.

- When in doubt, seek **2 approvals** before merging the RFC.

### 4. Implementation

TBD: Should the RFC file be updated in some way when implementation starts? Should it be deleted when implementation is done, moved to a different location, other?

### References

- <b id="f1">1</b> - https://github.com/reactjs/rfcs/blob/master/README.md
- <b id="f2">2</b> - https://philcalcado.com/2018/11/19/a_structured_rfc_process.html
