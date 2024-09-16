### What is API Extractor?

[API Extractor](https://api-extractor.com/) generates an api.md file containing the public API for a package. `@fluentui/react` and related packages as well as `@fluentui/web-components` use API Extractor to ensure that API changes must be reviewed before being merged into master. (`@fluentui/react-northstar` and related packages do not use API Extractor as of writing.)

### Build Tasks

As part of a package's build process, the api-extractor task checks the package's public API with the package's auto-generated .api.md file.

If building locally, the API file will be updated automatically (in `7.0` and `master`). Be sure to commit the updates with your other changes!

In PR builds, the task will fail if it detects missing API file updates.

(Previously it was necessary to run a separate command `yarn update-api` to update the API files, but we decided to streamline this and do the update automatically as part of the build instead.)

### API Extractor code requirements

See the [API Documentation page](API-Documentation#prop-comment-requirements).
