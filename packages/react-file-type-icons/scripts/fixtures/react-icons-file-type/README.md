# Temporary File-Type Metadata Fixture

This metadata-only package keeps the Fluent PR self-contained until
`@fluentui/react-icons-file-type` publishes its `metadata.json` export.
The metadata is a snapshot of the generated upstream `lib/metadata.json`;
do not maintain a separate icon catalog here.

After the upstream release:

1. Replace `file:./scripts/fixtures/react-icons-file-type` in the owning package's
   devDependencies with the released version and update the lockfile.
2. Delete this fixture directory.
3. Run `yarn nx run react-file-type-icons:generate-metadata` and
   `yarn nx run style-utilities:generate-metadata`, then test both packages.

The generator keeps using the public package export throughout; no fallback or
runtime dependency is introduced.
