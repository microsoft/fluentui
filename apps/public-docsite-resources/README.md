# @fluentui/public-docsite-resources

> 💡 NOTE:
>
> **🚨 This project is both application and library**, which introduces disallowed domain relationships ( `public-docsite` and `ssr-tests` application depend on this application ) and also that's why it has both `bundle` and `build` targets
>
> In order to properly follow domain scoping and our target naming and configuration, this project would need to be dissected into two:
>
> - public-docsite-resources-api
>   - would live under `/packages/`
>   - would contain all sources except application related code
>   - on `build` would generate `dist/api/*.json` and all transpiled js modules related to creation of `AppDefinition.tsx`
> - public-docsite-resources-app
>   - would depend on `public-docsite-resources-api#build` in order to obtain AppDefinition and `api/*.json` files
>   - would contain only application related code
>   - on `bundle` would build deployable application as of today

**Local demo app for @fluentui/react controls**

This project contains the demo app that runs when you do `yarn start` from the root of the Fluent UI repo or from the `@fluentui/react` package.

~~To see a live version of this app, go to https://aka.ms/fluentdemo and choose a version.~~

See the [readme](https://github.com/microsoft/fluentui) for more information about Fluent UI and instructions for getting started with development, including how to run this app locally.
