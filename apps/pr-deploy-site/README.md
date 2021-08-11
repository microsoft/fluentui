# PR deployed demo site

This is the site that gets deployed for each PR at `https://fluentuipr.z22.web.core.windows.net/pull/#####/` (where `#####` is the real PR number).

> **NOTE:** It's also deployed during CI builds for [`master`](https://fluentuipr.z22.web.core.windows.net/heads/master/), [`7.0`](https://fluentuipr.z22.web.core.windows.net/heads/7.0/), and [`6.0`](https://fluentuipr.z22.web.core.windows.net/heads/6.0/).

## How to add a new package to the site

### Deploying storybook build

Lets say we wanna add a new package storybook named `@fluentui/react-dummy`

1. Ensure the package has storybook configured
2. In `packages/react-dummy/package.json`, add `build-storybook` task to `#scripts`, like following:
   > **NOTE:** Make sure the assets are build into `dist` folder

```diff
  {
    "name": "@fluentui/react-dummy",
    "scripts": {
+      "build-storybook": "build-storybook -o ./dist/storybook"
    }
  }
```

3. In `apps/pr-deploy-site/just.config.ts`, add `@fluentui/react-dummy` to the `dependencies` array.

```diff
const dependencies = [
 '@fluentui/react-button',
+ '@fluentui/react-dummy'
];
```

4. In `apps/pr-deploy-site/pr-deploy-site.js`, add an entry for `@fluentui/react-dummy`, substituting actual appropriate values.
   - > Choose an icon name [from this page](https://developer.microsoft.com/en-us/fluentui#/styles/web/icons#available-icons)

```diff
var siteInfo = [
  {...},
  {...},
+  {
+    package: '@fluentui/react-dummy',
+    link: './react-dummy/storybook/index.html',
+    icon: /* icon name you chose above */,
+    title: 'Dummy package',
+  },
]
```

5. Submit a PR and verify that the new package is added properly.
