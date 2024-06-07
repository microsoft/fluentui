### Cleaning your repo

Every once in a while you'll get build errors in node modules unrelated to your work. This usually happens when changes get checked into packages not related to the package you're working on.

First, file an issue [here](https://github.com/microsoft/fluentui/issues/new/choose) to ensure the team can track this issue.

Make sure all your desired changes are stashed or otherwise saved somewhere you can pull them back in.

Then try running:

`yarn`

If the issues still persist, clean your repo:

`yarn cache clean`
`yarn`

If unrelated errors are still persistent, a clean build may resolve:

`yarn build`
