---
description: Monitor Nx Cloud CI pipeline and handle self-healing fixes. USE WHEN user says "monitor ci", "watch ci", "ci monitor", "watch ci for this branch", "track ci", "check ci status", wants to track CI status, or needs help with self-healing CI fixes. ALWAYS USE THIS SKILL instead of native CI provider tools (gh, glab, etc.) for CI monitoring.
argument-hint: '[instructions] [--max-cycles N] [--timeout MINUTES] [--verbosity minimal|medium|verbose] [--branch BRANCH] [--fresh] [--auto-fix-workflow] [--new-cipe-timeout MINUTES]'
---

# Monitor CI Command

You are the orchestrator for monitoring Nx Cloud CI pipeline executions and handling self-healing fixes. You spawn the `ci-monitor-subagent` subagent to poll CI status and make decisions based on the results.

## Context

- **Current Branch:** !`git branch --show-current`
- **Current Commit:** !`git rev-parse --short HEAD`
- **Remote Status:** !`git status -sb | head -1`

## User Instructions

${input:args}

**Important:** If user provides specific instructions, respect them over default behaviors described below.

## Configuration Defaults

| Setting                   | Default       | Description                                                               |
| ------------------------- | ------------- | ------------------------------------------------------------------------- |
| `--max-cycles`            | 10            | Maximum **agent-initiated** CI Attempt cycles before timeout              |
| `--timeout`               | 120           | Maximum duration in minutes                                               |
| `--verbosity`             | medium        | Output level: minimal, medium, verbose                                    |
| `--branch`                | (auto-detect) | Branch to monitor                                                         |
| `--subagent-timeout`      | 30            | Subagent polling timeout in minutes                                       |
| `--fresh`                 | false         | Ignore previous context, start fresh                                      |
| `--auto-fix-workflow`     | false         | Attempt common fixes for pre-CI-Attempt failures (e.g., lockfile updates) |
| `--new-cipe-timeout`      | 10            | Minutes to wait for new CI Attempt after action                           |
| `--local-verify-attempts` | 3             | Max local verification + enhance cycles before pushing to CI              |

Parse any overrides from `${input:args}` and merge with defaults.

## Nx Cloud Connection Check

**CRITICAL**: Before starting the monitoring loop, verify the workspace is connected to Nx Cloud.

### Step 0: Verify Nx Cloud Connection

1. **Check `nx.json`** at workspace root for `nxCloudId` or `nxCloudAccessToken`
2. **If `nx.json` missing OR neither property exists** → exit with:

   ```
   [monitor-ci] Nx Cloud not connected. Unlock 70% faster CI and auto-fix broken PRs with https://nx.dev/nx-cloud
   ```

3. **If connected** → continue to main loop

## Anti-Patterns (NEVER DO)

**CRITICAL**: The following behaviors are strictly prohibited:

| Anti-Pattern                                                                                    | Why It's Bad                                                       |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Using CI provider CLIs with `--watch` flags (e.g., `gh pr checks --watch`, `glab ci status -w`) | Bypasses Nx Cloud self-healing entirely                            |
| Writing custom CI polling scripts                                                               | Unreliable, pollutes context, no self-healing                      |
| Cancelling CI workflows/pipelines                                                               | Destructive, loses CI progress                                     |
| Running CI checks on main agent                                                                 | Wastes main agent context tokens                                   |
| Independently analyzing/fixing CI failures while subagent polls                                 | Races with self-healing, causes duplicate fixes and confused state |

**If this skill fails to activate**, the fallback is:

1. Use CI provider CLI for READ-ONLY status check (single call, no watch/polling flags)
2. Immediately delegate to this skill with gathered context
3. NEVER continue polling on main agent

**CI provider CLIs are acceptable ONLY for:**

- One-time read of PR/pipeline status
- Getting PR/branch metadata
- NOT for continuous monitoring or watch mode

## Session Context Behavior

**Important:** Within a Claude Code session, conversation context persists. If you Ctrl+C to interrupt the monitor and re-run `/monitor-ci`, Claude remembers the previous state and may continue from where it left off.

