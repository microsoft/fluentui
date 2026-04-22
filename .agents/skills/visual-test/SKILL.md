---
name: visual-test
description: Visually verify a component by launching its Storybook story and taking a screenshot with playwright-cli. Use after making visual changes to a component.
disable-model-invocation: true
argument-hint: <ComponentName> [story-name]
allowed-tools: Bash Read Grep Glob
---

# Visual Test a Component

Visually verify **$ARGUMENTS** by launching Storybook and capturing a screenshot with `playwright-cli`.

## Prerequisites

Ensure `playwright-cli` is installed globally:

```bash
npm ls -g @playwright/cli 2>/dev/null || npm install -g @playwright/cli@0.1.1
```

## Critical: use the per-component Storybook only

**Never** use `yarn storybook` at the repo root, `public-docsite-v9`, or any workspace-wide Storybook build for visual validation. They pull in every v9 package (including deprecated `unstable` re-exports) and will either fail to compile due to missing packages or get stuck in HMR restart loops — the validation becomes useless. Always boot the **per-component stories package**, which only imports its own component's stories and dependencies.

## Steps

1. **Find the component's stories package.** Each v9 component has a dedicated stories package named `react-<component>-stories`:

   ```bash
   yarn nx show projects 2>/dev/null | grep "^react-<lowercase-component-name>-stories$"
   ```

   If the grep returns nothing, the component doesn't have its own stories package — check for a preview package (`react-<component>-preview-stories`) or ask before proceeding.

2. **Start the component's Storybook dev server.** Use the `storybook` target on the stories project directly — it's the most portable, since library aliases like `react-<component>:start` were only added in April 2026 and may not exist in older workspace snapshots:

   ```bash
   yarn nx run react-<component>-stories:storybook --skip-nx-cache &
   NX_PID=$!
   ```

   `--skip-nx-cache` matters: the `storybook` target is (unusually) declared with `cache: true`, and a prior run can replay cached output and exit without actually starting a server.

3. **Find the storybook port.** Three quirks to know:

   - Storybook picks a **random high port** on first boot (e.g. `49360`), not the Storybook default `6006`. Don't assume.
   - The nx wrapper process often exits 0 after delegating to storybook, leaving the actual server running as a child. So the nx PID isn't the storybook PID.
   - The storybook child opens **two** listening sockets: one for HTTP content, one for the webpack HMR event-stream. They are not ordered — either one can be numerically lower. Picking by port number is unreliable; pick by `Content-Type`.

   Reliable detection — target the storybook node child (not the yarn wrapper), then probe each listening socket until one returns `text/html`:

   ```bash
   # Wait up to 180s for the storybook child to bind an HTTP port.
   # Pattern matches the node child specifically, not `yarn storybook dev` (the wrapper has no sockets).
   for i in $(seq 1 180); do
     SB_CHILD=$(pgrep -f "node.*\.bin/storybook dev" | head -1)
     if [ -n "$SB_CHILD" ]; then
       for port in $(lsof -a -p "$SB_CHILD" -i -P -sTCP:LISTEN 2>/dev/null | awk 'NR>1 {print $9}' | sed 's/.*://'); do
         CT=$(curl -sI --max-time 2 "http://localhost:$port/" 2>/dev/null | grep -i '^content-type:' | grep -i 'text/html')
         if [ -n "$CT" ]; then SB_PORT=$port; break; fi
       done
       if [ -n "$SB_PORT" ]; then break; fi
     fi
     sleep 1
   done
   echo "Storybook child PID=$SB_CHILD on port $SB_PORT"
   ```

   Then wait for Storybook to finish compiling stories — the HTTP port answers before `index.json` is populated:

   ```bash
   for i in $(seq 1 60); do
     N=$(curl -s --max-time 2 "http://localhost:$SB_PORT/index.json" 2>/dev/null \
       | python3 -c "import json,sys; print(len(json.load(sys.stdin).get('entries', {})))" 2>/dev/null || echo 0)
     if [ "$N" -gt 0 ]; then break; fi
     sleep 2
   done
   ```

   If no port turns up, or `index.json` never populates — **do not** fall back to the workspace-wide Storybook; read the nx output log and debug the per-component boot. The most common real failure is missing build artifacts for unstable re-export deps (see troubleshooting below).

