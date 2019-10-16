# [Fabric website](https://dev.microsoft.com/fabric)

**The official website for the UI Fabric project.**

UI Fabric is a collection of projects that represent the Fluent design language in code. This website helps document the components and styles that make up Fabric.

## Build the website

See the [readme](https://github.com/OfficeDev/office-ui-fabric-react) for instructions on getting started with Fabric development.

Once your repo is set up, run the following to start a local copy of the website. (Be sure to **start from the root of the repo**, not the `fabric-website` folder.)

```
yarn
yarn buildto fabric-website --min
cd apps
cd fabric-website
yarn start
```

`yarn start` will open your operating system's default web browser with the website. You can make changes to the code which will automatically build and refresh the page using live-reload.