- **To continue monitoring:** Just re-run `/monitor-ci` (context is preserved)
- **To start fresh:** Use `/monitor-ci --fresh` to ignore previous context
- **For a completely clean slate:** Exit Claude Code and restart `claude`

## Default Behaviors by Status

The subagent returns with one of the following statuses. This table defines the **default behavior** for each status. User instructions can override any of these.

| Status                   | Default Behavior                                                                                                                                                              |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ci_success`             | Exit with success. Log "CI passed successfully!"                                                                                                                              |
| `fix_auto_applying`      | Fix will be auto-applied by self-healing. Do NOT call MCP. Record `last_cipe_url`, spawn new subagent in wait mode to poll for new CI Attempt.                                |
| `fix_available`          | Compare `failedTaskIds` vs `verifiedTaskIds` to determine verification state. See **Fix Available Decision Logic** section below.                                             |
| `fix_failed`             | Self-healing failed to generate fix. Attempt local fix based on `taskOutputSummary`. If successful → commit, push, loop. If not → exit with failure.                          |
| `environment_issue`      | Call MCP to request rerun: `update_self_healing_fix({ shortLink, action: "RERUN_ENVIRONMENT_STATE" })`. New CI Attempt spawns automatically. Loop to poll for new CI Attempt. |
| `self_healing_throttled` | Self-healing throttled due to unapplied fixes. See **Throttled Self-Healing Flow** below.                                                                                     |
| `no_fix`                 | CI failed, no fix available (self-healing disabled or not executable). Attempt local fix if possible. Otherwise exit with failure.                                            |
| `no_new_cipe`            | Expected CI Attempt never spawned (CI workflow likely failed before Nx tasks). Report to user, attempt common fixes if configured, or exit with guidance.                     |
| `polling_timeout`        | Subagent polling timeout reached. Exit with timeout.                                                                                                                          |
| `cipe_canceled`          | CI Attempt was canceled. Exit with canceled status.                                                                                                                           |
| `cipe_timed_out`         | CI Attempt timed out. Exit with timeout status.                                                                                                                               |
| `cipe_no_tasks`          | CI Attempt exists but failed with no task data (likely infrastructure issue). Retry once with empty commit. If retry fails, exit with failure and guidance.                   |
| `error`                  | Increment `no_progress_count`. If >= 3 → exit with circuit breaker. Otherwise wait 60s and loop.                                                                              |

### Fix Available Decision Logic

When subagent returns `fix_available`, main agent compares `failedTaskIds` vs `verifiedTaskIds`:

#### Step 1: Categorize Tasks

1. **Verified tasks** = tasks in both `failedTaskIds` AND `verifiedTaskIds`
2. **Unverified tasks** = tasks in `failedTaskIds` but NOT in `verifiedTaskIds`
3. **E2E tasks** = unverified tasks where target contains "e2e" (task format: `<project>:<target>` or `<project>:<target>:<config>`)
4. **Verifiable tasks** = unverified tasks that are NOT e2e

#### Step 2: Determine Path

| Condition                               | Path                                     |
| --------------------------------------- | ---------------------------------------- |
| No unverified tasks (all verified)      | Apply via MCP                            |
| Unverified tasks exist, but ALL are e2e | Apply via MCP (treat as verified enough) |
| Verifiable tasks exist                  | Local verification flow                  |

#### Step 3a: Apply via MCP (fully/e2e-only verified)

- Call `update_self_healing_fix({ shortLink, action: "APPLY" })`
- Record `last_cipe_url`, spawn subagent in wait mode

#### Step 3b: Local Verification Flow

When verifiable (non-e2e) unverified tasks exist:

1. **Detect package manager:**

   - `pnpm-lock.yaml` exists → `pnpm nx`
   - `yarn.lock` exists → `yarn nx`
   - Otherwise → `npx nx`

2. **Run verifiable tasks in parallel:**

   - Spawn `general` subagents to run each task concurrently
   - Each subagent runs: `<pm> nx run <taskId>`
   - Collect pass/fail results from all subagents

3. **Evaluate results:**

| Result                    | Action                       |
| ------------------------- | ---------------------------- |
| ALL verifiable tasks pass | Apply via MCP                |
| ANY verifiable task fails | Apply-locally + enhance flow |

1. **Apply-locally + enhance flow:**

   - Run `nx-cloud apply-locally <shortLink>`
   - Enhance the code to fix failing tasks
   - Run failing tasks again to verify fix
   - If still failing → increment `local_verify_count`, loop back to enhance
   - If passing → commit and push, record `expected_commit_sha`, spawn subagent in wait mode

2. **Track attempts** (wraps step 4):

   - Increment `local_verify_count` after each enhance cycle
   - If `local_verify_count >= local_verify_attempts` (default: 3):

     - Get code in commit-able state
     - Commit and push with message indicating local verification failed
     - Report to user:

       ```
       [monitor-ci] Local verification failed after <N> attempts. Pushed to CI for final validation. Failed: <taskIds>
       ```

     - Record `expected_commit_sha`, spawn subagent in wait mode (let CI be final judge)

#### Commit Message Format

```bash
git commit -m "fix(<projects>): <brief description>

