# RFC: Fluent UI Repo Folder Organization

<!--
An RFC can be anything. A question, a suggestion, a plan. The purpose of this template is to give some structure to help folks write successful RFCs. However, don't feel constrained by this template; use your best judgement.
Tips for writing a successful RFC:
- Simple plain words that make your point, fancy words obfuscate
- Try to stay concise, but don't gloss over important details
- Try to write a neutral problem statement, not one that motivates your desired solution
- Remember, "Writing is thinking". It's natural to realize new ideas while writing your proposal
-->

---

Contributors: Fluent UI React Build team, @justSlone

## Summary

This propsoal covers 3 topics:
1. rfcs folder
2. specs folder
3. packages folder

The rfcs and specs folder changes should and can be made easily and soon. The packages folder change can be made later. 

Overall this RFC proposes that we organize our repo by NPM package names under the @fluentui namespace. 
These names today are `react`, `react-components`, `react-northstar`, and `web-components`. Organizing by NPM package name, 
while not necessarily ideal and may change over time, has the benefit of making it easy to follow from NPM to the appropriate source code in GitHub. 
This also scales well if we add additional projects to the repo (as long as they are under the @fluentui namespace on NPM). 

## Background

Some useful background is that we have heard from contributors that the current organization of the rfcs and specs folders at the root of the 
repo is confusing to contributors working on web-components. 

## Problem statement

With the addition of vNext to the repo we now have 4 actual projects in our repo: 
@fluentui/react, @fluentui/react-northstar, @fluentui/web-components, and more recently @fluentui/react-components.

This leads to a fairly confusing and difficult to navigate repo. Furthermore we have some folders we are actively using, such as rfcs and specs
which could apply to any of the 4 projects, but in fact only really apply to @fluentui/react-components. This is potentially confusing to 
contributors visiting our repo, and generally a ramp-up headache. 

## Detailed Design or Proposal

1. Within the rfcs folder we should create a new subfolder called `react-components` and move all existing rfcs to this folder. 
   - if needed additional `react`, `react-northstar`, or `web-components` RFCs can be created
   - RFCs that apply to the whole repo can go in a folder called `general` (if anyone has a better name, let me know!)
2. We should remove the specs folder. We should be keeping specs up to date under the relevant package folders. Associating specs with particular packages scales better in a large repo such as this. 
The reason we don't do this for RFCs is that they span packages (and as is in the case of this RFC, sometimes span projects). 
3. We should also (though can be done later) re-organize the packages folder by suite package name. Using the same names `react`, `react-components`, `react-northstar`, `web-components`.
4. An optional, though probably desirable change would be to organize the `apps` folder in a similar way

### Pros and Cons

<!-- Enumerate the pros and cons of the proposal. Make sure to think about and be clear on the cons or drawbacks of this propsoal. If there are multiple proposals include this for each. -->

## Discarded Solutions

<!-- As you enumerate possible solutions, try to keep track of the discarded ones. This should include why we discarded the solution. -->

## Open Issues

<!-- Optional section, but useful for first drafts. Use this section to track open issues on unanswered questions regarding the design or proposal.  -->
