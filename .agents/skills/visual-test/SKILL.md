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

## Steps

1. **Find the component's stories package.** Each v9 component has a dedicated stories package:

   ```bash
   yarn nx show projects 2>/dev/null | grep "<lowercase-component-name>.*stories"
   ```

2. **Start the component's Storybook dev server:**

   ```bash
   yarn nx run react-<component>:start &
   ```

   The port is **dynamic** — parse it from the Storybook startup output. Look for the `Local:` line
   (e.g. `Local: http://localhost:61582/`). Extract the port and store it in a variable:

   ```bash
   # Wait for Storybook to print its URL, then extract the port
   # Or poll common ports until one responds:
   for port in 6006 61582 $(seq 6007 6020); do
     STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$port 2>/dev/null)
     if [ "$STATUS" = "200" ]; then SB_PORT=$port; break; fi
   done
   echo "Storybook on port $SB_PORT"
   ```

3. **Open the page with playwright-cli:**

   ```bash
   playwright-cli open "http://localhost:$SB_PORT"
   ```

4. **Navigate to the specific story iframe** and capture a screenshot.
   Use the iframe URL for a clean render without Storybook chrome:

   ```bash
   playwright-cli goto "http://localhost:$SB_PORT/iframe.html?id=components-<component>--default&viewMode=story"
   playwright-cli screenshot --filename=/tmp/visual-test-$ARGUMENTS.png
   ```

5. **View the screenshot** using the Read tool to visually inspect the rendered component.

6. **Use `snapshot`** to get the accessibility tree and find interactive element refs:

   ```bash
   playwright-cli snapshot
   ```

   Then interact with elements by ref (e.g., click, hover) before taking more screenshots.

7. **If the component doesn't look right**, go back to the code, fix the issue, and repeat from step 4 (Storybook hot-reloads changes).

8. **Clean up** when done:
   ```bash
   playwright-cli close
   # Kill storybook by port
   lsof -i :$SB_PORT -t 2>/dev/null | xargs kill 2>/dev/null
   ```

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