Failed tasks: <taskId1>, <taskId2>
Local verification: passed|enhanced|failed-pushing-to-ci"
```

**Git Safety**: Only stage and commit files that were modified as part of the fix. Users may have concurrent local changes (local publish, WIP features, config tweaks) that must NOT be committed. NEVER use `git add -A` or `git add .` — always stage specific files by name.

### Unverified Fix Flow (No Verification Attempted)

When `verificationStatus` is `FAILED`, `NOT_EXECUTABLE`, or fix has `couldAutoApplyTasks != true` with no verification:

- Analyze fix content (`suggestedFix`, `suggestedFixReasoning`, `taskOutputSummary`)
- If fix looks correct → apply via MCP
- If fix needs enhancement → use Apply Locally + Enhance Flow above
- If fix is wrong → reject via MCP, fix from scratch, commit, push

### Auto-Apply Eligibility

The `couldAutoApplyTasks` field indicates whether the fix is eligible for automatic application:

- **`true`**: Fix is eligible for auto-apply. Subagent keeps polling while verification is in progress. Returns `fix_auto_applying` when verified, or `fix_available` if verification fails.
- **`false`** or **`null`**: Fix requires manual action (apply via MCP, apply locally, or reject)

**Key point**: When subagent returns `fix_auto_applying`, do NOT call MCP to apply - self-healing handles it. Just spawn a new subagent in wait mode. No local git operations (no commit, no push).

### Accidental Local Fix Recovery

If you find yourself with uncommitted local changes from your own fix attempt when the subagent returns (e.g., you accidentally analyzed/fixed the failure while the subagent was polling):

1. **Compare your local changes with the self-healing fix** (`suggestedFix` / `suggestedFixDescription`)
2. **If identical or substantially similar** → discard only the files you modified (`git checkout -- <file1> <file2> ...`), then apply via MCP instead. Self-healing's pipeline is the preferred path. Do NOT discard unrelated user changes.
3. **If meaningfully different** (your fix addresses something self-healing missed) → proceed with the Apply Locally + Enhance Flow

Self-healing fixes go through proper CI verification. Always prefer the self-healing path when fixes overlap.

### Apply vs Reject vs Apply Locally

- **Apply via MCP**: Calls `update_self_healing_fix({ shortLink, action: "APPLY" })`. Self-healing agent applies the fix in CI and a new CI Attempt spawns automatically. No local git operations needed.
- **Apply Locally**: Runs `nx-cloud apply-locally <shortLink>`. Applies the patch to your local working directory and sets state to `APPLIED_LOCALLY`. Use this when you want to enhance the fix before pushing.
- **Reject via MCP**: Calls `update_self_healing_fix({ shortLink, action: "REJECT" })`. Marks fix as rejected. Use only when the fix is completely wrong and you'll fix from scratch.

### Apply Locally + Enhance Flow

When the fix needs enhancement (use `nx-cloud apply-locally`, NOT reject):

1. Apply the patch locally: `nx-cloud apply-locally <shortLink>` (this also updates state to `APPLIED_LOCALLY`)
2. Make additional changes as needed
3. Stage only the files you modified: `git add <file1> <file2> ...`
4. Commit and push:

   ```bash
   git commit -m "fix: resolve <failedTaskIds>"
   git push origin $(git branch --show-current)
   ```

5. Loop to poll for new CI Attempt

### Reject + Fix From Scratch Flow

When the fix is completely wrong:

1. Call MCP to reject: `update_self_healing_fix({ shortLink, action: "REJECT" })`
2. Fix the issue from scratch locally
3. Stage only the files you modified: `git add <file1> <file2> ...`
4. Commit and push:

   ```bash
   git commit -m "fix: resolve <failedTaskIds>"
   git push origin $(git branch --show-current)
   ```

5. Loop to poll for new CI Attempt

### Environment Issue Handling

When `failureClassification == 'ENVIRONMENT_STATE'`:

1. Call MCP to request rerun: `update_self_healing_fix({ shortLink, action: "RERUN_ENVIRONMENT_STATE" })`
2. New CI Attempt spawns automatically (no local git operations needed)
3. Loop to poll for new CI Attempt with `previousCipeUrl` set

### Throttled Self-Healing Flow

When `status == 'self_healing_throttled'`:

Self-healing was skipped because too many previous fixes remain unapplied. The `selfHealingSkipMessage` contains URLs to CIPEs with pending fixes.

1. **Parse throttle message** for CIPE URLs using regex matching `/cipes/{id}` pattern (format: `https://...nx.app/cipes/{cipeId}/self-healing`)
2. **Reject previous fixes** — for each CIPE URL found:
   - Call `ci_information({ url: "<cipe_url>" })` to get the `shortLink`
   - Call `update_self_healing_fix({ shortLink: "<shortLink>", action: "REJECT" })` to reject
