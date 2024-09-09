# Fluent UI RFCs (Request For Comment)

An RFC is usually an ongoing pull request with a single mark down file and supporting assets that serves as a discussion point to drive towards consensus around a new technical or process idea. We put these documents in the rfcs folder that serves as an archive.

The [React RFC Process](https://github.com/reactjs/rfcs/blob/master/README.md) sums it up nicely

> The RFC process is a great opportunity to get more eyeballs on your proposal before it becomes a part of a released version. Quite often, even proposals that seem "obvious" can be significantly improved once a wider group of interested people have a chance to weigh in.
>
> The RFC process can also be helpful to encourage discussions about a proposed feature as it is being designed, and incorporate important constraints into the design while it's easier to change, before the design has been fully implemented.

## RFC process

### 1. Creation

- Start by making a copy of [rfc-template.md](./rfcs/rfc-template.md) under an appropriate area sub-folder and name. (While we're still experimenting with the RFC process, feel free to create a new area sub-folder if you don't think an appropriate one exists yet.)
- Write the RFC
- Submit a PR and label it with **Type: RFC**.

### 2. Review

A key purpose of the review phase is to seek feedback to help improve your idea. You the author are ultimately accountable for the proposal and its impact. Reviewers can, through comments, help you make the best decision you can. Throughout this review and process it is important that we strive to avoid both [Design by Committee](https://en.wikipedia.org/wiki/Design_by_committee) and [Diffusion of Responsibility](https://en.wikipedia.org/wiki/Diffusion_of_responsibility).

- Seek support and integrate feedback
  - It is the responsibility of the author(s) to read, consider, and respond to all feedback in a timely manner. This does not mean all feedback must be integrated into the proposal, but it must be considered.
  - If you want to have good engagement on your RFC, reserve time to respond to comments quickly.
  - A DRAFT PR can be used to gather early feedback and support from specific reviewers

### 3. Approval

Following the theme of author accountability, in general it's up to the author to decide when they feel they have received enough feedback, and enough approvals to proceed.

### Additional References

- https://philcalcado.com/2018/11/19/a_structured_rfc_process.html

### 4. Do's and Don'ts

- Do list primary stakeholders and participants.
- Don't use RFC's as a method to document a pattern. They are not tutorials, they are a method for gathering feedback.
- Do list when a decision needs to be made by, a solution implemented or next steps taken.
- Don't let RFC's sit forever. If a topic isn't going to move forward, close the PR in a timely manner.
- Do shop your RFC around. Just because it is posted does not imply it will be read. The author should be active in following up with stakeholders.
- Don't reveal proprietary business plans in an RFC.
- Do plug your RFC at the tech syncs to get it the attention it deserves.
- Don't use an RFC to document an agreed upon process.
- Do list the resulting epics or issue numbers in the document so people can follow up.
- Do consider if an RFC is the right document type. Not every decision needs to be made with an RFC.
