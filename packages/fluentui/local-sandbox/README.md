# Local sandbox

This package is an empty application which uses Fluent UI.

Production build without hot reload. Primary purpose of this application is to manually test performance and/or memory impact.

## Usage

```
yarn build:withdependencies
yarn build:production
yarn serve
```

## Measuring bundle size

This package can be also used to analyze bundle size. After running `yarn build:production`, bundle size report is stored to **dist/report.html**.
