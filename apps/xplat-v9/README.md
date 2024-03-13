# xplat-v9

Proof of concept app for `fluentui` integration with `react-strict-dom`. Please refer to the Loop workspace where we coordinate the xplat effort to learn more.

## Setup and running the app

### 1️⃣ First-time setup

Basic setup instructions for fluentui: https://github.com/microsoft/fluentui/wiki/Setup

In case your machine is not already set up, you also want to follow the getting started guides for React Native, depending on the platforms you are interested in:

- [iOS and Android](https://reactnative.dev/docs/environment-setup)
- [Windows](https://microsoft.github.io/react-native-windows/docs/rnw-dependencies)
- [macOS](https://microsoft.github.io/react-native-windows/docs/rnm-dependencies)

#### Windows specific

After cloning the repo for the first time, or cleaning (`yarn scrub`, etc.), install the windows test app from the `apps/xplat-v9` directory:

```sh
yarn --cwd apps/xplat-v9 install-windows-test-app
```

### 🔃 After pulling latest from master

Install and build dependencies, from the repo's root directory:

```sh
yarn install
yarn buildto xplat-v9
```

### ▶️ Running the test app

Start the test app from the `apps/xplat-v9` directory:

```sh
yarn --cwd apps/xplat-v9 windows # or "ios" or "macos" or "android"
```

If Metro (the React Native bundler) doesn't automatically start, open a new terminal window on the same path (`apps/xplat-v9`) and run:

```sh
yarn start
```

## Updating `microsoft/fluentui`

To pull the latest from `microsoft/fluentui`, run the following command:

```sh
git pull https://github.com/microsoft/fluentui.git master
```

If there are merge conflicts in `yarn.lock`, **accept all incoming** merge conflicts. Then run the following commands:

```sh
yarn install
npx yarn-deduplicate --strategy fewer
yarn install

```
