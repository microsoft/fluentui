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
cd apps/xplat-v9
yarn install-windows-test-app
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
cd apps/xplat-v9
yarn windows # or "ios" or "macos" or "android"
```

#### iOS/macOS specific

To be able to run the iOS and macOS app successfully, remember to run this before `yarn ios`/`yarn macos`:

```sh
pod install --project-directory=ios
# OR
pod install --project-directory=macos
```

#### Running the bundler

If Metro (the React Native bundler) doesn't automatically start, open a new terminal window on the same path (`apps/xplat-v9`) and run:

```sh
yarn start
```

If you are having issues with the bundler, you can also try running it with cache resetting: `yarn start --reset-cache`.

#### Using the web app

Within the `web` folder there is a small webapp ([vite](https://vitejs.dev/)+react) that we can use to verify that the `StrictDomDemo` code works still in web as well - it literally imports it directly.

To use it, you have to:

```sh
cd web
yarn install # it does not do that automagically, we want to keep it opt-in
yarn dev
```

After which you should be able to see the webapp running locally.

## Updating `microsoft/fluentui`

To pull the latest from `microsoft/fluentui`, run the following command:

```sh
git pull https://github.com/microsoft/fluentui.git master --no-rebase
```

If there are merge conflicts, address them at this phase.

If the conflict are in `yarn.lock`, directly run the following commands:

```sh
yarn install
npx yarn-deduplicate --strategy fewer
```

After addressing all the merge conflicts, make sure to also run `npx syncpack list-mismatches`. It is likely that the `xplat` branch is going to be somewhat out of sync with version bumps that have happened in the `master` branch, so make sure to address them before proceeding. Here's [an example of a PR](https://github.com/microsoft/fluentui/pull/30876) doing so.
