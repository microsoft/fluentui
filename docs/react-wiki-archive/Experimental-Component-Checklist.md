**WARNING: As of Fluent UI React version 7/8, the ideas on this page are generally correct, but we're in the process of developing new detailed guidance. Until we have a chance to fully update this page, please reach out to the team for current guidance.**

## Checklist before creating PR to experiments

- Validate file/package structure
- Validating the atomic-ness of the component
  - Is the component unique (is it already implemented elsewhere)
  - Can it be broken down further
- Validating the api surface
  - Does it have the basic expected props?
  - Are there naming or typing inconsistencies?
  - Is it hard to use or understand?
- Is the documentation complete and clear?
  - Are the prop descriptions consistent with other prop descriptions?
- Are the examples inspiring, delightful, useful, straightforward?
  - Can you copy paste into a codepen?
- Are the features robust enough to delight? (are we missing basic fundamentals?)

## Checklist before graduating out of experiments

- Hackathon to use/create/tinker/toy
- Refine accessibility (another hackathon?)
  - Screen Reader
  - High Contrast
  - Themable
  - RTL/Localization
  - Keyboarding
- Example affect on bundle size
- Fill out Questionnaire
  - What are the target apps these are built for
- Who will be the CODEOWNERS
