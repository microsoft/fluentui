As a new developer to the Fluent repo, but long time consumer and fan, the supporting documentation has room for opportunity. To be productive, I've had to randomize other members of the core team which slows us both down.

This RFC seeks to lay out a plan to update the Fluent dev docs. The ultimate goal is to streamline contributors path to success.

## Goals of the new system:

- Be more accessible to developers in their work flow.
- Help developers onboard faster without distracting core team members.
- Provide technical documentation and guides for common patterns and practices that do not make sense to live in examples or code samples.
- Focus attention on areas under active development (web and react components)

## Non-Goals

- Provide an ongoing communications platform for project statuses, road maps and planning.
- Provide documentation relevant to other disciplines outside engineering.
- Provide documentation around consuming the library. These should live externally in the Storybook.
- Provide documentation around filing bugs or how to engage with the team.

## Current issues:

- Mixture of v6, 7, 8 and 9 specific docs.
- Docs seemed to have stopped being updated in the early days of v9 development.
- Mixture of process, set up, and reference docs.
- RFC’s seem to be a large part of the Fluent process now, but there’s no clear way for an outsider to observe or contribute to them.
- Use of Github’s wiki isn't the best technical solution.

## Proposed changes

### Place all dev documents in markdown files in a `docs` folder at the root of the repo.

This would completely replace the wiki. There are two main advantages to this method:

- Developers won’t have to context switch to access the documents.
- Searching capabilities in VSCode tend to by wildly superior to those in Github.
- Allows for all dev document changes to go through proper review via PR review process.

### Establish a new folder and docs structure:

`docs`

- rfcs

  - some-historical-rfc.md
  - // All the historical RFCs.

- react-v9
  - contributing
    - dev-env.md // setting up your development environment for the first time
    - dev-workflow.md // general end to end guidance of contributing a fix/feature/component end to end.
    - command-cheat-sheet.md // simple table of all the commands we use daily.
    - common-snags.md // a place to accumulate docs around common errors that we can link to.
    - coding-style.md // any coding style guidelines not covered by the linter
- internal_patterns
  - // docs that explain patterns used internally in our components
  - // can also include best practices recommendations
- testing
  - // docs that explain current testing processes, minimum bars, and helpful tips and tricks to spin up.
- browser-support-matrix.md
- \_rfc-process.md // Explainer on what RFCs are, are not and how they work.
- \_rfc-template.md // Starting point.

react-v8-and-below
// Copy paste the exact same content from the current wiki.