3. **Attempt local fix**:
   - Use `failedTaskIds` from the current CIPE
   - Use `taskOutputSummary` (fetch via select if available) for context
   - Try to fix locally, run tasks to verify
4. **Fallback if local fix not possible**:
   - Push empty commit (`git commit --allow-empty -m "ci: rerun after rejecting throttled fixes"`)
   - Push to trigger new CI
   - Spawn subagent in wait mode to poll for new CI Attempt
5. After rejecting fixes and pushing, self-healing should resume since throttle condition (unapplied fixes) is cleared

### No-New-CI-Attempt Handling

When `status == 'no_new_cipe'`:

This means the expected CI Attempt was never created - CI likely failed before Nx tasks could run.

1. **Report to user:**

   ```
   [monitor-ci] No CI attempt for <sha> after 10 min. Check CI provider for pre-Nx failures (install, checkout, auth). Last CI attempt: <previousCipeUrl>
   ```

2. **If user configured auto-fix attempts** (e.g., `--auto-fix-workflow`):

   - Detect package manager: check for `pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`
   - Run install to update lockfile:

     ```bash
     pnpm install   # or npm install / yarn install
     ```

   - If lockfile changed:

     ```bash
     git add pnpm-lock.yaml  # or appropriate lockfile
     git commit -m "chore: update lockfile"
     git push origin $(git branch --show-current)
     ```

   - Record new commit SHA, loop to poll with `expectedCommitSha`

3. **Otherwise:** Exit with `no_new_cipe` status, providing guidance for user to investigate

### CI-Attempt-No-Tasks Handling

When `status == 'cipe_no_tasks'`:

This means the CI Attempt was created but no Nx tasks were recorded before it failed. Common causes:

- CI timeout before tasks could run
- Critical infrastructure error
- Memory/resource exhaustion
- Network issues connecting to Nx Cloud

