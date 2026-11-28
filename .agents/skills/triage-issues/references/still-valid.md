# Still-valid check

Shared by `triage-issues` and `v9-backlog-groom`. Answers "does this report still apply to current code?" before anyone spends time on it.

In `triage-issues`, run it only when the issue is older than about 90 days or names a package version older than the latest release. Brand-new reports against the latest version rarely need it. In `v9-backlog-groom`, run it for every issue.

## Checks, cheapest first

1. **Reported version vs latest.** Compare the version in the issue body with the latest release of the package (`npm view @fluentui/<pkg> version`).
2. **Fixing PRs.** Look for merged PRs that reference the issue or describe the symptom:

   ```bash
   gh pr list --repo microsoft/fluentui --state merged \
     --search '<issue number> OR <symptom keywords>' --limit 10 \
     --json number,title,mergedAt,url
   ```

   Also read the issue's linked PRs (`closedByPullRequestsReferences` and cross-referenced PRs in the timeline).

3. **Shipped?** A merged PR only counts once it's released. Find the package's changelog path (not every package has a `library/` folder, and charting lives under `packages/charts/`), then check the upstream copy lists the exact PR number:

   ```bash
   git ls-files '**/<pkg>/**/CHANGELOG.md' '**/<pkg>/CHANGELOG.md'
   gh api -H 'Accept: application/vnd.github.raw' \
     repos/microsoft/fluentui/contents/<changelog path> \
     | grep -n -m1 -E 'PR #<pr number>([^0-9]|$)'
   ```

   The nearest `## [x.y.z]` heading above the match is the release that contains the fix. If the changelog can't be fetched (404 or error), the result is `cannot_determine`, not "unreleased".

4. **Current code.** Read the relevant hook, styles, or render file on upstream `master` and check whether the reported behavior is still possible.
5. **Repro on current code.** For bugs that headless Chromium can observe, use the triage-issues validation step (playwright-cli) against the current per-component Storybook or the reporter's sandbox updated to the latest version.

## Outcomes

| Result                                                                   | Outcome            | Action                                                                                                                                                                                 |
| ------------------------------------------------------------------------ | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A specific merged PR fixes it **and** a released changelog lists that PR | `fixed`            | Close as completed (`gh issue close --reason completed`). No resolution label exists for this. Comment names the PR and the release: "Fixed by #123, released in `@fluentui/x` 9.4.2." |
| Merged but not yet released                                              | `fixed-unreleased` | Leave open. Comment linking the PR and saying it will ship in the next release. Don't close.                                                                                           |
| Repro no longer fails, but no fixing PR found                            | `unconfirmed`      | **Don't close.** Add `Needs: Author Feedback` and ask the reporter to confirm on the latest version. A maintainer can soft-close later (`Resolution: Soft Close`) if there's no reply. |
| Still reproduces, or the code still allows the behavior                  | `valid`            | Continue with the normal assessment.                                                                                                                                                   |
| Can't tell (needs a specific browser, AT, real timing, private sandbox)  | `cannot_determine` | Continue with the normal assessment and note the limitation in `needs_human_followup`.                                                                                                 |

Never close an issue only because a headless repro didn't fail. Many v9 bugs depend on the consumer's setup (portals, SSR, theme, browser, screen reader).
