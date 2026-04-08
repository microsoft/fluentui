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
npm ls -g @playwright/cli 2>/dev/null || npm install -g @playwright/cli@latest
```

## Steps

1. **Find the component's stories package.** Each v9 component has a dedicated stories package:
   ```bash
   yarn nx show projects 2>/dev/null | grep "<lowercase-component-name>.*stories"
   ```

2. **Start the component's Storybook dev server:**
   ```bash
   # Use the stories package directly — much faster than the full VR tests app
   yarn nx run react-<component>-stories:start &
   ```
   Wait for Storybook to be ready on port 6006. Check with:
   ```bash
   curl -s -o /dev/null -w "%{http_code}" http://localhost:6006 2>/dev/null
   ```

3. **Open the page with playwright-cli:**
   ```bash
   playwright-cli open "http://localhost:6006"
   ```

4. **Navigate to the specific story iframe** and capture a screenshot.
   Use the iframe URL for a clean render without Storybook chrome:
   ```bash
   playwright-cli goto "http://localhost:6006/iframe.html?id=components-<component>-<component>--default&viewMode=story"
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
   # Kill the storybook process
   kill %1 2>/dev/null
   ```

## Story ID Pattern

Story IDs follow the pattern `<category>-<subcategory>-<component>--<story>`:

```
# Default story for Button
components-button-button--default

# Appearance variant
components-button-button--appearance

# Default story for Menu
components-menu-menu--default
```

To discover exact story IDs, open the Storybook sidebar and use `snapshot` to find navigation links,
or check the story file's `export default { title: '...' }` metadata.

## Iframe URL Format

```
# Local storybook
http://localhost:6006/iframe.html?id=components-button-button--default&viewMode=story

# Dark theme
http://localhost:6006/iframe.html?id=components-button-button--default&viewMode=story&globals=theme:webDarkTheme
```

The `/iframe.html` URL gives a clean render without Storybook chrome — always prefer this for screenshots.

## Tips

- Use `playwright-cli snapshot` to get an accessibility tree — useful for verifying ARIA attributes and finding interactive elements.
- Use `playwright-cli click <ref>` to interact with the component (test hover states, open menus, etc.) before taking a screenshot.
- Use `playwright-cli resize <width> <height>` to test responsive behavior.
- For multiple story variants, take a screenshot of each: Default, Appearance, Size, Disabled, etc.