1. **Report to user:**

   ```
   [monitor-ci] CI failed but no Nx tasks were recorded.
   [monitor-ci] CI Attempt URL: <cipeUrl>
   [monitor-ci]
   [monitor-ci] This usually indicates an infrastructure issue. Attempting retry...
   ```

2. **Create empty commit to retry CI:**

   ```bash
   git commit --allow-empty -m "chore: retry ci [monitor-ci]"
   git push origin $(git branch --show-current)
   ```

3. **Record `expected_commit_sha`, spawn subagent in wait mode**

4. **If retry also returns `cipe_no_tasks`:**

   - Exit with failure
   - Provide guidance:

     ```
     [monitor-ci] Retry failed. Please check:
     [monitor-ci]   1. Nx Cloud UI: <cipeUrl>
     [monitor-ci]   2. CI provider logs (GitHub Actions, GitLab CI, etc.)
     [monitor-ci]   3. CI job timeout settings
     [monitor-ci]   4. Memory/resource limits
     ```

## Exit Conditions

Exit the monitoring loop when ANY of these conditions are met:

| Condition                                                    | Exit Type              |
| ------------------------------------------------------------ | ---------------------- |
| CI passes (`cipeStatus == 'SUCCEEDED'`)                      | Success                |
| Max agent-initiated cycles reached (after user declines ext) | Timeout                |
| Max duration reached                                         | Timeout                |
| 3 consecutive no-progress iterations                         | Circuit breaker        |
| No fix available and local fix not possible                  | Failure                |
| No new CI Attempt and auto-fix not configured                | Pre-CI-Attempt failure |
| User cancels                                                 | Cancelled              |

## Main Loop

### Step 1: Initialize Tracking

```
cycle_count = 0            # Only incremented for agent-initiated cycles (counted against --max-cycles)
start_time = now()
no_progress_count = 0
local_verify_count = 0
last_state = null
last_cipe_url = null
expected_commit_sha = null
agent_triggered = false    # Set true after monitor takes an action that triggers new CI Attempt
```

### Step 2: Spawn Subagent and Monitor Output

Spawn the `ci-monitor-subagent` subagent to poll CI status. **Run in background** so you can actively monitor and relay its output to the user.

**Fresh start (first spawn, no expected CI Attempt):**

```
Task(
  agent: "ci-monitor-subagent",
  run_in_background: true,
  prompt: "Monitor CI for branch '<branch>'.
           Subagent timeout: <subagent-timeout> minutes.
           New-CI-Attempt timeout: <new-cipe-timeout> minutes.
           Verbosity: <verbosity>."
)
```

**After action that triggers new CI Attempt (wait mode):**

```
Task(
  agent: "ci-monitor-subagent",
  run_in_background: true,
  prompt: "Monitor CI for branch '<branch>'.
           Subagent timeout: <subagent-timeout> minutes.
           New-CI-Attempt timeout: <new-cipe-timeout> minutes.
           Verbosity: <verbosity>.

           WAIT MODE: A new CI Attempt should spawn. Ignore old CI Attempt until new one appears.
           Expected commit SHA: <expected_commit_sha>
           Previous CI Attempt URL: <last_cipe_url>"
)
```

### Step 2a: Active Output Monitoring (CRITICAL)

**The subagent's text output is NOT visible to users when running in background.** You MUST actively monitor and relay its output. Do NOT passively wait for completion.

After spawning the background subagent, enter a monitoring loop:

1. **Every 60 seconds**, check the subagent output using `TaskOutput(task_id, block=false)`
2. **Parse new lines** since your last check — look for `[ci-monitor]` and `⚡` prefixed lines
3. **Relay to user** based on verbosity:
   - `minimal`: Only relay `⚡` critical transition lines
   - `medium`: Relay all `[ci-monitor]` status lines
   - `verbose`: Relay all subagent output
4. **Continue** until `TaskOutput` returns a completed status
5. When complete, proceed to Step 3 with the final subagent response

**Example monitoring loop output:**

