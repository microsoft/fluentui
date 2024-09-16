# Basic usage

In the root of a repo that relies on `office-ui-fabric-react`, simply run `npx @fluentui/codemods` and the upgrade will begin automatically based on your tsconfig.json files!

If your repo is especially large and you experience an out of memory error, run `npx @fluentui/codemods -s` to save synchronously which, while slower, will ensure that it completes!
