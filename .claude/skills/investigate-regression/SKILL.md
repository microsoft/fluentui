---
name: investigate-regression
description: Investigate a regression bug in react-charts by scoping, searching, scoring, testing, and reporting the culprit commit. Trigger on phrases like "investigate regression", "find culprit", "regression bug", "faulty PR", "bisect".
user-invocable: true
---

# Investigate Regression

This skill walks through the full regression investigation pipeline using the `react-charts-mcp` tools. It accepts:

- **Bug description** (required) — passed as the first argument, e.g. `"DeclarativeChart crashes when rendering certain Plotly schemas"`
- **Component name** (optional, default: `DeclarativeChart`) — passed with `--component <name>`
- **Date range** (optional) — passed with `--since <date>` and/or `--until <date>`

Parse these from the arguments string before starting.

---

**IMPORTANT — Step announcements:** Before executing each step, you MUST print a visible banner to the user so they can track progress. Use this exact format:

```
---
## [Step N/8] Step Title
---
```

For example, before starting Step 1, output:

```
---
## [Step 1/8] Scoping the regression
---
```

This ensures the user always knows which phase of the investigation is currently running.

---

## Step 1 — Scope the regression

> **Announce:** `## [Step 1/8] Scoping the regression`

Call `scope_regression` to identify relevant source files and recent commits.

- `component`: parsed component name (default `DeclarativeChart`)
- `sinceDate` / `untilDate`: if provided

Save the returned file paths and commit list — you will need them in subsequent steps.

## Step 2 — Search commits by keyword

> **Announce:** `## [Step 2/8] Searching commits by keyword`

Call `search_commits` using keywords extracted from the bug description, combined with file paths from Step 1.

- `keyword`: key terms from the bug description (e.g. `"crash Plotly schema"`)
- `path`: a relevant source file path from Step 1 (pick the most specific one)
- `sinceDate` / `untilDate`: same date range if provided

Merge results with the commit list from Step 1 to build a combined suspect list.

## Step 3 — Fetch diffs and score commits

> **Announce:** `## [Step 3/8] Fetching diffs and scoring commits`

Call `fetch_commits_for_regression` to retrieve diffs and rank commits by regression likelihood.

- `description`: the full bug description
- `repo`: `microsoft/fluentui`
- `scope_filter`: array of file paths from Step 1

Review the returned scored commits. Identify the top 3-5 candidates.

## Step 4 — Inspect suspect commits

> **Announce:** `## [Step 4/8] Inspecting suspect commits`

For each of the top 3-5 candidates, call `get_commit_details`:

1. First pass: call with `statsOnly: true` to get a quick overview of each commit.
2. Second pass: for the top 2-3 most suspicious commits, call again **without** `statsOnly` (full diff) to examine the actual code changes.

Summarize what each suspect commit changed and why it might cause the regression.

## Step 5 — Prepare regression validation

> **Announce:** `## [Step 5/8] Preparing regression validation`

Call `prepare_regression_test` to generate a test plan for the suspect SHAs.

- `commits`: array of suspect commit SHAs (ordered oldest to newest)
- `packageName`: `@fluentui/react-charts`
- `repoRoot`: the repository root path (use the current working directory)
- `testCommand`: omit unless the user provided one

If `testCommand` was not provided, you MUST write a minimal test script based on the bug description. The test must:
- Exit 0 when the bug is **absent** (good commit)
- Exit non-zero when the bug is **present** (bad commit)
- NOT rely on any test added as part of a fix — it must work on older commits

Execute the test plan commands. Use parallel sub-agents (via the Agent tool) for each suspect commit to speed up validation.

## Step 6 — Analyze test results

> **Announce:** `## [Step 6/8] Analyzing test results`

Call `analyze_regression_results` with the pass/fail outcomes from Step 5.

- `results`: array of `{ sha, status, error? }` objects where `status` is `"pass"`, `"fail"`, or `"error"`

The tool will identify the PASS to FAIL transition point — this is the culprit commit.

## Step 7 — Cross-validate (if applicable)

> **Announce:** `## [Step 7/8] Cross-validating with fix commit` (or `## [Step 7/8] Cross-validation — skipped (no fix commit)` if not applicable)

If a fix commit is known (from the bug report or conversation), call `find_culprit` to cross-check.

- `fixCommit`: the fix commit SHA
- `searchDepth`: 50 (or higher if needed)

Compare the result with the culprit identified in Step 6. If they match, confidence is high. If they diverge, note both candidates and explain the discrepancy.

If no fix commit is available, skip this step.

## Step 8 — Generate HTML report

> **Announce:** `## [Step 8/8] Generating HTML report`

Write a file called `regression-report.html` in the repository root with the following sections:

1. **Bug Summary & Reproduction** — description of the bug and how to reproduce it
2. **Scoped Files and Commit Timeline** — files and date range examined
3. **Ranked Suspect Commits** — table of top candidates with reasoning for each
4. **Culprit Commit Details** — SHA, author, PR link, diff summary of the identified culprit
5. **Test Results Table** — each tested commit with pass/fail/error status
6. **Confidence Level & Next Steps** — overall confidence (high/medium/low) and recommended actions

Use clean, readable HTML with inline CSS styling. Include a header with the investigation date and component name.

---

## Important notes

- Always report progress to the user between steps.
- If any MCP tool call fails, report the error and attempt to continue with the remaining steps using whatever data is available.
- If the suspect list is empty after Steps 1-3, inform the user that no candidates were found and suggest broadening the date range or adjusting the bug description.
