# Concurrency & isolation

Every scaffold points Jest's `rootDir` at the same origin project, so runs for different React majors (e.g. `test-rit--17--test` and `test-rit--18--test`) share one source tree while executing in parallel. To keep that safe:

- **Snapshots**: by default snapshot matchers are mocked (`toMatchSnapshot`/`toMatchInlineSnapshot` always pass unless `RIT_SKIP_SNAPSHOTS=false`) and the generated `jest.config.js` adds a scaffold-local `snapshotResolver` (`jest.snapshot-resolver.js` → `<scaffold>/snapshots/`) and ignores `.snap` modules. The builtin `jest -u` therefore never deletes or rewrites origin `__snapshots__/*.snap` files (previously concurrent runs raced on unlinking them → `ENOENT: no such file or directory, unlink`).
- **Real snapshots (opt-in)**: `RIT_SKIP_SNAPSHOTS=false` disables mocking and the isolation above, so snapshots are read from and (with `-u`) written to the origin project. Do not run multiple React majors concurrently in this mode.
- **Coverage**: `coverageDirectory` always points to `<scaffold>/coverage`, so concurrent runs never share coverage output.
- **Installation is not concurrency-safe per React major**: `--install-deps`, and prepare/one-shot runs without `--no-install`, rewrite `tmp/rit/react-<major>/{package.json,.yarnrc.yml,yarn.lock}` and run `yarn install` there. Run `rit --react <major> --install-deps` serially (once per major) before starting parallel work, then use `--prepare-only --no-install` and `--run --project-id`.
- Do not use `--force` while other runs use the same scaffold (same project + React major + `--project-id`); it deletes the scaffold first.
