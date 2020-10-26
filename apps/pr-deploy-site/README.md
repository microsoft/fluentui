# PR deployed demo site

This is the site that gets deployed for each PR at `http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/#####/merge/` (where `#####` is the real PR number).

It's also deployed during CI builds for [`master`](http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/heads/master/), [`7.0`](http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/heads/7.0/), and [`6.0`](http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/heads/6.0/).

## How to add a new package to the site

These steps cover the most common scenario, a component package with a storybook-based demo site with its examples in `react-examples`. In these steps, we'll call the new package `@fluentui/react-notbutton` (substitute the real name).

1. Ensure the package has examples under `packages/react-examples/src/react-notbutton`
2. In `apps/pr-deploy-site/just.config.ts`, add `@fluentui/react-notbutton` to the `dependencies` array.
3. In `apps/pr-deploy-site/pr-deploy-site.js`, add an entry for `@fluentui/react-notbutton`, substituting actual appropriate values. (Choose an icon name [from this page](https://developer.microsoft.com/en-us/fluentui#/styles/web/icons#available-icons).)
   ```ts
   {
     package: '@fluentui/react-notbutton',
     link: './react-notbutton/storybook/index.html',
     icon: /* icon name you chose above */,
     title: 'Not Button',
   }
   ```
4. Submit a PR and verify that the new package is added properly.
