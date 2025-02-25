# react-text-visual-regression

This library was generated with [Nx](https://nx.dev).

## Building

Run `nx build react-text-visual-regression` to build the library.

## Running unit tests

Run `nx test react-text-visual-regression` to execute the unit tests via [Jest](https://jestjs.io).

## About

Free, Secure and OSS VR testing solution based on:

- Storybook to author VR scenarios
- StoryWright for capturing Stories and their interactions
- PlayWright test for running diffing and updating baseline

**Demo:**

> ## NOTE: needs new StoryWright features:
>
> - https://github.com/microsoft/storywright/pull/73
> - https://github.com/microsoft/storywright/pull/74

`yarn react-text-visual-regression:test-vr`

## TODO

- [ ] check raw [pixelmatch](https://github.com/mapbox/pixelmatch) usage instead PW/test / custom NX Executor
- [ ] check using [pixelmatch](https://github.com/mapbox/pixelmatch) within storywright with implementing new API `--mode= assert | screenshot`
- [ ] check using PW/test instead just PW within storywright