4. **Open the page with playwright-cli:**

   ```bash
   playwright-cli open "http://localhost:$SB_PORT"
   ```

5. **Navigate to the specific story iframe** and capture a screenshot.
   Use the iframe URL for a clean render without Storybook chrome:

   ```bash
   playwright-cli goto "http://localhost:$SB_PORT/iframe.html?id=components-<component>--default&viewMode=story"
   playwright-cli screenshot --filename=/tmp/visual-test-$ARGUMENTS.png
   ```

6. **View the screenshot** using the Read tool to visually inspect the rendered component.

7. **Use `snapshot`** to get the accessibility tree and find interactive element refs:

   ```bash
   playwright-cli snapshot
   ```

   Then interact with elements by ref (e.g., click, hover) before taking more screenshots.

8. **If the component doesn't look right**, go back to the code, fix the issue, and repeat from step 4 (Storybook hot-reloads changes).

9. **Clean up** when done:
   ```bash
   playwright-cli close
   # Kill storybook — the nx wrapper may already be gone, so target the child
   [ -n "$SB_CHILD" ] && kill "$SB_CHILD" 2>/dev/null
   lsof -i :$SB_PORT -t 2>/dev/null | xargs kill 2>/dev/null
   ```

## Troubleshooting

**`yarn nx run react-<component>-stories:storybook` says the target doesn't exist.**
The workspace graph may be stale (recent reparent). Run `yarn nx reset` then retry. If `start` aliases still don't exist, use the direct yarn invocation:

```bash
cd packages/react-components/react-<component>/stories && yarn storybook dev --port 0 &
# --port 0 asks Storybook to pick a free port; detect it via the pgrep/lsof pattern above
```

**The build stops mid-compilation and nx "completes" with exit 0.**
That's the nx cache replaying a prior partial run. Always pass `--skip-nx-cache`.

**The build fails with `Module not found: @fluentui/react-alert`, `@fluentui/react-infobutton`, or `@fluentui/react-virtualizer`.**
These three packages are listed as deps of `@fluentui/react-components` and are linked into `node_modules` from local workspace sources (`packages/react-components/deprecated/react-alert/`, `deprecated/react-infobutton/`, `react-virtualizer/`). Their `lib-commonjs/` output only exists after they're built. On a fresh clone this build hasn't run yet, so the linked entry points at files that don't exist. Fix:

```bash
yarn nx run-many -t build -p react-alert,react-infobutton,react-virtualizer
```

Then restart the storybook target. This is a real infrastructure wart — it affects **any** per-component Storybook that pulls stories from the shared `@fluentui/react-components` barrel, not just combobox. (If you see the error elsewhere in this repo — e.g. the workspace-wide Storybook — the same fix applies plus the "don't use workspace-wide" rule above still stands.)

**The story loads but keeps reloading (`[HMR] Cannot find update (Full reload needed)`).**
Same root cause — you're on the workspace-wide Storybook, which has HMR issues when preview packages rebuild. Kill it and use the per-component one.

## Story ID Pattern

Story IDs follow the pattern `<category>-<component>--<story>`:

```
# Default story for Button
components-button--default

# Appearance variant
components-button--appearance

# Default story for Menu
components-menu--default
```

To discover exact story IDs, open the Storybook sidebar and use `snapshot` to find navigation links,
or check the story file's `export default { title: '...' }` metadata.

## Iframe URL Format

```
# Local storybook (replace $SB_PORT with the actual port)
http://localhost:$SB_PORT/iframe.html?id=components-button--default&viewMode=story

# Dark theme
http://localhost:$SB_PORT/iframe.html?id=components-button--default&viewMode=story&globals=theme:webDarkTheme
```

The `/iframe.html` URL gives a clean render without Storybook chrome — always prefer this for screenshots.

## Tips

- Use `playwright-cli snapshot` to get an accessibility tree — useful for verifying ARIA attributes and finding interactive elements.
- Use `playwright-cli click <ref>` to interact with the component (test hover states, open menus, etc.) before taking a screenshot.
- Use `playwright-cli resize <width> <height>` to test responsive behavior.
- For multiple story variants, take a screenshot of each: Default, Appearance, Size, Disabled, etc.
