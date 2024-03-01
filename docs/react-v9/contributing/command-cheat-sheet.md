This is a helpful list of helpful every day commands.

yarn // cleans and installs everything, it fixes many things.
yarn build // does everything yarn does and updates the API doc file
yarn buildto package-name // Does a yarn build scoped to a specific package for faster speeds.
yarn test // runs a test suite. It is slightly different from the test suite in the CI/CD test suite. Can be run from inside a given package to run faster.
yarn create-package // scaffolds a new package
yarn create-component // scaffolds a new component
yarn change // creates a new change file, if needed
yarn clean // tidies any cached dependencies
yarn start // runs a package. You can select the package of choice.
yarn update-snapshots // updates snapshot tests

git checkout -b user/jdoe/some-fancy-branch-name // creates your branch
git status // shows a list of changed files.
git add . // stages all your changed files
git add some/file/name // adds a specific file to the change set
git commit -m "your commit message" // commits all your staged files
git pull upstream master // pulls the latest version of master to your local machine from the root repo, not your fork
git branch // lists all the branches on your local machine
git checkout user/jdoe/some-fancy-branch-name // checks out the branch
git push upstream // pushes your branch to the main repo.
