# [Fluent UI website](https://dev.microsoft.com/fabric)

**The official website for the Fluent UI project.**

Fluent UI is a collection of projects that represent the Fluent design language in code. This website helps document the components and styles that make up Fluent UI.

## Build the website

See the [readme](https://github.com/microsoft/fluentui) for instructions on getting started with Fluent UI development.

Once your repo is set up, run the following to start a local copy of the website. (Be sure to **start from the root of the repo**, not the `public-docsite` folder.)

```
yarn
yarn buildto public-docsite
cd apps
cd public-docsite
yarn start
```

`yarn start` will open your operating system's default web browser with the website. You can make changes to the code which will automatically build and refresh the page using live-reload.
