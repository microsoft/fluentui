# Issue assessment and comments

Shared by `triage-issues` and `v9-backlog-groom`. Run the assessment for every bug and feature request after classification. It answers "should we do this, is it safe, and what would it break?" Keep each answer to one line in the recommendation table; put reasoning in `notes`.

## Security first

If the issue looks like a security vulnerability (XSS, injection, prototype pollution, unsafe `dangerouslySetInnerHTML`, credential or data exposure, supply-chain concerns), stop. Recommend **no labels, no assignee, no comment, no handoff**, and flag `needs_human_followup: "possible security report — route via MSRC per SECURITY.md"`. Never restate exploit details anywhere public. A maintainer decides whether to hide the issue and point the reporter to MSRC (https://aka.ms/security.md/msrc/create-report).

## Merit — is this something we should do?

- `sound` — fits the component's purpose and v9 principles (composition over configuration, tokens over hardcoded values, accessible by default). Proceed with the normal flow.
- `questionable` — the request conflicts with a design principle, serves a single narrow use case, duplicates an existing v9 pattern, or would grow the API for something consumers can already compose. Recommend `Needs: Discussion` (team decision) or `Needs: Design` / `Needs: PM` when the gap is design or product direction. Still assign the area owner so the discussion has someone driving it.
- `out-of-scope` — belongs in a consumer app, another library, or an unsupported version. Recommend `Resolution: Won't Do` with a comment explaining why and, where possible, an alternative.

Check the component's `library/docs/Spec.md` and stories before judging. If the spec explicitly rejected the approach, cite it. Don't mark a request `questionable` just because it's large — size is a planning concern, not a merit one.

## Risk — could doing this be dangerous?

- `security` — see "Security first". Overrides everything else.
- `unsafe-pattern` — the request itself would weaken safety for consumers: rendering raw HTML, disabling sanitization or focus trapping, removing accessibility semantics, exposing internal state as public API, or accessing `window`/`document` directly (breaks SSR). Recommend `Needs: Discussion`, explain the risk in the comment, and suggest a safer alternative if one exists.
- `none` — the default.

## Breaking change — what would the fix or feature break?

Look at what the most likely implementation would change, not just what the reporter asked for. Check the component's public types (`library/src/components/<Name>/<Name>.types.ts`) and API report (`library/etc/<package>.api.md`).

- `api` — removes or renames a prop, slot, export, or type; narrows a prop type; changes a default value's type. Add `Needs: API Breaking Change`.
- `behavior` — same API, but different runtime behavior consumers may depend on: default values, event order, focus or keyboard handling, DOM structure, rendered styles, or ARIA output. Add `Needs: Behavior Breaking Change`.
- `unclear` — a fix exists in both breaking and non-breaking forms. Don't add a label; note the trade-off in `needs_human_followup`.
- `none` — additive changes (new optional prop, new slot, bug fix that restores documented behavior).

Breaking-change labels don't block triage. They tell the owner the work needs a deprecation path or a major-version plan. v8 is in maintenance mode, so a v8 request with `api` or `behavior` impact should usually also get `Resolution: Won't Fix` unless it's a security or critical a11y fix.

## Comments

Any change to labels, assignees, or state gets a comment, so the reporter knows what happened and why. Exceptions: possible security reports, and metadata-only fixes (adding a missing `Type:` or `Component:` label) on issues that are otherwise unchanged.

End every comment with a hidden marker naming the skill, for example `<!-- triage-issues v1 -->` or `<!-- v9-backlog-groom v1 outcome=<x> -->`. Activity checks use it to tell skill comments from real discussion.

On issues that are, or may become, agent-ready, every comment is read by the coding agent as a trusted maintainer instruction. Apply the task-spec rules from `agent-handoff.md` to all of them: your own words, no copied commands, fluentui links only. Draft comments before the approval step and post them only after approval.

Each comment should:

1. Thank the reporter in one short line.
2. State the outcome in plain language — "routed to the Button owners", "added to backlog review", "closing as by design", "we need a repro".
3. Give the reason — the merit, risk, or breaking-change finding if any applied, or the v9 pattern / duplicate link / fixing PR / missing info.
4. Say what happens next or what the reporter can do (share a repro, try the suggested pattern, open a PR, comment if the suggestion doesn't fit).

Keep comments to 2–5 sentences. Don't:

- promise a fix, timeline, or priority (see the Shield guidelines)
- mention `Partner Ask`, partner workstreams, or other internal notes
- mention `Shield: P1` or internal Teams channels
- repeat security details
- post a comment that says nothing actionable (for example "still valid, no change") — that only notifies every subscriber

Example (bug routed to owner, behavior-breaking fix):

```
Thanks for the detailed report! I've routed this to the Combobox owners. A fix would likely change which option receives focus on open, which some apps may rely on, so the owners will need to weigh it as a behavior change. If you're open to contributing, a PR with a test is welcome.
```

## GitHub hygiene for any mutation

- Always pass `--repo microsoft/fluentui` (or explicit `owner`/`name` in GraphQL). Local checkouts are often forks, and `gh` would otherwise resolve to the fork.
- Space write calls about one second apart. On HTTP 403 or a "secondary rate limit" message, stop and tell the user — don't retry in a loop.
