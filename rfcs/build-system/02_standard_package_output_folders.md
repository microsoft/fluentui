# RFC: Standard package output folders

---

_List contributors to the proposal: @dzearing_

## Summary

There are multiple javascript formats we may include in our npm packages: `commonjs`, `esm`, and `amd`, in addition to static assets like pre-made bundles and images.

We should adopt a predictable folder structure within the published npm package for these formats. That way consumers of our packages can know exactly where things are and which folders have what things in as few steps as possible.

## Problem statement

Recently a change to a library to use the `build:commonjs-only` build step changed the `commonjs` output folder from `lib-commonjs` to `lib`. This in turn caused a partner to hit friction because on syncing the change, their `lib` folder still had `esm`. In debugging why they hit this, developers unfamiliar with the change didn't know why the package.json `main` entry was changed to `lib` and had to hunt down if the change was intentional or not.

We should avoid output folder changes occuring simply because we output less formats. There is no need for additional friction for end users when simply having some standards here can avoid confusion.

## Detailed Design or Proposal

Proposed standard folders in a published package (does not imply they will all be present - only applicable output folders will be present):

`lib` - esm
`lib-commonjs` - commonjs
`lib-amd` - amd
`dist` - bundles and static content

### Pros and Cons

#### Pros

- ESM is becoming the standard that all platforms will snap to, hence why `lib` and not `lib-esm`
- Changes in output won't change the folder structure
- Unchanging folder structures mean that full builds are required less
- End users can predict which folders contain what format

#### Cons

None that I see

## Discarded Solutions

The current solution of "use `lib` for commonjs if that's the only output flavor" should be discarded. It creates unpredictability and changes expectations as soon as we move the library to esm.