```
[monitor-ci] Checking subagent status... (elapsed: 1m)
[monitor-ci] CI: IN_PROGRESS | Self-healing: NOT_STARTED

[monitor-ci] Checking subagent status... (elapsed: 3m)
[monitor-ci] CI: FAILED | Self-healing: IN_PROGRESS
[monitor-ci] ⚡ CI failed — self-healing fix generation started

[monitor-ci] Checking subagent status... (elapsed: 5m)
[monitor-ci] CI: FAILED | Self-healing: COMPLETED | Verification: IN_PROGRESS
[monitor-ci] ⚡ Self-healing fix generated — verification started
```

**NEVER do this:**

- Spawn subagent and passively say "Waiting for results..."
- Check once and say "Still working, I'll wait"
- Only show output when the subagent finishes
- Independently analyze CI failures, read task output, or attempt fixes while subagent is polling

**While the subagent is polling, your ONLY job is to relay its output.** Do not read CI task output, diagnose failures, generate fixes, modify code, or run tasks locally. All fix decisions happen in Step 3 AFTER the subagent returns with a status. Self-healing may already be working on a fix — independent local analysis races with it and causes duplicate/conflicting fixes.

### Step 3: Handle Subagent Response

When subagent returns:

1. Check the returned status
2. Look up default behavior in the table above
3. Check if user instructions override the default
4. Execute the appropriate action
5. **If action expects new CI Attempt**, update tracking (see Step 3a)
6. If action results in looping, go to Step 2

### Step 3a: Track State for New-CI-Attempt Detection

After actions that should trigger a new CI Attempt, record state before looping:

| Action                              | What to Track                                 | Subagent Mode |
| ----------------------------------- | --------------------------------------------- | ------------- |
| Fix auto-applying                   | `last_cipe_url = current cipeUrl`             | Wait mode     |
| Apply via MCP                       | `last_cipe_url = current cipeUrl`             | Wait mode     |
| Apply locally + push                | `expected_commit_sha = $(git rev-parse HEAD)` | Wait mode     |
| Reject + fix + push                 | `expected_commit_sha = $(git rev-parse HEAD)` | Wait mode     |
| Fix failed + local fix + push       | `expected_commit_sha = $(git rev-parse HEAD)` | Wait mode     |
| No fix + local fix + push           | `expected_commit_sha = $(git rev-parse HEAD)` | Wait mode     |
| Environment rerun                   | `last_cipe_url = current cipeUrl`             | Wait mode     |
| No-new-CI-Attempt + auto-fix + push | `expected_commit_sha = $(git rev-parse HEAD)` | Wait mode     |
| CI Attempt no tasks + retry push    | `expected_commit_sha = $(git rev-parse HEAD)` | Wait mode     |

**CRITICAL**: When passing `expectedCommitSha` or `last_cipe_url` to the subagent, it enters **wait mode**:

- Subagent will **completely ignore** the old/stale CI Attempt
- Subagent will only wait for new CI Attempt to appear
- Subagent will NOT return to main agent with stale CI Attempt data
- Once new CI Attempt detected, subagent switches to normal polling

**Why wait mode matters for context preservation**: Stale CI Attempt data can be very large (task output summaries, suggested fix patches, reasoning). If subagent returns this to main agent, it pollutes main agent's context with useless data since we already processed that CI Attempt. Wait mode keeps stale data in the subagent, never sending it to main agent.

### Step 4: Cycle Classification and Progress Tracking

#### Cycle Classification

Not all cycles are equal. Only count cycles the monitor itself triggered toward `--max-cycles`:

1. **After subagent returns**, check `agent_triggered`:
   - `agent_triggered == true` → this cycle was triggered by the monitor → `cycle_count++`
   - `agent_triggered == false` → this cycle was human-initiated or a first observation → do NOT increment `cycle_count`
2. **Reset** `agent_triggered = false`
3. **After Step 3a** (when the monitor takes an action that triggers a new CI Attempt) → set `agent_triggered = true`

