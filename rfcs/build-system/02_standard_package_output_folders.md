# RFC: Standard package output folders

---

_List contributors to the proposal: @dzearing_

## Summary

There are multiple javascript formats we may include in our npm packages: `commonjs`, `esm`, and `amd`, in addition to static assets like pre-made bundles and images.

We should adopt a predictable folder structure within the published npm package for these formats. That way consumers of our packages can know exactly where things are and which folders have what things in as few steps as possible.

This is one of those small details that other partners will emulate and adopt. If we can be consistent, many packages exported by our partners will likely follow guidance because it is really minutia, but ends up adding to more predictability at scale.

## Problem statement

Today, `lib` contains esm JavaScript output, except for node-only packages which drop CommonJS modules in them. This obfuscates what `lib` actually contains. We should have some standards and stick to patterns which add clarity to what output format is used.

## Detailed Design or Proposal

We've historically used the following standard output folders in a published JavaScript package (only applicable output folders would be present):

- `lib` - esm (as we've had for a long time)
- `lib-commonjs` - commonjs (only needed while Node <= 13.2.0 is supported)
- `lib-amd` - amd (hopefully we can drop someday)
- `dist` - bundles and static content

If this seems reasonable to folks, we should just stick with this and stay consistent. If a library needs to output CommonJS, it should go inthe `lib-commonjs` folder.

A library like `react-button` which might be consumed by Node and bundlers likely will need both ESM and CommonJS, until Node 13.2.0 or greater is the minimum requirement. Its output will have both a `lib` and `lib-commonjs` folder.

Once 13.2.0 becomes the minimum Node requirement, there is little reason to build CommonJS at all, and I anticipate we'll be removing that folder.

### Pros and Cons

#### Pros

- Almost no difference from what we currently have - only the `build:commonjs-only` task needs to be modified to output to `lib-commonjs`.
- Our partners won't really notice changes here at all, since this has been the convention we've used for a long time for nearly all the packages currently being consumed.
- ESM is becoming the standard that all platforms will snap to, hence why `lib` and not `lib-esm`.
- Changes in output won't change the folder structure
- Unchanging folder structures mean that full builds are required less
- End users can predict which folders contain what format
- Scalable. If we need other formats in our JS packages, we can update add more formats.
- `CommonJS` was the standard of the past. More and more, modern node libraries will be moving to ESM as Node 13.2.0+ now supports it. I anticipate this format to phase out over the next few years as AMD has.

#### Cons

- Potentially `esm` might be changed as the "standard" library format in the future, which would require us to adjust what `lib` means.

### Alternatives

Many libraries in OSS have kept `lib` representing CommonJS and have added `es` to the mix as the folder for containing esm. This is very likely because they've existed for a while and didn't want to change their existing folder structure. We could also consider this convention. React itself avoids `lib` and explicitly uses `cjs` to indicate the output format. (It also has no ESM flavor.)

#### Alternative proposal:

* `cjs` - CommonJS
* `es` - esm
* `amd` - amd
* `dist` - statics and bundles

#### Pros:

* Follows a few more OSS library conventions (though there isn't consistency here)
* Won't have to revisit if the JavaScript flavor of the month changes later

#### Cons:

* A bigger shift than the original proposal - will impact nearly all of our packages
* Definitely more work to clean things up to this format

### How do other major packages organize their output?

"Standards" haven't really emerged other than `dist` being the output folder. There is a commonality of using `es` as the esm folder. Here's a small sampling:

* @angular/core - Uses `bundles` for output which includes a UMD bundle for commonjs support, and `fesm2015` for esm. 
* @apollo/client - No folders; `index.js` at root is esm while `index.cjs.js` is CommonJS.
* @material-ui/core - Uses a root `index.js` rollup entry for commonjs and `es` folder for esm.
* antd - Uses `es` for esm, `lib` for commonjs.
* immer - Uses only `dist` and rolls up a separate `esm` bundle.
* react - Commonjs is in `cjs`, there's also a `umd` folder for bundles.
* redux - Uses `es` for esm, `lib` for commonjs.
* styled-components - Only `dist` with `s-c.esm.js` and `s-c.cjs.js`. They also emit a react-native `s-c.native.js` flavor.

## Discarded Solutions

The current solution of using `lib` for either CommonJS or ESM depending on which platforms are (currently) supported should be replaced with something that doesn't mean different things in different contexts.
