# Team Routing & Label Taxonomy

## Team Routing

The source of truth for code ownership is [`.github/CODEOWNERS`](../.github/CODEOWNERS).
The table below is a summary — when in doubt, check CODEOWNERS.

| Area           | Team                                               | Packages                                               |
| -------------- | -------------------------------------------------- | ------------------------------------------------------ |
| v9 Components  | @microsoft/cxe-prg                                 | `packages/react-components/*`                          |
| v8 Components  | @microsoft/cxe-prg                                 | `packages/react/*`                                     |
| v8 Website     | @microsoft/fluentui-v8-website, @microsoft/cxe-prg | `apps/public-docsite`, `apps/public-docsite-resources` |
| Web Components | @microsoft/fui-wc                                  | `packages/web-components/*`                            |
| Charting       | @microsoft/charting-team                           | `packages/charts/*`                                    |
| Build/Tooling  | @microsoft/fluentui-react-build                    | `tools/*`, `.github/*`, root configs                   |

### V8 website reviews

Changes to the v8 website can be reviewed by either owning team; a review specifically from
`@microsoft/fluentui-v8-website` is not required.

All v8 website accessibility fixes must include Playwright regression coverage against the built website.
Add or extend a test that reproduces the reported issue and verifies the fix; keep relevant unit tests alongside it.
Run `yarn nx run public-docsite:e2e` to execute the browser tests.

## Label Taxonomy

### Product Labels

- `Fluent UI react-components (v9)` — v9 React components
- `Fluent UI react (v8)` — v8 React components
- `web-components` / `Fluent UI WC (v3)` — Web Components
- `Package: charting` — Charting library

### Type Labels

- `Type: Bug :bug:` — Bug reports
- `Type: Feature` — Feature requests

### Status Labels

- `Needs: Triage :mag:` — Needs team review
- `Needs: Author Feedback` — Waiting on issue author
- `Needs: Attention` — Needs team attention

### Resolution Labels

- `Resolution: Duplicate` — Duplicate of another issue
- `Resolution: Not An Issue` — Not a valid issue
- `Resolution: By Design` — Working as intended