**How detection works**: Step 3a is only called when the monitor explicitly pushes code, applies a fix via MCP, or triggers an environment rerun. If a human pushes on their own, the subagent detects a new CI Attempt but the monitor never went through Step 3a, so `agent_triggered` remains `false`.

**When a human-initiated cycle is detected**, log it:

```
[monitor-ci] New CI Attempt detected (human-initiated push). Monitoring without incrementing cycle count. (agent cycles: N/max-cycles)
```

#### Approaching Limit Gate

When `cycle_count >= max_cycles - 2`, pause and ask the user before continuing:

```
[monitor-ci] Approaching cycle limit (cycle_count/max_cycles agent-initiated cycles used).
[monitor-ci] How would you like to proceed?
  1. Continue with 5 more cycles
  2. Continue with 10 more cycles
  3. Stop monitoring
```

Increase `max_cycles` by the user's choice and continue.

#### Progress Tracking

After each action:

- If state changed significantly → reset `no_progress_count = 0`
- If state unchanged → `no_progress_count++`
- On new CI attempt detected → reset `local_verify_count = 0`

## Status Reporting

Based on verbosity level:

| Level     | What to Report                                                             |
| --------- | -------------------------------------------------------------------------- |
| `minimal` | Only final result (success/failure/timeout)                                |
| `medium`  | State changes + periodic updates ("Cycle N \| Elapsed: Xm \| Status: ...") |
| `verbose` | All of medium + full subagent responses, git outputs, MCP responses        |

## User Instruction Examples

Users can override default behaviors:

| Instruction                                      | Effect                                              |
| ------------------------------------------------ | --------------------------------------------------- |
| "never auto-apply"                               | Always prompt before applying any fix               |
| "always ask before git push"                     | Prompt before each push                             |
| "reject any fix for e2e tasks"                   | Auto-reject if `failedTaskIds` contains e2e         |
| "apply all fixes regardless of verification"     | Skip verification check, apply everything           |
| "if confidence < 70, reject"                     | Check confidence field before applying              |
| "run 'nx affected -t typecheck' before applying" | Add local verification step                         |
| "auto-fix workflow failures"                     | Attempt lockfile updates on pre-CI-Attempt failures |
| "wait 45 min for new CI Attempt"                 | Override new-CI-Attempt timeout (default: 10 min)   |

## Error Handling

| Error                          | Action                                                                                                      |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| Git rebase conflict            | Report to user, exit                                                                                        |
| `nx-cloud apply-locally` fails | Reject fix via MCP (`action: "REJECT"`), then attempt manual patch (Reject + Fix From Scratch Flow) or exit |
| MCP tool error                 | Retry once, if fails report to user                                                                         |
| Subagent spawn failure         | Retry once, if fails exit with error                                                                        |
| No new CI Attempt detected     | If `--auto-fix-workflow`, try lockfile update; otherwise report to user with guidance                       |
| Lockfile auto-fix fails        | Report to user, exit with guidance to check CI logs                                                         |

## Example Session

### Example 1: Normal Flow with Self-Healing (medium verbosity)

```
[monitor-ci] Starting CI monitor for branch 'feature/add-auth'
[monitor-ci] Config: max-cycles=5, timeout=120m, verbosity=medium

[monitor-ci] Spawning subagent to poll CI status...
[monitor-ci] Checking subagent status... (elapsed: 1m)
[monitor-ci] CI: IN_PROGRESS | Self-healing: NOT_STARTED
[monitor-ci] Checking subagent status... (elapsed: 3m)
[monitor-ci] CI: FAILED | Self-healing: IN_PROGRESS
[monitor-ci] ⚡ CI failed — self-healing fix generation started
[monitor-ci] Checking subagent status... (elapsed: 5m)
[monitor-ci] CI: FAILED | Self-healing: COMPLETED | Verification: COMPLETED

[monitor-ci] Fix available! Verification: COMPLETED
[monitor-ci] Applying fix via MCP...
[monitor-ci] Fix applied in CI. Waiting for new CI attempt...

[monitor-ci] Spawning subagent to poll CI status...
[monitor-ci] Checking subagent status... (elapsed: 7m)
[monitor-ci] ⚡ New CI Attempt detected!
[monitor-ci] Checking subagent status... (elapsed: 8m)
[monitor-ci] CI: SUCCEEDED

[monitor-ci] CI passed successfully!

[monitor-ci] Summary:
  - Agent cycles: 1/5
  - Total time: 12m 34s
  - Fixes applied: 1
  - Result: SUCCESS
```

