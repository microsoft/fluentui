# Metrics leg `head-7cc30e35` — SUPERSEDED FOR EVERY BUNDLE FIGURE

Captured 2026-08-07T16:16:58Z at commit `7cc30e35fbed33b4c48c6b7f50ece3f7fb804349` on branch
`styling/tailwind-css-modules` (node v22.12.0, yarn 4.12.0, 32 CPUs — see `env.txt`).

## Contamination notice

At this commit the workspace resolves `@fluentui/react-icons` through a **local-only** override:

```json
"resolutions": {
  "@fluentui/react-icons": "file:../fluentui-system-icons/packages/react-icons/fluentui-react-icons-local.tgz"
}
```

introduced by the two `LOCAL-ONLY(revert-before-PR)` commits `90d1096404` and `b0248a57f1`. That
tarball is a packed build of the icons fork and **will not exist in the reviewed tree** — the two
commits are reverted before the PR is marked ready.

Consequence: every figure in this leg that is derived from a resolved dependency graph — the
`monosize-*.json` files and `monosize.log` — is measured against a dependency that the reviewed tree
does not have, and is **not publishable**. `FINAL_REPORT.md` §2.0 states which figures from this leg
are published and which are withheld for this reason.

The other captures measure only this repo's own output and never traverse the dependency graph:
`lib-sizes.json` and `griffel-aot.txt` come from the workspace build, and `npm-pack-*.json` reports
what `npm pack` archives, which is the package's own files only. `FINAL_REPORT.md` §2.0 names the
leg behind each published number.

Once the revert plus the `^3.0.0` range bump land (open item 0a), re-capture with
`bash migration/griffel-to-tailwind/metrics/capture.sh <leg>` and publish bundle numbers from that
leg instead. This directory is kept for provenance, not for citation.

## Contents

12 files are committed. The three capture logs — `build-vnext.log`, `monosize.log`,
`storybook-build.log` — are present on disk but excluded by
`migration/griffel-to-tailwind/.gitignore`, matching every earlier leg.
