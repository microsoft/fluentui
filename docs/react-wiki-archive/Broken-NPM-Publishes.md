## What to do?

In the event that we publish a package version that's broken, follow the steps below to mediate:

1. Deprecate the broken version for each package that were recently published and affected.
2. Update `latest` tag to point to the last known good version published. You may need to do this not just for the direct package affected but for the whole dependency tree of that package (i.e. `fluentui/react` v8 publishes a broken version, all its v8 dependencies and the v8 dependencies of its dependencies and so on) due to caret dependencies.