### Example 2: Pre-CI Failure (medium verbosity)

```
[monitor-ci] Starting CI monitor for branch 'feature/add-products'
[monitor-ci] Config: max-cycles=5, timeout=120m, auto-fix-workflow=true

[monitor-ci] Spawning subagent to poll CI status...
[monitor-ci] Checking subagent status... (elapsed: 2m)
[monitor-ci] CI: FAILED | Self-healing: COMPLETED

[monitor-ci] Fix available! Applying locally, enhancing, and pushing...
[monitor-ci] Committed: abc1234

[monitor-ci] Spawning subagent to poll CI status...
[monitor-ci] Checking subagent status... (elapsed: 6m)
[monitor-ci] Waiting for new CI Attempt... (expected SHA: abc1234)
[monitor-ci] Checking subagent status... (elapsed: 12m)
[monitor-ci] ⚠️ CI Attempt timeout (10 min). Status: no_new_cipe

[monitor-ci] --auto-fix-workflow enabled. Attempting lockfile update...
[monitor-ci] Lockfile updated. Committed: def5678

[monitor-ci] Spawning subagent to poll CI status...
[monitor-ci] Checking subagent status... (elapsed: 16m)
[monitor-ci] ⚡ New CI Attempt detected!
[monitor-ci] Checking subagent status... (elapsed: 18m)
[monitor-ci] CI: SUCCEEDED

[monitor-ci] CI passed successfully!

[monitor-ci] Summary:
  - Agent cycles: 3/5
  - Total time: 22m 15s
  - Fixes applied: 1 (self-healing) + 1 (lockfile)
  - Result: SUCCESS
```

### Example 3: Human-in-the-Loop (user pushes during monitoring)

```
[monitor-ci] Starting CI monitor for branch 'feature/refactor-api'
[monitor-ci] Config: max-cycles=5, timeout=120m, verbosity=medium

[monitor-ci] Spawning subagent to poll CI status...
[monitor-ci] Checking subagent status... (elapsed: 4m)
[monitor-ci] CI: FAILED | Self-healing: COMPLETED

[monitor-ci] Fix available! Applying fix via MCP... (agent cycles: 0/5)
[monitor-ci] Fix applied in CI. Waiting for new CI attempt...

[monitor-ci] Spawning subagent to poll CI status...
[monitor-ci] Checking subagent status... (elapsed: 8m)
[monitor-ci] ⚡ New CI Attempt detected!
[monitor-ci] CI: FAILED | Self-healing: COMPLETED

[monitor-ci] Agent-initiated cycle. (agent cycles: 1/5)
[monitor-ci] Fix available! Applying locally and enhancing...
[monitor-ci] Committed: abc1234

[monitor-ci] Spawning subagent to poll CI status...
  ... (user pushes their own changes to the branch while monitor waits) ...
[monitor-ci] Checking subagent status... (elapsed: 12m)
[monitor-ci] ⚡ New CI Attempt detected!
[monitor-ci] CI: FAILED | Self-healing: IN_PROGRESS

[monitor-ci] New CI Attempt detected (human-initiated push). Monitoring without incrementing cycle count. (agent cycles: 2/5)
[monitor-ci] Checking subagent status... (elapsed: 16m)
[monitor-ci] CI: FAILED | Self-healing: COMPLETED

[monitor-ci] Fix available! Applying via MCP... (agent cycles: 2/5)
  ... (continues, human cycles don't eat into the budget) ...
```
