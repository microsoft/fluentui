# RFC: Fluent UI Repo Folder Organization

---

Contributors: Fluent UI React Build team, @justSlone

## Summary

This proposal covers 2 topics:

1. organization of rfcs folder
2. organization (or removal) of specs folder

Overall this RFC proposes that we organize our repo by NPM package names under the @fluentui namespace.
These names today are `react`, `react-components`, `react-northstar`, and `web-components`. Organizing by NPM package name, while not necessarily ideal and may change over time, has the benefit of making it easy to follow from NPM to the appropriate source code in GitHub. This also scales well if we add additional projects to the repo (as long as they are under the @fluentui namespace on NPM).

## Background

Some useful background is that we have heard from contributors that the current organization of the rfcs and specs folders at the root of the
repo is confusing to contributors working on web-components. The RFCs and Specs don't mention clearly what project they are for.

## Problem statement

With the addition of vNext to the repo we now have 4 actual projects in our repo:
`@fluentui/react`, `@fluentui/react-northstar`, `@fluentui/web-components`, and more recently `@fluentui/react-components`.

This leads to a fairly confusing and difficult to navigate repo. In particular we have some folders we are actively using, such as rfcs and specs which could apply to any of the 4 projects, but in fact only really apply to @fluentui/react-components. This is potentially confusing to contributors visiting our repo, and generally a ramp-up headache.

## Detailed Design or Proposal

1. Within the rfcs folder we should create a new subfolder called `react-components` and move all existing rfcs to this folder.
   - if needed additional `react`, `react-northstar`, or `web-components` RFCs can be created
   - RFCs that apply to the whole repo can go in a folder called `shared`
2. Remove the specs folder and move any specs to the relevant packages folders
   - We should be keeping specs up to date under the relevant package folders.
   - Associating specs with particular packages scales better in a large repo such as this.
   - The reason we don't do this for RFCs is that they span packages (and as is in the case of this RFC, sometimes span projects).

### Pros and Cons

Pros:

- Better organization of repo, clearer for contributors
- Improves the scale of the repo, could allow more projects in the future, or at least makes working with the projects we have more pleasant

Cons:

- Large file moves cause merge conflicts

## Discarded Solutions

- Considered moving everything under the packages folders, including RFCs. Decided to leave RFCs at the root for better discoverability as they are good introductions to the project.
- Considered using vNext, v8, v0 as the folder names. This isn't as good as the current proposal as vNext will soon not become "next".

## Postponed till later - Will update this RFC with a full proposal for the below later.

3. [Future] We should also (though can be done later) re-organize the packages folder by suite package name. Using the same names `react`, `react-components`, `react-northstar`, `web-components`.
   - This can be done by an nx generator. Suggestion is that someone other than @hotell writes the generator to spread the knowledge.
   - We also would likely need a `shared` folder under the packages folder for things that are not directly applied to a given project.
   - The work to break down exactly what packages should go where is out of scope of this RFC and left for future work.
4. [Optional] An optional, though probably desirable change would be to organize the `apps` folder in a similar way

### Cons

- Moving files around, especially in the packages folder, can break things
- For package moves, this will make cherry picking fixes to branches like for 7.0 more difficult

## Open Issues

None
