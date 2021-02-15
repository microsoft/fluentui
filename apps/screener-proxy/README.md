# screener-proxy

This app is designed to be used with Fluent UI React Northstar, born out of the necessity to run 2 GitHub checks on a single PR, given that no more than one is supported through the official implementation method.
It provides the integration between [Screener](https://screener.io/), Github and Azure DevOps.

## How it works

There are three API endpoints:

- `/api/ci` - An endpoint, called by our CI, that will update the PR with Screener info

- `/api/github` - Listens for Github PR webhooks and creates thr Screener [check](https://docs.github.com/en/rest/reference/checks)

- `/api/screener` - Listens for [Screener webhooks](https://screener.io/v2/docs/webhooks) and updates the Github check with success/failure status
