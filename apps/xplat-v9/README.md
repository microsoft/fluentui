# xplat-v9

Proof of concept app for `fluentui` integration with `react-strict-dom`.

## Setup and running the app on Windows

### 1️⃣ First-time setup

Basic setup instructions for fluentui: https://github.com/microsoft/fluentui/wiki/Setup

After cloning the repo for the first time, or cleaning (`yarn scrub`, etc.), install the windows test app from the `apps/xplat-v9` directory:

```
cd apps/xplat-v9
yarn install-windows-test-app
```

### 🔃 After pulling latest from master

Install and build dependencies, from the repo's root directory:

```
yarn install
yarn buildto xplat-v9
```

Switch to the `apps/xplat-v9` directory and build:

```
cd apps/xplat-v9
yarn build:windows
```

### ▶️ Running the test app

Start the test app from the `apps/xplat-v9` directory:

```
cd apps/xplat-v9
yarn windows
```

## Updating from `microsoft/fluentui`

To pull the latest from `microsoft/fluentui`, run the following command:

```
git pull https://github.com/microsoft/fluentui.git master
```

If there are merge conflicts in `yarn.lock`, **accept all incoming** merge conflicts. Then run the following commands:

```
yarn install
npx yarn-deduplicate --strategy fewer
yarn install

```

## Updating `react-strict-dom`

Assuming you have `react-strict-dom` cloned, run the following commands to
build and package it (on Windows, use Git Bash):

```
git pull
git clean -dfqx
npm i
cd packages/react-strict-dom
npm run build
npm pack
mv react-strict-dom-0.0.0.tgz react-strict-dom-0.0.0-$(git rev-parse --short HEAD).tgz
```

Back in `fluent-rsd`, copy `react-strict-dom-0.0.0-<commit>.tgz` to
`apps/xplat-v9/vendor` and update `apps/xplat-v9/package.json`:

```diff
diff --git a/apps/xplat-v9/package.json b/apps/xplat-v9/package.json
index efaeaf3ea8..662372c32b 100644
--- a/apps/xplat-v9/package.json
+++ b/apps/xplat-v9/package.json
@@ -25,7 +25,7 @@
     "react-native": "^0.73.0",
     "react-native-macos": "^0.73.0",
     "react-native-windows": "^0.73.0",
-    "react-strict-dom": "file:./vendor/react-strict-dom-0.0.0-44bfd09f9f.tgz"
+    "react-strict-dom": "file:./vendor/react-strict-dom-0.0.0-<commit>.tgz"
   },
   "devDependencies": {
     "@babel/core": "^7.20.0",
```

Delete the previous tarball. Navigate back to repository root and run `yarn` to
update `yarn.lock`.
